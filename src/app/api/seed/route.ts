import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest, isAdminRole } from "@/lib/session";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Seed disabled" }, { status: 403 });
  }

  const session = await getSessionFromRequest(request);
  if (!session || !isAdminRole(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const existingGarages = await prisma.garage.count();
  if (existingGarages > 0) {
    return NextResponse.json({ ok: true, seeded: false });
  }

  const owner = await prisma.user.create({
    data: {
      name: "Alex Reed",
      email: "alex@garageboost.local",
      role: "PLATFORM_ADMIN",
    },
  });

  const centralGarage = await prisma.garage.create({
    data: {
      name: "Central Garage London",
      ownerName: "Alex Reed",
      plan: "PRO",
      status: "ACTIVE",
      revenuePence: 1240000,
      ownerId: owner.id,
      vehicles: {
        create: [
          {
            vrm: "GY19 LMO",
            make: "BMW",
            model: "3 Series",
            motExpiry: new Date("2024-05-12"),
            ownerName: "John Smith",
            lastService: new Date("2023-11-01"),
            mileage: 42350,
            advisories: {
              create: [
                {
                  text: "Front brake pads wearing thin",
                  category: "Brakes",
                  estPricePence: 12000,
                },
                {
                  text: "Offside Front Suspension arm has slight play",
                  category: "Suspension",
                  estPricePence: 21000,
                },
              ],
            },
            reminders: {
              create: [
                {
                  channel: "SMS",
                  status: "SENT",
                  sentAt: new Date(),
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.garage.createMany({
    data: [
      {
        name: "QuickFix MOT Bristol",
        ownerName: "Sarah May",
        plan: "TRIAL",
        status: "TRIAL",
        revenuePence: 85000,
      },
      {
        name: "Elite Motors Manchester",
        ownerName: "Tom H.",
        plan: "BASIC",
        status: "OVERDUE",
        revenuePence: 420000,
      },
    ],
  });

  return NextResponse.json({ ok: true, seeded: true, garageId: centralGarage.id });
}
