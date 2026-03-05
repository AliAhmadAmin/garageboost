module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const prisma = global.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        "error",
        "warn"
    ]
});
if ("TURBOPACK compile-time truthy", 1) {
    global.prisma = prisma;
}
}),
"[project]/src/lib/availability.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkStaffAvailability",
    ()=>checkStaffAvailability,
    "getAvailableSlots",
    ()=>getAvailableSlots,
    "getAvailableStaff",
    ()=>getAvailableStaff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
async function checkStaffAvailability(garageId, staffId, date, startTime, durationMinutes, excludeJobId, excludeBookingId) {
    if (!staffId) {
        // If no staff assigned, any time is available
        return {
            available: true
        };
    }
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const startDate = new Date(`${date}T${startTime}:00`);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    // Check bookings for this staff
    const conflictingBookings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.findMany({
        where: {
            garageId,
            staffId,
            bookingDate: {
                gte: new Date(date),
                lt: new Date(new Date(date).getTime() + 24 * 60 * 60000)
            },
            status: {
                in: [
                    "PENDING",
                    "CONFIRMED"
                ]
            },
            id: excludeBookingId ? {
                not: excludeBookingId
            } : undefined
        },
        include: {
            service: true
        }
    });
    // Check for time conflicts with bookings
    for (const booking of conflictingBookings){
        const [bookingHour, bookingMinute] = booking.bookingTime.split(":").map(Number);
        const bookingStart = new Date(`${date}T${booking.bookingTime}:00`);
        const bookingEnd = new Date(bookingStart.getTime() + (booking.service.durationMinutes || 60) * 60000);
        // Check if times overlap
        if (startDate < bookingEnd && endDate > bookingStart) {
            return {
                available: false,
                conflict: `Conflict with booking at ${booking.bookingTime} (${booking.customerName})`
            };
        }
    }
    // Check jobs for this staff
    const conflictingJobs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].job.findMany({
        where: {
            garageId,
            assignedToId: staffId,
            bookedDate: {
                gte: new Date(date),
                lt: new Date(new Date(date).getTime() + 24 * 60 * 60000)
            },
            status: {
                in: [
                    "TODO",
                    "DOING"
                ]
            },
            id: excludeJobId ? {
                not: excludeJobId
            } : undefined
        }
    });
    // Check for time conflicts with jobs
    for (const job of conflictingJobs){
        if (job.startedAt) {
            const jobStart = job.startedAt;
            const jobEnd = new Date(jobStart.getTime() + (job.estimatedHours || 2) * 60 * 60000);
            if (startDate < jobEnd && endDate > jobStart) {
                return {
                    available: false,
                    conflict: `Conflict with job ${job.jobNumber}`
                };
            }
        }
    }
    return {
        available: true
    };
}
async function getAvailableStaff(garageId, date, startTime, durationMinutes) {
    const staff = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].staff.findMany({
        where: {
            garageId,
            active: true
        }
    });
    const availableStaff = [];
    for (const member of staff){
        const { available } = await checkStaffAvailability(garageId, member.id, date, startTime, durationMinutes);
        if (available) {
            availableStaff.push(member);
        }
    }
    return availableStaff;
}
async function getAvailableSlots(garageId, staffId, date, durationMinutes, workingHours = {
    start: 8,
    end: 17
} // 8am to 5pm default
) {
    const slots = [];
    // Generate 30-minute slots throughout the day
    for(let hour = workingHours.start; hour < workingHours.end; hour++){
        for(let minute = 0; minute < 60; minute += 30){
            const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
            const { available } = await checkStaffAvailability(garageId, staffId, date, timeStr, durationMinutes);
            if (available) {
                slots.push(timeStr);
            }
        }
    }
    return slots;
}
}),
"[project]/src/lib/uk-date.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UK_LOCALE",
    ()=>UK_LOCALE,
    "UK_TIME_ZONE",
    ()=>UK_TIME_ZONE,
    "formatUKDate",
    ()=>formatUKDate,
    "formatUKDateFromLocalDate",
    ()=>formatUKDateFromLocalDate
]);
const UK_LOCALE = "en-GB";
const UK_TIME_ZONE = "Europe/London";
const formatUKDate = (value, options = {
    day: "numeric",
    month: "short",
    year: "numeric"
})=>{
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat(UK_LOCALE, {
        timeZone: UK_TIME_ZONE,
        ...options
    }).format(date);
};
const formatUKDateFromLocalDate = (value, options = {
    day: "numeric",
    month: "short",
    year: "numeric"
})=>{
    const date = new Date(`${value}T00:00:00`);
    return formatUKDate(date, options);
};
}),
"[project]/src/lib/email-templates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildBookingConfirmationHtml",
    ()=>buildBookingConfirmationHtml,
    "buildInvoiceEmailHtml",
    ()=>buildInvoiceEmailHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/uk-date.ts [app-route] (ecmascript)");
;
const formatMoney = (pence)=>`£${(pence / 100).toFixed(2)}`;
const formatDate = (date)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatUKDate"])(date, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
function buildBookingConfirmationHtml(data) {
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
function buildInvoiceEmailHtml(data) {
    const rows = data.items.map((item)=>`
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px;">
            <div style="font-weight: 500;">${item.description}</div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 13px; font-weight: 500;">${item.price}</td>
        </tr>
      `).join("");
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
}),
"[project]/src/lib/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSessionFromRequest",
    ()=>getSessionFromRequest,
    "isAdminRole",
    ()=>isAdminRole,
    "signSession",
    ()=>signSession,
    "verifySession",
    ()=>verifySession
]);
const getSecret = ()=>{
    const secret = process.env.SESSION_SECRET;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return secret || "dev-session-secret";
};
const getCrypto = ()=>{
    if (globalThis.crypto?.subtle) return globalThis.crypto;
    throw new Error("Web Crypto API is not available");
};
const toBase64Url = (input)=>{
    const base64 = typeof Buffer !== "undefined" ? Buffer.from(input).toString("base64") : btoa(String.fromCharCode(...input));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const fromBase64Url = (input)=>{
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
    if (typeof Buffer !== "undefined") {
        return new Uint8Array(Buffer.from(padded, "base64"));
    }
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i += 1){
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};
const sign = async (data, secret)=>{
    const crypto = getCrypto();
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
    }, false, [
        "sign"
    ]);
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
    return toBase64Url(new Uint8Array(signature));
};
const verify = async (data, signature, secret)=>{
    const crypto = getCrypto();
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
    }, false, [
        "verify"
    ]);
    return crypto.subtle.verify("HMAC", key, fromBase64Url(signature), new TextEncoder().encode(data));
};
const signSession = async (payload)=>{
    const secret = getSecret();
    const header = toBase64Url(new TextEncoder().encode(JSON.stringify({
        alg: "HS256",
        typ: "JWT"
    })));
    const body = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
    const data = `${header}.${body}`;
    const signature = await sign(data, secret);
    return `${data}.${signature}`;
};
const verifySession = async (token)=>{
    if (!token) return null;
    const secret = getSecret();
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const data = `${header}.${body}`;
    const isValid = await verify(data, signature, secret);
    if (!isValid) return null;
    try {
        const payloadJson = new TextDecoder().decode(fromBase64Url(body));
        const payload = JSON.parse(payloadJson);
        if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
        if (!payload.sub || !payload.role) return null;
        return payload;
    } catch  {
        return null;
    }
};
const getSessionFromRequest = async (request)=>{
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionCookies = cookieHeader.split(";").map((item)=>item.trim()).filter((item)=>item.startsWith("garage-session="));
    const match = sessionCookies.length > 0 ? sessionCookies[sessionCookies.length - 1] : null;
    const token = match ? match.slice("garage-session=".length) : null;
    return verifySession(token);
};
const isAdminRole = (role)=>{
    return role === "ADMIN" || role === "SUPER_ADMIN" || role === "PLATFORM_ADMIN";
};
}),
"[project]/src/app/api/admin/config/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "getApiKey",
    ()=>getApiKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-route] (ecmascript)");
;
;
;
// Simple encryption (in production, use proper encryption library like crypto)
function encrypt(text) {
    return Buffer.from(text).toString("base64");
}
function decrypt(encoded) {
    return Buffer.from(encoded, "base64").toString("utf-8");
}
async function GET(request) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionFromRequest"])(request);
    if (!session || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminRole"])(session.role)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    try {
        const configs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].apiConfig.findMany({
            where: {
                isActive: true
            }
        });
        const configMap = configs.reduce((acc, config)=>{
            acc[config.key] = {
                key: config.key,
                value: decrypt(config.value),
                isActive: config.isActive
            };
            return acc;
        }, {});
        // Set default for REQUIRE_EMAIL_VERIFICATION if not configured
        if (!configMap["REQUIRE_EMAIL_VERIFICATION"]) {
            configMap["REQUIRE_EMAIL_VERIFICATION"] = {
                key: "REQUIRE_EMAIL_VERIFICATION",
                value: "false",
                isActive: true
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(configMap);
    } catch (error) {
        console.error("Failed to fetch API configs:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch configuration"
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionFromRequest"])(req);
    if (!session || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminRole"])(session.role)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    try {
        const body = await req.json();
        // Update or create each config
        for (const [key, config] of Object.entries(body)){
            const configData = config;
            if (!configData.value) continue; // Skip empty values
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].apiConfig.upsert({
                where: {
                    key
                },
                update: {
                    value: encrypt(configData.value),
                    isActive: configData.isActive,
                    updatedAt: new Date()
                },
                create: {
                    key,
                    value: encrypt(configData.value),
                    isActive: true
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Configuration saved"
        });
    } catch (error) {
        console.error("Failed to save API configs:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to save configuration"
        }, {
            status: 500
        });
    }
}
async function getApiKey(key) {
    try {
        const config = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].apiConfig.findUnique({
            where: {
                key,
                isActive: true
            }
        });
        if (!config) {
            // Return default for REQUIRE_EMAIL_VERIFICATION if not set
            if (key === "REQUIRE_EMAIL_VERIFICATION") return "false";
            return null;
        }
        return decrypt(config.value);
    } catch (error) {
        console.error(`Failed to get API key ${key}:`, error);
        return null;
    }
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[project]/src/lib/web-push.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendNewBookingPush",
    ()=>sendNewBookingPush
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$push$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/web-push/src/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
const db = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"];
let vapidConfigured = false;
function ensureVapidConfigured() {
    if (vapidConfigured) return true;
    const publicKey = ("TURBOPACK compile-time value", "BNbC0pJ-n_moXvMbSQ-4Vnv5Z-DdOKdDphl7dA9kAsGAEKA6-FmrlEUzW1Qb7DXPfStc1ANWBHVBVE5A--L9EJE");
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT || "mailto:cs@bizzboost.uk";
    if (!publicKey || !privateKey) {
        return false;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$push$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].setVapidDetails(subject, publicKey, privateKey);
    vapidConfigured = true;
    return true;
}
async function sendNewBookingPush(input) {
    if (!ensureVapidConfigured()) {
        return {
            sent: 0,
            removed: 0,
            skipped: true,
            reason: "VAPID keys not configured"
        };
    }
    const subscriptions = await db.webPushSubscription.findMany({
        where: {
            garageId: input.garageId
        },
        select: {
            id: true,
            endpoint: true,
            p256dh: true,
            auth: true
        }
    });
    if (subscriptions.length === 0) {
        return {
            sent: 0,
            removed: 0,
            skipped: true,
            reason: "No subscriptions"
        };
    }
    const bookingDate = input.bookingDate ? new Date(input.bookingDate) : null;
    const dateText = bookingDate && !Number.isNaN(bookingDate.getTime()) ? bookingDate.toLocaleDateString("en-GB") : "today";
    const bodyParts = [
        `${input.bookingNumber} for ${input.customerName}`,
        input.serviceName ? `• ${input.serviceName}` : "",
        input.bookingTime ? `• ${dateText} ${input.bookingTime}` : ""
    ].filter(Boolean);
    const payload = JSON.stringify({
        title: "New booking received",
        body: bodyParts.join(" "),
        url: "/garage/bookings",
        tag: "garage-new-booking",
        timestamp: Date.now()
    });
    let sent = 0;
    const staleIds = [];
    await Promise.all(subscriptions.map(async (subscription)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$web$2d$push$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sendNotification({
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth
                }
            }, payload);
            sent += 1;
        } catch (error) {
            const statusCode = error?.statusCode;
            if (statusCode === 404 || statusCode === 410) {
                staleIds.push(subscription.id);
            }
        }
    }));
    if (staleIds.length > 0) {
        await db.webPushSubscription.deleteMany({
            where: {
                id: {
                    in: staleIds
                }
            }
        });
    }
    return {
        sent,
        removed: staleIds.length,
        skipped: false
    };
}
}),
"[project]/src/app/api/bookings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$availability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/availability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-templates.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/admin/config/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$web$2d$push$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/web-push.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { garageId, serviceId, customerName, customerEmail, customerPhone, vehicleVrm, vehicleMake, vehicleModel, vehicleData, bookingDate, bookingTime, notes, staffId } = body;
        // Validation
        if (!garageId || !serviceId || !customerName || !customerPhone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Garage, service, name, and phone are required"
            }, {
                status: 400
            });
        }
        if (!bookingDate || !bookingTime) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Booking date and time are required"
            }, {
                status: 400
            });
        }
        // Verify service exists and get details
        const service = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].service.findUnique({
            where: {
                id: serviceId
            },
            include: {
                garage: true
            }
        });
        if (!service) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Service not found"
            }, {
                status: 404
            });
        }
        if (service.garageId !== garageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Service does not belong to this garage"
            }, {
                status: 400
            });
        }
        if (!service.isActive) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Service is not available for booking"
            }, {
                status: 400
            });
        }
        // Check staff availability if assigned
        if (staffId) {
            const dateStr = new Date(bookingDate).toISOString().split("T")[0];
            const { available, conflict } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$availability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkStaffAvailability"])(garageId, staffId, dateStr, bookingTime, service.durationMinutes);
            if (!available) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Staff member not available: ${conflict}`
                }, {
                    status: 409
                });
            }
        }
        const customerNameValue = String(customerName || "").trim();
        const customerPhoneValue = String(customerPhone || "").trim();
        const normalizedPhone = customerPhoneValue.replace(/\D/g, "");
        const fallbackEmail = normalizedPhone ? `phone-${normalizedPhone}@noemail.local` : `guest-${Date.now()}@noemail.local`;
        const customerEmailValue = String(customerEmail || "").trim().toLowerCase() || fallbackEmail;
        const vehicleVrmValue = String(vehicleVrm || "").replace(/\s/g, "").toUpperCase();
        const vehicleMakeValue = String(vehicleMake || vehicleData?.make || "").trim();
        const vehicleModelValue = String(vehicleModel || vehicleData?.model || "").trim();
        const motExpiryRaw = vehicleData?.motExpiry ? new Date(vehicleData.motExpiry) : null;
        const taxExpiryRaw = vehicleData?.taxExpiry ? new Date(vehicleData.taxExpiry) : null;
        const motExpiryValue = motExpiryRaw && !Number.isNaN(motExpiryRaw.getTime()) ? motExpiryRaw : null;
        const taxExpiryValue = taxExpiryRaw && !Number.isNaN(taxExpiryRaw.getTime()) ? taxExpiryRaw : null;
        const taxStatusValue = vehicleData?.taxStatus ? String(vehicleData.taxStatus) : null;
        const mileageValue = Number.isFinite(Number(vehicleData?.mileage)) ? Number(vehicleData?.mileage) : null;
        // Generate booking number
        const year = new Date().getFullYear();
        const count = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.count();
        const bookingNumber = `BK-${year}-${String(count + 1).padStart(3, "0")}`;
        // Create booking
        const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.create({
            data: {
                bookingNumber,
                garageId,
                serviceId,
                customerName: customerNameValue,
                customerEmail: customerEmailValue,
                customerPhone: customerPhoneValue,
                vehicleVrm: vehicleVrmValue || null,
                vehicleMake: vehicleMakeValue || null,
                vehicleModel: vehicleModelValue || null,
                bookingDate: new Date(bookingDate),
                bookingTime,
                notes,
                staffId: staffId || null,
                depositPence: service.depositRequired ? service.depositPence : 0,
                status: service.depositRequired ? "PENDING" : "CONFIRMED"
            },
            include: {
                service: true
            }
        });
        try {
            const customer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].customer.upsert({
                where: {
                    garageId_email: {
                        garageId,
                        email: customerEmailValue
                    }
                },
                update: {
                    name: customerNameValue,
                    phone: customerPhoneValue || null
                },
                create: {
                    garageId,
                    name: customerNameValue,
                    email: customerEmailValue,
                    phone: customerPhoneValue || null,
                    source: "ONLINE_BOOKING"
                }
            });
            if (vehicleVrmValue) {
                const existingVehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.findFirst({
                    where: {
                        garageId,
                        vrm: vehicleVrmValue
                    }
                });
                if (!existingVehicle) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.create({
                        data: {
                            garageId,
                            customerId: customer.id,
                            vrm: vehicleVrmValue,
                            make: vehicleMakeValue || "Unknown",
                            model: vehicleModelValue || "",
                            motExpiry: motExpiryValue || new Date(),
                            taxExpiry: taxExpiryValue || null,
                            taxStatus: taxStatusValue,
                            mileage: mileageValue || undefined,
                            ownerName: customerNameValue,
                            ownerEmail: customerEmailValue,
                            ownerPhone: customerPhoneValue || null
                        }
                    });
                } else {
                    const updateData = {
                        customerId: existingVehicle.customerId || customer.id,
                        ownerName: customerNameValue,
                        ownerEmail: customerEmailValue,
                        ownerPhone: customerPhoneValue || null
                    };
                    if (vehicleMakeValue) updateData.make = vehicleMakeValue;
                    if (vehicleModelValue) updateData.model = vehicleModelValue;
                    if (motExpiryValue) updateData.motExpiry = motExpiryValue;
                    if (taxExpiryValue) updateData.taxExpiry = taxExpiryValue;
                    if (taxStatusValue) updateData.taxStatus = taxStatusValue;
                    if (mileageValue !== null) updateData.mileage = mileageValue;
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.update({
                        where: {
                            id: existingVehicle.id
                        },
                        data: updateData
                    });
                }
            }
        } catch (error) {
            console.error("[Booking] CRM sync failed:", error);
        }
        // Send confirmation email to customer
        try {
            let apiKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_API_KEY");
            let fromEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_FROM_EMAIL");
            const fromName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_FROM_NAME") || process.env.NEXT_PUBLIC_APP_NAME || "Garage Boost";
            // Fallback to environment variables if not in database
            if (!apiKey) apiKey = process.env.RESEND_API_KEY ?? null;
            if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL ?? null;
            if (apiKey && fromEmail && customerEmailValue && !customerEmailValue.includes("@noemail.local")) {
                const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](apiKey);
                const garage = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].garage.findUnique({
                    where: {
                        id: garageId
                    },
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                        address: true,
                        postcode: true
                    }
                });
                const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildBookingConfirmationHtml"])({
                    bookingNumber: booking.bookingNumber,
                    customerName: customerNameValue,
                    customerEmail: customerEmailValue,
                    customerPhone: customerPhoneValue,
                    serviceName: booking.service.name,
                    serviceDescription: booking.service.description || undefined,
                    servicePricePence: booking.service.pricePence,
                    bookingDate: booking.bookingDate,
                    bookingTime: booking.bookingTime,
                    vehicleVrm: vehicleVrmValue || undefined,
                    vehicleMake: vehicleMakeValue || undefined,
                    vehicleModel: vehicleModelValue || undefined,
                    notes: booking.notes || undefined,
                    garageName: garage?.name || "Garage Boost",
                    garagePhone: garage?.phone || undefined,
                    garageEmail: garage?.email || undefined,
                    garageAddress: garage?.address || undefined,
                    garagePostcode: garage?.postcode || undefined,
                    depositRequired: booking.service.depositRequired,
                    depositPenceDue: booking.depositPence,
                    bookingStatus: booking.status
                });
                await resend.emails.send({
                    from: `${garage?.name || fromName} <${fromEmail}>`,
                    to: customerEmailValue,
                    subject: `✓ Booking Confirmed - ${booking.bookingNumber}`,
                    html
                });
                console.log("[Booking] Confirmation email sent to:", customerEmailValue);
            }
        } catch (error) {
            console.error("[Booking] Failed to send confirmation email:", error);
        // Don't fail the booking creation if email fails
        }
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$web$2d$push$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendNewBookingPush"])({
            garageId,
            bookingNumber: booking.bookingNumber,
            customerName: customerNameValue,
            serviceName: booking.service.name,
            bookingDate: booking.bookingDate,
            bookingTime: booking.bookingTime
        }).catch((error)=>{
            console.error("[Booking] Failed to send web push notification", error);
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            booking
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create booking"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f80bafac._.js.map