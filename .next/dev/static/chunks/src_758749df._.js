(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/plans.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Plan configuration and limits
__turbopack_context__.s([
    "PLANS",
    ()=>PLANS,
    "TRIAL_DAYS",
    ()=>TRIAL_DAYS,
    "canAddUser",
    ()=>canAddUser,
    "canAddVehicle",
    ()=>canAddVehicle,
    "getPlanLabel",
    ()=>getPlanLabel,
    "getPlanLimits",
    ()=>getPlanLimits,
    "getRemainingVehicles",
    ()=>getRemainingVehicles,
    "getTrialStatus",
    ()=>getTrialStatus,
    "hasFeature",
    ()=>hasFeature,
    "isTrialExpired",
    ()=>isTrialExpired,
    "normalizePlanId",
    ()=>normalizePlanId
]);
const PLANS = {
    starter: {
        id: "starter",
        name: "Starter",
        price: 9,
        maxUsers: 1,
        maxVehicles: 200,
        features: {
            basicJobManagement: true,
            advancedInvoicing: false,
            campaignAutomation: false,
            analytics: false,
            multiLocation: false,
            apiAccess: false,
            whiteLabel: false,
            prioritySupport: false
        }
    },
    professional: {
        id: "professional",
        name: "Professional",
        price: 29,
        maxUsers: 5,
        maxVehicles: 500,
        features: {
            basicJobManagement: true,
            advancedInvoicing: true,
            campaignAutomation: true,
            analytics: true,
            multiLocation: false,
            apiAccess: false,
            whiteLabel: false,
            prioritySupport: true
        }
    },
    business: {
        id: "business",
        name: "Business",
        price: 49,
        maxUsers: 999999,
        maxVehicles: 999999,
        features: {
            basicJobManagement: true,
            advancedInvoicing: true,
            campaignAutomation: true,
            analytics: true,
            multiLocation: true,
            apiAccess: true,
            whiteLabel: true,
            prioritySupport: true
        }
    }
};
const TRIAL_DAYS = 14;
function normalizePlanId(plan) {
    if (!plan) return null;
    const normalized = plan.toLowerCase();
    if (normalized === "trial") return null;
    if (normalized === "basic" || normalized === "starter") return "starter";
    if (normalized === "pro" || normalized === "professional") return "professional";
    if (normalized === "business") return "business";
    return null;
}
function getPlanLabel(plan) {
    if (!plan) return "Starter";
    const normalized = plan.toLowerCase();
    if (normalized === "trial") return "Free Trial";
    if (normalized === "basic" || normalized === "starter") return "Starter";
    if (normalized === "pro" || normalized === "professional") return "Professional";
    if (normalized === "business") return "Business";
    return "Starter";
}
function getPlanLimits(planId) {
    const plan = PLANS[planId];
    if (!plan) {
        return PLANS.professional; // Default fallback
    }
    return plan;
}
function hasFeature(planId, feature) {
    const plan = getPlanLimits(planId);
    return plan.features[feature];
}
function isTrialExpired(trialEndsAt) {
    if (!trialEndsAt) return false;
    return new Date() > trialEndsAt;
}
function canAddVehicle(currentCount, planId) {
    const plan = getPlanLimits(planId);
    return currentCount < plan.maxVehicles;
}
function canAddUser(currentCount, planId) {
    const plan = getPlanLimits(planId);
    return currentCount < plan.maxUsers;
}
function getRemainingVehicles(currentCount, planId) {
    const plan = getPlanLimits(planId);
    return Math.max(0, plan.maxVehicles - currentCount);
}
function getTrialStatus(trialEndsAt) {
    if (!trialEndsAt) {
        return {
            active: false,
            daysRemaining: 0,
            expired: false
        };
    }
    const now = new Date();
    const ended = trialEndsAt;
    const diffMs = ended.getTime() - now.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return {
        active: daysRemaining > 0,
        daysRemaining: Math.max(0, daysRemaining),
        expired: daysRemaining <= 0
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/TrialBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrialBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plans.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function TrialBanner(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "891d6d11d2fa72a0cc6143ce0f7f56a619ff3e4cbf5699cf5a6137e8fdf6c2a6") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "891d6d11d2fa72a0cc6143ce0f7f56a619ff3e4cbf5699cf5a6137e8fdf6c2a6";
    }
    const { trialEndsAt, currentPlan, status, onViewPlans } = t0;
    if (status !== "TRIAL" || !trialEndsAt) {
        return null;
    }
    let t1;
    if ($[1] !== trialEndsAt) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTrialStatus"])(trialEndsAt);
        $[1] = trialEndsAt;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const trial = t1;
    let t2;
    if ($[3] !== currentPlan) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlanLimits"])(currentPlan);
        $[3] = currentPlan;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const plan = t2;
    if (trial.expired) {
        let t3;
        if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                size: 18,
                className: "shrink-0 mt-0.5 sm:mt-0"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 50,
                columnNumber: 12
            }, this);
            $[5] = t3;
        } else {
            t3 = $[5];
        }
        let t4;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start sm:items-center gap-2 sm:gap-3",
                children: [
                    t3,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "Trial Expired"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                                lineNumber: 57,
                                columnNumber: 106
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2",
                                children: "Your trial has ended. Please add payment details to continue."
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                                lineNumber: 57,
                                columnNumber: 154
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/TrialBanner.tsx",
                        lineNumber: 57,
                        columnNumber: 81
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 57,
                columnNumber: 12
            }, this);
            $[6] = t4;
        } else {
            t4 = $[6];
        }
        let t5;
        if ($[7] !== onViewPlans) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "print:hidden bg-red-600 text-white px-3 py-3 lg:ml-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                    children: [
                        t4,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onViewPlans,
                            className: "bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors cursor-pointer text-sm shrink-0 w-full sm:w-auto",
                            children: "Add Payment"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TrialBanner.tsx",
                            lineNumber: 64,
                            columnNumber: 186
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/TrialBanner.tsx",
                    lineNumber: 64,
                    columnNumber: 83
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 64,
                columnNumber: 12
            }, this);
            $[7] = onViewPlans;
            $[8] = t5;
        } else {
            t5 = $[8];
        }
        return t5;
    }
    if (trial.daysRemaining <= 3) {
        let t3;
        if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                size: 18,
                className: "shrink-0 mt-0.5 sm:mt-0"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 75,
                columnNumber: 12
            }, this);
            $[9] = t3;
        } else {
            t3 = $[9];
        }
        let t4;
        if ($[10] !== trial.daysRemaining) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-bold",
                children: [
                    trial.daysRemaining,
                    " days left"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 82,
                columnNumber: 12
            }, this);
            $[10] = trial.daysRemaining;
            $[11] = t4;
        } else {
            t4 = $[11];
        }
        let t5;
        if ($[12] !== plan.name) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-1",
                children: [
                    "in your ",
                    plan.name,
                    " trial"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 90,
                columnNumber: 12
            }, this);
            $[12] = plan.name;
            $[13] = t5;
        } else {
            t5 = $[13];
        }
        let t6;
        if ($[14] !== t4 || $[15] !== t5) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start sm:items-center gap-2 sm:gap-3",
                children: [
                    t3,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: [
                            t4,
                            t5
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/TrialBanner.tsx",
                        lineNumber: 98,
                        columnNumber: 81
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 98,
                columnNumber: 12
            }, this);
            $[14] = t4;
            $[15] = t5;
            $[16] = t6;
        } else {
            t6 = $[16];
        }
        let t7;
        if ($[17] !== onViewPlans) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onViewPlans,
                className: "bg-white text-amber-600 px-4 py-2 rounded-lg font-bold hover:bg-amber-50 transition-colors cursor-pointer text-sm shrink-0 w-full sm:w-auto",
                children: "Subscribe Now"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 107,
                columnNumber: 12
            }, this);
            $[17] = onViewPlans;
            $[18] = t7;
        } else {
            t7 = $[18];
        }
        let t8;
        if ($[19] !== t6 || $[20] !== t7) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "print:hidden bg-amber-600 text-white px-3 py-3 lg:ml-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                    children: [
                        t6,
                        t7
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/TrialBanner.tsx",
                    lineNumber: 115,
                    columnNumber: 85
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 115,
                columnNumber: 12
            }, this);
            $[19] = t6;
            $[20] = t7;
            $[21] = t8;
        } else {
            t8 = $[21];
        }
        return t8;
    }
    let t3;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
            size: 18,
            className: "shrink-0 mt-0.5 sm:mt-0"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[22] = t3;
    } else {
        t3 = $[22];
    }
    let t4;
    if ($[23] !== trial.daysRemaining) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold",
            children: [
                trial.daysRemaining,
                " days remaining"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 133,
            columnNumber: 10
        }, this);
        $[23] = trial.daysRemaining;
        $[24] = t4;
    } else {
        t4 = $[24];
    }
    let t5;
    if ($[25] !== plan.name) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ml-1",
            children: [
                "in your ",
                plan.name,
                " trial"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 141,
            columnNumber: 10
        }, this);
        $[25] = plan.name;
        $[26] = t5;
    } else {
        t5 = $[26];
    }
    let t6;
    if ($[27] !== plan.price) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ml-1 text-blue-100",
            children: [
                "(£",
                plan.price,
                "/month after)"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 149,
            columnNumber: 10
        }, this);
        $[27] = plan.price;
        $[28] = t6;
    } else {
        t6 = $[28];
    }
    let t7;
    if ($[29] !== t4 || $[30] !== t5 || $[31] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start sm:items-center gap-2 sm:gap-3",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm",
                    children: [
                        t4,
                        t5,
                        t6
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/TrialBanner.tsx",
                    lineNumber: 157,
                    columnNumber: 79
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 157,
            columnNumber: 10
        }, this);
        $[29] = t4;
        $[30] = t5;
        $[31] = t6;
        $[32] = t7;
    } else {
        t7 = $[32];
    }
    let t8;
    if ($[33] !== onViewPlans) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onViewPlans,
            className: "bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors text-sm cursor-pointer shrink-0 w-full sm:w-auto",
            children: "View Plans"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 167,
            columnNumber: 10
        }, this);
        $[33] = onViewPlans;
        $[34] = t8;
    } else {
        t8 = $[34];
    }
    let t9;
    if ($[35] !== t7 || $[36] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "print:hidden bg-blue-600 text-white px-3 py-3 lg:ml-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                children: [
                    t7,
                    t8
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/TrialBanner.tsx",
                lineNumber: 175,
                columnNumber: 82
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/TrialBanner.tsx",
            lineNumber: 175,
            columnNumber: 10
        }, this);
        $[35] = t7;
        $[36] = t8;
        $[37] = t9;
    } else {
        t9 = $[37];
    }
    return t9;
}
_c = TrialBanner;
var _c;
__turbopack_context__.k.register(_c, "TrialBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/uk-cities.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * List of UK cities and major towns for autocomplete
 */ __turbopack_context__.s([
    "UK_CITIES",
    ()=>UK_CITIES,
    "searchCities",
    ()=>searchCities
]);
const UK_CITIES = [
    // England - Major Cities
    "London",
    "Birmingham",
    "Manchester",
    "Leeds",
    "Liverpool",
    "Sheffield",
    "Bristol",
    "Newcastle upon Tyne",
    "Nottingham",
    "Southampton",
    "Portsmouth",
    "Leicester",
    "Coventry",
    "Bradford",
    "Derby",
    "Plymouth",
    "Wolverhampton",
    "Stoke-on-Trent",
    "Brighton",
    "Hull",
    "Preston",
    "Reading",
    "Luton",
    "Middlesbrough",
    "Milton Keynes",
    "Sunderland",
    "Norwich",
    "Bournemouth",
    "Swindon",
    "Oxford",
    "Cambridge",
    "Peterborough",
    "York",
    "Ipswich",
    "Gloucester",
    "Exeter",
    "Bath",
    "Cheltenham",
    "Colchester",
    "Chelmsford",
    "Lincoln",
    "Salisbury",
    "Worcester",
    "Canterbury",
    "Durham",
    "Carlisle",
    "Chester",
    "Lancaster",
    "Winchester",
    // England - Additional Towns
    "Basingstoke",
    "Blackburn",
    "Blackpool",
    "Bolton",
    "Burnley",
    "Bury",
    "Chesterfield",
    "Crawley",
    "Darlington",
    "Doncaster",
    "Dudley",
    "Eastbourne",
    "Gillingham",
    "Grimsby",
    "Guildford",
    "Harrogate",
    "Hastings",
    "Hemel Hempstead",
    "Huddersfield",
    "Kidderminster",
    "King's Lynn",
    "Maidstone",
    "Mansfield",
    "Newcastle-under-Lyme",
    "Northampton",
    "Oldham",
    "Poole",
    "Rochdale",
    "Rotherham",
    "Slough",
    "Solihull",
    "Southend-on-Sea",
    "St Albans",
    "Stevenage",
    "Stockport",
    "Stockton-on-Tees",
    "Sutton Coldfield",
    "Tamworth",
    "Telford",
    "Wakefield",
    "Walsall",
    "Warrington",
    "Watford",
    "Wigan",
    "Woking",
    "Worthing",
    "Ashford",
    "Aylesbury",
    "Banbury",
    "Barrow-in-Furness",
    "Basingstoke",
    "Bedford",
    "Birkenhead",
    "Boston",
    "Bracknell",
    "Bridgwater",
    "Burnley",
    "Burton upon Trent",
    "Bury St Edmunds",
    "Chatham",
    "Crewe",
    "Dartford",
    "Ellesmere Port",
    "Farnborough",
    "Gateshead",
    "Gravesend",
    "Great Yarmouth",
    "Halifax",
    "Hartlepool",
    "High Wycombe",
    "Hinckley",
    "Kettering",
    "Leamington Spa",
    "Loughborough",
    "Lowestoft",
    "Macclesfield",
    "Margate",
    "Nuneaton",
    "Ramsgate",
    "Redditch",
    "Runcorn",
    "Scunthorpe",
    "Shrewsbury",
    "South Shields",
    "Stafford",
    "Stratford-upon-Avon",
    "Taunton",
    "Torquay",
    "Tunbridge Wells",
    "Warwick",
    "Weymouth",
    "Widnes",
    "Yeovil",
    // Scotland
    "Glasgow",
    "Edinburgh",
    "Aberdeen",
    "Dundee",
    "Inverness",
    "Paisley",
    "East Kilbride",
    "Livingston",
    "Hamilton",
    "Cumbernauld",
    "Kirkcaldy",
    "Dunfermline",
    "Ayr",
    "Perth",
    "Kilmarnock",
    "Greenock",
    "Coatbridge",
    "Glenrothes",
    "Airdrie",
    "Falkirk",
    "Stirling",
    "Motherwell",
    "Dumfries",
    "Elgin",
    "Dumbarton",
    "Fort William",
    "Oban",
    "St Andrews",
    // Wales
    "Cardiff",
    "Swansea",
    "Newport",
    "Wrexham",
    "Barry",
    "Merthyr Tydfil",
    "Neath",
    "Port Talbot",
    "Cwmbran",
    "Bridgend",
    "Llanelli",
    "Caerphilly",
    "Rhondda",
    "Bangor",
    "Aberystwyth",
    "Carmarthen",
    "Colwyn Bay",
    "Holyhead",
    "Llandudno",
    "Pontypridd",
    "Ebbw Vale",
    "Aberdare",
    "Pontypool",
    "Maesteg",
    "Penarth",
    // Northern Ireland
    "Belfast",
    "Derry",
    "Lisburn",
    "Newry",
    "Bangor",
    "Craigavon",
    "Castlereagh",
    "Ballymena",
    "Newtownabbey",
    "Carrickfergus",
    "Coleraine",
    "Omagh",
    "Larne",
    "Banbridge",
    "Antrim",
    "Enniskillen",
    "Armagh",
    "Dungannon",
    "Cookstown",
    "Downpatrick",
    "Ballymoney",
    "Limavady",
    "Strabane",
    "Magherafelt",
    "Portrush"
].sort();
function searchCities(query, limit = 10) {
    if (!query || query.length < 2) return [];
    const lowerQuery = query.toLowerCase();
    // Exact matches first, then starts with, then contains
    const exactMatches = UK_CITIES.filter((city)=>city.toLowerCase() === lowerQuery);
    const startsWithMatches = UK_CITIES.filter((city)=>city.toLowerCase().startsWith(lowerQuery) && !exactMatches.includes(city));
    const containsMatches = UK_CITIES.filter((city)=>city.toLowerCase().includes(lowerQuery) && !exactMatches.includes(city) && !startsWithMatches.includes(city));
    return [
        ...exactMatches,
        ...startsWithMatches,
        ...containsMatches
    ].slice(0, limit);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/geolocation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Geolocation utilities for UK garage locations
 */ __turbopack_context__.s([
    "calculateDistance",
    ()=>calculateDistance,
    "geocodePostcode",
    ()=>geocodePostcode,
    "getCurrentPosition",
    ()=>getCurrentPosition,
    "sortByDistance",
    ()=>sortByDistance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Convert ALL CAPS string to Title Case
 */ function toTitleCase(str) {
    return str.toLowerCase().split(' ').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
async function geocodePostcode(postcode) {
    try {
        const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase();
        const response = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        if (data.status === 200 && data.result) {
            // Use post_town for city (official Royal Mail postal town - includes small areas)
            // Fall back to admin_district if post_town not available
            let city = data.result.post_town || data.result.admin_district || data.result.parliamentary_constituency || undefined;
            // Convert from ALL CAPS to Title Case if needed
            if (city && city === city.toUpperCase()) {
                city = toTitleCase(city);
            }
            return {
                latitude: data.result.latitude,
                longitude: data.result.longitude,
                city: city,
                county: data.result.admin_county || data.result.region || undefined,
                region: data.result.region || undefined
            };
        }
        return null;
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.error('Geocoding error:', error);
        }
        return null;
    }
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth's radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function getCurrentPosition() {
    return new Promise((resolve, reject)=>{
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, (error)=>{
            reject(error);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });
}
function sortByDistance(garages, userLat, userLon) {
    return garages.map((garage)=>({
            ...garage,
            distance: garage.latitude && garage.longitude ? calculateDistance(userLat, userLon, garage.latitude, garage.longitude) : null
        })).sort((a, b)=>{
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/OnboardingModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/uk-cities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geolocation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function OnboardingModal({ isOpen, garageId, onClose, onComplete }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [verifying, setVerifying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [citySuggestions, setCitySuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCitySuggestions, setShowCitySuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        phone: "+44",
        address: "",
        postcode: "",
        city: ""
    });
    const handlePhoneChange = (e)=>{
        let value = e.target.value;
        if (!value.startsWith("+44")) {
            value = "+44" + value.replace(/^\+?44/, "");
        }
        setForm({
            ...form,
            phone: value
        });
    };
    const handleCityChange = (e_0)=>{
        const value_0 = e_0.target.value;
        setForm({
            ...form,
            city: value_0
        });
        if (value_0.length > 2) {
            const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchCities"])(value_0);
            setCitySuggestions(matches);
            setShowCitySuggestions(matches.length > 0);
        } else {
            setShowCitySuggestions(false);
        }
    };
    const handlePostcodeVerify = async ()=>{
        if (!form.postcode || form.postcode.length < 5) {
            setError("Please enter a valid UK postcode");
            return;
        }
        setVerifying(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geocodePostcode"])(form.postcode);
            if (result.city && result.county) {
                setForm({
                    ...form,
                    city: result.city,
                    address: result.address || ""
                });
                setError(null);
            } else {
                setError("Postcode not found. Please check and try again.");
            }
        } catch (err) {
            setError("Failed to verify postcode. Please enter city manually.");
        } finally{
            setVerifying(false);
        }
    };
    const handleSubmit = async (e_1)=>{
        e_1.preventDefault();
        if (step === 1) {
            if (!form.phone.replace("+44", "").trim()) {
                setError("Please enter a phone number");
                return;
            }
            setStep(2);
            return;
        }
        if (!form.address.trim() || !form.city.trim() || !form.postcode.trim()) {
            setError("Please complete all location fields");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/garages/${garageId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: form.phone,
                    address: form.address,
                    postcode: form.postcode,
                    city: form.city
                })
            });
            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Failed to save garage details");
                return;
            }
            // Update localStorage
            const cached = localStorage.getItem("garage-data");
            if (cached) {
                const garage = JSON.parse(cached);
                garage.phone = form.phone;
                garage.address = form.address;
                garage.postcode = form.postcode;
                garage.city = form.city;
                localStorage.setItem("garage-data", JSON.stringify(garage));
            }
            onComplete();
        } catch (err_0) {
            console.error("Error saving garage:", err_0);
            setError("An error occurred while saving details");
        } finally{
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-2xl max-w-md w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-6 border-b border-slate-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-slate-900",
                            children: step === 1 ? "Connect with Customers" : "Set Your Location"
                        }, void 0, false, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-slate-500 hover:text-slate-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/components/OnboardingModal.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OnboardingModal.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 space-y-6",
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 149,
                            columnNumber: 21
                        }, this),
                        step === 1 ? // Step 1: Phone
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 text-sm",
                                    children: "Help customers reach you. You can update this anytime."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                    size: 16,
                                                    className: "inline mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 19
                                                }, this),
                                                "Phone Number"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            value: form.phone,
                                            onChange: handlePhoneChange,
                                            className: "w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            placeholder: "+44 7000 000000"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500",
                                    children: "We'll use this to display on your garage profile and send notifications."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 155,
                            columnNumber: 9
                        }, this) : // Step 2: Location
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 text-sm",
                                    children: "Help customers find you. Search by postcode or enter manually."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    size: 16,
                                                    className: "inline mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this),
                                                "UK Postcode"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: form.postcode,
                                                    onChange: (e_2)=>setForm({
                                                            ...form,
                                                            postcode: e_2.target.value.toUpperCase()
                                                        }),
                                                    className: "flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                    placeholder: "e.g., SW1A 1AA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handlePostcodeVerify,
                                                    disabled: verifying,
                                                    className: "px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50",
                                                    children: verifying ? "..." : "Verify"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                    size: 16,
                                                    className: "inline mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, this),
                                                "Address"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.address,
                                            onChange: (e_3)=>setForm({
                                                    ...form,
                                                    address: e_3.target.value
                                                }),
                                            className: "w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            placeholder: "e.g., 123 Market Street"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: "City"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: form.city,
                                                    onChange: handleCityChange,
                                                    onFocus: ()=>form.city.length > 2 && setShowCitySuggestions(true),
                                                    className: "w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                    placeholder: "e.g., London"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this),
                                                showCitySuggestions && citySuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto",
                                                    children: citySuggestions.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setForm({
                                                                    ...form,
                                                                    city
                                                                });
                                                                setShowCitySuggestions(false);
                                                            },
                                                            className: "w-full text-left px-4 py-2 hover:bg-blue-50 text-slate-700 transition-colors",
                                                            children: city
                                                        }, city, false, {
                                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 52
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 73
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OnboardingModal.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 171,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setStep(1),
                                    disabled: loading,
                                    className: "flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors disabled:opacity-50",
                                    children: "Back"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 226,
                                    columnNumber: 28
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50",
                                    children: step === 1 ? "Next" : loading ? "Saving..." : "Complete Setup"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OnboardingModal.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-500 text-center",
                            children: "You can update these details anytime in Settings."
                        }, void 0, false, {
                            fileName: "[project]/src/components/OnboardingModal.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OnboardingModal.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OnboardingModal.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/OnboardingModal.tsx",
        lineNumber: 135,
        columnNumber: 10
    }, this);
}
_s(OnboardingModal, "dPyd5kQsUJho4t3t+fMZmlUnE64=");
_c = OnboardingModal;
var _c;
__turbopack_context__.k.register(_c, "OnboardingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Card(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "830958babe495929d0d1bf3aaba2a440b4cb712b484601c1863854e61579d6ba") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "830958babe495929d0d1bf3aaba2a440b4cb712b484601c1863854e61579d6ba";
    }
    const { children, className: t1 } = t0;
    const className = t1 === undefined ? "" : t1;
    const t2 = `bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`;
    let t3;
    if ($[1] !== children || $[2] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Card.tsx",
            lineNumber: 23,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t2;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    return t3;
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/PlanUpgradeModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanUpgradeModal",
    ()=>PlanUpgradeModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plans.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PlanUpgradeModal({ isOpen, onClose, currentPlan = "TRIAL", garageId, isRefreshing = false }) {
    _s();
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("professional");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const normalizedCurrentPlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePlanId"])(currentPlan);
    // `isRefreshing` is passed in as a prop to indicate polling/refresh state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanUpgradeModal.useEffect": ()=>{
            if (!isOpen) return;
            setSelectedPlan(normalizedCurrentPlan ?? "professional");
            setError(null);
            // Check for missing garageId when modal opens
            if (!garageId || garageId.trim() === "") {
                setError("Garage data not loaded. Please close this dialog and try again in a moment.");
            }
        }
    }["PlanUpgradeModal.useEffect"], [
        isOpen,
        normalizedCurrentPlan,
        garageId
    ]);
    if (!isOpen) return null;
    const plans = {
        starter: {
            name: "Starter",
            price: 9,
            features: [
                "1 user account",
                "Up to 50 vehicles",
                "Basic job management",
                "Invoice & quotes",
                "DVLA/DVSA vehicle lookup",
                "Email support"
            ]
        },
        professional: {
            name: "Professional",
            price: 29,
            features: [
                "Up to 5 users",
                "Up to 500 vehicles",
                "Full job & CRM management",
                "Advanced invoicing & quotes",
                "Campaign & reminder automation",
                "Analytics & reporting",
                "Priority email support"
            ]
        },
        business: {
            name: "Business",
            price: 49,
            features: [
                "Unlimited users & vehicles",
                "Multi-location support",
                "Advanced analytics",
                "API access",
                "White-label options",
                "Priority phone & email support",
                "Dedicated account manager"
            ]
        }
    };
    const handleUpgrade = async ()=>{
        try {
            setLoading(true);
            setError(null);
            if (!garageId) {
                setError("Garage ID is missing. Please refresh the page and try again.");
                setLoading(false);
                return;
            }
            // Call Stripe checkout API (route is /api/stripe/checkout)
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    plan: selectedPlan,
                    garageId
                })
            });
            // Handle auth errors explicitly
            if (response.status === 401 || response.status === 403) {
                try {
                    localStorage.removeItem("user");
                } catch (e) {}
                // Redirect to login for re-auth
                window.location.href = "/login";
                return;
            }
            const contentType = response.headers.get("content-type") || "";
            let data = null;
            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                // Non-JSON response (HTML error page or redirect) — read as text for debugging
                const text = await response.text();
                throw new Error(text || "Unexpected response from server");
            }
            if (!response.ok) {
                throw new Error(data?.error || data?.message || 'Failed to create checkout session');
            }
            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received');
            }
        } catch (err) {
            console.error('Upgrade error:', err);
            setError(err.message || 'Failed to start checkout. Please try again.');
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 flex items-center justify-center z-200 p-2 sm:p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 md:p-6 border-b border-slate-100 flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl md:text-2xl font-bold",
                                    children: "Upgrade Your Plan"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-500 text-xs sm:text-sm mt-1",
                                    children: "Choose the plan that best fits your garage"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-slate-400 hover:text-slate-900 transition-colors p-2 -m-2 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 md:p-8",
                    children: [
                        isRefreshing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 18,
                                    className: "animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium",
                                    children: "Updating plan status…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 127,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6",
                            children: Object.keys(plans).map((planKey)=>{
                                const plan = plans[planKey];
                                const isSelected = selectedPlan === planKey;
                                const isCurrentPlan = normalizedCurrentPlan === planKey;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>!isCurrentPlan && !isRefreshing && setSelectedPlan(planKey),
                                    className: `p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all ${// If this is the user's current plan, show a solid colored card
                                    isCurrentPlan ? "bg-blue-600 border-blue-700 text-white cursor-not-allowed" : isSelected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"}`,
                                    children: [
                                        planKey === "professional" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-block bg-blue-600 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full mb-3",
                                            children: "MOST POPULAR"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                            lineNumber: 139,
                                            columnNumber: 50
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl md:text-2xl font-bold mb-2",
                                            children: plan.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-3xl md:text-4xl font-extrabold",
                                                    children: [
                                                        "£",
                                                        plan.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${isCurrentPlan ? 'text-white/90' : 'text-slate-500'} text-sm md:text-base`,
                                                    children: "/month"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-3",
                                            children: plan.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center gap-2 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 16,
                                                            className: "text-emerald-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                                            lineNumber: 149,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: feature
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 60
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this),
                                        isCurrentPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 bg-white/10 text-white text-center py-2 rounded-lg font-semibold text-sm",
                                            children: "Current Plan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                            lineNumber: 153,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, planKey, true, {
                                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                    lineNumber: 136,
                                    columnNumber: 20
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 160,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleUpgrade,
                            disabled: loading || isRefreshing || normalizedCurrentPlan === selectedPlan || !garageId || garageId.trim() === "",
                            className: "w-full bg-blue-600 text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-13",
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 20,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this),
                                    "Processing..."
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    "Upgrade to ",
                                    plans[selectedPlan].name,
                                    " - £",
                                    plans[selectedPlan].price,
                                    "/month"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-sm text-slate-500 mt-4",
                            children: "Secure payment powered by Stripe. Cancel anytime. No hidden fees."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/PlanUpgradeModal.tsx",
        lineNumber: 112,
        columnNumber: 10
    }, this);
}
_s(PlanUpgradeModal, "On/18A6wcC1+fqccbY5viOegNBA=");
_c = PlanUpgradeModal;
var _c;
__turbopack_context__.k.register(_c, "PlanUpgradeModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/access-control.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/garage/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GarageLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TrialBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/TrialBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OnboardingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/OnboardingModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/plans.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PlanUpgradeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PlanUpgradeModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/access-control.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-check.js [app-client] (ecmascript) <export default as CalendarCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
// Hide scrollbar while preserving scroll functionality
const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
;
;
;
;
;
;
const Sidebar = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isLoggingOut, setIsLoggingOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingJobs, setPendingJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [pendingBookings, setPendingBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [userRole, setUserRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [staffAccessRole, setStaffAccessRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            try {
                const rawUser = localStorage.getItem("user");
                if (rawUser) {
                    const userData = JSON.parse(rawUser);
                    setUserRole(userData?.role || null);
                    setStaffAccessRole(userData?.staff?.accessRole || null);
                }
            } catch (error) {
                setUserRole(null);
                setStaffAccessRole(null);
            }
        }
    }["Sidebar.useEffect"], []);
    const isStaffRestricted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGarageStaffRole"])(userRole) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$access$2d$control$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isManagerAccessRole"])(staffAccessRole);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (!isStaffRestricted) return;
            const allowed = pathname.startsWith("/garage/jobs") || pathname.startsWith("/garage/bookings");
            if (!allowed) {
                router.replace("/garage/jobs");
            }
        }
    }["Sidebar.useEffect"], [
        isStaffRestricted,
        pathname,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const loadPendingCounts = {
                "Sidebar.useEffect.loadPendingCounts": async ()=>{
                    try {
                        let garageId = null;
                        try {
                            const cached = localStorage.getItem("garage-data");
                            if (cached) {
                                const parsed = JSON.parse(cached);
                                garageId = parsed?.id || null;
                            }
                        } catch (error_1) {
                            garageId = null;
                        }
                        if (!garageId) {
                            // Try to get from localStorage cache
                            const cached_0 = localStorage.getItem("garage-data");
                            if (cached_0) {
                                const garage = JSON.parse(cached_0);
                                if (garage?.id) {
                                    garageId = garage.id;
                                }
                            }
                        }
                        if (!garageId) {
                            const res = await fetch("/api/garages");
                            if (res.ok) {
                                const garages = await res.json();
                                if (Array.isArray(garages) && garages[0]?.id) {
                                    garageId = garages[0].id;
                                    try {
                                        localStorage.setItem("garage-data", JSON.stringify(garages[0]));
                                    } catch (error_2) {
                                    // Ignore storage failures
                                    }
                                }
                            }
                        }
                        if (!garageId) return;
                        const jobsRes = await fetch(`/api/jobs?garageId=${garageId}`, {
                            cache: 'no-store',
                            headers: {
                                'Cache-Control': 'no-cache'
                            }
                        });
                        if (jobsRes.ok) {
                            const jobs = await jobsRes.json();
                            const list = Array.isArray(jobs) ? jobs : [];
                            const count = list.filter({
                                "Sidebar.useEffect.loadPendingCounts": (job)=>job?.status === "TODO" || job?.status === "BOOKED" || job?.status === "DOING" || job?.status === "IN_PROGRESS"
                            }["Sidebar.useEffect.loadPendingCounts"]).length;
                            setPendingJobs(count);
                        }
                        const bookingsRes = await fetch(`/api/garages/${garageId}/bookings`, {
                            cache: 'no-store',
                            headers: {
                                'Cache-Control': 'no-cache'
                            }
                        });
                        if (bookingsRes.ok) {
                            const data = await bookingsRes.json();
                            const list_0 = Array.isArray(data?.bookings) ? data.bookings : [];
                            const count_0 = list_0.filter({
                                "Sidebar.useEffect.loadPendingCounts": (booking)=>(booking?.status === "PENDING" || booking?.status === "CONFIRMED") && !booking?.convertedToJob
                            }["Sidebar.useEffect.loadPendingCounts"]).length;
                            setPendingBookings(count_0);
                        }
                    } catch (error_0) {
                        setPendingJobs(0);
                        setPendingBookings(0);
                    }
                }
            }["Sidebar.useEffect.loadPendingCounts"];
            loadPendingCounts();
            const handleFocus = {
                "Sidebar.useEffect.handleFocus": ()=>{
                    loadPendingCounts();
                }
            }["Sidebar.useEffect.handleFocus"];
            const handleVisibility = {
                "Sidebar.useEffect.handleVisibility": ()=>{
                    if (document.visibilityState === "visible") {
                        loadPendingCounts();
                    }
                }
            }["Sidebar.useEffect.handleVisibility"];
            const intervalId = window.setInterval({
                "Sidebar.useEffect.intervalId": ()=>{
                    loadPendingCounts();
                }
            }["Sidebar.useEffect.intervalId"], 15000); // 15 seconds - match other pages
            window.addEventListener("focus", handleFocus);
            document.addEventListener("visibilitychange", handleVisibility);
            return ({
                "Sidebar.useEffect": ()=>{
                    window.removeEventListener("focus", handleFocus);
                    document.removeEventListener("visibilitychange", handleVisibility);
                    window.clearInterval(intervalId);
                }
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    const handleLogout = async ()=>{
        if (!confirm("Are you sure you want to logout?")) {
            return;
        }
        try {
            setIsLoggingOut(true);
            // Call logout API to clear session
            await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // Clear local storage
            localStorage.removeItem("user");
            localStorage.removeItem("garage-id");
            localStorage.removeItem("garage-data");
            // Redirect to home page
            router.push("/");
        } catch (error_3) {
            console.error("Logout error:", error_3);
            // Still redirect even if logout API fails
            router.push("/");
        }
    };
    const navItems = [
        {
            label: "Dashboard",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            href: "/garage/dashboard"
        },
        {
            label: "Vehicle Lookup",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
            href: "/garage/lookup"
        },
        {
            label: "Customers",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            href: "/garage/customers"
        },
        {
            label: "Jobs",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
            href: "/garage/jobs",
            badge: pendingJobs
        },
        {
            label: "Online Bookings",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"],
            href: "/garage/bookings",
            badge: pendingBookings
        },
        {
            label: "Bookable Services",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"],
            href: "/garage/services"
        },
        {
            label: "Staff",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            href: "/garage/staff"
        },
        {
            label: "Inventory",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
            href: "/garage/inventory"
        },
        {
            label: "Expenses",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"],
            href: "/garage/expenses"
        },
        {
            label: "Reviews",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"],
            href: "/garage/reviews"
        },
        {
            label: "Reminders",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
            href: "/garage/reminders"
        },
        {
            label: "Campaigns",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"],
            href: "/garage/campaigns"
        },
        {
            label: "Settings",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            href: "/garage/settings"
        }
    ];
    const visibleNavItems = isStaffRestricted ? navItems.filter((item)=>item.href === "/garage/jobs" || item.href === "/garage/bookings") : navItems;
    const isNavItemActive = (href)=>{
        if (href === "/garage/dashboard") {
            return pathname === "/garage" || pathname === "/garage/dashboard";
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: scrollbarHideStyle
            }, void 0, false, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "print:hidden fixed bottom-0 left-0 right-0 lg:left-0 lg:top-0 lg:h-screen lg:w-64 bg-slate-900 text-white p-2 lg:pl-4 lg:pr-0 lg:py-4 z-50 flex lg:flex-col items-center lg:items-stretch border-t border-slate-800 lg:border-t-0 shadow-lg lg:shadow-none overflow-x-auto lg:overflow-x-visible",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scrollbar-hide flex lg:flex-col items-center lg:items-stretch gap-2 lg:gap-2 lg:flex-1 lg:overflow-y-auto min-w-full lg:min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:flex items-center gap-2 mb-8 px-2 py-4 border-b border-slate-800 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            size: 24,
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/layout.tsx",
                                            lineNumber: 235,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/layout.tsx",
                                        lineNumber: 234,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-xl font-bold tracking-tight",
                                                children: "GarageBoost"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/layout.tsx",
                                                lineNumber: 238,
                                                columnNumber: 13
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-slate-400 uppercase tracking-widest font-semibold",
                                                children: "UK Revenue Assistant"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/layout.tsx",
                                                lineNumber: 239,
                                                columnNumber: 13
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/layout.tsx",
                                        lineNumber: 237,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 233,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            visibleNavItems.map((item_0)=>{
                                const isActive = isNavItemActive(item_0.href);
                                const badgeText = item_0.badge && item_0.badge > 99 ? "99+" : item_0.badge;
                                const labelText = badgeText ? `${item_0.label} (${badgeText})` : item_0.label;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item_0.href,
                                    "aria-current": isActive ? "page" : undefined,
                                    className: `flex flex-col lg:flex-row items-center gap-1 lg:gap-3 p-2 lg:p-3 rounded-none transition-all shrink-0 min-h-13.5 lg:min-h-11 touch-manipulation active:scale-95 min-w-17.5 lg:w-full ${isActive ? "bg-linear-to-r from-blue-600/30 via-indigo-600/25 to-cyan-500/25 text-white ring-1 ring-blue-300/60 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item_0.icon, {
                                            size: 20,
                                            className: `shrink-0 ${isActive ? "text-blue-300" : ""}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/layout.tsx",
                                            lineNumber: 250,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] lg:text-sm font-medium leading-tight text-center lg:text-left whitespace-nowrap",
                                            children: labelText
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/layout.tsx",
                                            lineNumber: 251,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item_0.href, true, {
                                    fileName: "[project]/src/app/garage/layout.tsx",
                                    lineNumber: 249,
                                    columnNumber: 18
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/layout.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogout,
                        disabled: isLoggingOut,
                        className: "hidden lg:flex items-center gap-3 p-3 w-full rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all border-t border-slate-800 disabled:opacity-50 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 259,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: isLoggingOut ? "Logging out..." : "Logout"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 260,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/layout.tsx",
                        lineNumber: 258,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Sidebar, "d4fvGpUWAvuP3A9Uk6RmapyrU9U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
function GarageLayout({ children }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [garageData, setGarageData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPlanModal, setShowPlanModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [refreshingPlan, setRefreshingPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [upgradeNotice, setUpgradeNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTrialExpiredBlocked, setIsTrialExpiredBlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showOnboarding, setShowOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GarageLayout.useEffect": ()=>{
            // Check if user is logged in
            const user = localStorage.getItem("user");
            if (!user) {
                router.push("/login");
                return;
            }
            try {
                const userData = JSON.parse(user);
                if (userData.role === "ADMIN" || userData.role === "SUPER_ADMIN") {
                    router.push("/admin");
                    return;
                }
                setIsAuthenticated(true);
                // Load garage data - use cached data for now
                const fetchGarageData = {
                    "GarageLayout.useEffect.fetchGarageData": async ()=>{
                        // Just use cached data - API endpoint requires proper session cookies
                        const garage = localStorage.getItem("garage-data");
                        if (garage) {
                            setGarageData(JSON.parse(garage));
                        }
                    }
                }["GarageLayout.useEffect.fetchGarageData"];
                if (userData?.staff?.garage) {
                    try {
                        localStorage.setItem("garage-data", JSON.stringify(userData.staff.garage));
                        setGarageData(userData.staff.garage);
                    } catch (error_0) {
                    // Ignore storage failures
                    }
                }
                fetchGarageData();
            } catch (error) {
                router.push("/login");
                return;
            }
            setIsLoading(false);
        }
    }["GarageLayout.useEffect"], [
        router
    ]);
    // Check if trial is expired and block access
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GarageLayout.useEffect": ()=>{
            if (!garageData) return;
            // If garage status is TRIAL and trial has expired, block access
            if (garageData.status === "TRIAL" && garageData.trialEndsAt) {
                const trialDate = new Date(garageData.trialEndsAt);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTrialExpired"])(trialDate)) {
                    setIsTrialExpiredBlocked(true);
                    setShowPlanModal(true);
                }
            }
        }
    }["GarageLayout.useEffect"], [
        garageData
    ]);
    // Check if onboarding is needed (phone or address missing)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GarageLayout.useEffect": ()=>{
            if (!garageData || garageData.id === undefined) return;
            // Show onboarding if phone or address are missing
            const needsOnboarding = !garageData.phone || !garageData.address || !garageData.postcode || !garageData.city;
            if (needsOnboarding && !isTrialExpiredBlocked) {
                setShowOnboarding(true);
            }
        }
    }["GarageLayout.useEffect"], [
        garageData,
        isTrialExpiredBlocked
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GarageLayout.useEffect": ()=>{
            // If returning from Stripe checkout with success, refresh garage data
            try {
                const params = new URLSearchParams(window.location.search);
                if (params.get("success") === "true") {
                    ({
                        "GarageLayout.useEffect": async ()=>{
                            try {
                                // If we have a Stripe session_id in the URL, call the session endpoint
                                // to confirm the checkout and update the garage record immediately.
                                const sessionId = params.get("session_id");
                                if (sessionId) {
                                    try {
                                        const res = await fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`);
                                        if (res.ok) {
                                            const data = await res.json();
                                            if (data?.updated && data?.garage) {
                                                try {
                                                    localStorage.setItem("garage-data", JSON.stringify(data.garage));
                                                } catch (e_4) {}
                                                setGarageData(data.garage);
                                                const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$plans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlanLabel"])(data.garage.plan);
                                                const message = `Upgraded to ${label}`;
                                                try {
                                                    localStorage.setItem("garage-upgrade-success", JSON.stringify({
                                                        message,
                                                        plan: data.garage.plan
                                                    }));
                                                } catch (e_5) {}
                                                try {
                                                    window.dispatchEvent(new Event("garage-upgraded"));
                                                } catch (e_6) {}
                                                setUpgradeNotice(message);
                                            }
                                        }
                                    } catch (e_3) {
                                    // best-effort: ignore errors here and continue polling the garage API
                                    }
                                }
                                // Poll for updated garage plan because Stripe webhook may process asynchronously
                                const prev = garageData || (localStorage.getItem("garage-data") ? JSON.parse(localStorage.getItem("garage-data")) : null);
                                setRefreshingPlan(true);
                                try {
                                    localStorage.setItem("garage-refreshing", "true");
                                } catch (e_7) {}
                                try {
                                    window.dispatchEvent(new Event("garage-refresh-start"));
                                } catch (e_8) {}
                                const prevPlan = prev?.plan || null;
                                const maxAttempts = 6;
                                const delayMs = 2000; // 2s between polls
                                const garageIdToCheck = prev?.id || null;
                                for(let i = 0; i < maxAttempts; i++){
                                    try {
                                        let res_0;
                                        if (garageIdToCheck) {
                                            res_0 = await fetch(`/api/garages/${garageIdToCheck}`);
                                            if (res_0.ok) {
                                                const latest = await res_0.json();
                                                if (latest && (latest.plan !== prevPlan || i === maxAttempts - 1)) {
                                                    localStorage.setItem("garage-data", JSON.stringify(latest));
                                                    setGarageData(latest);
                                                    setRefreshingPlan(false);
                                                    break;
                                                }
                                            }
                                        } else {
                                            res_0 = await fetch("/api/garages");
                                            if (res_0.ok) {
                                                const list = await res_0.json();
                                                if (list && list[0]) {
                                                    const latest_0 = list[0];
                                                    if (latest_0.plan !== prevPlan || i === maxAttempts - 1) {
                                                        localStorage.setItem("garage-data", JSON.stringify(latest_0));
                                                        setGarageData(latest_0);
                                                        setRefreshingPlan(false);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (e_9) {
                                    // ignore and retry
                                    }
                                    // wait before next attempt
                                    await new Promise({
                                        "GarageLayout.useEffect": (r)=>setTimeout(r, delayMs)
                                    }["GarageLayout.useEffect"]);
                                }
                                // if we exhausted attempts, clear refreshing flag
                                setRefreshingPlan(false);
                                try {
                                    localStorage.setItem("garage-refreshing", "false");
                                } catch (e_10) {}
                                try {
                                    window.dispatchEvent(new Event("garage-refresh-end"));
                                } catch (e_11) {}
                                // remove success param from URL
                                const url = new URL(window.location.href);
                                url.searchParams.delete("success");
                                url.searchParams.delete("session_id");
                                window.history.replaceState({}, "", url.toString());
                            } catch (e_0) {
                                console.error("Failed to refresh garage after checkout", e_0);
                                try {
                                    localStorage.setItem("garage-refreshing", "false");
                                } catch (e_1) {}
                                try {
                                    window.dispatchEvent(new Event("garage-refresh-end"));
                                } catch (e_2) {}
                            }
                        }
                    })["GarageLayout.useEffect"]();
                }
            } catch (e) {}
        }
    }["GarageLayout.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GarageLayout.useEffect": ()=>{
            // Listen for upgrade events from session-confirm or other tabs
            const readNotice = {
                "GarageLayout.useEffect.readNotice": ()=>{
                    try {
                        const raw = localStorage.getItem("garage-upgrade-success");
                        if (raw) {
                            const parsed = JSON.parse(raw);
                            setUpgradeNotice(parsed?.message || null);
                            return;
                        }
                    } catch (e_12) {}
                    setUpgradeNotice(null);
                }
            }["GarageLayout.useEffect.readNotice"];
            const onUpgrade = {
                "GarageLayout.useEffect.onUpgrade": ()=>readNotice()
            }["GarageLayout.useEffect.onUpgrade"];
            const onStorage = {
                "GarageLayout.useEffect.onStorage": (ev)=>{
                    if (ev.key === "garage-upgrade-success") readNotice();
                }
            }["GarageLayout.useEffect.onStorage"];
            window.addEventListener("garage-upgraded", onUpgrade);
            window.addEventListener("storage", onStorage);
            // init
            readNotice();
            return ({
                "GarageLayout.useEffect": ()=>{
                    window.removeEventListener("garage-upgraded", onUpgrade);
                    window.removeEventListener("storage", onStorage);
                }
            })["GarageLayout.useEffect"];
        }
    }["GarageLayout.useEffect"], []);
    if (isLoading || !isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
            }, void 0, false, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 486,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/garage/layout.tsx",
            lineNumber: 485,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PlanUpgradeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanUpgradeModal"], {
                isOpen: showPlanModal,
                onClose: ()=>setShowPlanModal(isTrialExpiredBlocked),
                currentPlan: garageData?.plan,
                garageId: garageData?.id ?? "",
                isRefreshing: refreshingPlan
            }, void 0, false, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OnboardingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showOnboarding,
                garageId: garageData?.id ?? "",
                onClose: ()=>setShowOnboarding(false),
                onComplete: ()=>{
                    setShowOnboarding(false);
                    // Refresh garage data to verify changes
                    const cached = localStorage.getItem("garage-data");
                    if (cached) {
                        setGarageData(JSON.parse(cached));
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 493,
                columnNumber: 7
            }, this),
            isTrialExpiredBlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 text-red-600",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/layout.tsx",
                                    lineNumber: 507,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 506,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 505,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-slate-900 mb-2",
                            children: "Trial Expired"
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 510,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 mb-6",
                            children: "Your trial period has ended. Please add a payment method to continue using GarageBoost."
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 511,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowPlanModal(true),
                            className: "w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors",
                            children: "Add Payment Now"
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 512,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-500 mt-4",
                            children: "No hidden fees. Cancel anytime."
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 515,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/layout.tsx",
                    lineNumber: 504,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 503,
                columnNumber: 33
            }, this),
            upgradeNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "print:hidden max-w-7xl mx-auto mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between bg-emerald-600 text-white p-4 rounded-lg shadow-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M20 6L9 17l-5-5",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/layout.tsx",
                                        lineNumber: 521,
                                        columnNumber: 107
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/layout.tsx",
                                    lineNumber: 521,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: upgradeNotice
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/layout.tsx",
                                            lineNumber: 523,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm opacity-90",
                                            children: "Your subscription has been updated."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/layout.tsx",
                                            lineNumber: 524,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/layout.tsx",
                                    lineNumber: 522,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 520,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setUpgradeNotice(null);
                                    try {
                                        localStorage.removeItem("garage-upgrade-success");
                                    } catch (e_13) {}
                                },
                                className: "text-white/90 hover:text-white text-sm font-medium",
                                children: "Dismiss"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 528,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/layout.tsx",
                            lineNumber: 527,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/layout.tsx",
                    lineNumber: 519,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/layout.tsx",
                lineNumber: 518,
                columnNumber: 25
            }, this),
            !isTrialExpiredBlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    garageData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            ("TURBOPACK compile-time value", "development") === "development" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-yellow-100 text-yellow-800 text-xs p-2 text-center border-b border-yellow-200",
                                children: [
                                    "DEBUG: status=",
                                    garageData.status,
                                    ", trialEndsAt=",
                                    garageData.trialEndsAt ? "set" : "null"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 541,
                                columnNumber: 58
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TrialBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                trialEndsAt: garageData.trialEndsAt ? new Date(garageData.trialEndsAt) : null,
                                currentPlan: garageData.plan || "professional",
                                status: garageData.status,
                                onViewPlans: ()=>setShowPlanModal(true)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 544,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col lg:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {}, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 547,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "flex-1 lg:ml-64 p-4 md:p-6 lg:p-12 pb-24 lg:pb-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-7xl mx-auto",
                                    children: children
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/layout.tsx",
                                    lineNumber: 549,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/layout.tsx",
                                lineNumber: 548,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/layout.tsx",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/layout.tsx",
        lineNumber: 489,
        columnNumber: 10
    }, this);
}
_s1(GarageLayout, "3vrVL1EgMDojkDfQgeJV9sZBl0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = GarageLayout;
var _c, _c1;
__turbopack_context__.k.register(_c, "Sidebar");
__turbopack_context__.k.register(_c1, "GarageLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_758749df._.js.map