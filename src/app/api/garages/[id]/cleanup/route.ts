import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

/**
 * POST /api/garages/[id]/cleanup
 * One-time cleanup endpoint to remove orphaned data:
 * - Vehicles without a valid customerId
 * - Advisories and reminders for deleted vehicles
 * - Reminders for vehicles that don't exist in this garage
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: garageId } = await params;

    const guard = await requireGarageAccess(req, garageId);
    if ("response" in guard) return guard.response;

    console.log(`[Cleanup] Starting cleanup for garage: ${garageId}`);

    // Get all vehicles for this garage
    const vehicles = await prisma.vehicle.findMany({
      where: { garageId },
      select: { id: true },
    });

    const validVehicleIds = vehicles.map((v) => v.id);
    console.log(`[Cleanup] Found ${validVehicleIds.length} valid vehicles in garage`);

    // Find all advisories that reference vehicles from this garage but the vehicle is now deleted
    const allAdvisories = await prisma.advisory.findMany({
      select: { id: true, vehicleId: true },
    });

    const orphanedAdvisories = allAdvisories.filter(a => !validVehicleIds.includes(a.vehicleId));

    // Find all reminders that reference vehicles from this garage but the vehicle is now deleted
    const allReminders = await prisma.reminder.findMany({
      select: { id: true, vehicleId: true },
    });

    const orphanedReminders = allReminders.filter(r => !validVehicleIds.includes(r.vehicleId));

    console.log(`[Cleanup] Found ${orphanedAdvisories.length} orphaned advisories`);
    console.log(`[Cleanup] Found ${orphanedReminders.length} orphaned reminders`);

    // Delete orphaned data
    const results = await prisma.$transaction([
      // Delete orphaned advisories
      prisma.advisory.deleteMany({
        where: {
          id: {
            in: orphanedAdvisories.map((a) => a.id),
          },
        },
      }),
      // Delete orphaned reminders
      prisma.reminder.deleteMany({
        where: {
          id: {
            in: orphanedReminders.map((r) => r.id),
          },
        },
      }),
    ]);

    const deletedAdvisories = results[0].count;
    const deletedReminders = results[1].count;

    console.log(`[Cleanup] Deleted ${deletedAdvisories} orphaned advisories`);
    console.log(`[Cleanup] Deleted ${deletedReminders} orphaned reminders`);
    console.log(`[Cleanup] Cleanup complete for garage: ${garageId}`);

    return NextResponse.json({
      success: true,
      garageId,
      deletedAdvisories,
      deletedReminders,
      message: `Cleanup complete: Removed ${deletedAdvisories} orphaned advisories and ${deletedReminders} orphaned reminders`,
    });
  } catch (error) {
    console.error("[Cleanup] Error during cleanup:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Cleanup failed", details: errorMessage },
      { status: 500 }
    );
  }
}
