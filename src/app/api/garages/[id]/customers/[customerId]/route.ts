import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; customerId: string }> }
) {
  try {
    const { id: garageId, customerId } = await params;
    const body = await request.json();
    const { name, email, phone } = body;
    const nameValue = name?.trim() || undefined;
    const emailValue = email?.toLowerCase().trim() || undefined;
    const phoneValue = phone?.trim() || null;

    console.log("[CRM API] Updating customer:", { customerId, name, email });

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;

    const existingCustomer = await (prisma as any).customer.findFirst({
      where: { id: customerId, garageId },
      select: { id: true },
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const vehicleOwnerData: Record<string, string | null> = {
      ownerPhone: phoneValue,
    };
    if (nameValue) {
      vehicleOwnerData.ownerName = nameValue;
    }
    if (emailValue) {
      vehicleOwnerData.ownerEmail = emailValue;
    }

    const [, , updated] = await prisma.$transaction([
      (prisma as any).customer.update({
        where: { id: customerId },
        data: {
          name: nameValue,
          email: emailValue,
          phone: phoneValue,
        },
      }),
      prisma.vehicle.updateMany({
        where: { customerId },
        data: vehicleOwnerData,
      }),
      (prisma as any).customer.findUnique({
        where: { id: customerId },
        include: {
          vehicles: {
            select: {
              id: true,
              vrm: true,
              make: true,
              model: true,
              customerId: true,
              motExpiry: true,
              taxExpiry: true,
              taxStatus: true,
              batteryInstallDate: true,
              batteryBrand: true,
              batteryVoltage: true,
              batteryCCA: true,
              batteryHealth: true,
              batteryLastChecked: true,
              tyreFrontLeftDepth: true,
              tyreFrontRightDepth: true,
              tyreRearLeftDepth: true,
              tyreRearRightDepth: true,
              tyreSize: true,
              tyreBrand: true,
              tyreLastChecked: true,
              mileage: true,
              ownerName: true,
              ownerPhone: true,
              ownerEmail: true,
              createdAt: true,
            },
          },
        },
      }),
    ]);

    console.log("[CRM API] Customer updated:", updated.id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[CRM API] Error updating customer:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to update customer: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; customerId: string }> }
) {
  try {
    const { id: garageId, customerId } = await params;

    console.log("[CRM API] Deleting customer:", { customerId });

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;

    const existingCustomer = await (prisma as any).customer.findFirst({
      where: { id: customerId, garageId },
      select: { id: true },
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { customerId, garageId },
      select: { id: true },
    });

    const vehicleIds = vehicles.map((vehicle) => vehicle.id);

    await prisma.$transaction([
      prisma.advisory.deleteMany({
        where: { vehicleId: { in: vehicleIds } },
      }),
      prisma.reminder.deleteMany({
        where: { vehicleId: { in: vehicleIds } },
      }),
      prisma.vehicle.deleteMany({
        where: { id: { in: vehicleIds } },
      }),
      (prisma as any).customer.delete({
        where: { id: customerId },
      }),
    ]);

    console.log("[CRM API] Customer deleted:", customerId);
    return NextResponse.json({ success: true, customerId, deletedVehicleCount: vehicleIds.length });
  } catch (error) {
    console.error("[CRM API] Error deleting customer:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to delete customer: ${errorMessage}` },
      { status: 500 }
    );
  }
}
