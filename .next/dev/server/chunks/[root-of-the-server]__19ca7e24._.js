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
"[project]/src/app/api/invoices/[id]/email/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-guards.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/admin/config/route.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/uk-date.ts [app-route] (ecmascript)");
;
;
;
;
;
;
// Build professional invoice email HTML
const buildInvoiceEmailHtml = (data)=>{
    const itemsHtml = data.items.map((item)=>`
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
      `).join("");
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
              ${data.paidAmount > 0 ? `
              <div class="totals-row paid">
                <span>Amount Paid</span>
                <strong>-£${(data.paidAmount / 100).toFixed(2)}</strong>
              </div>
              ` : ""}
              <div class="totals-row balance">
                <span>${data.balanceDue > 0 ? "Balance Due" : "Paid in Full"}</span>
                <strong>${data.balanceDue > 0 ? `£${(data.balanceDue / 100).toFixed(2)}` : "£0.00"}</strong>
              </div>
            </div>

            ${data.balanceDue > 0 && data.paymentUrl ? `
            <div style="text-align: center;">
              <a href="${data.paymentUrl}" class="payment-button">Pay Now</a>
            </div>
            ` : ""}
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
async function POST(req, { params }) {
    const { id } = await params;
    try {
        const guard = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireInvoiceAccess"])(req, id);
        if ("response" in guard) return guard.response;
        // Get invoice with all related data
        const invoice = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].invoice.findUnique({
            where: {
                id
            },
            include: {
                job: {
                    include: {
                        vehicle: true,
                        items: true,
                        garage: true
                    }
                }
            }
        });
        if (!invoice || !invoice.job) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invoice not found"
            }, {
                status: 404
            });
        }
        const job = invoice.job;
        // Get customer email from vehicle owner
        const customerEmail = job.vehicle.ownerEmail;
        if (!customerEmail) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Customer email not found"
            }, {
                status: 400
            });
        }
        // Get Resend configuration
        let apiKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_API_KEY");
        let fromEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_FROM_EMAIL");
        const fromName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("RESEND_FROM_NAME") || job.garage?.name || "Garage Boost";
        if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
        if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;
        if (!apiKey || !fromEmail) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email service is not configured"
            }, {
                status: 500
            });
        }
        const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](apiKey);
        // Prepare invoice data for email
        const items = job.items.map((item)=>({
                type: item.type,
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.unitPricePence,
                total: item.totalPence
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
            issueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatUKDate"])(invoice.issuedDate, {
                year: "numeric",
                month: "long",
                day: "numeric"
            }),
            dueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatUKDate"])(invoice.dueDate, {
                year: "numeric",
                month: "long",
                day: "numeric"
            }),
            items,
            subtotal: invoice.subtotalPence,
            vatRate: job.vatRate ?? 20,
            vatAmount: invoice.vatPence,
            total: invoice.totalPence,
            paidAmount: invoice.paidPence,
            balanceDue: invoice.balancePence,
            paymentUrl: undefined
        };
        // Send email
        const { error } = await resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            replyTo: job.garage?.email || undefined,
            to: customerEmail,
            subject: `Invoice ${invoice.invoiceNumber} from ${emailData.garageName}`,
            html: buildInvoiceEmailHtml(emailData)
        });
        if (error) {
            console.error("Failed to send invoice email:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to send email"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Invoice email sent successfully"
        });
    } catch (error) {
        console.error("Error sending invoice email:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__19ca7e24._.js.map