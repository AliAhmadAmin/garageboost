import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireJobAccess } from "@/lib/auth-guards";
import { checkStaffAvailability } from "@/lib/availability";

// GET single job
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try to find by ID first, then by job number
  let job = await prisma.job.findUnique({
    where: { id },
    include: {
      vehicle: true,
      items: true,
      invoice: {
        include: {
          payments: true,
        },
      },
    },
  });

  // If not found by ID, try by job number
  if (!job) {
    job = await prisma.job.findFirst({
      where: { jobNumber: id },
      include: {
        vehicle: true,
        items: true,
        invoice: {
          include: {
            payments: true,
          },
        },
      },
    });
  }

  // If still not found, return 404
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Perform auth check with actual job ID
  const guard = await requireJobAccess(req, job.id);
  if ("response" in guard) return guard.response;

  // Recalculate totals from items (in case they were calculated incorrectly)
  let laborTotal = 0;
  let partsTotal = 0;

  for (const item of job.items) {
    if (item.type === "LABOR" || item.type === "SERVICE") {
      laborTotal += item.totalPence;
    } else if (item.type === "PART") {
      partsTotal += item.totalPence;
    }
  }

  const subtotal = laborTotal + partsTotal - (job.discountPence || 0);
  const vatAmount = Math.round(subtotal * ((job.vatRate ?? 20) / 100));
  const total = subtotal + vatAmount;

  // Return job with recalculated values
  return NextResponse.json({
    ...job,
    laborTotal,
    partsTotal,
    subtotal,
    vatAmount,
    total,
    totalPence: total,
  });
}

// PUT update job
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const guard = await requireJobAccess(req, id);
  if ("response" in guard) return guard.response;

  // Get current job to check status change
  const currentJob = await prisma.job.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!currentJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Calculate totals from items if provided
  let laborTotal = 0;
  let partsTotal = 0;

  if (body.items) {
    for (const item of body.items) {
      const totalPence = Math.round(item.quantity * item.unitPricePence);
      if (item.type === "LABOR" || item.type === "SERVICE") {
        laborTotal += totalPence;
      } else if (item.type === "PART") {
        partsTotal += totalPence;
      }
    }
  }

  const subtotal = laborTotal + partsTotal - (body.discountPence || 0);
  const vatRate = body.vatRate ?? currentJob.vatRate ?? 20;
  const vatAmount = Math.round(subtotal * (vatRate / 100));
  const total = subtotal + vatAmount;

  // Check staff availability if assigning or reassigning
  if (body.assignedToId && body.assignedToId !== currentJob.assignedToId) {
    // Use bookedDate or startedAt for the check
    let checkDate = body.bookedDate || currentJob.bookedDate;
    let checkTime = "09:00"; // Default time

    if (body.startedAt) {
      const startDate = new Date(body.startedAt);
      checkDate = startDate;
      checkTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`;
    }

    if (checkDate) {
      const dateStr = new Date(checkDate).toISOString().split("T")[0];
      const estimatedHours = body.estimatedHours || currentJob.estimatedHours || 2;
      const durationMinutes = estimatedHours * 60;

      const { available, conflict } = await checkStaffAvailability(
        currentJob.garageId,
        body.assignedToId,
        dateStr,
        checkTime,
        durationMinutes,
        currentJob.id // Exclude current job from conflict check
      );

      if (!available) {
        return NextResponse.json(
          { error: `Staff member not available: ${conflict}` },
          { status: 409 }
        );
      }
    }
  }

  // Update job
  const job = await prisma.job.update({
    where: { id },
    data: {
      type: body.type,
      status: body.status,
      description: body.description,
      bookedDate: body.bookedDate ? new Date(body.bookedDate) : null,
      startedAt: body.startedAt ? new Date(body.startedAt) : null,
      completedAt: body.completedAt ? new Date(body.completedAt) : null,
      estimatedHours: body.estimatedHours,
      actualHours: body.actualHours,
      laborRate: body.laborRate,
      laborTotal,
      partsTotal,
      vatRate,
      discountPence: body.discountPence || 0,
      totalPence: total,
      notes: body.notes,
      assignedToId: body.assignedToId !== undefined ? body.assignedToId : undefined,
    },
    include: {
      vehicle: true,
      items: true,
      invoice: true,
      assignedTo: true,
    },
  });

  // Auto-deduct inventory when job is marked as DONE
  if (body.status === "DONE" && currentJob.status !== "DONE") {
    // Deduct inventory for items marked as fromInventory
    for (const item of currentJob.items) {
      if (item.fromInventory && item.inventoryItemId) {
        try {
          const inventoryItem = await prisma.inventoryItem.findUnique({
            where: { id: item.inventoryItemId },
          });

          if (inventoryItem) {
            // Deduct quantity
            await prisma.inventoryItem.update({
              where: { id: item.inventoryItemId },
              data: {
                quantityOnHand: Math.max(0, inventoryItem.quantityOnHand - item.quantity),
              },
            });

            // Create inventory transaction record
            await prisma.inventoryTransaction.create({
              data: {
                type: "ISSUE",
                quantity: -Math.round(item.quantity),
                notes: `Used in job ${job.jobNumber}`,
                garageId: job.garageId,
                inventoryItemId: item.inventoryItemId,
              },
            });
          }
        } catch (error) {
          console.error(`Failed to deduct inventory for item ${item.id}:`, error);
          // Continue processing other items even if one fails
        }
      }
    }
  }

  // Also update associated invoice if it exists
  const invoice = await prisma.invoice.findFirst({
    where: { jobId: id },
  });

  if (invoice) {
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        subtotalPence: subtotal,
        vatPence: vatAmount,
        totalPence: total,
        balancePence: total - invoice.paidPence,
      },
    });
  }

  return NextResponse.json(job);
}

// PATCH partial update job (e.g., status only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const guard = await requireJobAccess(req, id);
  if ("response" in guard) return guard.response;

  // Get current job to check status change
  const currentJob = await prisma.job.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!currentJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const job = await prisma.job.update({
    where: { id },
    data: body, // Only update provided fields
    include: {
      vehicle: true,
      items: true,
      invoice: true,
      assignedTo: true,
    },
  });

  // Auto-deduct inventory when job is marked as DONE
  if (body.status === "DONE" && currentJob.status !== "DONE") {
    // Deduct inventory for items marked as fromInventory
    for (const item of currentJob.items) {
      if (item.fromInventory && item.inventoryItemId) {
        try {
          const inventoryItem = await prisma.inventoryItem.findUnique({
            where: { id: item.inventoryItemId },
          });

          if (inventoryItem) {
            // Deduct quantity
            await prisma.inventoryItem.update({
              where: { id: item.inventoryItemId },
              data: {
                quantityOnHand: Math.max(0, inventoryItem.quantityOnHand - item.quantity),
              },
            });

            // Create inventory transaction record
            await prisma.inventoryTransaction.create({
              data: {
                type: "ISSUE",
                quantity: -Math.round(item.quantity),
                notes: `Used in job ${job.jobNumber}`,
                garageId: job.garageId,
                inventoryItemId: item.inventoryItemId,
              },
            });
          }
        } catch (error) {
          console.error(`Failed to deduct inventory for item ${item.id}:`, error);
          // Continue processing other items even if one fails
        }
      }
    }
  }

  // Recalculate totals from items after update to ensure totals are correct
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

  // Update job totals in database
  await prisma.job.update({
    where: { id },
    data: {
      laborTotal,
      partsTotal,
      totalPence: total,
    },
  });

  // Also update associated invoice if it exists
  const invoice = await prisma.invoice.findFirst({
    where: { jobId: id },
  });

  if (invoice) {
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        subtotalPence: subtotal,
        vatPence: vatAmount,
        totalPence: total,
        balancePence: total - invoice.paidPence,
      },
    });
  }

  return NextResponse.json({
    ...job,
    laborTotal,
    partsTotal,
    subtotal,
    vatAmount,
    total,
    totalPence: total,
  });
}

// DELETE job
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const guard = await requireJobAccess(req, id);
  if ("response" in guard) return guard.response;

  await prisma.job.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
