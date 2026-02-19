import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

const db = prisma as any;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = String(searchParams.get("garageId") || "").trim();

  if (!garageId) {
    return NextResponse.json({ error: "garageId is required" }, { status: 400 });
  }

  const guard = await requireGarageAccess(request, garageId);
  if ("response" in guard) {
    return guard.response;
  }

  const [pending, processing, retry, sent, failed] = await Promise.all([
    db.emailQueueJob.count({ where: { garageId, status: "PENDING" } }),
    db.emailQueueJob.count({ where: { garageId, status: "PROCESSING" } }),
    db.emailQueueJob.count({ where: { garageId, status: "RETRY" } }),
    db.emailQueueJob.count({ where: { garageId, status: "SENT" } }),
    db.emailQueueJob.count({ where: { garageId, status: "FAILED" } }),
  ]);

  return NextResponse.json({
    queueStatus: {
      pending,
      processing,
      retry,
      sent,
      failed,
      totalActive: pending + processing + retry,
    },
  });
}
