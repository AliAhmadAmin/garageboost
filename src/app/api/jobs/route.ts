import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess, requireVehicleAccess } from "@/lib/auth-guards";
import { getAssignmentScope } from "@/lib/access-control";

// GET all jobs for a garage
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = searchParams.get("garageId");
  const status = searchParams.get("status");
  const vehicleId = searchParams.get("vehicleId");

  let staffContext: { id: string; accessRole: string } | undefined;

  if (garageId) {
    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard.response;
    staffContext = guard.staff ? { id: guard.staff.id, accessRole: guard.staff.accessRole } : undefined;
  } else if (vehicleId) {
    const guard = await requireVehicleAccess(request, vehicleId);
    if ("response" in guard) return guard.response;
    staffContext = guard.staff ? { id: guard.staff.id, accessRole: guard.staff.accessRole } : undefined;
  } else {
    return NextResponse.json({ error: "garageId or vehicleId is required" }, { status: 400 });
  }

  const where: any = {};
  if (garageId) where.garageId = garageId;
  if (status) where.status = status;
  if (vehicleId) where.vehicleId = vehicleId;
  if (staffContext) {
    if (getAssignmentScope(staffContext.accessRole) === "ASSIGNED") {
      where.assignedToId = staffContext.id;
    }
  }

  const jobs = await prisma.job.findMany({
    where,
    include: {
      vehicle: true,
      items: true,
      invoice: true,
      assignedTo: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Recalculate totals for each job to ensure totals are correct in list view
  const jobsWithTotals = jobs.map((job) => {
    let laborTotal = 0;
    let partsTotal = 0;
    for (const item of job.items || []) {
      if (item.type === "LABOR" || item.type === "SERVICE") {
        laborTotal += item.totalPence;
      } else if (item.type === "PART") {
        partsTotal += item.totalPence;
      }
    }
    const subtotal = laborTotal + partsTotal - (job.discountPence || 0);
    const vatAmount = Math.round(subtotal * ((job.vatRate ?? 20) / 100));
    const total = subtotal + vatAmount;
    return {
      ...job,
      laborTotal,
      partsTotal,
      subtotal,
      vatAmount,
      total,
      totalPence: total,
    };
  });

  return NextResponse.json(jobsWithTotals);
}

// POST create new job
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const guard = await requireGarageAccess(request, body.garageId);
    if ("response" in guard) return guard.response;

    // Generate job number
    const today = new Date();
    const year = today.getFullYear();
    const count = await prisma.job.count({
      where: {
        jobNumber: {
          startsWith: `JOB-${year}-`,
        },
      },
    });
    const jobNumber = `JOB-${year}-${String(count + 1).padStart(3, "0")}`;

    const garage = await prisma.garage.findUnique({
      where: { id: body.garageId },
      select: { vatEnabled: true },
    });

    const job = await prisma.job.create({
      data: {
        jobNumber,
        type: body.type,
        status: body.status || "TODO",
        description: body.description,
        bookedDate: body.bookedDate ? new Date(body.bookedDate) : null,
        estimatedHours: body.estimatedHours,
        laborRate: body.laborRate || 5000,
        notes: body.notes,
        vatRate: garage?.vatEnabled === false ? 0 : (body.vatRate ?? 20),
        vehicleId: body.vehicleId,
        garageId: body.garageId,
        assignedToId: body.assignedToId || null,
      },
      include: {
        vehicle: true,
        items: true,
        assignedTo: true,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create job";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
