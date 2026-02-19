import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireBookingAccess } from "@/lib/auth-guards";

// PUT /api/bookings/[id] - Update a booking (confirm, cancel, complete, etc.)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const guard = await requireBookingAccess(request, id);
    if ("response" in guard) return guard.response;

    const {
      status,
      cancellationReason,
      notes,
      depositPaid,
      stripePaymentIntentId,
      stripePaymentStatus,
    } = body;

    // Verify booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updateData: any = {
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
      ...(depositPaid !== undefined && { depositPaid }),
      ...(stripePaymentIntentId && { stripePaymentIntentId }),
      ...(stripePaymentStatus && { stripePaymentStatus }),
    };

    // Handle status changes
    if (status === "CONFIRMED" && !existingBooking.confirmedAt) {
      updateData.confirmedAt = new Date();
    }

    if (status === "CANCELLED") {
      updateData.cancelledAt = new Date();
      if (cancellationReason) {
        updateData.cancellationReason = cancellationReason;
      }
    }

    if (status === "COMPLETED" && !existingBooking.completedAt) {
      updateData.completedAt = new Date();
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        service: true,
      },
    });

    // TODO: Send status update email to customer
    // TODO: Notify garage owner of changes

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// GET /api/bookings/[id] - Get a single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireBookingAccess(request, id);
    if ("response" in guard) return guard.response;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
