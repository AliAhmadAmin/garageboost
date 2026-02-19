import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: garageId } = await params;
    const guard = await requireGarageAdminAccess(request, garageId);
    if ("response" in guard) return guard.response;

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Helper to convert Date to YYYY-MM-DD string without timezone issues
    const toDateString = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Fetch bookings
    const bookings = await prisma.booking.findMany({
      where: {
        garageId,
        bookingDate: {
          gte: start,
          lte: end,
        },
      },
      include: {
        service: true,
        staff: true,
      },
      orderBy: { bookingDate: "asc" },
    });

    // Fetch jobs
    const jobs = await prisma.job.findMany({
      where: {
        garageId,
        bookedDate: {
          gte: start,
          lte: end,
        },
      },
      include: {
        vehicle: true,
        assignedTo: true,
      },
      orderBy: { bookedDate: "asc" },
    });

    // Transform bookings
    const bookingAppointments = bookings.map((booking) => ({
      id: booking.id,
      type: "booking" as const,
      number: booking.bookingNumber,
      customerName: booking.customerName,
      vehicleInfo: booking.vehicleVrm || booking.vehicleMake || "Vehicle TBA",
      service: booking.service.name,
      date: toDateString(booking.bookingDate),
      time: booking.bookingTime,
      duration: booking.service.durationMinutes,
      status: booking.status,
      staffName: booking.staff?.name,
      phone: booking.customerPhone,
      notes: booking.notes,
    }));

    // Transform jobs
    const jobAppointments = jobs.map((job) => ({
      id: job.id,
      type: "job" as const,
      number: job.jobNumber,
      customerName: job.vehicle.ownerName,
      vehicleInfo: `${job.vehicle.make} ${job.vehicle.model} (${job.vehicle.vrm})`,
      service: job.type,
      date: job.bookedDate ? toDateString(job.bookedDate) : toDateString(new Date()),
      time: job.startedAt ? job.startedAt.toISOString().split("T")[1].substring(0, 5) : "09:00",
      duration: job.estimatedHours ? Math.round(job.estimatedHours * 60) : 120,
      status: job.status,
      staffName: job.assignedTo?.name,
      phone: job.vehicle.ownerPhone,
      notes: job.notes,
    }));

    const allAppointments = [...bookingAppointments, ...jobAppointments].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    return NextResponse.json({ appointments: allAppointments });
  } catch (error) {
    console.error("Error fetching calendar appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
