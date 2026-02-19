import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest, isAdminRole } from "@/lib/session";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session || !isAdminRole(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: { invoice: { include: { job: true } } },
      take: 100,
    });

    // Collect garageIds from related jobs
    const garageIds = Array.from(new Set(payments.map((p) => p.invoice?.job?.garageId).filter(Boolean)));
    const garages = await prisma.garage.findMany({ where: { id: { in: garageIds } } });
    const garageMap = garages.reduce((acc, g) => { acc[g.id] = g.name; return acc; }, {} as Record<string,string>);

    const mapped = payments.map((p) => ({
      id: p.id,
      amount: p.amountPence,
      status: p.method || "",
      date: p.createdAt.toISOString().slice(0,10),
      garage: p.invoice?.job?.garageId ? (garageMap[p.invoice!.job!.garageId] || "Unknown") : "Unknown",
      raw: p,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
