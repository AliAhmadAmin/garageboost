import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Development-only endpoint to set a garage to TRIAL status with expired date
 * POST /api/test/expire-trial?garageId={garageId}
 */
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const garageId = searchParams.get("garageId");

    if (!garageId) {
      return NextResponse.json(
        { error: "garageId query parameter is required" },
        { status: 400 }
      );
    }

    // Set trial to expire yesterday and status to TRIAL
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const updated = await prisma.garage.update({
      where: { id: garageId },
      data: {
        status: "TRIAL",
        trialEndsAt: yesterday,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Garage set to TRIAL status with expired trial (yesterday)",
      garage: {
        id: updated.id,
        name: updated.name,
        status: updated.status,
        trialEndsAt: updated.trialEndsAt,
      },
    });
  } catch (error) {
    console.error("Error expiring trial:", error);
    return NextResponse.json(
      { error: "Failed to expire trial" },
      { status: 500 }
    );
  }
}

