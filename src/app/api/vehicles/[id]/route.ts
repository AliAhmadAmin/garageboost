import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireVehicleAccess } from "@/lib/auth-guards";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Vehicle ID required" }, { status: 400 });
  }

  const guard = await requireVehicleAccess(request, id);
  if ("response" in guard) return guard.response;

  await prisma.vehicle.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "Vehicle ID required" }, { status: 400 });
  }

  const guard = await requireVehicleAccess(request, id);
  if ("response" in guard) return guard.response;

  const vehicle = await prisma.vehicle.update({
    where: { id },
    data: {
      vrm: data.vrm,
      make: data.make,
      model: data.model,
      ownerName: data.ownerName,
      ownerPhone: data.ownerPhone ?? null,
      ownerEmail: data.ownerEmail ?? null,
      motExpiry: data.motExpiry ? new Date(data.motExpiry) : undefined,
      taxStatus: data.taxStatus ?? undefined,
      taxExpiry: data.taxExpiry ? new Date(data.taxExpiry) : null,
      lastService: data.lastService ? new Date(data.lastService) : null,
      mileage: data.mileage ?? null,
      batteryInstallDate: data.batteryInstallDate ? new Date(data.batteryInstallDate) : null,
      batteryBrand: data.batteryBrand ?? null,
      batteryVoltage: data.batteryVoltage ?? null,
      batteryCCA: data.batteryCCA ?? null,
      batteryHealth: data.batteryHealth ?? null,
      batteryLastChecked: data.batteryLastChecked ? new Date(data.batteryLastChecked) : null,
      tyreFrontLeftDepth: data.tyreFrontLeftDepth ?? null,
      tyreFrontRightDepth: data.tyreFrontRightDepth ?? null,
      tyreRearLeftDepth: data.tyreRearLeftDepth ?? null,
      tyreRearRightDepth: data.tyreRearRightDepth ?? null,
      tyreSize: data.tyreSize ?? null,
      tyreBrand: data.tyreBrand ?? null,
      tyreLastChecked: data.tyreLastChecked ? new Date(data.tyreLastChecked) : null,
    },
    include: { advisories: true, reminders: true },
  });

  return NextResponse.json(vehicle);
}
