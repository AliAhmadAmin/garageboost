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
"[project]/src/app/api/lookup/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
// Decrypt function (must match the one in admin config route)
function decrypt(encoded) {
    try {
        return Buffer.from(encoded, "base64").toString("utf-8");
    } catch  {
        return "";
    }
}
// Get API key from database
async function getApiKey(key) {
    try {
        const config = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].apiConfig.findUnique({
            where: {
                key,
                isActive: true
            }
        });
        if (!config) return null;
        return decrypt(config.value);
    } catch (error) {
        console.error(`Failed to get API key ${key}:`, error);
        return null;
    }
}
const MOCK_ADVISORIES = [
    {
        text: "Front brake pads wearing thin",
        category: "Brakes",
        estPricePence: 12000
    },
    {
        text: "Nearside Rear Tyre worn close to legal limit",
        category: "Tyres",
        estPricePence: 8500
    },
    {
        text: "Offside Front Suspension arm has slight play",
        category: "Suspension",
        estPricePence: 21000
    },
    {
        text: "Exhaust has minor leak of exhaust gases",
        category: "Exhaust",
        estPricePence: 15000
    },
    {
        text: "Oil leak but not excessive",
        category: "Engine",
        estPricePence: 4500
    }
];
// Fetch vehicle data from DVLA API
async function fetchDVLAData(vrm, apiKey) {
    try {
        const response = await fetch("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },
            body: JSON.stringify({
                registrationNumber: vrm
            })
        });
        if (!response.ok) {
            console.error("DVLA API error:", response.status);
            return null;
        }
        const data = await response.json();
        console.log("DVLA Response for", vrm, ":", JSON.stringify(data, null, 2));
        return {
            make: data.make || data.engineMake || "",
            model: data.model || data.engineModel || "",
            firstReg: data.monthOfFirstRegistration || data.dateOfFirstRegistration || "",
            fuel: data.fuelType || "",
            color: data.colour || "",
            motStatus: data.motStatus || "",
            motExpiry: data.motExpiryDate || "",
            taxStatus: data.taxStatus || "",
            taxExpiry: data.taxDueDate || data.taxExpiredDate || data.taxExpiryDate || ""
        };
    } catch (error) {
        console.error("DVLA fetch error:", error);
        return null;
    }
}
// Fetch MOT history from DVSA API
async function fetchDVSAData(vrm, apiKey) {
    try {
        // DVSA uses simple API key authentication via x-api-key header
        const response = await fetch(`https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${vrm}`, {
            method: "GET",
            headers: {
                "Accept": "application/json+v6",
                "x-api-key": apiKey
            }
        });
        if (!response.ok) {
            console.error("DVSA API error:", response.status);
            return null;
        }
        const data = await response.json();
        console.log("DVSA Response for", vrm, ":", JSON.stringify(data, null, 2));
        // Parse MOT history
        const motTests = data[0]?.motTests || [];
        const latestTest = motTests[0] || {};
        const history = motTests.slice(0, 5).map((test)=>({
                date: test.completedDate,
                mileage: test.odometerValue,
                result: test.testResult === "PASSED" ? "Pass" : "Fail",
                advisories: (test.rfrAndComments || []).filter((item)=>item.type === "ADVISORY").map((item)=>({
                        text: item.text,
                        category: "General",
                        estPricePence: 5000
                    }))
            }));
        // Extract current advisories from latest test - include both ADVISORY and DEFECT
        const advisories = (latestTest.rfrAndComments || []).filter((item)=>item.type === "ADVISORY" || item.type === "DEFECT").map((item)=>({
                text: item.text,
                category: item.type === "DEFECT" ? "Critical" : item.dangerous ? "Critical" : "General",
                estPricePence: item.type === "DEFECT" || item.dangerous ? 15000 : 5000
            }));
        return {
            mileage: latestTest.odometerValue || 0,
            history,
            advisories
        };
    } catch (error) {
        console.error("DVSA fetch error:", error);
        return null;
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const vrm = (body.vrm || "").toUpperCase().replace(/\s/g, "");
        if (!vrm) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "VRM required"
            }, {
                status: 400
            });
        }
        // Get API keys from database
        const dvlaApiKey = await getApiKey("DVLA_API_KEY");
        const dvsaApiKey = await getApiKey("DVSA_API_KEY");
        // If API keys are configured, use real APIs; otherwise use mock data
        if (dvlaApiKey && dvsaApiKey) {
            try {
                const [dvlaData, dvsaData] = await Promise.all([
                    fetchDVLAData(vrm, dvlaApiKey),
                    fetchDVSAData(vrm, dvsaApiKey)
                ]);
                if (!dvlaData && !dvsaData) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: "Vehicle not found"
                    }, {
                        status: 404
                    });
                }
                // Combine data from both APIs
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    vrm,
                    make: dvlaData?.make || "Vehicle",
                    model: dvlaData?.model || "",
                    firstReg: dvlaData?.firstReg || "",
                    fuel: dvlaData?.fuel || "",
                    color: dvlaData?.color || "",
                    motStatus: dvlaData?.motStatus || "Unknown",
                    motExpiry: dvlaData?.motExpiry || new Date().toISOString().split("T")[0],
                    taxStatus: dvlaData?.taxStatus || "Unknown",
                    taxExpiry: dvlaData?.taxExpiry || null,
                    mileage: dvsaData?.mileage || 0,
                    history: dvsaData?.history || [],
                    advisories: dvsaData?.advisories || []
                });
            } catch (error) {
                console.error("Real API lookup error:", error);
            // Fall back to mock data on API error
            }
        }
        // Fallback to mock data if APIs not configured or API error
        console.log("Using mock data for VRM:", vrm);
        // Generate mock data based on VRM
        const mockVehicles = {
            "ABC123": {
                make: "TOYOTA",
                model: "PRIUS",
                firstReg: "2016-05-10",
                fuel: "Hybrid Petrol",
                color: "White",
                taxStatus: "Taxed",
                taxExpiry: "2026-06-30"
            },
            "DEF456": {
                make: "FORD",
                model: "FOCUS",
                firstReg: "2017-08-22",
                fuel: "Diesel",
                color: "Blue",
                taxStatus: "Taxed",
                taxExpiry: "2026-04-30"
            },
            "GHI789": {
                make: "VOLKSWAGEN",
                model: "GOLF TSI",
                firstReg: "2018-03-15",
                fuel: "Petrol",
                color: "Silver",
                taxStatus: "Taxed",
                taxExpiry: "2026-08-31"
            }
        };
        // Default mock vehicle
        const vehicleData = mockVehicles[vrm] || {
            make: "VOLKSWAGEN",
            model: "GOLF TSI",
            firstReg: "2018-03-22",
            fuel: "Petrol",
            color: "Silver",
            taxStatus: "Taxed",
            taxExpiry: new Date(Date.now() + 240 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            vrm,
            ...vehicleData,
            motStatus: "Valid",
            motExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            taxStatus: vehicleData.taxStatus || "Unknown",
            taxExpiry: vehicleData.taxExpiry || null,
            mileage: Math.floor(Math.random() * 40000 + 30000),
            history: [
                {
                    date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                    mileage: 35000,
                    result: "Pass",
                    advisories: [
                        MOCK_ADVISORIES[0]
                    ]
                }
            ],
            advisories: [
                MOCK_ADVISORIES[0],
                MOCK_ADVISORIES[2]
            ]
        });
    } catch (error) {
        console.error("Lookup/POST error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error. Please try again."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e6c5584d._.js.map