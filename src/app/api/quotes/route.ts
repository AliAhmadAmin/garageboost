import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess, requireVehicleAccess } from "@/lib/auth-guards";
import { getApiKey } from "@/app/api/admin/config/route";

// GET all quotes for a garage
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = searchParams.get("garageId");
  const status = searchParams.get("status");
  const vehicleId = searchParams.get("vehicleId");

  if (garageId) {
    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;
  } else if (vehicleId) {
    const guard = await requireVehicleAccess(request, vehicleId);
    if ("response" in guard) return guard.response;
  } else {
    return NextResponse.json({ error: "garageId or vehicleId is required" }, { status: 400 });
  }

  const where: any = {};
  if (garageId) where.garageId = garageId;
  if (status) where.status = status;
  if (vehicleId) where.vehicleId = vehicleId;

  const quotes = await prisma.quote.findMany({
    where,
    include: {
      vehicle: true,
      job: true,
      invoice: true,
      items: true,
      activities: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(quotes);
}

// POST create new quote
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Quote POST received:", { vehicleVrm: body.vehicleVrm, garageId: body.garageId, itemCount: body.items?.length || 0 });

    const guard = await requireGarageAccess(request, body.garageId);
    if ("response" in guard) return guard.response;

    // Validate required fields
    if (!body.vehicleVrm || !body.garageId) {
      return NextResponse.json(
        { error: "Missing required fields", details: "vehicleVrm and garageId are required" },
        { status: 400 }
      );
    }

    // Generate quote number
    const today = new Date();
    const year = today.getFullYear();
    const count = await prisma.quote.count({
      where: {
        quoteNumber: {
          startsWith: `QT-${year}-`,
        },
      },
    });
    const quoteNumber = `QT-${year}-${String(count + 1).padStart(4, "0")}`;
    console.log("Generated quote number:", quoteNumber);

    const garage = await prisma.garage.findUnique({
      where: { id: body.garageId },
      select: { vatEnabled: true },
    });

    // Calculate totals
    const items = Array.isArray(body.items) ? body.items : [];
    const subtotalPence = items.reduce(
      (sum: number, item: any) => sum + (item.totalPence || 0),
      0
    );
    const vatRate = garage?.vatEnabled === false ? 0 : (body.vatRate ?? 20);
    const vatPence = Math.round(subtotalPence * (vatRate / 100));
    const totalPence = subtotalPence + vatPence;
    console.log("Totals:", { subtotalPence, vatRate, vatPence, totalPence });

    // Set expiry date (default 30 days from now, configurable)
    const validDaysRaw = await getApiKey("QUOTE_VALID_DAYS");
    const validDays = validDaysRaw ? Number.parseInt(validDaysRaw, 10) : 30;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (Number.isNaN(validDays) ? 30 : validDays));

    // Find or create vehicle
    let vehicle = await prisma.vehicle.findFirst({
      where: {
        vrm: body.vehicleVrm,
        garageId: body.garageId,
      },
    });
    console.log("Vehicle found/created:", vehicle?.id);

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          vrm: body.vehicleVrm,
          make: body.vehicleMake || "Unknown",
          model: body.vehicleModel || "Unknown",
          motExpiry: new Date(body.motExpiry),
          ownerName: body.customerName,
          ownerEmail: body.customerEmail,
          ownerPhone: body.customerPhone,
          mileage: body.mileage || 0,
          garageId: body.garageId,
        },
      });
      console.log("Vehicle  created:", vehicle.id);
    }

    // Create quote with items
    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        status: "DRAFT",
        issuedDate: new Date(),
        expiryDate,
        subtotalPence,
        vatRate,
        vatPence,
        totalPence,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone || null,
        notes: body.notes,
        vehicleId: vehicle.id,
        garageId: body.garageId,
        jobId: body.jobId || null,
        items: {
          create: items.map((item: any) => ({
            type: item.type || "SERVICE",
            name: item.name || "Item",
            description: item.description,
            quantity: item.quantity || 1,
            unitPricePence: item.unitPricePence || 0,
            totalPence: item.totalPence || 0,
          })),
        },
        activities: {
          create: {
            action: "CREATED",
            details: "Quote created from advisory lookup",
          },
        },
      },
      include: {
        vehicle: true,
        job: true,
        invoice: true,
        items: true,
        activities: true,
      },
    });

    console.log("Quote created successfully:", quote.quoteNumber);
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("Quote POST error:", errorMessage);
    console.error("Error stack:", errorStack);
    return NextResponse.json(
      { error: "Failed to create quote", details: errorMessage },
      { status: 500 }
    );
  }
}
