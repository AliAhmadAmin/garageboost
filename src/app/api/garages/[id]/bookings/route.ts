import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";
import { getAssignmentScope } from "@/lib/access-control";

// GET /api/garages/[id]/bookings - List all bookings for a garage
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAccess(request, id);
    if ("response" in guard) return guard.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {
      garageId: id,
      ...(status && { status }),
      ...(startDate && endDate && {
        bookingDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      }),
    };

    if (guard.staff && getAssignmentScope(guard.staff.accessRole) === "ASSIGNED") {
      where.staffId = guard.staff.id;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        service: true,
        staff: true,
      },
      orderBy: [
        { bookingDate: "asc" },
        { bookingTime: "asc" },
      ],
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
