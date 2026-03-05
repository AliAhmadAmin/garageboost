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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

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
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/src/lib/stripe.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripe",
    ()=>stripe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    typescript: true
});
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
"[project]/src/app/api/stripe/billing/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stripe.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(req) {
    try {
        // Get session
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionFromRequest"])(req);
        if (!session) {
            console.log('[Billing] ❌ No session found');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        console.log(`[Billing] 🔍 Session found, userId: ${session.sub}`);
        // Find garage for this user
        const garage = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].garage.findFirst({
            where: {
                ownerId: session.sub
            },
            select: {
                id: true,
                name: true,
                stripeCustomerId: true,
                stripeSubscriptionId: true
            }
        });
        if (!garage) {
            console.log('[Billing] ❌ Garage not found for user');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Garage not found'
            }, {
                status: 404
            });
        }
        console.log(`[Billing] ✓ Garage found: ${garage.name}`);
        console.log(`[Billing] Stripe Customer: ${garage.stripeCustomerId}`);
        console.log(`[Billing] Stripe Subscription: ${garage.stripeSubscriptionId}`);
        // If no Stripe customer ID, return empty data
        if (!garage.stripeCustomerId) {
            console.log('[Billing] ⚠️  No stripeCustomerId - returning empty billing data');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                paymentMethod: null,
                invoices: [],
                upcomingInvoice: null
            });
        }
        // Fetch payment method using multiple strategies
        let paymentMethod = null;
        try {
            let paymentMethodId = null;
            let foundSource = null;
            // Strategy 1: Get from subscription's default_payment_method (most reliable)
            if (garage.stripeSubscriptionId) {
                try {
                    const subscription = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].subscriptions.retrieve(garage.stripeSubscriptionId, {
                        expand: [
                            'default_payment_method'
                        ]
                    });
                    if ("TURBOPACK compile-time truthy", 1) {
                        console.log(`[Billing] Subscription default_payment_method:`, subscription.default_payment_method?.id || subscription.default_payment_method);
                    }
                    if (subscription.default_payment_method?.id) {
                        paymentMethodId = subscription.default_payment_method.id;
                        foundSource = 'subscription.default_payment_method (expanded)';
                    } else if (subscription.default_payment_method && typeof subscription.default_payment_method === 'string') {
                        paymentMethodId = subscription.default_payment_method;
                        foundSource = 'subscription.default_payment_method (string)';
                    }
                } catch (error) {
                    console.error('[Billing] Error fetching subscription payment method:', error);
                }
            }
            // Strategy 2: Get from customer's default payment method
            if (!paymentMethodId) {
                try {
                    const customer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].customers.retrieve(garage.stripeCustomerId, {
                        expand: [
                            'invoice_settings.default_payment_method'
                        ]
                    });
                    if ("TURBOPACK compile-time truthy", 1) {
                        console.log(`[Billing] Customer default_payment_method:`, customer.invoice_settings?.default_payment_method?.id);
                    }
                    if (customer.invoice_settings?.default_payment_method?.id) {
                        paymentMethodId = customer.invoice_settings.default_payment_method.id;
                        foundSource = 'customer.invoice_settings.default_payment_method';
                    }
                } catch (error) {
                    console.error('[Billing] Error fetching customer payment method:', error);
                }
            }
            // Strategy 3: List all payment methods for this customer
            if (!paymentMethodId) {
                try {
                    const paymentMethods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].paymentMethods.list({
                        customer: garage.stripeCustomerId,
                        type: 'card',
                        limit: 1
                    });
                    if ("TURBOPACK compile-time truthy", 1) {
                        console.log(`[Billing] Payment methods found:`, paymentMethods.data.length);
                    }
                    if (paymentMethods.data.length > 0) {
                        paymentMethodId = paymentMethods.data[0].id;
                        foundSource = 'paymentMethods.list()';
                    }
                } catch (error) {
                    console.error('[Billing] Error listing payment methods:', error);
                }
            }
            // Retrieve and format the payment method if found
            if (paymentMethodId) {
                try {
                    const pm = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].paymentMethods.retrieve(paymentMethodId);
                    if (pm.card) {
                        paymentMethod = {
                            brand: pm.card.brand,
                            last4: pm.card.last4,
                            expMonth: pm.card.exp_month,
                            expYear: pm.card.exp_year,
                            cardholderName: pm.billing_details?.name || null
                        };
                        if ("TURBOPACK compile-time truthy", 1) {
                            console.log(`[Billing] ✅ Payment method found (from ${foundSource}):`, paymentMethod);
                        }
                    }
                } catch (error) {
                    console.error('[Billing] Error retrieving payment method details:', error);
                }
            } else {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log(`[Billing] ⚠️  No payment method ID found using any strategy`);
                }
            }
        } catch (error) {
            console.error('[Billing] Unexpected error fetching payment method:', error);
        }
        // Fetch invoices (all of them, not just recent)
        let invoices = [];
        try {
            const invoiceList = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].invoices.list({
                customer: garage.stripeCustomerId,
                limit: 100
            });
            if ("TURBOPACK compile-time truthy", 1) {
                console.log(`[Billing] Invoices found:`, invoiceList.data.length);
            }
            invoices = invoiceList.data.map((invoice)=>({
                    id: invoice.id,
                    number: invoice.number,
                    amountDue: invoice.amount_due,
                    amountPaid: invoice.amount_paid,
                    currency: invoice.currency,
                    status: invoice.status,
                    created: invoice.created,
                    hostedInvoiceUrl: invoice.hosted_invoice_url,
                    invoicePdf: invoice.invoice_pdf,
                    description: invoice.lines.data[0]?.description || 'Subscription payment'
                }));
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
        // Fetch upcoming invoice (skip for now due to API complexity)
        let upcomingInvoice = null;
        // Can be implemented later with proper subscription billing cycle tracking
        console.log(`[Billing] 📊 Final response: paymentMethod=${!!paymentMethod}, invoices=${invoices.length}`);
        if (paymentMethod) {
            console.log(`[Billing]   Card: ${paymentMethod.brand} ****${paymentMethod.last4}, holder=${paymentMethod.cardholderName}`);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            paymentMethod,
            invoices,
            upcomingInvoice
        });
    } catch (error) {
        console.error('Error fetching billing data:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch billing data'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__549cac63._.js.map