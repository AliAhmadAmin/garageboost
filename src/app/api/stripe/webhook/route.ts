import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const garageId = session.metadata?.garageId;
        const plan = session.metadata?.plan;

        if (garageId && plan) {
          // Normalize plan name to lowercase
          const normalizedPlan = plan.toLowerCase();
          
          // Extract subscription ID properly
          const subscriptionId = session.subscription as string;
          const customerId = session.customer as string;
          
          // Attempt to attach and set payment method for future invoices
          try {
            if (customerId && subscriptionId) {
              const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
                expand: ['default_payment_method', 'latest_invoice.payment_intent'],
              } as any);
              
              // Get the payment method ID from the subscription
              let pmId = (subscription as any).default_payment_method?.id || subscription.default_payment_method;
              
              // If subscription doesn't have default PM, try to get from latest invoice's payment intent
              if (!pmId && (subscription as any).latest_invoice?.payment_intent?.payment_method) {
                pmId = (subscription as any).latest_invoice.payment_intent.payment_method;
              }
              
              if (pmId && typeof pmId === 'string') {
                // Explicitly attach the payment method to the customer (if not already attached)
                try {
                  const paymentMethod = await stripe.paymentMethods.retrieve(pmId);
                  if (paymentMethod.customer !== customerId) {
                    await stripe.paymentMethods.attach(pmId, { customer: customerId });
                    if (process.env.NODE_ENV === "development") {
                      console.log(`✅ Attached payment method ${pmId} to customer ${customerId}`);
                    }
                  }
                } catch (attachError: any) {
                  // Payment method might already be attached or might not exist yet
                  if (process.env.NODE_ENV === "development") {
                    console.log(`ℹ️  Payment method attachment note: ${attachError.message}`);
                  }
                }
                
                // Update customer to use this as default for invoicing
                await stripe.customers.update(customerId, {
                  invoice_settings: {
                    default_payment_method: pmId,
                  },
                } as any);
                
                if (process.env.NODE_ENV === "development") {
                  console.log(`✅ Set default payment method for customer ${customerId}`);
                }
              } else {
                if (process.env.NODE_ENV === "development") {
                  console.log(`⚠️  No payment method found for subscription ${subscriptionId}`);
                }
              }
            }
          } catch (pmError) {
            console.error('Warning: Could not set default payment method:', pmError);
            // Don't fail the entire webhook if this step fails
          }
          
          // Update garage with new plan
          await prisma.garage.update({
            where: { id: garageId },
            data: {
              plan: normalizedPlan,
              status: 'ACTIVE',
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
            },
          });

          if (process.env.NODE_ENV === "development") {
            console.log(`✅ Garage ${garageId} upgraded to ${normalizedPlan}`);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const garageId = subscription.metadata?.garageId;

        if (garageId) {
          // Update subscription status
          const status = subscription.status === 'active' ? 'ACTIVE' : 'TRIAL';
          
          await prisma.garage.update({
            where: { id: garageId },
            data: {
              status,
            },
          });

        if (process.env.NODE_ENV === "development") {
          console.log(`✅ Subscription updated for garage ${garageId}: ${status}`);
        }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const garageId = subscription.metadata?.garageId;

        if (garageId) {
          // Downgrade to trial
          await prisma.garage.update({
            where: { id: garageId },
            data: {
              status: 'TRIAL',
              plan: 'TRIAL',
            },
          });

        if (process.env.NODE_ENV === "development") {
          console.log(`✅ Subscription canceled for garage ${garageId}`);
        }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Find garage by Stripe customer ID
        const garage = await prisma.garage.findFirst({
          where: { 
            stripeCustomerId: {
              equals: customerId
            }
          },
        });

        if (garage) {
          await prisma.garage.update({
            where: { id: garage.id },
            data: {
              status: 'TRIAL',
            },
          });

        if (process.env.NODE_ENV === "development") {
          console.log(`⚠️ Payment failed for garage ${garage.id}`);
        }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string | null;

        if (!customerId) {
          break;
        }

        const garage = await prisma.garage.findFirst({
          where: {
            stripeCustomerId: {
              equals: customerId,
            },
          },
          select: { id: true },
        });

        if (!garage) {
          break;
        }

        const stripeInvoiceId = invoice.id;
        const existing = await prisma.garagePayment.findUnique({
          where: { stripeInvoiceId },
          select: { id: true },
        });

        if (existing) {
          break;
        }

        const amountPaid = invoice.amount_paid ?? 0;
        const paidAtUnix = invoice.status_transitions?.paid_at;
        const paidAt = paidAtUnix ? new Date(paidAtUnix * 1000) : new Date();
        const paymentIntentId = (invoice as any).payment_intent ? String((invoice as any).payment_intent) : null;
        const currency = invoice.currency || "gbp";

        await prisma.$transaction([
          prisma.garagePayment.create({
            data: {
              garageId: garage.id,
              amountPence: amountPaid,
              currency,
              stripeInvoiceId,
              stripePaymentIntentId: paymentIntentId,
              paidAt,
            },
          }),
          prisma.garage.update({
            where: { id: garage.id },
            data: { revenuePence: { increment: amountPaid } },
          }),
        ]);

        if (process.env.NODE_ENV === "development") {
          console.log(`✅ Recorded payment for garage ${garage.id}: ${amountPaid}`);
        }
        break;
      }

      default:
        if (process.env.NODE_ENV === "development") {
          console.log(`Unhandled event type: ${event.type}`);
        }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
