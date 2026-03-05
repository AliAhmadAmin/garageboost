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
"[project]/src/lib/access-control.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAssignmentScope",
    ()=>getAssignmentScope,
    "isGarageOwnerRole",
    ()=>isGarageOwnerRole,
    "isGarageStaffRole",
    ()=>isGarageStaffRole,
    "isManagerAccessRole",
    ()=>isManagerAccessRole,
    "normalizeAccessRole",
    ()=>normalizeAccessRole
]);
const isGarageOwnerRole = (role)=>role === "GARAGE_OWNER";
const isGarageStaffRole = (role)=>role === "GARAGE_STAFF";
const isManagerAccessRole = (accessRole)=>accessRole === "OWNER" || accessRole === "MANAGER";
const getAssignmentScope = (accessRole)=>{
    if (isManagerAccessRole(accessRole)) return "ALL";
    return "ASSIGNED";
};
const normalizeAccessRole = (accessRole)=>{
    switch(accessRole){
        case "OWNER":
        case "MANAGER":
        case "TECHNICIAN":
        case "SERVICE_ADVISOR":
        case "ACCOUNTANT":
        case "READ_ONLY":
            return accessRole;
        default:
            return "TECHNICIAN";
    }
};
}),
"[project]/src/lib/auth-guards.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requireBookingAccess",
    ()=>requireBookingAccess,
    "requireCustomerAccess",
    ()=>requireCustomerAccess,
    "requireGarageAccess",
    ()=>requireGarageAccess,
    "requireGarageAdminAccess",
    ()=>requireGarageAdminAccess,
    "requireInvoiceAccess",
    ()=>requireInvoiceAccess,
    "requireJobAccess",
    ()=>requireJobAccess,
    "requireQuoteAccess",
    ()=>requireQuoteAccess,
    "requireReminderAccess",
    ()=>requireReminderAccess,
    "requireReviewAccess",
    ()=>requireReviewAccess,
    "requireServiceAccess",
    ()=>requireServiceAccess,
    "requireSession",
    ()=>requireSession,
    "requireVehicleAccess",
    ()=>requireVehicleAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/access-control.ts [app-route] (ecmascript)");
;
;
;
;
const deny = (status, message)=>{
    return {
        response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status
        })
    };
};
const requireSession = async (request)=>{
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionFromRequest"])(request);
    if (!session) return deny(401, "Unauthorized");
    return {
        session
    };
};
const requireGarageAccess = async (request, garageId)=>{
    if (!garageId) return deny(400, "garageId is required");
    const sessionResult = await requireSession(request);
    if ("response" in sessionResult) return sessionResult;
    const { session } = sessionResult;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminRole"])(session.role)) return sessionResult;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isGarageOwnerRole"])(session.role)) {
        const garage = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].garage.findFirst({
            where: {
                id: garageId,
                ownerId: session.sub
            },
            select: {
                id: true
            }
        });
        if (!garage) return deny(403, "Forbidden");
        return sessionResult;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isGarageStaffRole"])(session.role)) {
        const staff = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].staff.findFirst({
            where: {
                garageId,
                userId: session.sub,
                active: true
            },
            select: {
                id: true,
                accessRole: true,
                garageId: true
            }
        });
        if (!staff) return deny(403, "Forbidden");
        return {
            session,
            staff
        };
    }
    return deny(403, "Forbidden");
};
const requireGarageAdminAccess = async (request, garageId)=>{
    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) return guard;
    if (!guard.staff) return guard;
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssignmentScope"])(guard.staff.accessRole);
    if (scope !== "ALL") return deny(403, "Forbidden");
    return guard;
};
const requireVehicleAccess = async (request, vehicleId)=>{
    if (!vehicleId) return deny(400, "vehicleId is required");
    const vehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.findUnique({
        where: {
            id: vehicleId
        },
        select: {
            id: true,
            garageId: true
        }
    });
    if (!vehicle) return deny(404, "Vehicle not found");
    return requireGarageAccess(request, vehicle.garageId);
};
const requireJobAccess = async (request, jobId)=>{
    if (!jobId) return deny(400, "jobId is required");
    const job = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].job.findUnique({
        where: {
            id: jobId
        },
        select: {
            id: true,
            garageId: true,
            assignedToId: true
        }
    });
    if (!job) return deny(404, "Job not found");
    const guard = await requireGarageAccess(request, job.garageId);
    if ("response" in guard) return guard;
    if (guard.staff) {
        const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssignmentScope"])(guard.staff.accessRole);
        if (scope === "ASSIGNED" && job.assignedToId !== guard.staff.id) {
            return deny(403, "Forbidden");
        }
    }
    return guard;
};
const requireQuoteAccess = async (request, quoteId)=>{
    if (!quoteId) return deny(400, "quoteId is required");
    const quote = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].quote.findUnique({
        where: {
            id: quoteId
        },
        select: {
            id: true,
            garageId: true
        }
    });
    if (!quote) return deny(404, "Quote not found");
    return requireGarageAccess(request, quote.garageId);
};
const requireInvoiceAccess = async (request, invoiceId)=>{
    if (!invoiceId) return deny(400, "invoiceId is required");
    const invoice = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].invoice.findUnique({
        where: {
            id: invoiceId
        },
        select: {
            id: true,
            job: {
                select: {
                    garageId: true
                }
            }
        }
    });
    if (!invoice || !invoice.job?.garageId) return deny(404, "Invoice not found");
    return requireGarageAccess(request, invoice.job.garageId);
};
const requireCustomerAccess = async (request, customerId)=>{
    if (!customerId) return deny(400, "customerId is required");
    const customer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].customer.findUnique({
        where: {
            id: customerId
        },
        select: {
            id: true,
            garageId: true
        }
    });
    if (!customer) return deny(404, "Customer not found");
    return requireGarageAccess(request, customer.garageId);
};
const requireServiceAccess = async (request, serviceId)=>{
    if (!serviceId) return deny(400, "serviceId is required");
    const service = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].service.findUnique({
        where: {
            id: serviceId
        },
        select: {
            id: true,
            garageId: true
        }
    });
    if (!service) return deny(404, "Service not found");
    return requireGarageAccess(request, service.garageId);
};
const requireBookingAccess = async (request, bookingId)=>{
    if (!bookingId) return deny(400, "bookingId is required");
    const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].booking.findUnique({
        where: {
            id: bookingId
        },
        select: {
            id: true,
            garageId: true,
            staffId: true
        }
    });
    if (!booking) return deny(404, "Booking not found");
    const guard = await requireGarageAccess(request, booking.garageId);
    if ("response" in guard) return guard;
    if (guard.staff) {
        const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssignmentScope"])(guard.staff.accessRole);
        if (scope === "ASSIGNED" && booking.staffId !== guard.staff.id) {
            return deny(403, "Forbidden");
        }
    }
    return guard;
};
const requireReviewAccess = async (request, reviewId)=>{
    if (!reviewId) return deny(400, "reviewId is required");
    const review = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].review.findUnique({
        where: {
            id: reviewId
        },
        select: {
            id: true,
            garageId: true
        }
    });
    if (!review) return deny(404, "Review not found");
    return requireGarageAccess(request, review.garageId);
};
const requireReminderAccess = async (request, reminderId)=>{
    if (!reminderId) return deny(400, "reminderId is required");
    const reminder = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].reminder.findUnique({
        where: {
            id: reminderId
        },
        select: {
            id: true,
            vehicle: {
                select: {
                    garageId: true
                }
            }
        }
    });
    if (!reminder || !reminder.vehicle?.garageId) return deny(404, "Reminder not found");
    return requireGarageAccess(request, reminder.vehicle.garageId);
};
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
"[project]/src/app/api/invoices/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-guards.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email-templates.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/admin/config/route.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const garageId = searchParams.get("garageId");
    const guard = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireGarageAccess"])(request, garageId);
    if ("response" in guard) return guard.response;
    const where = {};
    if (status) where.status = status;
    if (garageId) {
        where.job = {
            garageId
        };
    }
    const invoices = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].invoice.findMany({
        where,
        include: {
            job: {
                include: {
                    vehicle: true,
                    items: true
                }
            },
            payments: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(invoices);
}
async function POST(request) {
    const body = await request.json();
    const guard = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireJobAccess"])(request, body.jobId);
    if ("response" in guard) return guard.response;
    // Get job details
    const job = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].job.findUnique({
        where: {
            id: body.jobId
        },
        include: {
            items: true,
            vehicle: true,
            garage: {
                select: {
                    vatEnabled: true
                }
            }
        }
    });
    if (!job) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Job not found"
        }, {
            status: 404
        });
    }
    // Generate invoice number
    const today = new Date();
    const year = today.getFullYear();
    const count = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].invoice.count({
        where: {
            invoiceNumber: {
                startsWith: `INV-${year}-`
            }
        }
    });
    const invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, "0")}`;
    // Calculate amounts from job items (recalculate to ensure accuracy)
    let laborTotal = 0;
    let partsTotal = 0;
    if (job.items && job.items.length > 0) {
        job.items.forEach((item)=>{
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
    console.log("[Invoice Create] Items breakdown:", job.items?.map((i)=>({
            name: i.name,
            type: i.type,
            unitPrice: i.unitPricePence,
            quantity: i.quantity,
            total: i.totalPence
        })));
    const subtotalPence = laborTotal + partsTotal - (job.discountPence || 0);
    const vatRate = job.garage?.vatEnabled === false ? 0 : job.vatRate ?? 20;
    const vatPence = Math.round(subtotalPence * (vatRate / 100));
    const totalPence = subtotalPence + vatPence;
    console.log("[Invoice Create] Subtotal:", subtotalPence, "VAT:", vatPence, "Total:", totalPence);
    // Set due date (default 30 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    const invoice = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].invoice.create({
        data: {
            invoiceNumber,
            jobId: job.id,
            subtotalPence,
            vatPence,
            totalPence,
            balancePence: totalPence,
            dueDate: body.dueDate ? new Date(body.dueDate) : dueDate,
            notes: body.notes,
            source: job.source || "GARAGE"
        },
        include: {
            job: {
                include: {
                    vehicle: true,
                    items: true
                }
            },
            payments: true
        }
    });
    // Update job status to INVOICED and sync totals
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].job.update({
        where: {
            id: job.id
        },
        data: {
            status: "INVOICED",
            laborTotal,
            partsTotal,
            vatRate,
            totalPence
        }
    });
    // Send invoice email to customer
    try {
        let apiKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_API_KEY");
        let fromEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_FROM_EMAIL");
        const fromName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_FROM_NAME") || process.env.NEXT_PUBLIC_APP_NAME || "Garage Boost";
        // Fallback to environment variables if not in database
        if (!apiKey) apiKey = process.env.RESEND_API_KEY ?? null;
        if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL ?? null;
        // Get garage and vehicle details
        const garage = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].garage.findUnique({
            where: {
                id: job.garageId
            },
            select: {
                name: true,
                phone: true,
                email: true,
                address: true,
                postcode: true
            }
        });
        const vehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.findUnique({
            where: {
                id: job.vehicleId
            },
            select: {
                make: true,
                model: true,
                vrm: true
            }
        });
        const customerEmail = job.vehicle.ownerEmail;
        const customerName = job.vehicle.ownerName;
        if (apiKey && fromEmail && customerEmail && !customerEmail.includes("@noemail.local")) {
            const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](apiKey);
            // Format invoice items for email
            const invoiceItems = (job.items || []).map((item)=>({
                    description: item.name,
                    quantity: item.quantity,
                    price: `£${(item.unitPricePence / 100).toFixed(2)}`,
                    totalPence: item.totalPence
                }));
            const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2d$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildInvoiceEmailHtml"])({
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
                vehicleInfo: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.vrm})` : undefined
            });
            await resend.emails.send({
                from: `${garage?.name || fromName} <${fromEmail}>`,
                to: customerEmail,
                subject: `📄 Invoice ${invoice.invoiceNumber} - ${garage?.name || "Garage Boost"}`,
                html
            });
            console.log("[Invoice] Email sent to:", customerEmail);
        }
    } catch (error) {
        console.error("[Invoice] Failed to send invoice email:", error);
    // Don't fail the invoice creation if email fails
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(invoice, {
        status: 201
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a1760afd._.js.map