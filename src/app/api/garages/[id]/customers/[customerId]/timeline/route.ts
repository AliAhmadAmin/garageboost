import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; customerId: string }> }
) {
  try {
    const { id: garageId, customerId } = await params;

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;

    // Verify garage exists
    const garage = await prisma.garage.findUnique({
      where: { id: garageId },
      select: { id: true },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    console.log("[Timeline API] Fetching customer:", customerId, "for garage:", garageId);

    // Get customer with all related data for timeline
    const customer = await (prisma as any).customer.findFirst({
      where: {
        id: customerId,
        garageId: garageId,
      },
      include: {
        vehicles: {
          include: {
            healthChecks: {
              include: {
                items: {
                  select: {
                    id: true,
                    item: true,
                    notes: true,
                    estimatedCost: true,
                    createdAt: true,
                  },
                },
              },
              orderBy: { createdAt: "desc" },
            },
            quotes: {
              select: {
                id: true,
                quoteNumber: true,
                totalPence: true,
                status: true,
                createdAt: true,
              },
              orderBy: { createdAt: "desc" },
            },
            reminders: {
              select: {
                id: true,
                channel: true,
                status: true,
                scheduledFor: true,
                createdAt: true,
              },
              orderBy: { createdAt: "desc" },
            },
            jobs: {
              select: {
                id: true,
                title: true,
                description: true,
                status: true,
                totalPence: true,
                createdAt: true,
              },
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });

    console.log("[Timeline API] Customer found:", customer?.id, "with vehicles:", customer?.vehicles.length);

    if (!customer) {
      console.log("[Timeline API] Customer not found");
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Transform the data to match CustomerTimeline component expectations
    const transformedCustomer = {
      ...customer,
      vehicles: customer.vehicles.map((vehicle: any) => ({
        ...vehicle,
        registration: vehicle.vrm, // Map vrm to registration
        healthChecks: vehicle.healthChecks.map((check: any) => ({
          ...check,
          advisories: (check.items || []).map((item: any) => ({
            id: item.id,
            description: item.notes || item.item,
            estPricePence: item.estimatedCost || 0,
          })),
        })),
        reminders: (vehicle.reminders || []).map((reminder: any) => ({
          ...reminder,
          type: reminder.channel || "MOT", // Map channel to type
        })),
      })),
    };

    console.log("[Timeline API] Transformed customer:", transformedCustomer);
    return NextResponse.json(transformedCustomer);
  } catch (error) {
    console.error("Error fetching customer timeline:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer timeline" },
      { status: 500 }
    );
  }
}
