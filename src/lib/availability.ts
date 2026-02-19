import { prisma } from "@/lib/prisma";

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  staffId?: string;
}

/**
 * Check if a staff member is available for a time slot
 * @param garageId - The garage ID
 * @param staffId - The staff member ID (optional - if not provided, anyone can book)
 * @param date - Booking date in YYYY-MM-DD format
 * @param startTime - Start time in HH:MM format
 * @param durationMinutes - Duration of appointment in minutes
 * @param excludeBookingId - Exclude a specific booking from conflict check (for updates)
 * @param excludeJobId - Exclude a specific job from conflict check (for updates)
 */
export async function checkStaffAvailability(
  garageId: string,
  staffId: string | null,
  date: string,
  startTime: string,
  durationMinutes: number,
  excludeJobId?: string,
  excludeBookingId?: string
): Promise<{ available: boolean; conflict?: string }> {
  if (!staffId) {
    // If no staff assigned, any time is available
    return { available: true };
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startDate = new Date(`${date}T${startTime}:00`);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  // Check bookings for this staff
  const conflictingBookings = await prisma.booking.findMany({
    where: {
      garageId,
      staffId,
      bookingDate: {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 24 * 60 * 60000),
      },
      status: { in: ["PENDING", "CONFIRMED"] },
      id: excludeBookingId ? { not: excludeBookingId } : undefined,
    },
    include: { service: true },
  });

  // Check for time conflicts with bookings
  for (const booking of conflictingBookings) {
    const [bookingHour, bookingMinute] = booking.bookingTime.split(":").map(Number);
    const bookingStart = new Date(`${date}T${booking.bookingTime}:00`);
    const bookingEnd = new Date(
      bookingStart.getTime() + (booking.service.durationMinutes || 60) * 60000
    );

    // Check if times overlap
    if (startDate < bookingEnd && endDate > bookingStart) {
      return {
        available: false,
        conflict: `Conflict with booking at ${booking.bookingTime} (${booking.customerName})`,
      };
    }
  }

  // Check jobs for this staff
  const conflictingJobs = await prisma.job.findMany({
    where: {
      garageId,
      assignedToId: staffId,
      bookedDate: {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 24 * 60 * 60000),
      },
      status: { in: ["TODO", "DOING"] },
      id: excludeJobId ? { not: excludeJobId } : undefined,
    },
  });

  // Check for time conflicts with jobs
  for (const job of conflictingJobs) {
    if (job.startedAt) {
      const jobStart = job.startedAt;
      const jobEnd = new Date(
        jobStart.getTime() + (job.estimatedHours || 2) * 60 * 60000
      );

      if (startDate < jobEnd && endDate > jobStart) {
        return {
          available: false,
          conflict: `Conflict with job ${job.jobNumber}`,
        };
      }
    }
  }

  return { available: true };
}

/**
 * Get available staff members for a time slot
 */
export async function getAvailableStaff(
  garageId: string,
  date: string,
  startTime: string,
  durationMinutes: number
) {
  const staff = await prisma.staff.findMany({
    where: {
      garageId,
      active: true,
    },
  });

  const availableStaff = [];

  for (const member of staff) {
    const { available } = await checkStaffAvailability(
      garageId,
      member.id,
      date,
      startTime,
      durationMinutes
    );

    if (available) {
      availableStaff.push(member);
    }
  }

  return availableStaff;
}

/**
 * Get available time slots for a staff member on a given day
 */
export async function getAvailableSlots(
  garageId: string,
  staffId: string | null,
  date: string,
  durationMinutes: number,
  workingHours = { start: 8, end: 17 } // 8am to 5pm default
): Promise<string[]> {
  const slots: string[] = [];

  // Generate 30-minute slots throughout the day
  for (let hour = workingHours.start; hour < workingHours.end; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

      const { available } = await checkStaffAvailability(
        garageId,
        staffId,
        date,
        timeStr,
        durationMinutes
      );

      if (available) {
        slots.push(timeStr);
      }
    }
  }

  return slots;
}
