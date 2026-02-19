import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

// GET /api/garages/[id]/services - List all services for a garage
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    // Optional: filter by active status
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("activeOnly") === "true";

    const services = await prisma.service.findMany({
      where: {
        garageId: id,
        ...(activeOnly && { isActive: true }),
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/garages/[id]/services - Create a new service
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const {
      name,
      description,
      category,
      durationMinutes,
      pricePence,
      depositRequired,
      depositPence,
      isActive,
      sortOrder,
    } = body;

    // Validation
    if (!name || !category || !pricePence) {
      return NextResponse.json(
        { error: "Name, category, and price are required" },
        { status: 400 }
      );
    }

    if (depositRequired && (!depositPence || depositPence <= 0)) {
      return NextResponse.json(
        { error: "Deposit amount is required when deposit is enabled" },
        { status: 400 }
      );
    }

    // Verify garage exists
    const garage = await prisma.garage.findUnique({
      where: { id },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        category,
        durationMinutes: durationMinutes || 60,
        pricePence,
        depositRequired: depositRequired || false,
        depositPence: depositPence || 0,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0,
        garageId: id,
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
