import webpush from "web-push";
import { prisma } from "@/lib/prisma";

const db = prisma as any;

let vapidConfigured = false;

function ensureVapidConfigured() {
  if (vapidConfigured) return true;

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:cs@bizzboost.uk";

  if (!publicKey || !privateKey) {
    return false;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
  return true;
}

export async function sendNewBookingPush(input: {
  garageId: string;
  bookingNumber: string;
  customerName: string;
  serviceName?: string | null;
  bookingDate?: Date | string | null;
  bookingTime?: string | null;
}) {
  if (!ensureVapidConfigured()) {
    return { sent: 0, removed: 0, skipped: true, reason: "VAPID keys not configured" };
  }

  const subscriptions = await db.webPushSubscription.findMany({
    where: { garageId: input.garageId },
    select: {
      id: true,
      endpoint: true,
      p256dh: true,
      auth: true,
    },
  });

  if (subscriptions.length === 0) {
    return { sent: 0, removed: 0, skipped: true, reason: "No subscriptions" };
  }

  const bookingDate = input.bookingDate ? new Date(input.bookingDate) : null;
  const dateText = bookingDate && !Number.isNaN(bookingDate.getTime())
    ? bookingDate.toLocaleDateString("en-GB")
    : "today";

  const bodyParts = [
    `${input.bookingNumber} for ${input.customerName}`,
    input.serviceName ? `• ${input.serviceName}` : "",
    input.bookingTime ? `• ${dateText} ${input.bookingTime}` : "",
  ].filter(Boolean);

  const payload = JSON.stringify({
    title: "New booking received",
    body: bodyParts.join(" "),
    url: "/garage/bookings",
    tag: "garage-new-booking",
    timestamp: Date.now(),
  });

  let sent = 0;
  const staleIds: string[] = [];

  await Promise.all(
    subscriptions.map(async (subscription: any) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          payload
        );
        sent += 1;
      } catch (error: any) {
        const statusCode = error?.statusCode;
        if (statusCode === 404 || statusCode === 410) {
          staleIds.push(subscription.id);
        }
      }
    })
  );

  if (staleIds.length > 0) {
    await db.webPushSubscription.deleteMany({
      where: { id: { in: staleIds } },
    });
  }

  return {
    sent,
    removed: staleIds.length,
    skipped: false,
  };
}
