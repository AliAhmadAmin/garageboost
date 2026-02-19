import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = searchParams.get("garageId");

  if (!garageId) {
    return NextResponse.json({ error: "Garage ID required" }, { status: 400 });
  }

  const guard = await requireGarageAccess(request, garageId);
  if ("response" in guard) return guard.response;

  const vehicles = await prisma.vehicle.findMany({
    where: { garageId },
    include: { advisories: true, reminders: true },
  });

  const totalVehicles = vehicles.length;
  const expiringSoon = vehicles.filter((v: typeof vehicles[0]) => {
    const diff = new Date(v.motExpiry).getTime() - new Date().getTime();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  }).length;

  const totalRevenuePotential = vehicles.reduce((acc: number, v: typeof vehicles[0]) => {
    const advisoryTotal = v.advisories.reduce((sum: number, a: typeof v.advisories[0]) => sum + a.estPricePence, 0);
    return acc + advisoryTotal + 5485; // MOT price
  }, 0);

  const remindersSent = await prisma.reminder.count({
    where: {
      vehicle: { garageId },
      status: "SENT",
    },
  });

  const remindersPending = await prisma.reminder.count({
    where: {
      vehicle: { garageId },
      status: "SCHEDULED",
    },
  });

  // Calculate missed revenue (vehicles with advisories but no reminders sent)
  const vehiclesWithoutReminders = vehicles.filter((v) => {
    const advisoryTotal = v.advisories.reduce((sum, a) => sum + a.estPricePence, 0);
    const hasReminders = v.reminders.some((r) => r.status === "SENT");
    return advisoryTotal > 0 && !hasReminders;
  });

  const missedRevenue = vehiclesWithoutReminders.reduce((acc, v) => {
    return acc + v.advisories.reduce((sum, a) => sum + a.estPricePence, 0);
  }, 0);

  const totalJobs = await prisma.job.count({
    where: {
      garageId,
    },
  });

  // Count converted jobs (completed, invoiced, or paid status)
  const convertedJobs = await prisma.job.count({
    where: {
      garageId,
      status: { in: ["COMPLETED", "INVOICED", "PAID"] },
    },
  });

  // Count upcoming tax renewals (next 30 days)
  const upcomingTax = vehicles.filter((v) => {
    if (!v.taxExpiry) return false;
    const diff = new Date(v.taxExpiry).getTime() - new Date().getTime();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  }).length;

  const conversionRate = totalJobs > 0 ? Math.round((convertedJobs / totalJobs) * 1000) / 10 : 0;

  return NextResponse.json({
    totalVehicles,
    expiringSoon,
    totalRevenuePotential,
    remindersSent,
    remindersPending,
    missedRevenue,
    convertedJobs,
    upcomingTax,
    conversionRate,
  });
}
