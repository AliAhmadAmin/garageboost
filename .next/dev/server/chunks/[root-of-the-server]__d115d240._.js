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
"[project]/src/app/api/reminders/auto/process/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
function unauthorized() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
}
function parseCsv(csv, fallback) {
    const values = csv.split(",").map((value)=>Number(value.trim())).filter((value)=>Number.isFinite(value) && value > 0);
    const unique = Array.from(new Set(values)).sort((a, b)=>a - b);
    return unique.length > 0 ? unique : fallback;
}
function daysUntil(date) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return Math.round((target - start) / (1000 * 60 * 60 * 24));
}
function ukDate(value) {
    return value.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
function todayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
async function POST(request) {
    const cronSecret = process.env.AUTO_REMINDER_CRON_SECRET;
    if (cronSecret) {
        const headerSecret = request.headers.get("x-cron-secret");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    const garages = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].garage.findMany({
        select: {
            id: true,
            name: true,
            reminderConfig: {
                select: {
                    motEnabled: true,
                    taxEnabled: true,
                    motDaysCsv: true,
                    taxDaysCsv: true
                }
            }
        }
    });
    const runKey = todayKey();
    let scannedVehicles = 0;
    let queued = 0;
    let skippedNoEmail = 0;
    let skippedDuplicate = 0;
    for (const garage of garages){
        const motEnabled = garage.reminderConfig?.motEnabled ?? true;
        const taxEnabled = garage.reminderConfig?.taxEnabled ?? true;
        const motDays = parseCsv(garage.reminderConfig?.motDaysCsv ?? "30,14,7", [
            30,
            14,
            7
        ]);
        const taxDays = parseCsv(garage.reminderConfig?.taxDaysCsv ?? "30,14,7", [
            30,
            14,
            7
        ]);
        if (!motEnabled && !taxEnabled) {
            continue;
        }
        const maxDays = Math.max(0, ...motDays, ...taxDays) + 1;
        const now = new Date();
        const upperBound = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
        const orFilters = [];
        if (motEnabled) {
            orFilters.push({
                motExpiry: {
                    lte: upperBound
                }
            });
        }
        if (taxEnabled) {
            orFilters.push({
                taxExpiry: {
                    lte: upperBound
                }
            });
        }
        const vehicles = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].vehicle.findMany({
            where: {
                garageId: garage.id,
                OR: orFilters
            },
            select: {
                id: true,
                ownerName: true,
                ownerEmail: true,
                vrm: true,
                make: true,
                model: true,
                motExpiry: true,
                taxExpiry: true
            }
        });
        scannedVehicles += vehicles.length;
        for (const vehicle of vehicles){
            if (!vehicle.ownerEmail) {
                skippedNoEmail += 1;
                continue;
            }
            const ownerName = vehicle.ownerName || "Customer";
            const vehicleLabel = `${vehicle.make || ""} ${vehicle.model || ""}`.trim() || "vehicle";
            if (motEnabled && vehicle.motExpiry) {
                const remaining = daysUntil(vehicle.motExpiry);
                if (motDays.includes(remaining)) {
                    const statusKey = `AUTO_MOT_${remaining}_${runKey}`;
                    const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].reminder.findFirst({
                        where: {
                            vehicleId: vehicle.id,
                            channel: "EMAIL",
                            status: statusKey
                        },
                        select: {
                            id: true
                        }
                    });
                    if (!exists) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction([
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].reminder.create({
                                data: {
                                    vehicleId: vehicle.id,
                                    channel: "EMAIL",
                                    status: statusKey,
                                    scheduledFor: new Date()
                                }
                            }),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].emailQueueJob.create({
                                data: {
                                    garageId: garage.id,
                                    recipientEmail: vehicle.ownerEmail,
                                    recipientName: ownerName,
                                    subject: `MOT reminder: ${vehicle.vrm} expires in ${remaining} day${remaining === 1 ? "" : "s"}`,
                                    message: `Hi ${ownerName},\n\nThis is your automatic reminder that MOT for your ${vehicleLabel} (${vehicle.vrm}) expires on ${ukDate(vehicle.motExpiry)}.\n\nPlease contact ${garage.name} to book your MOT in time.\n\nThanks,\n${garage.name}`,
                                    status: "PENDING",
                                    scheduledFor: new Date()
                                }
                            })
                        ]);
                        queued += 1;
                    } else {
                        skippedDuplicate += 1;
                    }
                }
            }
            if (taxEnabled && vehicle.taxExpiry) {
                const remaining = daysUntil(vehicle.taxExpiry);
                if (taxDays.includes(remaining)) {
                    const statusKey = `AUTO_TAX_${remaining}_${runKey}`;
                    const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].reminder.findFirst({
                        where: {
                            vehicleId: vehicle.id,
                            channel: "EMAIL",
                            status: statusKey
                        },
                        select: {
                            id: true
                        }
                    });
                    if (!exists) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction([
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].reminder.create({
                                data: {
                                    vehicleId: vehicle.id,
                                    channel: "EMAIL",
                                    status: statusKey,
                                    scheduledFor: new Date()
                                }
                            }),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].emailQueueJob.create({
                                data: {
                                    garageId: garage.id,
                                    recipientEmail: vehicle.ownerEmail,
                                    recipientName: ownerName,
                                    subject: `Road tax reminder: ${vehicle.vrm} expires in ${remaining} day${remaining === 1 ? "" : "s"}`,
                                    message: `Hi ${ownerName},\n\nThis is your automatic reminder that road tax for your ${vehicleLabel} (${vehicle.vrm}) expires on ${ukDate(vehicle.taxExpiry)}.\n\nPlease renew in time and contact ${garage.name} if you need help.\n\nThanks,\n${garage.name}`,
                                    status: "PENDING",
                                    scheduledFor: new Date()
                                }
                            })
                        ]);
                        queued += 1;
                    } else {
                        skippedDuplicate += 1;
                    }
                }
            }
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        garages: garages.length,
        scannedVehicles,
        queued,
        skippedNoEmail,
        skippedDuplicate
    });
}
async function GET(request) {
    return POST(request);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d115d240._.js.map