import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, isAdminRole } from '@/lib/session';
import { getAppBaseUrl } from '@/lib/app-url';

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

    console.log('Checkout Debug:', {
      plan,
      planKey,
      priceId,
      stripySecretKeyExists: !!process.env.STRIPE_SECRET_KEY,
    });

    if (!priceId) {
      console.error('Price ID missing for plan:', planKey);
      return NextResponse.json(
        { error: 'Stripe price ID not configured for plan: ' + planKey },
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

    const appBaseUrl = getAppBaseUrl(req);

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
      success_url: `${appBaseUrl}/garage?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appBaseUrl}/garage?canceled=true`,
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
    console.error('Stripe checkout error details:', {
      message: error.message,
      code: error.code,
      type: error.type,
      param: error.param,
      statusCode: error.statusCode,
      fullError: JSON.stringify(error, null, 2),
    });
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create checkout session',
        details: process.env.NODE_ENV === 'production' ? undefined : error,
      },
      { status: 500 }
    );
  }
}
