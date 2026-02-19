import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

// PUT /api/garages/[id]/services/[serviceId] - Update a service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; serviceId: string }> }
) {
  try {
    const { id, serviceId } = await params;
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

    // Verify service exists and belongs to this garage
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (existingService.garageId !== id) {
      return NextResponse.json(
        { error: "Service does not belong to this garage" },
        { status: 403 }
      );
    }

    // Validation
    if (depositRequired && (!depositPence || depositPence <= 0)) {
      return NextResponse.json(
        { error: "Deposit amount is required when deposit is enabled" },
        { status: 400 }
      );
    }

    const service = await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(category && { category }),
        ...(durationMinutes && { durationMinutes }),
        ...(pricePence !== undefined && { pricePence }),
        ...(depositRequired !== undefined && { depositRequired }),
        ...(depositPence !== undefined && { depositPence }),
        ...(isActive !== undefined && { isActive }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE /api/garages/[id]/services/[serviceId] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; serviceId: string }> }
) {
  try {
    const { id, serviceId } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    // Verify service exists and belongs to this garage
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        bookings: {
          where: {
            status: {
              in: ["PENDING", "CONFIRMED"],
            },
          },
        },
      },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (existingService.garageId !== id) {
      return NextResponse.json(
        { error: "Service does not belong to this garage" },
        { status: 403 }
      );
    }

    // Check if there are active bookings
    if (existingService.bookings.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete service with active bookings. Cancel or complete bookings first.",
        },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
