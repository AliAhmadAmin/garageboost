import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';
import { getAppBaseUrl } from '@/lib/app-url';

export async function POST(req: NextRequest) {
  try {
    // Get session
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find garage for this user
    const garage = await prisma.garage.findFirst({
      where: {
        ownerId: session.sub,
      },
      select: {
        id: true,
        stripeCustomerId: true,
      },
    });
    
    if (!garage) {
      return NextResponse.json({ error: 'Garage not found' }, { status: 404 });
    }

    if (!garage.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No Stripe customer found. Please subscribe to a plan first.' },
        { status: 400 }
      );
    }

    const appBaseUrl = getAppBaseUrl(req);

    // Create billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: garage.stripeCustomerId,
      return_url: `${appBaseUrl}/garage/settings/plan`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    );
  }
}
