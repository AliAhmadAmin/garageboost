import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireInvoiceAccess } from "@/lib/auth-guards";
import { Resend } from "resend";
import { getApiKey } from "@/app/api/admin/config/route";
import { formatUKDate } from "@/lib/uk-date";

// Build professional invoice email HTML
const buildInvoiceEmailHtml = (data: {
  garageName: string;
  garageAddress?: string;
  garagePhone?: string;
  garageEmail?: string;
  customerName: string;
  invoiceNumber: string;
  jobNumber: string;
  vehicleVrm: string;
  vehicleMake: string;
  vehicleModel: string;
  issueDate: string;
  dueDate: string;
  items: Array<{
    type: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
  paymentUrl?: string;
}) => {
  const itemsHtml = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            <strong>${item.name}</strong>
            <br />
            <span style="font-size: 12px; color: #6b7280;">${item.type}</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">£${(item.unitPrice / 100).toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">£${(item.total / 100).toFixed(2)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #1f2937;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
          }
          .container { 
            max-width: 700px; 
            margin: 40px auto; 
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%); 
            color: white; 
            padding: 32px 40px;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 0;
            opacity: 0.95;
            font-size: 16px;
          }
          .content { 
            padding: 40px;
          }
          .info-section {
            display: table;
            width: 100%;
            margin-bottom: 32px;
          }
          .info-column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
          }
          .info-box {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 16px;
          }
          .info-box h3 {
            margin: 0 0 12px 0;
            font-size: 14px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: 600;
            letter-spacing: 0.05em;
          }
          .info-box p {
            margin: 4px 0;
            font-size: 15px;
            color: #1f2937;
          }
          .invoice-details {
            background: #eff6ff;
            border-left: 4px solid #1d4ed8;
            padding: 20px;
            margin: 24px 0;
          }
          .invoice-details h2 {
            margin: 0 0 12px 0;
            font-size: 18px;
            color: #1d4ed8;
          }
          .invoice-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .invoice-meta strong {
            color: #1f2937;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
          }
          th {
            background: #f9fafb;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            color: #6b7280;
            border-bottom: 2px solid #e5e7eb;
          }
          th:nth-child(2),
          th:nth-child(3),
          th:nth-child(4) {
            text-align: right;
          }
          .totals {
            margin-top: 24px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
          }
          .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 15px;
          }
          .totals-row.subtotal {
            color: #4b5563;
          }
          .totals-row.vat {
            color: #4b5563;
            font-size: 14px;
          }
          .totals-row.total {
            font-size: 20px;
            font-weight: 700;
            color: #1d4ed8;
            border-top: 2px solid #e5e7eb;
            padding-top: 12px;
            margin-top: 8px;
          }
          .totals-row.paid {
            color: #059669;
            font-weight: 600;
          }
          .totals-row.balance {
            font-size: 18px;
            font-weight: 700;
            color: ${data.balanceDue > 0 ? "#dc2626" : "#059669"};
            background: ${data.balanceDue > 0 ? "#fef2f2" : "#f0fdf4"};
            padding: 12px 16px;
            margin-top: 12px;
            border-radius: 6px;
          }
          .payment-button {
            display: inline-block;
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 24px;
            box-shadow: 0 4px 6px rgba(29, 78, 216, 0.3);
          }
          .payment-button:hover {
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          }
          .footer { 
            background: #f9fafb; 
            padding: 24px 40px; 
            text-align: center; 
            font-size: 13px; 
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 4px 0;
          }
          .vrm-badge {
            display: inline-block;
            background: #fcd34d;
            color: #1f2937;
            border: 2px solid #1f2937;
            padding: 4px 12px;
            font-weight: 700;
            font-family: 'Courier New', monospace;
            border-radius: 4px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Invoice ${data.invoiceNumber}</h1>
            <p>Job Reference: ${data.jobNumber}</p>
          </div>
          
          <div class="content">
            <!-- Business & Customer Info -->
            <div class="info-section">
              <div class="info-column">
                <div class="info-box">
                  <h3>From</h3>
                  <p><strong>${data.garageName}</strong></p>
                  ${data.garageAddress ? `<p>${data.garageAddress}</p>` : ""}
                  ${data.garagePhone ? `<p>Tel: ${data.garagePhone}</p>` : ""}
                  ${data.garageEmail ? `<p>Email: ${data.garageEmail}</p>` : ""}
                </div>
              </div>
              <div class="info-column">
                <div class="info-box">
                  <h3>Bill To</h3>
                  <p><strong>${data.customerName}</strong></p>
                </div>
              </div>
            </div>

            <!-- Invoice Details -->
            <div class="invoice-details">
              <h2>Vehicle & Invoice Details</h2>
              <div class="invoice-meta">
                <span>Vehicle Registration:</span>
                <strong><span class="vrm-badge">${data.vehicleVrm}</span></strong>
              </div>
              <div class="invoice-meta">
                <span>Vehicle:</span>
                <strong>${data.vehicleMake} ${data.vehicleModel}</strong>
              </div>
              <div class="invoice-meta">
                <span>Issue Date:</span>
                <strong>${data.issueDate}</strong>
              </div>
              <div class="invoice-meta">
                <span>Due Date:</span>
                <strong>${data.dueDate}</strong>
              </div>
            </div>

            <!-- Items Table -->
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Totals -->
            <div class="totals">
              <div class="totals-row subtotal">
                <span>Subtotal</span>
                <strong>£${(data.subtotal / 100).toFixed(2)}</strong>
              </div>
              <div class="totals-row vat">
                <span>VAT (${data.vatRate}%)</span>
                <strong>£${(data.vatAmount / 100).toFixed(2)}</strong>
              </div>
              <div class="totals-row total">
                <span>Total Amount</span>
                <strong>£${(data.total / 100).toFixed(2)}</strong>
              </div>
              ${
                data.paidAmount > 0
                  ? `
              <div class="totals-row paid">
                <span>Amount Paid</span>
                <strong>-£${(data.paidAmount / 100).toFixed(2)}</strong>
              </div>
              `
                  : ""
              }
              <div class="totals-row balance">
                <span>${data.balanceDue > 0 ? "Balance Due" : "Paid in Full"}</span>
                <strong>${data.balanceDue > 0 ? `£${(data.balanceDue / 100).toFixed(2)}` : "£0.00"}</strong>
              </div>
            </div>

            ${
              data.balanceDue > 0 && data.paymentUrl
                ? `
            <div style="text-align: center;">
              <a href="${data.paymentUrl}" class="payment-button">Pay Now</a>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="footer">
            <p><strong>Thank you for your business!</strong></p>
            <p>If you have any questions about this invoice, please contact us.</p>
            ${data.garageEmail ? `<p>Email: ${data.garageEmail} ${data.garagePhone ? `| Phone: ${data.garagePhone}` : ""}</p>` : ""}
          </div>
        </div>
      </body>
    </html>
  `;
};

// POST send invoice email
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const guard = await requireInvoiceAccess(req, id);
    if ("response" in guard) return guard.response;

    // Get invoice with all related data
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
      },
    }) as any;

    if (!invoice || !invoice.job) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const job = invoice.job;

    // Get customer email from vehicle owner
    const customerEmail = job.vehicle.ownerEmail;
    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email not found" },
        { status: 400 }
      );
    }

    // Get Resend configuration
    let apiKey = await getApiKey("RESEND_API_KEY");
    let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
    const fromName =
      (await getApiKey("RESEND_FROM_NAME")) ||
      job.garage?.name ||
      "Garage Boost";

    if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
    if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Prepare invoice data for email
    const items = job.items.map((item: any) => ({
      type: item.type,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPricePence,
      total: item.totalPence,
    }));

    const emailData = {
      garageName: job.garage?.name || "Garage Boost",
      garageAddress: job.garage?.address || undefined,
      garagePhone: job.garage?.phone || undefined,
      garageEmail: job.garage?.email || undefined,
      customerName: job.vehicle.ownerName,
      invoiceNumber: invoice.invoiceNumber,
      jobNumber: job.jobNumber,
      vehicleVrm: job.vehicle.vrm,
      vehicleMake: job.vehicle.make,
      vehicleModel: job.vehicle.model,
      issueDate: formatUKDate(invoice.issuedDate, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dueDate: formatUKDate(invoice.dueDate, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items,
      subtotal: invoice.subtotalPence,
      vatRate: job.vatRate ?? 20,
      vatAmount: invoice.vatPence,
      total: invoice.totalPence,
      paidAmount: invoice.paidPence,
      balanceDue: invoice.balancePence,
      paymentUrl: undefined, // TODO: Add Stripe payment link when implemented
    };

    // Send email
    const { error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      replyTo: job.garage?.email || undefined,
      to: customerEmail,
      subject: `Invoice ${invoice.invoiceNumber} from ${emailData.garageName}`,
      html: buildInvoiceEmailHtml(emailData),
    });

    if (error) {
      console.error("Failed to send invoice email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Invoice email sent successfully",
    });
  } catch (error) {
    console.error("Error sending invoice email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
