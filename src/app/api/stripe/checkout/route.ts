import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, isAdminRole } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const userSession = await getSessionFromRequest(req);
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan, garageId } = await req.json();

    if (!plan || !garageId) {
      return NextResponse.json(
        { error: 'Plan and garageId are required' },
        { status: 400 }
      );
    }

    // Get the price ID from environment variables
    const planKey = String(plan).toLowerCase();
    const priceId =
      planKey === "pro" || planKey === "professional"
        ? process.env.STRIPE_PRO_PRICE_ID
        : planKey === "business"
        ? process.env.STRIPE_BUSINESS_PRICE_ID
        : process.env.STRIPE_BASIC_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured' },
        { status: 500 }
      );
    }

    if (!isAdminRole(userSession.role)) {
      // For non-admin users, just verify the garage exists
      // They're already authenticated and accessing from the garage dashboard
      const garage = await prisma.garage.findUnique({
        where: { id: garageId },
        select: { id: true },
      });

      if (!garage) {
        return NextResponse.json({ error: 'Garage not found' }, { status: 404 });
      }
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/garage?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/garage?canceled=true`,
      metadata: {
        garageId,
        plan,
      },
      subscription_data: {
        metadata: {
          garageId,
          plan,
        },
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
