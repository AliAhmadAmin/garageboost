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
"[project]/src/app/api/quotes/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/admin/config/route.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const garageId = searchParams.get("garageId");
    const status = searchParams.get("status");
    const vehicleId = searchParams.get("vehicleId");
    if (garageId) {
        const guard = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireGarageAccess"])(request, garageId);
        if ("response" in guard) return guard.response;
    } else if (vehicleId) {
        const guard = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireVehicleAccess"])(request, vehicleId);
        if ("response" in guard) return guard.response;
    } else {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "garageId or vehicleId is required"
        }, {
            status: 400
        });
    }
    const where = {};
    if (garageId) where.garageId = garageId;
    if (status) where.status = status;
    if (vehicleId) where.vehicleId = vehicleId;
    const quotes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].quote.findMany({
        where,
        include: {
            vehicle: true,
            job: true,
            invoice: true,
            items: true,
            activities: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(quotes);
}
async function POST(request) {
    try {
        const body = await request.json();
        console.log("Quote POST received:", {
            vehicleVrm: body.vehicleVrm,
            garageId: body.garageId,
            itemCount: body.items?.length || 0
        });
        const guard = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$guards$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireGarageAccess"])(request, body.garageId);
        if ("response" in guard) return guard.response;
        // Validate required fields
        if (!body.vehicleVrm || !body.garageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields",
                details: "vehicleVrm and garageId are required"
            }, {
                status: 400
            });
        }
        // Generate quote number
        const today = new Date();
        const year = today.getFullYear();
        const count = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].quote.count({
            where: {
                quoteNumber: {
                    startsWith: `QT-${year}-`
                }
            }
        });
        const quoteNumber = `QT-${year}-${String(count + 1).padStart(4, "0")}`;
        console.log("Generated quote number:", quoteNumber);
        const garage = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].garage.findUnique({
            where: {
                id: body.garageId
            },
            select: {
                vatEnabled: true
            }
        });
        // Calculate totals
        const items = Array.isArray(body.items) ? body.items : [];
        const subtotalPence = items.reduce((sum, item)=>sum + (item.totalPence || 0), 0);
        const vatRate = garage?.vatEnabled === false ? 0 : body.vatRate ?? 20;
        const vatPence = Math.round(subtotalPence * (vatRate / 100));
        const totalPence = subtotalPence + vatPence;
        console.log("Totals:", {
            subtotalPence,
            vatRate,
            vatPence,
            totalPence
        });
        // Set expiry date (default 30 days from now, configurable)
        const validDaysRaw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$admin$2f$config$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])("QUOTE_VALID_DAYS");
        const validDays = validDaysRaw ? Number.parseInt(validDaysRaw, 10) : 30;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + (Number.isNaN(validDays) ? 30 : validDays));
        // Find or create vehicle
        let vehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.findFirst({
            where: {
                vrm: body.vehicleVrm,
                garageId: body.garageId
            }
        });
        console.log("Vehicle found/created:", vehicle?.id);
        if (!vehicle) {
            vehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.create({
                data: {
                    vrm: body.vehicleVrm,
                    make: body.vehicleMake || "Unknown",
                    model: body.vehicleModel || "Unknown",
                    motExpiry: new Date(body.motExpiry),
                    ownerName: body.customerName,
                    ownerEmail: body.customerEmail,
                    ownerPhone: body.customerPhone,
                    mileage: body.mileage || 0,
                    garageId: body.garageId
                }
            });
            console.log("Vehicle  created:", vehicle.id);
        }
        // Create quote with items
        const quote = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].quote.create({
            data: {
                quoteNumber,
                status: "DRAFT",
                issuedDate: new Date(),
                expiryDate,
                subtotalPence,
                vatRate,
                vatPence,
                totalPence,
                customerName: body.customerName,
                customerEmail: body.customerEmail,
                customerPhone: body.customerPhone || null,
                notes: body.notes,
                vehicleId: vehicle.id,
                garageId: body.garageId,
                jobId: body.jobId || null,
                items: {
                    create: items.map((item)=>({
                            type: item.type || "SERVICE",
                            name: item.name || "Item",
                            description: item.description,
                            quantity: item.quantity || 1,
                            unitPricePence: item.unitPricePence || 0,
                            totalPence: item.totalPence || 0
                        }))
                },
                activities: {
                    create: {
                        action: "CREATED",
                        details: "Quote created from advisory lookup"
                    }
                }
            },
            include: {
                vehicle: true,
                job: true,
                invoice: true,
                items: true,
                activities: true
            }
        });
        console.log("Quote created successfully:", quote.quoteNumber);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(quote, {
            status: 201
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : "";
        console.error("Quote POST error:", errorMessage);
        console.error("Error stack:", errorStack);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create quote",
            details: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__97adb73d._.js.map