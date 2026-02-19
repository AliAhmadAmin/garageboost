import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableStaff } from "@/lib/availability";

export async function POST(request: NextRequest) {
  try {
    const { garageId, startDate, endDate } = await request.json();

    if (!garageId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "garageId, startDate, and endDate are required" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const availability: Record<string, string[]> = {};

    // For each day in the range, get available staff
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      
      // Get all staff available at 9:00 AM (standard working start time)
      const availableStaff = await getAvailableStaff(
        garageId,
        dateStr,
        "09:00",
        480 // 8-hour working day
      );

      availability[dateStr] = availableStaff.map((s) => s.name);
    }

    return NextResponse.json({ availability });
  } catch (error) {
    console.error("Error fetching staff availability calendar:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff availability" },
      { status: 500 }
    );
  }
}
