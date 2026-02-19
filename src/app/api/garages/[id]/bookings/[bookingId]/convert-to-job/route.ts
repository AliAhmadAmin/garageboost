import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; bookingId: string }> }
) {
  try {
    const { id: garageId, bookingId } = await params;

    const guard = await requireGarageAdminAccess(request, garageId);
    if ("response" in guard) return guard.response;

    // Get the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.garageId !== garageId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (booking.convertedToJob) {
      return NextResponse.json(
        { error: "Booking already converted to job" },
        { status: 400 }
      );
    }

    // Check if customer/vehicle exists in system
    let vehicleId = null;
    
    const existingVehicle = booking.vehicleVrm
      ? await prisma.vehicle.findFirst({
          where: { vrm: booking.vehicleVrm, garageId },
        })
      : null;

    if (existingVehicle) {
      vehicleId = existingVehicle.id;
    } else {
      // Create a new vehicle record
      // Default MOT expiry to 1 year from now
      const defaultMotExpiry = new Date();
      defaultMotExpiry.setFullYear(defaultMotExpiry.getFullYear() + 1);

      const newVehicle = await prisma.vehicle.create({
        data: {
          vrm: booking.vehicleVrm || `BOOKING-${booking.id}`,
          make: booking.vehicleMake || "Unknown",
          model: booking.vehicleModel || "Unknown",
          ownerName: booking.customerName,
          ...(booking.customerEmail && { ownerEmail: booking.customerEmail }),
          ...(booking.customerPhone && { ownerPhone: booking.customerPhone }),
          motExpiry: defaultMotExpiry,
          garageId,
        },
      });
      vehicleId = newVehicle.id;
    }

    // Generate sequential job number (same format as manual job creation)
    const year = new Date().getFullYear();
    const jobsThisYear = await prisma.job.count({
      where: {
        garageId,
        createdAt: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });
    const jobNumber = `JOB-${year}-${String(jobsThisYear + 1).padStart(3, "0")}`;

    const garage = await prisma.garage.findUnique({
      where: { id: garageId },
      select: { vatEnabled: true },
    });
    const servicePricePence = booking.service.pricePence || 0;
    const vatRate = garage?.vatEnabled === false ? 0 : 20;
    const totalWithVat = servicePricePence + Math.round(servicePricePence * (vatRate / 100));

    // Create job from booking
    const job = await prisma.job.create({
      data: {
        jobNumber,
        type: booking.service.category || "SERVICE",
        status: "TODO",
        description: `Service: ${booking.service.name} (Booking: ${booking.bookingNumber})`,
        bookedDate: booking.bookingDate,
        vehicleId,
        garageId,
        source: "ONLINE_BOOKING",
        bookingId,
        // Copy pricing from service
        partsTotal: 0,
        laborTotal: servicePricePence,
        vatRate,
        totalPence: totalWithVat,
        laborRate: 5000,
        estimatedHours: (booking.service.durationMinutes || 60) / 60,
        notes: booking.notes ? `Booking notes: ${booking.notes}` : null,
        items: {
          create: [
            {
              type: "SERVICE",
              name: booking.service.name,
              description: `Service from booking ${booking.bookingNumber}`,
              quantity: 1,
              unitPricePence: servicePricePence,
              totalPence: servicePricePence,
            },
          ],
        },
      },
      include: {
        vehicle: true,
        assignedTo: true,
        items: true,
      },
    });

    // Update booking to mark as converted
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        convertedToJob: true,
        jobId: job.id,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Error converting booking to job:", error);
    return NextResponse.json(
      { error: "Failed to convert booking to job" },
      { status: 500 }
    );
  }
}
