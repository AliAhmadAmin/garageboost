import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

const db = prisma as any;

function normalizeDays(values: unknown, fallback: number[]) {
  if (!Array.isArray(values)) return fallback;
  const parsed = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0 && value <= 365)
    .map((value) => Math.floor(value));
  const unique = Array.from(new Set(parsed)).sort((a, b) => a - b);
  return unique.length > 0 ? unique : fallback;
}

function normalizeMonths(values: unknown, fallback: number[]) {
  if (!Array.isArray(values)) return fallback;
  const parsed = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0 && value <= 60)
    .map((value) => Math.floor(value));
  const unique = Array.from(new Set(parsed)).sort((a, b) => a - b);
  return unique.length > 0 ? unique : fallback;
}

function parseCsv(csv: string) {
  return csv
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value) && value > 0);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = String(searchParams.get("garageId") || "").trim();

  if (!garageId) {
    return NextResponse.json({ error: "garageId is required" }, { status: 400 });
  }

  const guard = await requireGarageAdminAccess(request, garageId);
  if ("response" in guard) {
    return guard.response;
  }

  const config = await db.reminderConfig.upsert({
    where: { garageId },
    update: {},
    create: { garageId },
  });

  return NextResponse.json({
    garageId,
    motEnabled: config.motEnabled,
    taxEnabled: config.taxEnabled,
    serviceEnabled: config.serviceEnabled,
    emailNotifications: config.emailNotifications,
    weeklyReports: config.weeklyReports,
    reminderSent: config.reminderSent,
    jobUpdates: config.jobUpdates,
    bookingRequests: config.bookingRequests,
    mot: parseCsv(config.motDaysCsv),
    tax: parseCsv(config.taxDaysCsv),
    service: parseCsv(config.serviceMonthsCsv),
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const garageId = String(body.garageId || "").trim();

  if (!garageId) {
    return NextResponse.json({ error: "garageId is required" }, { status: 400 });
  }

  const guard = await requireGarageAdminAccess(request, garageId);
  if ("response" in guard) {
    return guard.response;
  }

  const motDays = normalizeDays(body.mot, [30, 14, 7]);
  const taxDays = normalizeDays(body.tax, [30, 14, 7]);
  const serviceMonths = normalizeMonths(body.service, []);

  const config = await db.reminderConfig.upsert({
    where: { garageId },
    update: {
      motDaysCsv: motDays.join(","),
      taxDaysCsv: taxDays.join(","),
      serviceMonthsCsv: serviceMonths.join(","),
      motEnabled: body.motEnabled !== false,
      taxEnabled: body.taxEnabled !== false,
      serviceEnabled: body.serviceEnabled === true,
      emailNotifications: body.emailNotifications !== false,
      weeklyReports: body.weeklyReports !== false,
      reminderSent: body.reminderSent !== false,
      jobUpdates: body.jobUpdates !== false,
      bookingRequests: body.bookingRequests !== false,
    },
    create: {
      garageId,
      motDaysCsv: motDays.join(","),
      taxDaysCsv: taxDays.join(","),
      serviceMonthsCsv: serviceMonths.join(","),
      motEnabled: body.motEnabled !== false,
      taxEnabled: body.taxEnabled !== false,
      serviceEnabled: body.serviceEnabled === true,
      emailNotifications: body.emailNotifications !== false,
      weeklyReports: body.weeklyReports !== false,
      reminderSent: body.reminderSent !== false,
      jobUpdates: body.jobUpdates !== false,
      bookingRequests: body.bookingRequests !== false,
    },
  });

  return NextResponse.json({
    success: true,
    garageId,
    motEnabled: config.motEnabled,
    taxEnabled: config.taxEnabled,
    serviceEnabled: config.serviceEnabled,
    emailNotifications: config.emailNotifications,
    weeklyReports: config.weeklyReports,
    reminderSent: config.reminderSent,
    jobUpdates: config.jobUpdates,
    bookingRequests: config.bookingRequests,
    mot: parseCsv(config.motDaysCsv),
    tax: parseCsv(config.taxDaysCsv),
    service: parseCsv(config.serviceMonthsCsv),
  });
}
