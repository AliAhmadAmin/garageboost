import { formatUKDate } from "./uk-date";

export interface BookingConfirmationEmailData {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  serviceDescription?: string;
  servicePricePence: number;
  bookingDate: Date | string;
  bookingTime: string;
  vehicleVrm?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  notes?: string;
  garageName: string;
  garagePhone?: string;
  garageEmail?: string;
  garageAddress?: string;
  garagePostcode?: string;
  depositRequired: boolean;
  depositPenceDue?: number;
  bookingStatus: "PENDING" | "CONFIRMED";
}

const formatMoney = (pence: number) => `£${(pence / 100).toFixed(2)}`;
const formatDate = (date: string | Date) =>
  formatUKDate(date, { year: "numeric", month: "short", day: "numeric" });

export function buildBookingConfirmationHtml(data: BookingConfirmationEmailData) {
  const depositLabel = data.depositRequired ? `(${formatMoney(data.depositPenceDue || 0)} deposit due)` : "(No deposit required)";
  const statusBadge = data.bookingStatus === "PENDING" ? "⏳ Payment Pending" : "✓ Confirmed";
  const statusColor = data.bookingStatus === "PENDING" ? "#dc2626" : "#059669";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header-subtitle { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { background: white; padding: 30px 20px; }
          .booking-number { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .booking-number .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; }
          .booking-number .value { font-size: 24px; font-weight: 700; color: #1f2937; margin-top: 4px; }
          .status-badge { display: inline-block; padding: 6px 12px; border-radius: 4px; background: #f0fdf4; color: ${statusColor}; font-weight: 600; font-size: 12px; margin-top: 10px; }
          .section { margin: 25px 0; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 15px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #6b7280; font-weight: 500; }
          .detail-value { font-weight: 600; color: #1f2937; text-align: right; }
          .service-card { background: #f9fafb; border: 2px solid #e5e7eb; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .service-name { font-weight: 700; color: #1f2937; margin-bottom: 8px; }
          .service-price { font-size: 18px; font-weight: 700; color: #0891b2; }
          .vehicle-info { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 4px; }
          .vehicle-info .info-item { margin: 8px 0; }
          .vehicle-info .label { color: #1e40af; font-weight: 600; }
          .vehicle-info .value { color: #1f2937; }
          .cta-section { text-align: center; margin: 30px 0; }
          .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; }
          .cta-button:hover { background: #2563eb; }
          .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .contact-section h3 { margin-top: 0; color: #1f2937; font-size: 14px; font-weight: 600; }
          .contact-item { margin: 10px 0; font-size: 14px; }
          .contact-item a { color: #3b82f6; text-decoration: none; }
          .note-section { background: #fef9c3; border-left: 4px solid #eab308; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .note-section h4 { margin-top: 0; color: #854d0e; font-size: 12px; font-weight: 600; text-transform: uppercase; }
          .note-section p { margin: 5px 0; color: #78350f; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .greeting { font-size: 16px; color: #1f2937; margin: 0 0 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Booking Confirmed</h1>
            <p class="header-subtitle">${data.garageName}</p>
          </div>

          <div class="content">
            <p class="greeting">Hi ${data.customerName},</p>
            <p style="color: #4b5563; margin-bottom: 20px;">Thank you for booking with us! Your appointment has been confirmed. Below are your booking details.</p>

            <div class="booking-number">
              <div class="label">Booking Reference</div>
              <div class="value">${data.bookingNumber}</div>
              <div class="status-badge">${statusBadge}</div>
            </div>

            <div class="section">
              <div class="section-title">📍 Appointment Details</div>
              <div class="detail-row">
                <div class="detail-label">Date</div>
                <div class="detail-value">${formatDate(data.bookingDate)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Time</div>
                <div class="detail-value">${data.bookingTime}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Service</div>
                <div class="detail-value" style="text-align: right; max-width: 300px;">${data.serviceName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Price</div>
                <div class="detail-value">${formatMoney(data.servicePricePence)} ${depositLabel}</div>
              </div>
            </div>

            ${data.vehicleVrm ? `
            <div class="vehicle-info">
              <div class="info-item">
                <span class="label">Vehicle:</span>
                <span class="value">${data.vehicleMake || "Unknown"} ${data.vehicleModel || ""} (${data.vehicleVrm})</span>
              </div>
            </div>
            ` : ''}

            ${data.notes ? `
            <div class="note-section">
              <h4>📝 Additional Notes</h4>
              <p>${data.notes.replace(/\n/g, "<br>")}</p>
            </div>
            ` : ''}

            ${data.bookingStatus === "PENDING" ? `
            <div class="cta-section">
              <p style="color: #dc2626; font-weight: 600; margin-bottom: 15px;">⚠️ Payment Required</p>
              <p style="color: #4b5563; margin-bottom: 20px;">Complete your payment to confirm this booking:</p>
              <a href="#" class="cta-button" style="background: #dc2626;">💳 Complete Payment</a>
            </div>
            ` : `
            <div class="cta-section">
              <p style="color: #059669; font-weight: 600; margin-bottom: 15px;">✓ All Set</p>
              <p style="color: #4b5563;">We look forward to seeing you on the scheduled date.</p>
            </div>
            `}

            <div class="contact-section">
              <h3>📞 Need to Change Your Appointment?</h3>
              <p style="color: #4b5563; font-size: 13px; margin: 10px 0;">If you need to reschedule or cancel, please contact us as soon as possible.</p>
              ${data.garagePhone ? `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${data.garagePhone}">${data.garagePhone}</a></div>` : ''}
              ${data.garageEmail ? `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${data.garageEmail}">${data.garageEmail}</a></div>` : ''}
              ${data.garageAddress ? `<div class="contact-item"><strong>Address:</strong> ${data.garageAddress}${data.garagePostcode ? ', ' + data.garagePostcode : ''}</div>` : ''}
            </div>

            <p style="color: #6b7280; font-size: 13px;">Please arrive 5-10 minutes early on the day of your appointment. If you have any questions, don't hesitate to reach out.</p>
          </div>

          <div class="footer">
            <p style="margin: 0;">This is an automated email from ${data.garageName}. If you did not make this booking, please contact us immediately.</p>
            <p style="margin: 8px 0 0;">© ${new Date().getFullYear()} ${data.garageName}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export interface InvoiceEmailData {
  invoiceNumber: string;
  invoiceDate: Date | string;
  customerName: string;
  customerEmail: string;
  totalPence: number;
  subtotalPence: number;
  vatPence: number;
  vatRate: number;
  items: Array<{
    description: string;
    quantity: number;
    price: string;
    totalPence: number;
  }>;
  garageName: string;
  garagePhone?: string;
  garageEmail?: string;
  garageAddress?: string;
  garagePostcode?: string;
  jobDescripton?: string;
  vehicleInfo?: string;
}

export function buildInvoiceEmailHtml(data: InvoiceEmailData) {
  const rows = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px;">
            <div style="font-weight: 500;">${item.description}</div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 13px; font-weight: 500;">${item.price}</td>
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
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header-subtitle { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { background: white; padding: 30px 20px; }
          .invoice-header { background: #f3f4f6; padding: 20px; border-radius: 4px; margin: 20px 0; }
          .invoice-number { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; }
          .invoice-number-value { font-size: 20px; font-weight: 700; color: #1f2937; margin-top: 4px; }
          .invoice-date { color: #4b5563; font-size: 13px; margin-top: 10px; }
          .customer-section { margin: 20px 0; }
          .section-label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 8px; }
          .customer-name { font-weight: 600; color: #1f2937; }
          .customer-email { color: #4b5563; font-size: 13px; }
          .vehicle-info { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 4px; font-size: 13px; }
          .vehicle-info .label { color: #1e40af; font-weight: 600; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table thead { background: #f3f4f6; }
          .items-table th { text-align: left; padding: 12px 0; color: #1f2937; font-weight: 600; font-size: 12px; text-transform: uppercase; }
          .items-table td { padding: 12px 0; font-size: 13px; border-bottom: 1px solid #e5e7eb; }
          .total-section { margin: 20px 0; border-top: 2px solid #e5e7eb; padding-top: 15px; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total-row.final { font-weight: 700; font-size: 16px; color: #0891b8; border-top: 1px solid #e5e7eb; padding-top: 12px; }
          .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .contact-section h3 { margin-top: 0; color: #1f2937; font-size: 14px; font-weight: 600; }
          .contact-item { margin: 10px 0; font-size: 13px; }
          .contact-item a { color: #3b82f6; text-decoration: none; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .greeting { font-size: 16px; color: #1f2937; margin: 0 0 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 Invoice</h1>
            <p class="header-subtitle">${data.garageName}</p>
          </div>

          <div class="content">
            <p class="greeting">Hi ${data.customerName},</p>
            <p style="color: #4b5563; margin-bottom: 20px;">Thank you for your business! Please find your invoice details below.</p>

            <div class="invoice-header">
              <div class="invoice-number">Invoice Number</div>
              <div class="invoice-number-value">${data.invoiceNumber}</div>
              <div class="invoice-date">Issued: ${formatDate(data.invoiceDate)}</div>
            </div>

            <div class="customer-section">
              <div class="section-label">Bill To</div>
              <div class="customer-name">${data.customerName}</div>
              <div class="customer-email">${data.customerEmail}</div>
            </div>

            ${data.vehicleInfo ? `
            <div class="vehicle-info">
              <div class="label">Service Vehicle:</div>
              <div>${data.vehicleInfo}</div>
            </div>
            ` : ''}

            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatMoney(data.subtotalPence)}</span>
              </div>
              <div class="total-row">
                <span>VAT (${data.vatRate}%):</span>
                <span>${formatMoney(data.vatPence)}</span>
              </div>
              <div class="total-row final">
                <span>Total Due:</span>
                <span>${formatMoney(data.totalPence)}</span>
              </div>
            </div>

            <div class="contact-section">
              <h3>💼 Questions?</h3>
              <p style="color: #4b5563; font-size: 13px; margin: 10px 0;">If you have any questions about this invoice, please contact us:</p>
              ${data.garagePhone ? `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${data.garagePhone}">${data.garagePhone}</a></div>` : ''}
              ${data.garageEmail ? `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${data.garageEmail}">${data.garageEmail}</a></div>` : ''}
              ${data.garageAddress ? `<div class="contact-item"><strong>Address:</strong> ${data.garageAddress}${data.garagePostcode ? ', ' + data.garagePostcode : ''}</div>` : ''}
            </div>

            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">Thank you for choosing ${data.garageName}. We appreciate your business!</p>
          </div>

          <div class="footer">
            <p style="margin: 0;">This is an automated email from ${data.garageName} with your invoice details.</p>
            <p style="margin: 8px 0 0;">© ${new Date().getFullYear()} ${data.garageName}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
