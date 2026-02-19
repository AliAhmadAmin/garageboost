import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireJobAccess } from "@/lib/auth-guards";

// POST add items to a job
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const guard = await requireJobAccess(req, id);
  if ("response" in guard) return guard.response;

  const items = await Promise.all(
    body.items.map(async (item: any) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPricePence = parseInt(item.unitPricePence) || 0;
      const totalPence = Math.round(quantity * unitPricePence);
      
      return prisma.jobItem.create({
        data: {
          jobId: id,
          type: item.type,
          name: item.name,
          description: item.description,
          quantity,
          unitPricePence,
          totalPence,
          supplierCost: item.supplierCost,
          partNumber: item.partNumber,
          fromInventory: item.fromInventory || false,
          inventoryItemId: item.inventoryItemId || null,
        },
      });
    })
  );

  // Recalculate job totals
  const allItems = await prisma.jobItem.findMany({
    where: { jobId: id },
  });

  let laborTotal = 0;
  let partsTotal = 0;

  for (const item of allItems) {
    if (item.type === "LABOR" || item.type === "SERVICE") {
      laborTotal += item.totalPence;
    } else if (item.type === "PART") {
      partsTotal += item.totalPence;
    }
  }

  const job = await prisma.job.findUnique({ where: { id } });
  const subtotal = laborTotal + partsTotal - (job?.discountPence || 0);
  const vatAmount = Math.round(subtotal * ((job?.vatRate ?? 20) / 100));
  const total = subtotal + vatAmount;

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

  return NextResponse.json(items, { status: 201 });
}

// DELETE item from job
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: jobId } = await params;
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");

  const guard = await requireJobAccess(req, jobId);
  if ("response" in guard) return guard.response;

  if (!itemId) {
    return NextResponse.json({ error: "Item ID required" }, { status: 400 });
  }

  await prisma.jobItem.delete({
    where: { id: itemId },
  });

  // Recalculate job totals
  const allItems = await prisma.jobItem.findMany({
    where: { jobId },
  });

  let laborTotal = 0;
  let partsTotal = 0;

  for (const item of allItems) {
    if (item.type === "LABOR" || item.type === "SERVICE") {
      laborTotal += item.totalPence;
    } else if (item.type === "PART") {
      partsTotal += item.totalPence;
    }
  }

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  const subtotal = laborTotal + partsTotal - (job?.discountPence || 0);
  const vatAmount = Math.round(subtotal * ((job?.vatRate ?? 20) / 100));
  const total = subtotal + vatAmount;

  await prisma.job.update({
    where: { id: jobId },
    data: {
      laborTotal,
      partsTotal,
      totalPence: total,
    },
  });

  // Also update associated invoice if it exists
  const invoice = await prisma.invoice.findFirst({
    where: { jobId },
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

  return NextResponse.json({ success: true });
}
