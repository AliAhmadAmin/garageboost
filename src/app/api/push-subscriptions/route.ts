import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

const db = prisma as any;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const garageId = String(body.garageId || "").trim();
    const subscription = body.subscription;

    if (!garageId) {
      return NextResponse.json({ error: "garageId is required" }, { status: 400 });
    }

    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return NextResponse.json({ error: "Invalid subscription payload" }, { status: 400 });
    }

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;

    await db.webPushSubscription.upsert({
      where: { endpoint: String(subscription.endpoint) },
      update: {
        p256dh: String(subscription.keys.p256dh),
        auth: String(subscription.keys.auth),
        userId: guard.session.sub,
        garageId,
        userAgent: request.headers.get("user-agent") || null,
      },
      create: {
        endpoint: String(subscription.endpoint),
        p256dh: String(subscription.keys.p256dh),
        auth: String(subscription.keys.auth),
        userId: guard.session.sub,
        garageId,
        userAgent: request.headers.get("user-agent") || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Push Subscriptions] POST failed", error);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const garageId = String(body.garageId || "").trim();
    const endpoint = String(body.endpoint || "").trim();

    if (!garageId) {
      return NextResponse.json({ error: "garageId is required" }, { status: 400 });
    }

    if (!endpoint) {
      return NextResponse.json({ error: "endpoint is required" }, { status: 400 });
    }

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;

    await db.webPushSubscription.deleteMany({
      where: {
        garageId,
        userId: guard.session.sub,
        endpoint,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Push Subscriptions] DELETE failed", error);
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 });
  }
}
