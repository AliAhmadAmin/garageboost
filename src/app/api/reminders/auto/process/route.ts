import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const db = prisma as any;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function parseCsv(csv: string, fallback: number[]) {
  const values = csv
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value) && value > 0);
  const unique = Array.from(new Set(values)).sort((a, b) => a - b);
  return unique.length > 0 ? unique : fallback;
}

function daysUntil(date: Date) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.round((target - start) / (1000 * 60 * 60 * 24));
}

function ukDate(value: Date) {
  return value.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function POST(request: Request) {
  const cronSecret = process.env.AUTO_REMINDER_CRON_SECRET;
  if (cronSecret) {
    const headerSecret = request.headers.get("x-cron-secret");
    if (headerSecret !== cronSecret && process.env.NODE_ENV !== "development") {
      return unauthorized();
    }
  }

  const garages: Array<any> = await db.garage.findMany({
    select: {
      id: true,
      name: true,
      reminderConfig: {
        select: {
          motEnabled: true,
          taxEnabled: true,
          motDaysCsv: true,
          taxDaysCsv: true,
        },
      },
    },
  });

  const runKey = todayKey();
  let scannedVehicles = 0;
  let queued = 0;
  let skippedNoEmail = 0;
  let skippedDuplicate = 0;

  for (const garage of garages) {
    const motEnabled = garage.reminderConfig?.motEnabled ?? true;
    const taxEnabled = garage.reminderConfig?.taxEnabled ?? true;
    const motDays = parseCsv(garage.reminderConfig?.motDaysCsv ?? "30,14,7", [30, 14, 7]);
    const taxDays = parseCsv(garage.reminderConfig?.taxDaysCsv ?? "30,14,7", [30, 14, 7]);

    if (!motEnabled && !taxEnabled) {
      continue;
    }

    const maxDays = Math.max(0, ...motDays, ...taxDays) + 1;
    const now = new Date();
    const upperBound = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);

    const orFilters: Array<{ motExpiry?: { lte: Date }; taxExpiry?: { lte: Date } }> = [];
    if (motEnabled) {
      orFilters.push({ motExpiry: { lte: upperBound } });
    }
    if (taxEnabled) {
      orFilters.push({ taxExpiry: { lte: upperBound } });
    }

    const vehicles = await db.vehicle.findMany({
      where: {
        garageId: garage.id,
        OR: orFilters,
      },
      select: {
        id: true,
        ownerName: true,
        ownerEmail: true,
        vrm: true,
        make: true,
        model: true,
        motExpiry: true,
        taxExpiry: true,
      },
    });

    scannedVehicles += vehicles.length;

    for (const vehicle of vehicles) {
      if (!vehicle.ownerEmail) {
        skippedNoEmail += 1;
        continue;
      }

      const ownerName = vehicle.ownerName || "Customer";
      const vehicleLabel = `${vehicle.make || ""} ${vehicle.model || ""}`.trim() || "vehicle";

      if (motEnabled && vehicle.motExpiry) {
        const remaining = daysUntil(vehicle.motExpiry);
        if (motDays.includes(remaining)) {
          const statusKey = `AUTO_MOT_${remaining}_${runKey}`;
          const exists = await db.reminder.findFirst({
            where: {
              vehicleId: vehicle.id,
              channel: "EMAIL",
              status: statusKey,
            },
            select: { id: true },
          });

          if (!exists) {
            await db.$transaction([
              db.reminder.create({
                data: {
                  vehicleId: vehicle.id,
                  channel: "EMAIL",
                  status: statusKey,
                  scheduledFor: new Date(),
                },
              }),
              db.emailQueueJob.create({
                data: {
                  garageId: garage.id,
                  recipientEmail: vehicle.ownerEmail,
                  recipientName: ownerName,
                  subject: `MOT reminder: ${vehicle.vrm} expires in ${remaining} day${remaining === 1 ? "" : "s"}`,
                  message: `Hi ${ownerName},\n\nThis is your automatic reminder that MOT for your ${vehicleLabel} (${vehicle.vrm}) expires on ${ukDate(vehicle.motExpiry)}.\n\nPlease contact ${garage.name} to book your MOT in time.\n\nThanks,\n${garage.name}`,
                  status: "PENDING",
                  scheduledFor: new Date(),
                },
              }),
            ]);
            queued += 1;
          } else {
            skippedDuplicate += 1;
          }
        }
      }

      if (taxEnabled && vehicle.taxExpiry) {
        const remaining = daysUntil(vehicle.taxExpiry);
        if (taxDays.includes(remaining)) {
          const statusKey = `AUTO_TAX_${remaining}_${runKey}`;
          const exists = await db.reminder.findFirst({
            where: {
              vehicleId: vehicle.id,
              channel: "EMAIL",
              status: statusKey,
            },
            select: { id: true },
          });

          if (!exists) {
            await db.$transaction([
              db.reminder.create({
                data: {
                  vehicleId: vehicle.id,
                  channel: "EMAIL",
                  status: statusKey,
                  scheduledFor: new Date(),
                },
              }),
              db.emailQueueJob.create({
                data: {
                  garageId: garage.id,
                  recipientEmail: vehicle.ownerEmail,
                  recipientName: ownerName,
                  subject: `Road tax reminder: ${vehicle.vrm} expires in ${remaining} day${remaining === 1 ? "" : "s"}`,
                  message: `Hi ${ownerName},\n\nThis is your automatic reminder that road tax for your ${vehicleLabel} (${vehicle.vrm}) expires on ${ukDate(vehicle.taxExpiry)}.\n\nPlease renew in time and contact ${garage.name} if you need help.\n\nThanks,\n${garage.name}`,
                  status: "PENDING",
                  scheduledFor: new Date(),
                },
              }),
            ]);
            queued += 1;
          } else {
            skippedDuplicate += 1;
          }
        }
      }
    }
  }

  return NextResponse.json({
    success: true,
    garages: garages.length,
    scannedVehicles,
    queued,
    skippedNoEmail,
    skippedDuplicate,
  });
}

export async function GET(request: Request) {
  return POST(request);
}
