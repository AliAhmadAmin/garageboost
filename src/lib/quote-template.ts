import { formatUKDate } from "./uk-date";
import { vehicleTitle } from "./vehicle";

export interface QuoteItemLike {
  name: string;
  totalPence: number;
  description?: string;
}

export interface GarageLike {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  postcode?: string;
  website?: string;
}

export interface VehicleLike {
  make?: string;
  model?: string;
  typeApproval?: string;
  vrm?: string;
  motExpiry?: string | Date;
}

export interface QuoteLike {
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  subtotalPence: number;
  vatRate?: number;
  vatPence: number;
  totalPence: number;
  expiryDate: string | Date;
  items: QuoteItemLike[];
  garage?: GarageLike;
  vehicle?: VehicleLike;
}

const formatMoney = (pence: number) => `£${(pence / 100).toFixed(2)}`;
const formatDate = (date: string | Date) =>
  formatUKDate(date, { year: "numeric", month: "short", day: "numeric" });

export function buildQuoteHtml(quote: QuoteLike) {
  const garage = quote.garage || { name: "Garage Boost" };
  const expiryDate = formatDate(quote.expiryDate);
  const daysUntilExpiry = Math.ceil((new Date(quote.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysUntilExpiry <= 7;
  const derivedVatRate = quote.subtotalPence > 0
    ? Math.round((quote.vatPence / quote.subtotalPence) * 100)
    : 0;
  const vatRateLabel = quote.vatRate ?? derivedVatRate;

  const rows = quote.items
    .map(
      (item: QuoteItemLike) => `
        <tr>
          <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px;">
            <div style="font-weight:600;">${item.name}</div>
            ${item.description ? `<div style="font-size:12px; color:#6b7280;">${item.description}</div>` : ''}
          </td>
          <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right; font-weight:500;">${formatMoney(item.totalPence)}</td>
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
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px 20px; }
          .vehicle-card { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 14px; }
          .vehicle-info { margin: 8px 0; }
          .label { font-weight: 600; color: #1f2937; }
          .value { color: #4b5563; }
          .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .cta-button:hover { background: #2563eb; }
          .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .contact-section h3 { margin-top: 0; color: #1f2937; font-size: 14px; }
          .contact-item { margin: 10px 0; font-size: 13px; }
          .contact-item a { color: #3b82f6; text-decoration: none; }
          .quote-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .quote-table thead { background: #f3f4f6; }
          .quote-table th { text-align: left; padding: 12px 0; color: #1f2937; font-weight: 600; font-size: 12px; text-transform: uppercase; }
          .quote-total-row-main { background: #f3f4f6; }
          .quote-total-row-main td { padding: 12px 0; font-weight: 700; font-size: 16px; }
          .expiry-warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px; margin: 20px 0; border-radius: 4px; color: #991b1b; font-size: 13px; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 ${garage.name}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Service Quote</p>
          </div>

          <div class="content">
            <p style="color: #4b5563; margin-bottom: 20px;">Hi ${quote.customerName},</p>
            <p style="color: #4b5563; margin-bottom: 20px;">Here's your detailed quote. The quote is valid until <strong>${expiryDate}</strong>${isExpiringSoon ? ' - it expires soon!' : ''}.</p>

            ${quote.vehicle?.make ? `
            <div class="vehicle-card">
              <div class="vehicle-info"><span class="label">Vehicle:</span> <span class="value">${vehicleTitle(quote.vehicle)}</span></div>
              <div class="vehicle-info"><span class="label">Registration:</span> <span class="value">${quote.vehicle.vrm || 'N/A'}</span></div>
              ${quote.vehicle.motExpiry ? `<div class="vehicle-info"><span class="label">MOT Expires:</span> <span class="value">${formatDate(quote.vehicle.motExpiry)}</span></div>` : ''}
            </div>
            ` : ''}

            <table class="quote-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding: 12px 0; text-align: right;">Subtotal:</td>
                  <td style="padding: 12px 0; text-align: right;">${formatMoney(quote.subtotalPence)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; text-align: right;">VAT (${vatRateLabel}%):</td>
                  <td style="padding: 6px 0; text-align: right;">${formatMoney(quote.vatPence)}</td>
                </tr>
                <tr class="quote-total-row-main">
                  <td style="padding: 12px 0; text-align: right; color: #0d9488;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; color: #0d9488;">${formatMoney(quote.totalPence)}</td>
                </tr>
              </tfoot>
            </table>

            ${isExpiringSoon ? `<div class="expiry-warning">⚠️ This quote expires on ${expiryDate}. Please confirm your acceptance soon.</div>` : ''}

            <p style="text-align: center; margin: 30px 0 20px;">
              <a href="#" class="cta-button" style="color: #ffffff !important; text-decoration: none;">✓ Accept Quote</a>
            </p>

            <div class="contact-section">
              <h3>📞 Get in Touch</h3>
              ${garage.phone ? `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${garage.phone}">${garage.phone}</a></div>` : ''}
              ${garage.email ? `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${garage.email}">${garage.email}</a></div>` : ''}
              ${garage.address ? `<div class="contact-item"><strong>Address:</strong> ${garage.address}${garage.postcode ? ', ' + garage.postcode : ''}</div>` : ''}
              ${garage.website ? `<div class="contact-item"><strong>Website:</strong> <a href="${garage.website}" target="_blank">${garage.website}</a></div>` : ''}
            </div>

            <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">If you have any questions or would like to discuss this quote further, please don't hesitate to contact us.</p>
          </div>

          <div class="footer">
            <p style="margin: 0;">This is an automated email from ${garage.name}. Please review the quote details and contact us if you need any changes.</p>
            <p style="margin: 8px 0 0;">© ${new Date().getFullYear()} ${garage.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
