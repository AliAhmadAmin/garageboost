import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";
import { canAddVehicle, getPlanLimits } from "@/lib/plans";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = searchParams.get("garageId");

  const guard = await requireGarageAccess(request, garageId);
  if ("response" in guard) return guard.response;

  const vehicles = await prisma.vehicle.findMany({
    where: garageId ? { garageId } : undefined,
    include: { advisories: true, reminders: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vehicles);
}

export async function POST(request: Request) {
  const body = await request.json();

  const guard = await requireGarageAccess(request, body.garageId);
  if ("response" in guard) return guard.response;

  try {
    // Get garage and check plan limits
    const garage = await prisma.garage.findUnique({
      where: { id: body.garageId },
      include: { 
        vehicles: { select: { id: true } } 
      },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Check if vehicle already exists by VRM + garageId
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        vrm: body.vrm,
        garageId: body.garageId,
      },
      include: { advisories: true },
    });

    if (existingVehicle) {
      // Update existing vehicle
      // Delete old advisories
      if (existingVehicle.advisories.length > 0) {
        await prisma.advisory.deleteMany({
          where: {
            vehicleId: existingVehicle.id,
          },
        });
      }

      // Update vehicle and create new advisories
      const updatedVehicle = await prisma.vehicle.update({
        where: { id: existingVehicle.id },
        data: {
          make: body.make,
          typeApproval: body.typeApproval ?? existingVehicle.typeApproval ?? undefined,
          model: body.model,
          motExpiry: new Date(body.motExpiry),
          taxStatus: body.taxStatus ?? existingVehicle.taxStatus,
          taxExpiry: body.taxExpiry ? new Date(body.taxExpiry) : existingVehicle.taxExpiry,
          ownerName: body.ownerName || existingVehicle.ownerName,
          ownerPhone: body.ownerPhone ?? existingVehicle.ownerPhone,
          ownerEmail: body.ownerEmail ?? existingVehicle.ownerEmail,
          lastService: body.lastService ? new Date(body.lastService) : undefined,
          mileage: body.mileage ?? null,
          batteryInstallDate: body.batteryInstallDate ? new Date(body.batteryInstallDate) : undefined,
          batteryBrand: body.batteryBrand ?? undefined,
          batteryVoltage: body.batteryVoltage ?? undefined,
          batteryCCA: body.batteryCCA ?? undefined,
          batteryHealth: body.batteryHealth ?? undefined,
          batteryLastChecked: body.batteryLastChecked ? new Date(body.batteryLastChecked) : undefined,
          tyreFrontLeftDepth: body.tyreFrontLeftDepth ?? undefined,
          tyreFrontRightDepth: body.tyreFrontRightDepth ?? undefined,
          tyreRearLeftDepth: body.tyreRearLeftDepth ?? undefined,
          tyreRearRightDepth: body.tyreRearRightDepth ?? undefined,
          tyreSize: body.tyreSize ?? undefined,
          tyreBrand: body.tyreBrand ?? undefined,
          tyreLastChecked: body.tyreLastChecked ? new Date(body.tyreLastChecked) : undefined,
          advisories: body.advisories?.length
            ? {
                create: body.advisories.map((a: { text: string; category: string; estPricePence: number }) => ({
                  text: a.text,
                  category: a.category,
                  estPricePence: a.estPricePence,
                })),
              }
            : undefined,
        },
        include: { advisories: true, reminders: true },
      });

      return NextResponse.json(updatedVehicle, { status: 200 });
    }

    // Check plan limits before creating new vehicle
    const currentVehicleCount = garage.vehicles.length;
    if (!canAddVehicle(currentVehicleCount, garage.plan)) {
      const planLimits = getPlanLimits(garage.plan);
      return NextResponse.json({ 
        error: "Vehicle limit reached", 
        details: `Your ${planLimits.name} plan allows up to ${planLimits.maxVehicles} vehicles. Please upgrade to add more.`,
        limitReached: true,
        currentPlan: garage.plan,
        maxVehicles: planLimits.maxVehicles,
      }, { status: 403 });
    }

    // Create new vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        vrm: body.vrm,
        make: body.make,
        typeApproval: body.typeApproval ?? null,
        model: body.model,
        motExpiry: new Date(body.motExpiry),
        taxStatus: body.taxStatus ?? null,
        taxExpiry: body.taxExpiry ? new Date(body.taxExpiry) : null,
        ownerName: body.ownerName,
        ownerPhone: body.ownerPhone ?? null,
        ownerEmail: body.ownerEmail ?? null,
        lastService: body.lastService ? new Date(body.lastService) : undefined,
        mileage: body.mileage ?? null,
        batteryInstallDate: body.batteryInstallDate ? new Date(body.batteryInstallDate) : null,
        batteryBrand: body.batteryBrand ?? null,
        batteryVoltage: body.batteryVoltage ?? null,
        batteryCCA: body.batteryCCA ?? null,
        batteryHealth: body.batteryHealth ?? null,
        batteryLastChecked: body.batteryLastChecked ? new Date(body.batteryLastChecked) : null,
        tyreFrontLeftDepth: body.tyreFrontLeftDepth ?? null,
        tyreFrontRightDepth: body.tyreFrontRightDepth ?? null,
        tyreRearLeftDepth: body.tyreRearLeftDepth ?? null,
        tyreRearRightDepth: body.tyreRearRightDepth ?? null,
        tyreSize: body.tyreSize ?? null,
        tyreBrand: body.tyreBrand ?? null,
        tyreLastChecked: body.tyreLastChecked ? new Date(body.tyreLastChecked) : null,
        garageId: body.garageId,
        advisories: body.advisories?.length
          ? {
              create: body.advisories.map((a: { text: string; category: string; estPricePence: number }) => ({
                text: a.text,
                category: a.category,
                estPricePence: a.estPricePence,
              })),
            }
          : undefined,
      },
      include: { advisories: true, reminders: true },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Vehicle POST error:", error);
    return NextResponse.json({ error: "Failed to save vehicle" }, { status: 500 });
  }
}
