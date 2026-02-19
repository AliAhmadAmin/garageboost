import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots, getAvailableStaff } from "@/lib/availability";

export async function POST(request: NextRequest) {
  try {
    const { garageId, date, staffId, durationMinutes = 60, serviceId } = await request.json();

    if (!garageId || !date) {
      return NextResponse.json(
        { error: "garageId and date are required" },
        { status: 400 }
      );
    }

    // If serviceId provided, get duration from service
    let duration = durationMinutes;
    if (serviceId) {
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });
      if (service) {
        duration = service.durationMinutes;
      }
    }

    // Get available slots
    const slots = await getAvailableSlots(
      garageId,
      staffId || null,
      date,
      duration
    );

    // Get available staff for this time slot
    let availableStaff: any[] = [];
    if (!staffId && slots.length > 0) {
      // Get staff available during the first available slot
      availableStaff = await getAvailableStaff(
        garageId,
        date,
        slots[0],
        duration
      );
    }

    return NextResponse.json({
      slots,
      availableStaff,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
