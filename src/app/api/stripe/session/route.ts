import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');
    if (!sessionId) {
      return NextResponse.json({ error: 'session_id required' }, { status: 400 });
    }

    // Retrieve session from Stripe to get metadata and subscription
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    } as any);

    const metadataPlan = session.metadata?.plan as string | undefined;
    const metadataGarageId = session.metadata?.garageId as string | undefined;

    // If metadata present, update garage immediately (best-effort)
    if (metadataGarageId && metadataPlan) {
      // Map common plan ids to our stored values if needed
      const planValue = String(metadataPlan).toLowerCase();

      // Normalize some known values coming from Stripe flows
      let normalized: string = planValue;
      if (planValue === 'pro' || planValue === 'professional') normalized = 'professional';
      if (planValue === 'basic' || planValue === 'starter') normalized = 'starter';
      if (planValue === 'business') normalized = 'business';

      // Also attempt to detect subscription status
      const sub = (session.subscription || (session as any).subscription) as any;
      const customerObj = (session.customer || (session as any).customer) as any;
      const customerId = customerObj?.id || (session.customer as string);
      const subscriptionId = (sub && sub.id) || (session.subscription as string | undefined);
      const status = sub && sub.status === 'active' ? 'ACTIVE' : 'ACTIVE';

      try {
        const updated = await prisma.garage.update({
          where: { id: metadataGarageId },
          data: {
            plan: normalized,
            status,
            stripeCustomerId: customerId || undefined,
            stripeSubscriptionId: subscriptionId,
          },
        });

        return NextResponse.json({ updated: true, garage: updated });
      } catch (err: any) {
        // If update failed, still return session info for diagnostic
        console.error('Failed to update garage from session endpoint', err);
        return NextResponse.json({ updated: false, error: err.message || String(err), session });
      }
    }

    return NextResponse.json({ updated: false, session });
  } catch (error: any) {
    console.error('Failed to confirm stripe session:', error);
    return NextResponse.json({ error: error.message || 'Failed to confirm session' }, { status: 500 });
  }
}
