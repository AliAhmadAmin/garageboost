import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const guard = await requireGarageAccess(request, id);
    if ("response" in guard) return guard.response;

    // Verify garage exists
    const garage = await prisma.garage.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Get customers with vehicle count
    const customers = await (prisma as any).customer.findMany({
      where: {
        garageId: id,
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
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
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: garageId } = await params;
    const body = await request.json();
    const { name, email, phone, vehicleData } = body;

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;

    console.log("[CRM API] Creating customer:", { name, email, garageId });

    // Validate required fields
    if (!name || !email) {
      console.log("[CRM API] Validation failed: missing name or email");
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Verify garage exists
    console.log("[CRM API] Looking up garage:", garageId);
    const garage = await prisma.garage.findUnique({
      where: { id: garageId },
      select: { id: true },
    });

    if (!garage) {
      console.log("[CRM API] Garage not found");
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Check if customer already exists
    console.log("[CRM API] Looking for existing customer...");
    let customer = await (prisma as any).customer.findFirst({
      where: {
        garageId,
        email: normalizedEmail,
      },
    });

    // Create customer if doesn't exist
    if (!customer) {
      console.log("[CRM API] Creating new customer...");
      customer = await (prisma as any).customer.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          phone: phone ? phone.trim() : null,
          garageId,
        },
      });
      console.log("[CRM API] Customer created:", customer.id);
    } else {
      console.log("[CRM API] Using existing customer:", customer.id);
    }

    // Save vehicle if provided
    if (vehicleData) {
      const { vrm, make, model, motExpiry, mileage, taxStatus, taxExpiry } = vehicleData;
      console.log("[CRM API] Processing vehicle:", { vrm, make, model });

      const motExpiryRaw = motExpiry ? new Date(motExpiry) : null;
      const motExpiryValue = motExpiryRaw && !Number.isNaN(motExpiryRaw.getTime()) ? motExpiryRaw : new Date();
      const taxExpiryRaw = taxExpiry ? new Date(taxExpiry) : null;
      const taxExpiryValue = taxExpiryRaw && !Number.isNaN(taxExpiryRaw.getTime()) ? taxExpiryRaw : null;
      const mileageValue = Number.isFinite(Number(mileage)) ? Number(mileage) : 0;

      // Check if vehicle already exists
      const existingVehicle = await prisma.vehicle.findFirst({
        where: {
          garageId,
          vrm: vrm.toUpperCase(),
        },
      });

      if (!existingVehicle) {
        console.log("[CRM API] Creating new vehicle...");
        try {
          await (prisma as any).vehicle.create({
            data: {
              vrm: vrm.toUpperCase(),
              make: make.trim(),
              model: model.trim(),
              motExpiry: motExpiryValue,
              taxStatus: taxStatus || null,
              taxExpiry: taxExpiryValue,
              mileage: mileageValue,
              ownerName: name.trim(),
              ownerEmail: normalizedEmail,
              ownerPhone: phone ? phone.trim() : null,
              garageId,
              customerId: customer.id,
            },
          });
          console.log("[CRM API] Vehicle created successfully");
        } catch (vehicleError) {
          console.error("[CRM API] Error creating vehicle:", vehicleError);
          // Continue even if vehicle creation fails
        }
      } else if (!existingVehicle.customerId) {
        console.log("[CRM API] Linking existing vehicle to customer...");
        try {
          await (prisma as any).vehicle.update({
            where: { id: existingVehicle.id },
            data: { customerId: customer.id },
          });
          console.log("[CRM API] Vehicle linked successfully");
        } catch (vehicleUpdateError) {
          console.error("[CRM API] Error linking vehicle:", vehicleUpdateError);
          // Continue even if linking fails
        }
      } else {
        console.log("[CRM API] Vehicle already linked to a customer");
      }
    }

    // Fetch updated customer with vehicles
    const updatedCustomer = await (prisma as any).customer.findUnique({
      where: { id: customer.id },
      include: {
        vehicles: {
          select: {
            id: true,
            vrm: true,
            make: true,
            model: true,
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
    });

    console.log("[CRM API] Returning customer:", updatedCustomer?.id);
    return NextResponse.json(updatedCustomer, { status: 201 });
  } catch (error) {
    console.error("[CRM API] Error creating customer:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to create customer: ${errorMessage}` },
      { status: 500 }
    );
  }
}
