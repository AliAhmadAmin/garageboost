import { NextResponse } from "next/server";
import { processEmailQueue } from "@/lib/email-queue-processor";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const cronSecret = process.env.EMAIL_QUEUE_CRON_SECRET;
  if (cronSecret) {
    const headerSecret = request.headers.get("x-cron-secret");
    if (headerSecret !== cronSecret) {
      return unauthorized();
    }
  }

  const { searchParams } = new URL(request.url);
  const requestedLimit = Number(searchParams.get("limit") || 25);
  const limit = Number.isFinite(requestedLimit)
    ? Math.max(1, Math.min(100, requestedLimit))
    : 25;

  const result = await processEmailQueue(limit);
  return NextResponse.json({ success: true, ...result });
}

export async function GET(request: Request) {
  return POST(request);
}
