import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    // Get session
    const session = await getSessionFromRequest(req);
    if (!session) {
      console.log('[Billing] ❌ No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[Billing] 🔍 Session found, userId: ${session.sub}`);

    // Find garage for this user
    const garage = await prisma.garage.findFirst({
      where: {
        ownerId: session.sub,
      },
      select: {
        id: true,
        name: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
      },
    });
    
    if (!garage) {
      console.log('[Billing] ❌ Garage not found for user');
      return NextResponse.json({ error: 'Garage not found' }, { status: 404 });
    }

    console.log(`[Billing] ✓ Garage found: ${garage.name}`);
    console.log(`[Billing] Stripe Customer: ${garage.stripeCustomerId}`);
    console.log(`[Billing] Stripe Subscription: ${garage.stripeSubscriptionId}`);

    // If no Stripe customer ID, return empty data
    if (!garage.stripeCustomerId) {
      console.log('[Billing] ⚠️  No stripeCustomerId - returning empty billing data');
      return NextResponse.json({
        paymentMethod: null,
        invoices: [],
        upcomingInvoice: null,
      });
    }

// Fetch payment method using multiple strategies
    let paymentMethod = null;
    try {
      let paymentMethodId = null;
      let foundSource = null;

      // Strategy 1: Get from subscription's default_payment_method (most reliable)
      if (garage.stripeSubscriptionId) {
        try {
          const subscription = await stripe.subscriptions.retrieve(garage.stripeSubscriptionId, {
            expand: ['default_payment_method'],
          } as any);
          
          if (process.env.NODE_ENV === "development") {
            console.log(`[Billing] Subscription default_payment_method:`, (subscription as any).default_payment_method?.id || subscription.default_payment_method);
          }
          
          if ((subscription as any).default_payment_method?.id) {
            paymentMethodId = (subscription as any).default_payment_method.id;
            foundSource = 'subscription.default_payment_method (expanded)';
          } else if (subscription.default_payment_method && typeof subscription.default_payment_method === 'string') {
            paymentMethodId = subscription.default_payment_method;
            foundSource = 'subscription.default_payment_method (string)';
          }
        } catch (error) {
          console.error('[Billing] Error fetching subscription payment method:', error);
        }
      }

      // Strategy 2: Get from customer's default payment method
      if (!paymentMethodId) {
        try {
          const customer = await stripe.customers.retrieve(garage.stripeCustomerId, {
            expand: ['invoice_settings.default_payment_method'],
          } as any);
          
          if (process.env.NODE_ENV === "development") {
            console.log(`[Billing] Customer default_payment_method:`, (customer as any).invoice_settings?.default_payment_method?.id);
          }
          
          if ((customer as any).invoice_settings?.default_payment_method?.id) {
            paymentMethodId = (customer as any).invoice_settings.default_payment_method.id;
            foundSource = 'customer.invoice_settings.default_payment_method';
          }
        } catch (error) {
          console.error('[Billing] Error fetching customer payment method:', error);
        }
      }

      // Strategy 3: List all payment methods for this customer
      if (!paymentMethodId) {
        try {
          const paymentMethods = await stripe.paymentMethods.list({
            customer: garage.stripeCustomerId,
            type: 'card',
            limit: 1,
          });
          
          if (process.env.NODE_ENV === "development") {
            console.log(`[Billing] Payment methods found:`, paymentMethods.data.length);
          }
          
          if (paymentMethods.data.length > 0) {
            paymentMethodId = paymentMethods.data[0].id;
            foundSource = 'paymentMethods.list()';
          }
        } catch (error) {
          console.error('[Billing] Error listing payment methods:', error);
        }
      }

      // Retrieve and format the payment method if found
      if (paymentMethodId) {
        try {
          const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
          
          if (pm.card) {
            paymentMethod = {
              brand: pm.card.brand,
              last4: pm.card.last4,
              expMonth: pm.card.exp_month,
              expYear: pm.card.exp_year,
              cardholderName: pm.billing_details?.name || null,
            };
            
            if (process.env.NODE_ENV === "development") {
              console.log(`[Billing] ✅ Payment method found (from ${foundSource}):`, paymentMethod);
            }
          }
        } catch (error) {
          console.error('[Billing] Error retrieving payment method details:', error);
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log(`[Billing] ⚠️  No payment method ID found using any strategy`);
        }
      }
    } catch (error) {
      console.error('[Billing] Unexpected error fetching payment method:', error);
    }

    // Fetch invoices (all of them, not just recent)
    let invoices: any[] = [];
    try {
      const invoiceList = await stripe.invoices.list({
        customer: garage.stripeCustomerId,
        limit: 100, // Fetch up to 100 invoices to show complete history
      });

      if (process.env.NODE_ENV === "development") {
        console.log(`[Billing] Invoices found:`, invoiceList.data.length);
      }

      invoices = invoiceList.data.map((invoice) => ({
        id: invoice.id,
        number: invoice.number,
        amountDue: invoice.amount_due,
        amountPaid: invoice.amount_paid,
        currency: invoice.currency,
        status: invoice.status,
        created: invoice.created,
        hostedInvoiceUrl: invoice.hosted_invoice_url,
        invoicePdf: invoice.invoice_pdf,
        description: invoice.lines.data[0]?.description || 'Subscription payment',
      }));
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }

    // Fetch upcoming invoice (skip for now due to API complexity)
    let upcomingInvoice = null;
    // Can be implemented later with proper subscription billing cycle tracking

    console.log(`[Billing] 📊 Final response: paymentMethod=${!!paymentMethod}, invoices=${invoices.length}`);
    if (paymentMethod) {
      console.log(`[Billing]   Card: ${paymentMethod.brand} ****${paymentMethod.last4}, holder=${paymentMethod.cardholderName}`);
    }

    return NextResponse.json({
      paymentMethod,
      invoices,
      upcomingInvoice,
    });
  } catch (error) {
    console.error('Error fetching billing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch billing data' },
      { status: 500 }
    );
  }
}
