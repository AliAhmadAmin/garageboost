import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireInvoiceAccess } from "@/lib/auth-guards";

// GET single invoice
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const guard = await requireInvoiceAccess(req, id);
  if ("response" in guard) return guard.response;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      job: {
        include: {
          vehicle: true,
          items: true,
          garage: true,
        },
      } as any,
      payments: true,
    },
  }) as any;

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  // If invoice totals are zero but job has items, recalculate and update
  if (invoice.totalPence === 0 && invoice.job?.items?.length > 0) {
    console.log("[Invoice GET] Invoice has zero totals but job has items, recalculating...");
    
    let laborTotal = 0;
    let partsTotal = 0;

    invoice.job.items.forEach((item: any) => {
      if (item.type === "LABOR" || item.type === "SERVICE") {
        laborTotal += item.totalPence;
      } else if (item.type === "PART") {
        partsTotal += item.totalPence;
      }
    });

    const subtotalPence = laborTotal + partsTotal - (invoice.job.discountPence || 0);
    const vatRate = invoice.job?.garage?.vatEnabled === false ? 0 : (invoice.job.vatRate ?? 20);
    const vatPence = Math.round(subtotalPence * (vatRate / 100));
    const totalPence = subtotalPence + vatPence;

    console.log("[Invoice GET] Recalculated totals:", { subtotalPence, vatPence, totalPence });

    // Update the invoice with correct totals
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: {
        subtotalPence,
        vatPence,
        totalPence,
        balancePence: totalPence - invoice.paidPence,
      },
      include: {
        job: {
          include: {
            vehicle: true,
            items: true,
            garage: true,
          },
        } as any,
        payments: true,
      },
    });

    return NextResponse.json(updatedInvoice);
  }

  return NextResponse.json(invoice);
}

// POST add payment to invoice
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const guard = await requireInvoiceAccess(req, id);
  if ("response" in guard) return guard.response;

  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  // Create payment
  const payment = await prisma.payment.create({
    data: {
      invoiceId: id,
      amountPence: body.amountPence,
      method: body.method,
      reference: body.reference,
      stripePaymentId: body.stripePaymentId,
      notes: body.notes,
    },
  });

  // Calculate new paid amount and balance
  const paidPence = invoice.paidPence + body.amountPence;
  const balancePence = invoice.totalPence - paidPence;

  // Determine new status
  let status = invoice.status;
  if (balancePence === 0) {
    status = "PAID";
  } else if (paidPence > 0) {
    status = "PARTIALLY_PAID";
  }

  // Update invoice
  await prisma.invoice.update({
    where: { id },
    data: {
      paidPence,
      balancePence,
      status,
      paidDate: balancePence === 0 ? new Date() : null,
    },
  });

  // Update job status to PAID if fully paid
  if (balancePence === 0) {
    await prisma.job.update({
      where: { id: invoice.jobId },
      data: { status: "PAID" },
    });
  }

  return NextResponse.json(payment, { status: 201 });
}

// PUT update invoice
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const guard = await requireInvoiceAccess(req, id);
  if ("response" in guard) return guard.response;

  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      status: body.status,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      notes: body.notes,
    },
    include: {
      job: {
        include: {
          vehicle: true,
          items: true,
        },
      },
      payments: true,
    },
  });

  return NextResponse.json(invoice);
}
