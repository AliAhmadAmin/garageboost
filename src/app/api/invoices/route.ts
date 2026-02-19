import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess, requireJobAccess } from "@/lib/auth-guards";
import { Resend } from "resend";
import { buildInvoiceEmailHtml } from "@/lib/email-templates";
import { getApiKey } from "@/app/api/admin/config/route";

// GET all invoices
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const garageId = searchParams.get("garageId");

  const guard = await requireGarageAccess(request, garageId);
  if ("response" in guard) return guard.response;

  const where: any = {};
  if (status) where.status = status;
  if (garageId) {
    where.job = {
      garageId,
    };
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      job: {
        include: {
          vehicle: true,
          items: true,
        },
      },
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

// POST create invoice from job
export async function POST(request: Request) {
  const body = await request.json();

  const guard = await requireJobAccess(request, body.jobId);
  if ("response" in guard) return guard.response;

  // Get job details
  const job = await prisma.job.findUnique({
    where: { id: body.jobId },
    include: { items: true, vehicle: true, garage: { select: { vatEnabled: true } } },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Generate invoice number
  const today = new Date();
  const year = today.getFullYear();
  const count = await prisma.invoice.count({
    where: {
      invoiceNumber: {
        startsWith: `INV-${year}-`,
      },
    },
  });
  const invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, "0")}`;

  // Calculate amounts from job items (recalculate to ensure accuracy)
  let laborTotal = 0;
  let partsTotal = 0;

  if (job.items && job.items.length > 0) {
    job.items.forEach((item) => {
      if (item.type === "LABOR" || item.type === "SERVICE") {
        laborTotal += item.totalPence;
      } else if (item.type === "PART") {
        partsTotal += item.totalPence;
      }
    });
  }

  console.log("[Invoice Create] Job items:", job.items?.length || 0);
  console.log("[Invoice Create] Labor total:", laborTotal);
  console.log("[Invoice Create] Parts total:", partsTotal);
  console.log("[Invoice Create] Items breakdown:", job.items?.map(i => ({
    name: i.name,
    type: i.type,
    unitPrice: i.unitPricePence,
    quantity: i.quantity,
    total: i.totalPence
  })));

  const subtotalPence = laborTotal + partsTotal - (job.discountPence || 0);
  const vatRate = job.garage?.vatEnabled === false ? 0 : (job.vatRate ?? 20);
  const vatPence = Math.round(subtotalPence * (vatRate / 100));
  const totalPence = subtotalPence + vatPence;

  console.log("[Invoice Create] Subtotal:", subtotalPence, "VAT:", vatPence, "Total:", totalPence);

  // Set due date (default 30 days from now)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      jobId: job.id,
      subtotalPence,
      vatPence,
      totalPence,
      balancePence: totalPence,
      dueDate: body.dueDate ? new Date(body.dueDate) : dueDate,
      notes: body.notes,
      source: job.source || "GARAGE",
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

  // Update job status to INVOICED and sync totals
  await prisma.job.update({
    where: { id: job.id },
    data: { 
      status: "INVOICED",
      laborTotal,
      partsTotal,
      vatRate,
      totalPence,
    },
  });

  // Send invoice email to customer
  try {
    let apiKey = await getApiKey("RESEND_API_KEY");
    let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
    const fromName = (await getApiKey("RESEND_FROM_NAME")) || process.env.NEXT_PUBLIC_APP_NAME || "Garage Boost";

    // Fallback to environment variables if not in database
    if (!apiKey) apiKey = process.env.RESEND_API_KEY ?? null;
    if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL ?? null;

    // Get garage and vehicle details
    const garage = await prisma.garage.findUnique({
      where: { id: job.garageId },
      select: { name: true, phone: true, email: true, address: true, postcode: true },
    });

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: job.vehicleId },
      select: { make: true, model: true, vrm: true },
    });

    const customerEmail = job.vehicle.ownerEmail;
    const customerName = job.vehicle.ownerName;

    if (apiKey && fromEmail && customerEmail && !customerEmail.includes("@noemail.local")) {
      const resend = new Resend(apiKey);

      // Format invoice items for email
      const invoiceItems = (job.items || []).map((item) => ({
        description: item.name,
        quantity: item.quantity,
        price: `£${(item.unitPricePence / 100).toFixed(2)}`,
        totalPence: item.totalPence,
      }));

      const html = buildInvoiceEmailHtml({
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: invoice.createdAt,
        customerName,
        customerEmail,
        totalPence: invoice.totalPence,
        subtotalPence: invoice.subtotalPence,
        vatPence: invoice.vatPence,
        vatRate: vatRate,
        items: invoiceItems,
        garageName: garage?.name || "Garage Boost",
        garagePhone: garage?.phone || undefined,
        garageEmail: garage?.email || undefined,
        garageAddress: garage?.address || undefined,
        garagePostcode: garage?.postcode || undefined,
        jobDescripton: job.description || undefined,
        vehicleInfo: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.vrm})` : undefined,
      });

      await resend.emails.send({
        from: `${garage?.name || fromName} <${fromEmail}>`,
        replyTo: garage?.email || undefined,
        to: customerEmail,
        subject: `📄 Invoice ${invoice.invoiceNumber} - ${garage?.name || "Garage Boost"}`,
        html,
      });

      console.log("[Invoice] Email sent to:", customerEmail);
    }
  } catch (error) {
    console.error("[Invoice] Failed to send invoice email:", error);
    // Don't fail the invoice creation if email fails
  }

  return NextResponse.json(invoice, { status: 201 });
}
