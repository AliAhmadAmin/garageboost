import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireBookingAccess } from "@/lib/auth-guards";

// POST /api/bookings/[id]/convert-to-job - Convert a booking to a job
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireBookingAccess(request, id);
    if ("response" in guard) return guard.response;

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.convertedToJob) {
      return NextResponse.json(
        { error: "Booking has already been converted to a job" },
        { status: 400 }
      );
    }

    if (booking.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Cannot convert cancelled booking to job" },
        { status: 400 }
      );
    }

    const normalizedEmail = booking.customerEmail.trim().toLowerCase();
    const normalizedName = booking.customerName.trim();
    const normalizedPhone = booking.customerPhone?.trim() || null;

    // Find or create customer so converted bookings appear in Customers list
    let customer = await (prisma as any).customer.findFirst({
      where: {
        garageId: booking.garageId,
        email: normalizedEmail,
      },
    });

    if (!customer) {
      customer = await (prisma as any).customer.create({
        data: {
          garageId: booking.garageId,
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          source: "ONLINE_BOOKING",
        },
      });
    } else {
      customer = await (prisma as any).customer.update({
        where: { id: customer.id },
        data: {
          name: normalizedName,
          phone: normalizedPhone,
          source: customer.source || "ONLINE_BOOKING",
        },
      });
    }

    // Find or create vehicle
    let vehicleId: string | undefined;

    if (booking.vehicleVrm) {
      // Try to find existing vehicle by VRM and garage
      let vehicle = await prisma.vehicle.findFirst({
        where: {
          garageId: booking.garageId,
          vrm: booking.vehicleVrm,
        },
      });

      // If not found, create new vehicle
      if (!vehicle) {
        vehicle = await prisma.vehicle.create({
          data: {
            garageId: booking.garageId,
            vrm: booking.vehicleVrm,
            make: booking.vehicleMake || "Unknown",
            model: booking.vehicleModel || "",
            ownerName: normalizedName,
            ownerPhone: normalizedPhone,
            ownerEmail: normalizedEmail,
            customerId: customer.id,
            motExpiry: new Date(), // Default to today - garage should update
          },
        });
      } else {
        vehicle = await prisma.vehicle.update({
          where: { id: vehicle.id },
          data: {
            ownerName: normalizedName,
            ownerPhone: normalizedPhone,
            ownerEmail: normalizedEmail,
            customerId: customer.id,
          },
        });
      }

      vehicleId = vehicle.id;
    }

    // If no VRM, create a placeholder vehicle
    if (!vehicleId) {
      const vehicle = await prisma.vehicle.create({
        data: {
          garageId: booking.garageId,
          vrm: "UNKNOWN",
          make: booking.vehicleMake || "Unknown",
          model: booking.vehicleModel || "",
          ownerName: normalizedName,
          ownerPhone: normalizedPhone,
          ownerEmail: normalizedEmail,
          customerId: customer.id,
          motExpiry: new Date(),
        },
      });
      vehicleId = vehicle.id;
    }

    // Generate job number
    const year = new Date().getFullYear();
    const jobCount = await prisma.job.count();
    const jobNumber = `JOB-${year}-${String(jobCount + 1).padStart(3, "0")}`;

    const garage = await prisma.garage.findUnique({
      where: { id: booking.garageId },
      select: { vatEnabled: true },
    });
    const vatRate = garage?.vatEnabled === false ? 0 : 20;
    const totalWithVat = booking.service.pricePence + Math.round(booking.service.pricePence * (vatRate / 100));

    // Create job
    const job = await prisma.job.create({
      data: {
        jobNumber,
        garageId: booking.garageId,
        vehicleId,
        bookingId: booking.id,
        type: booking.service.category,
        status: "BOOKED",
        description: booking.service.name,
        bookedDate: booking.bookingDate,
        source: "ONLINE_BOOKING",
        notes: booking.notes || `Booking: ${booking.bookingNumber}\nCustomer: ${booking.customerName}\nPhone: ${booking.customerPhone}\nEmail: ${booking.customerEmail}`,
        estimatedHours: booking.service.durationMinutes / 60,
        laborRate: 5000, // £50/hour default
        vatRate,
        partsTotal: 0,
        laborTotal: booking.service.pricePence,
        totalPence: totalWithVat,
        items: {
          create: [
            {
              type: "SERVICE",
              name: booking.service.name,
              description: `Service from booking ${booking.bookingNumber}`,
              quantity: 1,
              unitPricePence: booking.service.pricePence,
              totalPence: booking.service.pricePence,
            },
          ],
        },
      },
      include: {
        vehicle: true,
        items: true,
      },
    });

    // Update booking
    await prisma.booking.update({
      where: { id },
      data: {
        jobId: job.id,
        convertedToJob: true,
        status: "COMPLETED",
        completedAt: new Date(),
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
