(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/vehicle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "vehicleTitle",
    ()=>vehicleTitle
]);
function vehicleTitle(v) {
    if (!v) return "Vehicle";
    const parts = [];
    if (v.make) parts.push(String(v.make));
    if (v.typeApproval) parts.push(String(v.typeApproval));
    if (v.model) {
        const m = String(v.model).trim();
        const lower = m.toLowerCase();
        if (m && lower !== "unknown" && lower !== "n/a" && lower !== "na") parts.push(m);
    }
    if (v.variant) parts.push(String(v.variant));
    if (parts.length > 0) return parts.join(" ");
    if (v.engine) return String(v.engine);
    if (v.registration) return String(v.registration);
    if (v.vrm) return String(v.vrm);
    return "Vehicle";
}
const __TURBOPACK__default__export__ = vehicleTitle;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/vrm.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * VRM (Vehicle Registration Mark) utilities for UK number plates
 */ /**
 * Normalize a VRM to consistent format: uppercase, no spaces
 * @param vrm Raw VRM input
 * @returns Normalized VRM (e.g., "AB12 CDE" -> "AB12CDE")
 */ __turbopack_context__.s([
    "formatVRM",
    ()=>formatVRM,
    "isValidVRM",
    ()=>isValidVRM,
    "normalizeVRM",
    ()=>normalizeVRM
]);
function normalizeVRM(vrm) {
    return vrm.toUpperCase().replace(/\s+/g, "").trim();
}
function formatVRM(vrm) {
    const normalized = normalizeVRM(vrm);
    // UK VRM patterns (simplified):
    // Current format (2001+): AB12 CDE (2 letters, 2 digits, 3 letters)
    // Prefix format (1983-2001): A123 BCD (1 letter, 1-3 digits, 3 letters)
    // Suffix format (1963-1983): ABC 123D (3 letters, 1-3 digits, 1 letter)
    // Try current format first (most common)
    const currentMatch = normalized.match(/^([A-Z]{2})(\d{2})([A-Z]{3})$/);
    if (currentMatch) {
        return `${currentMatch[1]}${currentMatch[2]} ${currentMatch[3]}`;
    }
    // Try prefix format
    const prefixMatch = normalized.match(/^([A-Z])(\d{1,3})([A-Z]{3})$/);
    if (prefixMatch) {
        return `${prefixMatch[1]}${prefixMatch[2]} ${prefixMatch[3]}`;
    }
    // Try suffix format
    const suffixMatch = normalized.match(/^([A-Z]{3})(\d{1,3})([A-Z])$/);
    if (suffixMatch) {
        return `${suffixMatch[1]} ${suffixMatch[2]}${suffixMatch[3]}`;
    }
    // If no pattern matches, return as-is (might be edge case or invalid)
    return normalized;
}
function isValidVRM(vrm) {
    const normalized = normalizeVRM(vrm);
    // Must be 2-7 characters (most UK plates)
    if (normalized.length < 2 || normalized.length > 7) {
        return false;
    }
    // Must contain at least one letter and one digit
    if (!/[A-Z]/.test(normalized) || !/\d/.test(normalized)) {
        return false;
    }
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastContainer",
    ()=>ToastContainer,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function useToast() {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (message, type = "info", duration = 3000)=>{
        const id = Math.random().toString(36).substr(2, 9);
        const toast = {
            id,
            message,
            type,
            duration
        };
        setToasts((prev)=>[
                ...prev,
                toast
            ]);
        if (duration) {
            setTimeout(()=>{
                removeToast(id);
            }, duration);
        }
        return id;
    };
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    };
    return {
        toasts,
        addToast,
        removeToast
    };
}
_s(useToast, "nD8TBOiFYf9ajstmZpZK2DP4rNo=");
function ToastContainer({ toasts, removeToast }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-24 lg:bottom-4 right-4 flex flex-col gap-3 z-100",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                toast: toast,
                onClose: ()=>removeToast(toast.id)
            }, toast.id, false, {
                fileName: "[project]/src/components/ui/Toast.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Toast.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = ToastContainer;
function Toast({ toast, onClose }) {
    _s1();
    const [isExiting, setIsExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bgColorMap = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-amber-600"
    };
    const iconMap = {
        success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
        info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
        warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"]
    };
    const Icon = iconMap[toast.type];
    const handleClose = ()=>{
        setIsExiting(true);
        setTimeout(onClose, 200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${bgColorMap[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-200 ${isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-1",
                children: toast.message
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleClose,
                className: "text-white/70 hover:text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Toast.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toast.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s1(Toast, "YUgHO6hDFsOFoxvdBfjVCMlLujk=");
_c1 = Toast;
var _c, _c1;
__turbopack_context__.k.register(_c, "ToastContainer");
__turbopack_context__.k.register(_c1, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/uk-date.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/garage/lookup/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VehicleLookupPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vehicle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vehicle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vrm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vrm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/uk-date.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const formatDate = (value)=>{
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 10);
};
function VehicleLookupPage() {
    _s();
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [vrm, setVrm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchError, setSearchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [garageId, setGarageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quoteVatRate, setQuoteVatRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [showCustomerModal, setShowCustomerModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showEmailModal, setShowEmailModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showQuoteBuilder, setShowQuoteBuilder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sendingEmail, setSendingEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ...existing code...
    const [quoteItems, setQuoteItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editableAdvisories, setEditableAdvisories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isEditingAdvisories, setIsEditingAdvisories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customerDetails, setCustomerDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        phone: "",
        email: ""
    });
    const [quoteCreated, setQuoteCreated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAction, setSelectedAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [savingToCRM, setSavingToCRM] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [crmSuccess, setCrmSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customerMode, setCustomerMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("new");
    const [existingCustomers, setExistingCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCustomerId, setSelectedCustomerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load garage ID on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VehicleLookupPage.useEffect": ()=>{
            const loadGarageId = {
                "VehicleLookupPage.useEffect.loadGarageId": async ()=>{
                    let resolvedGarageId = null;
                    try {
                        const cached = localStorage.getItem("garage-data");
                        if (cached) {
                            const parsed = JSON.parse(cached);
                            resolvedGarageId = parsed?.id || null;
                            setQuoteVatRate(parsed?.vatEnabled === false ? 0 : 20);
                        }
                    } catch (error) {
                        resolvedGarageId = null;
                    }
                    if (!resolvedGarageId) {
                        const res = await fetch("/api/garages/me");
                        if (res.ok) {
                            const garage = await res.json();
                            if (garage?.id) {
                                resolvedGarageId = garage.id;
                                setQuoteVatRate(garage?.vatEnabled === false ? 0 : 20);
                                try {
                                    localStorage.setItem("garage-data", JSON.stringify(garage));
                                } catch (error) {
                                // ignore storage failures
                                }
                            }
                        }
                    }
                    if (resolvedGarageId) {
                        setGarageId(resolvedGarageId);
                        const customersRes = await fetch(`/api/garages/${resolvedGarageId}/customers`);
                        if (customersRes.ok) {
                            const customersData = await customersRes.json();
                            setExistingCustomers(customersData);
                        }
                    }
                }
            }["VehicleLookupPage.useEffect.loadGarageId"];
            loadGarageId();
        }
    }["VehicleLookupPage.useEffect"], []);
    const handleSearch = async (event)=>{
        event.preventDefault();
        if (!vrm) return;
        const normalizedVRM = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vrm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeVRM"])(vrm);
        setVrm(normalizedVRM);
        setLoading(true);
        setSearchError("");
        setResult(null);
        try {
            const response = await fetch("/api/lookup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vrm: normalizedVRM
                })
            });
            if (!response.ok) {
                if (response.status === 404) {
                    setSearchError("❌ Vehicle not found. Please check the registration number and try again.");
                } else if (response.status === 400) {
                    setSearchError("❌ Invalid registration number format.");
                } else {
                    setSearchError("❌ Unable to look up vehicle. Please try again.");
                }
                return;
            }
            const data = await response.json();
            if (data.error) {
                setSearchError("❌ " + data.error);
                return;
            }
            setResult(data);
            setShowCustomerModal(false);
            setShowQuoteBuilder(false);
            setQuoteItems([]);
            setQuoteCreated(null);
            setCustomerDetails({
                name: "",
                phone: "",
                email: ""
            });
        } catch (error) {
            console.error("Search error:", error);
            setSearchError("❌ Failed to search for vehicle. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    const handleSaveCustomerAndViewQuote = ()=>{
        // Only validate name/email for new customers
        if (customerMode !== "existing") {
            if (!customerDetails.name.trim()) {
                addToast("Please enter customer name", "error");
                return;
            }
            if (!customerDetails.email.trim()) {
                addToast("Please enter customer email", "error");
                return;
            }
        } else {
            // Validate customer selection for existing customers
            if (!selectedCustomerId) {
                addToast("Please select a customer", "error");
                return;
            }
        }
        // Initialize quote items from advisories + MOT
        const motPrice = 5485;
        const items = [
            {
                type: "MOT",
                name: "MOT Test",
                description: "Annual MOT inspection",
                quantity: 1,
                unitPricePence: motPrice,
                totalPence: motPrice,
                included: true
            },
            ...result.advisories.map((advisory, idx)=>({
                    id: `advisory-${idx}`,
                    type: "ADVISORY",
                    name: advisory.text,
                    description: `Category: ${advisory.category}`,
                    quantity: 1,
                    unitPricePence: advisory.estPricePence,
                    totalPence: advisory.estPricePence,
                    included: true
                }))
        ];
        setQuoteItems(items);
        setShowCustomerModal(false);
        setShowQuoteBuilder(true);
    };
    const saveCustomerToCRM = async (silent = false)=>{
        // Validate based on customer mode
        if (customerMode === "existing") {
            if (!selectedCustomerId) {
                if (!silent) {
                    addToast("Please select a customer", "error");
                }
                return false;
            }
        } else {
            // New customer - validate name and email
            if (!customerDetails.name.trim() || !customerDetails.email.trim()) {
                if (!silent) {
                    addToast("Please enter customer name and email", "error");
                }
                return false;
            }
        }
        if (!result || !garageId) {
            if (!silent) {
                addToast("Missing vehicle or garage information", "error");
            }
            return false;
        }
        if (!silent) {
            setSavingToCRM(true);
        }
        try {
            // If using existing customer, get their details
            let customerName = customerDetails.name;
            let customerEmail = customerDetails.email;
            let customerPhone = customerDetails.phone;
            if (customerMode === "existing" && selectedCustomerId) {
                const existingCustomer = existingCustomers.find((c)=>c.id === selectedCustomerId);
                if (existingCustomer) {
                    customerName = existingCustomer.name;
                    customerEmail = existingCustomer.email;
                    customerPhone = existingCustomer.phone || "";
                }
            }
            console.log("[Lookup] Saving customer to CRM:", {
                name: customerName,
                email: customerEmail
            });
            const response = await fetch(`/api/garages/${garageId}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    vehicleData: {
                        vrm: result.vrm,
                        make: result.make,
                        typeApproval: result.typeApproval ?? undefined,
                        model: result.model,
                        motExpiry: result.motExpiry,
                        taxStatus: result.taxStatus || "Unknown",
                        taxExpiry: result.taxExpiry || null,
                        mileage: result.mileage
                    }
                })
            });
            console.log("[Lookup] API Response status:", response.status);
            if (!response.ok) {
                const error = await response.json();
                console.error("[Lookup] API Error:", error);
                if (!silent) {
                    throw new Error(error.error || "Failed to save customer");
                }
                return false;
            }
            const customer = await response.json();
            console.log("[Lookup] Customer saved successfully:", customer.id);
            if (!silent) {
                setCrmSuccess(true);
                setShowCustomerModal(false);
                setTimeout(()=>{
                    setCrmSuccess(false);
                    setVrm("");
                    setResult(null);
                    setCustomerDetails({
                        name: "",
                        phone: "",
                        email: ""
                    });
                }, 2000);
            }
            return true;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            console.error("[Lookup] Error saving to CRM:", errorMsg, error);
            if (!silent) {
                addToast(`Failed to save customer: ${errorMsg}`, "error");
            }
            return false;
        } finally{
            if (!silent) {
                setSavingToCRM(false);
            }
        }
    };
    const handleSaveCustomerToCRM = async ()=>{
        await saveCustomerToCRM(false);
    };
    const toggleItemInclusion = (idx)=>{
        const updated = [
            ...quoteItems
        ];
        updated[idx].included = !updated[idx].included;
        setQuoteItems(updated);
    };
    const updateItemPrice = (idx, newPrice)=>{
        const updated = [
            ...quoteItems
        ];
        updated[idx].unitPricePence = newPrice;
        updated[idx].totalPence = Math.round(newPrice * updated[idx].quantity);
        setQuoteItems(updated);
    };
    const addCustomItem = ()=>{
        const newItem = {
            type: "SERVICE",
            name: "New Service",
            description: "",
            quantity: 1,
            unitPricePence: 0,
            totalPence: 0,
            included: true
        };
        setQuoteItems([
            ...quoteItems,
            newItem
        ]);
    };
    const removeItem = (idx)=>{
        setQuoteItems(quoteItems.filter((_, i)=>i !== idx));
    };
    // Advisory editing functions
    const startEditingAdvisories = ()=>{
        if (result) {
            setEditableAdvisories([
                ...result.advisories
            ]);
            setIsEditingAdvisories(true);
        }
    };
    const cancelEditingAdvisories = ()=>{
        setIsEditingAdvisories(false);
        setEditableAdvisories([]);
    };
    const updateAdvisoryPrice = (idx, newPrice)=>{
        const updated = [
            ...editableAdvisories
        ];
        updated[idx].estPricePence = newPrice;
        setEditableAdvisories(updated);
    };
    const updateAdvisoryText = (idx, newText)=>{
        const updated = [
            ...editableAdvisories
        ];
        updated[idx].text = newText;
        setEditableAdvisories(updated);
    };
    const removeAdvisory = (idx)=>{
        setEditableAdvisories(editableAdvisories.filter((_, i)=>i !== idx));
    };
    const addCustomAdvisory = ()=>{
        const newAdvisory = {
            text: "New Advisory",
            category: "Other",
            estPricePence: 5000
        };
        setEditableAdvisories([
            ...editableAdvisories,
            newAdvisory
        ]);
    };
    const saveEditedAdvisories = async ()=>{
        if (!result || !garageId) return;
        try {
            // First, save the vehicle if it doesn't exist
            const vehicleResponse = await fetch("/api/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vrm: result.vrm,
                    make: result.make,
                    typeApproval: result.typeApproval ?? undefined,
                    model: result.model,
                    motExpiry: result.motExpiry,
                    ownerName: "",
                    ownerPhone: null,
                    ownerEmail: null,
                    mileage: result.mileage,
                    garageId,
                    advisories: editableAdvisories
                })
            });
            if (vehicleResponse.ok) {
                const vehicle = await vehicleResponse.json();
                // Update the result with edited advisories
                setResult({
                    ...result,
                    advisories: editableAdvisories
                });
                setIsEditingAdvisories(false);
                addToast("Advisories saved successfully!", "success");
            } else {
                addToast("Failed to save advisories", "error");
            }
        } catch (error) {
            console.error("Error saving advisories:", error);
            addToast("Error saving advisories", "error");
        }
    };
    const calculateTotals = ()=>{
        const subtotal = quoteItems.filter((item)=>item.included).reduce((sum, item)=>sum + item.totalPence, 0);
        const vat = Math.round(subtotal * (quoteVatRate / 100));
        return {
            subtotal,
            vat,
            total: subtotal + vat
        };
    };
    const handleCreateQuote = async ()=>{
        if (!result || !garageId) return;
        const { subtotal, vat, total } = calculateTotals();
        try {
            // Include only the items that are selected
            const selectedItems = quoteItems.filter((item)=>item.included);
            const response = await fetch("/api/quotes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vehicleVrm: result.vrm,
                    vehicleMake: result.make,
                    vehicleTypeApproval: result.typeApproval ?? undefined,
                    vehicleModel: result.model,
                    motExpiry: result.motExpiry,
                    mileage: result.mileage,
                    garageId,
                    customerName: customerDetails.name || "Draft Customer",
                    customerPhone: customerDetails.phone || null,
                    customerEmail: customerDetails.email || "draft@placeholder.local",
                    items: selectedItems.map((item)=>({
                            type: item.type,
                            name: item.name,
                            description: item.description,
                            quantity: item.quantity,
                            unitPricePence: item.unitPricePence,
                            totalPence: item.totalPence
                        })),
                    notes: `Generated from VRM lookup on ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUKDate"])(new Date())}`
                })
            });
            if (!response.ok) {
                let error = {};
                try {
                    error = await response.json();
                } catch (e) {
                    const text = await response.text();
                    error = {
                        error: response.statusText,
                        details: text
                    };
                }
                const errorMsg = error.details ? `${error.error}: ${error.details}` : error.error || response.statusText;
                addToast(`Error creating quote (${response.status}): ${errorMsg}`, "error");
                console.error("API Error Response:", {
                    status: response.status,
                    body: error
                });
                return;
            }
            const quote = await response.json();
            console.log("Quote created:", quote);
            setQuoteCreated(quote);
            await saveCustomerToCRM(true);
        } catch (error) {
            console.error("Error creating quote:", error);
            addToast(`Error creating quote: ${error instanceof Error ? error.message : String(error)}`, "error");
        }
    };
    // Health check PDF logic removed
    const handleSendEmailClick = ()=>{
        // Pre-populate with quote data if customer details are empty or draft
        if (quoteCreated && (!customerDetails.email || customerDetails.email === "draft@placeholder.local")) {
            setCustomerDetails({
                name: quoteCreated.customerName !== "Draft Customer" ? quoteCreated.customerName : "",
                email: quoteCreated.customerEmail !== "draft@placeholder.local" ? quoteCreated.customerEmail : "",
                phone: quoteCreated.customerPhone || ""
            });
        }
        setShowEmailModal(true);
    };
    const handleSendEmailWithDetails = async ()=>{
        if (!quoteCreated) return;
        if (!customerDetails.name.trim() || !customerDetails.email.trim()) {
            addToast("Please enter customer name and email", "error");
            return;
        }
        setSendingEmail(true);
        setShowEmailModal(false);
        try {
            // Update quote with customer details first
            const updateResponse = await fetch(`/api/quotes/${quoteCreated.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customerName: customerDetails.name,
                    customerEmail: customerDetails.email,
                    customerPhone: customerDetails.phone || null
                })
            });
            if (!updateResponse.ok) {
                addToast("Error updating customer details", "error");
                setSendingEmail(false);
                return;
            }
            // Now send the email
            const response = await fetch(`/api/quotes/${quoteCreated.id}/email`, {
                method: "POST"
            });
            if (response.ok) {
                const data = await response.json();
                addToast(`Quote sent to ${customerDetails.email}`, "success");
                // Update quote status to SENT
                await updateQuoteStatus("SENT");
            } else {
                addToast("Error sending email", "error");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            addToast("Error sending email", "error");
        } finally{
            setSendingEmail(false);
        }
    };
    const updateQuoteStatus = async (newStatus, reason)=>{
        if (!quoteCreated) return;
        try {
            const response = await fetch(`/api/quotes/${quoteCreated.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: newStatus,
                    reason: reason,
                    details: `Status changed to ${newStatus}`
                })
            });
            if (response.ok) {
                const updated = await response.json();
                setQuoteCreated(updated);
                addToast(`Quote status changed to ${newStatus}`, "success");
            } else {
                addToast("Error updating quote status", "error");
            }
        } catch (error) {
            console.error("Error updating quote status:", error);
            addToast("Error updating quote status", "error");
        }
    };
    const handleQuoteAccepted = ()=>{
        updateQuoteStatus("ACCEPTED", "Customer accepted the quote");
    };
    const handleQuoteDeclined = ()=>{
        const reason = window.prompt("Why was the quote declined?", "No reason provided");
        if (reason !== null) {
            updateQuoteStatus("DECLINED", reason);
        }
    };
    const handleSaveVehicle = async ()=>{
        if (!result || !garageId) return;
        // Validate customer details
        if (!customerDetails.name.trim()) {
            addToast("Please enter customer name", "error");
            return;
        }
        const response = await fetch("/api/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                vrm: result.vrm,
                make: result.make,
                model: result.model,
                motExpiry: result.motExpiry,
                ownerName: customerDetails.name,
                ownerPhone: customerDetails.phone || null,
                ownerEmail: customerDetails.email || null,
                mileage: result.mileage,
                garageId,
                advisories: result.advisories.map((advisory)=>({
                        text: advisory.text,
                        category: advisory.category,
                        estPricePence: advisory.estPricePence
                    }))
            })
        });
        if (response.ok) {
            addToast("Customer saved successfully!", "success");
            setResult(null);
            setVrm("");
            setShowCustomerModal(false);
            setCustomerDetails({
                name: "",
                phone: "",
                email: ""
            });
        }
    };
    const { subtotal, vat, total } = calculateTotals();
    const motPrice = 5485;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-6 md:p-10 mb-8 border-none shadow-xl shadow-blue-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-6 md:mb-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl md:text-3xl font-extrabold text-slate-900",
                                children: "Vehicle Revenue Finder"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 662,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm md:text-base text-slate-500 mt-2",
                                children: "Enter VRM to find jobs your customers aren't booking yet."
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 661,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSearch,
                        className: "flex flex-col sm:flex-row gap-3 max-w-lg mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "ENTER VRM",
                                className: "flex-1 bg-yellow-400 border-2 border-slate-900 text-slate-900 px-4 md:px-6 py-3 md:py-4 rounded-xl text-xl md:text-2xl font-black text-center placeholder:text-slate-700 tracking-tighter uppercase",
                                value: vrm,
                                onChange: (event)=>setVrm(event.target.value.toUpperCase())
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 666,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 min-h-13 md:min-h-15",
                                children: [
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 678,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 680,
                                        columnNumber: 15
                                    }, this),
                                    "Search"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 673,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 665,
                        columnNumber: 9
                    }, this),
                    searchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm md:text-base font-medium max-w-lg mx-auto",
                        children: searchError
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 686,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/lookup/page.tsx",
                lineNumber: 660,
                columnNumber: 7
            }, this),
            result && !showCustomerModal && !showQuoteBuilder && !quoteCreated && !crmSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "animate-in fade-in slide-in-from-bottom-5 duration-500 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 md:p-6 bg-slate-50 border-b border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl md:text-2xl font-extrabold text-slate-900",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vehicle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vehicleTitle"])(result)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 697,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm text-slate-500 mt-1",
                                                children: [
                                                    result.vrm,
                                                    result.color && ` • ${result.color}`,
                                                    result.fuel && ` • ${result.fuel}`,
                                                    result.firstReg && ` • First Reg: ${result.firstReg}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 700,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 696,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-2 sm:gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSelectedAction("quote");
                                                    setShowCustomerModal(true);
                                                },
                                                disabled: !garageId,
                                                className: "bg-blue-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60 text-sm md:text-base transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 713,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Quote"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 705,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSelectedAction("crm");
                                                    setShowCustomerModal(true);
                                                },
                                                disabled: !garageId,
                                                className: "bg-emerald-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 disabled:opacity-60 text-sm md:text-base transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 723,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Add to CRM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 715,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 704,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 695,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 md:p-8 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
                                                children: "MOT Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 729,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-3 h-3 rounded-full ${new Date(result.motExpiry) > new Date() ? "bg-emerald-500" : "bg-rose-500"}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-base md:text-lg font-bold",
                                                        children: result.motStatus
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 736,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 730,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm text-slate-500",
                                                children: [
                                                    "Expires: ",
                                                    formatDate(result.motExpiry)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 738,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 728,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
                                                children: "Road Tax"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 741,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base md:text-lg font-bold",
                                                children: result.taxStatus || "Unknown"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 742,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm text-slate-500",
                                                children: [
                                                    "Expires: ",
                                                    result.taxExpiry ? formatDate(result.taxExpiry) : "Unknown"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 743,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 740,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
                                                children: "Current Mileage"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 748,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg md:text-xl font-bold",
                                                children: [
                                                    result.mileage.toLocaleString(),
                                                    " mi"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 749,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm text-slate-500",
                                                children: "~7,400 mi/year"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 750,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 747,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
                                                children: "Advisories Found"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg md:text-xl font-bold text-blue-600",
                                                children: result.advisories.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 754,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs md:text-sm text-slate-500",
                                                children: "Potential work"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 755,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 752,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1 col-span-2 md:col-span-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
                                                children: "Est. Total Revenue"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 758,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg md:text-xl font-bold text-emerald-600",
                                                children: [
                                                    "£",
                                                    ((motPrice + result.advisories.reduce((sum, a)=>sum + a.estPricePence, 0)) / 100).toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 759,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: "MOT + Repairs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 762,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 757,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 694,
                        columnNumber: 11
                    }, this),
                    result.advisories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 md:p-6 border-b border-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg md:text-xl font-bold flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            className: "text-blue-500",
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 773,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Smart Advisory Analysis"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs md:text-sm text-slate-500 mt-1",
                                                    children: isEditingAdvisories ? "Customize advisories before sending to customer" : "These items were flagged in the last MOT and may need attention"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 771,
                                            columnNumber: 19
                                        }, this),
                                        !isEditingAdvisories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: startEditingAdvisories,
                                            className: "bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 text-sm md:text-base",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 787,
                                                    columnNumber: 23
                                                }, this),
                                                " Customize"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 783,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 770,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 769,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 md:p-6",
                                children: isEditingAdvisories ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        editableAdvisories.map((advisory, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 md:p-4 border-2 border-blue-200 rounded-lg bg-blue-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "text-xs font-bold text-slate-600 block mb-1",
                                                                            children: "Service Description"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 803,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: advisory.text,
                                                                            onChange: (e)=>updateAdvisoryText(index, e.target.value),
                                                                            className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 text-sm"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 806,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 802,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "text-xs font-bold text-slate-600 block mb-1",
                                                                            children: "Category"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 816,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: advisory.category,
                                                                            readOnly: true,
                                                                            className: "w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-600 text-xs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 819,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 815,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 801,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-end gap-2 md:flex-col md:min-w-28",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 md:w-full",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "text-xs font-bold text-slate-600 block mb-1",
                                                                            children: "Est. Price (£)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 829,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            value: (advisory.estPricePence / 100).toFixed(2),
                                                                            onChange: (e)=>updateAdvisoryPrice(index, parseFloat(e.target.value) * 100),
                                                                            className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-semibold text-sm"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 832,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 828,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeAdvisory(index),
                                                                    className: "text-red-500 hover:text-red-700 p-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        size: 20
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                        lineNumber: 848,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 844,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 827,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 25
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 23
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: addCustomAdvisory,
                                            className: "w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 font-semibold hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 859,
                                                    columnNumber: 23
                                                }, this),
                                                " Add Advisory/Service"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 pt-4 border-t border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: cancelEditingAdvisories,
                                                    className: "flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50",
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 863,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: saveEditedAdvisories,
                                                    className: "flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 873,
                                                            columnNumber: 25
                                                        }, this),
                                                        " Save Advisories"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 869,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 862,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 794,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: result.advisories.map((advisory, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mb-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "bg-blue-200 text-blue-900 text-xs font-bold px-2 py-1 rounded",
                                                                children: advisory.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                lineNumber: 886,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 885,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-slate-900",
                                                            children: advisory.text
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 890,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 884,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-slate-500",
                                                            children: "Est. Price"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 895,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold text-emerald-600",
                                                            children: [
                                                                "£",
                                                                (advisory.estPricePence / 100).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 896,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 894,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 880,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 878,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 792,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 768,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            showCustomerModal && result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-slate-900",
                                    children: "Customer Details"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 915,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowCustomerModal(false);
                                        setCustomerDetails({
                                            name: "",
                                            phone: "",
                                            email: ""
                                        });
                                        setCustomerMode("new");
                                        setSelectedCustomerId(null);
                                    },
                                    className: "text-slate-400 hover:text-slate-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 925,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 916,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                            lineNumber: 914,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: customerMode === "existing",
                                                    onChange: (e)=>{
                                                        if (e.target.checked) {
                                                            setCustomerMode("existing");
                                                            setCustomerDetails({
                                                                name: "",
                                                                phone: "",
                                                                email: ""
                                                            });
                                                        } else {
                                                            setCustomerMode("new");
                                                            setSelectedCustomerId(null);
                                                        }
                                                    },
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 932,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold text-slate-700",
                                                    children: [
                                                        "Add to existing customer (",
                                                        existingCustomers.length,
                                                        " available)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 946,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 931,
                                            columnNumber: 17
                                        }, this),
                                        customerMode === "existing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedCustomerId || "",
                                            onChange: (e)=>setSelectedCustomerId(e.target.value),
                                            className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Select customer --"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 957,
                                                    columnNumber: 21
                                                }, this),
                                                existingCustomers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: customer.id,
                                                        children: [
                                                            customer.name,
                                                            " (",
                                                            customer.email,
                                                            ") • ",
                                                            customer.vehicles?.length || 0,
                                                            " vehicle(s)"
                                                        ]
                                                    }, customer.id, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 952,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 930,
                                    columnNumber: 15
                                }, this),
                                customerMode !== "existing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-slate-700 mb-2",
                                                    children: [
                                                        "Customer Name ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 972,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 971,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: customerDetails.name,
                                                    onChange: (e)=>setCustomerDetails({
                                                            ...customerDetails,
                                                            name: e.target.value
                                                        }),
                                                    placeholder: "Enter customer name",
                                                    className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                    autoFocus: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 974,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 970,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-slate-700 mb-2",
                                                    children: [
                                                        "Email Address ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 985,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 984,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    value: customerDetails.email,
                                                    onChange: (e)=>setCustomerDetails({
                                                            ...customerDetails,
                                                            email: e.target.value
                                                        }),
                                                    placeholder: "Enter email address",
                                                    className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 987,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 983,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-slate-700 mb-2",
                                                    children: "Phone Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 996,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    value: customerDetails.phone,
                                                    onChange: (e)=>setCustomerDetails({
                                                            ...customerDetails,
                                                            phone: e.target.value
                                                        }),
                                                    placeholder: "Enter phone number",
                                                    className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 999,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 995,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true),
                                result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 p-4 bg-blue-50 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Vehicle:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1014,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vehicle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vehicleTitle"])(result),
                                            " (",
                                            result.vrm,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1013,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1012,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowCustomerModal(false);
                                                setCustomerDetails({
                                                    name: "",
                                                    phone: "",
                                                    email: ""
                                                });
                                                setCustomerMode("new");
                                                setSelectedCustomerId(null);
                                                setSelectedAction(null);
                                            },
                                            className: "flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1019,
                                            columnNumber: 17
                                        }, this),
                                        selectedAction === "quote" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSaveCustomerAndViewQuote,
                                            disabled: !customerDetails.name.trim() || !customerDetails.email.trim(),
                                            className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: "Next: Build Quote"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1032,
                                            columnNumber: 19
                                        }, this),
                                        selectedAction === "crm" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSaveCustomerToCRM,
                                            disabled: savingToCRM || (customerMode === "existing" ? !selectedCustomerId : !customerDetails.name.trim() || !customerDetails.email.trim()),
                                            className: "flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                            children: savingToCRM ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1053,
                                                        columnNumber: 25
                                                    }, this),
                                                    "Saving..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1058,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Save to CRM"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1041,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1018,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                            lineNumber: 928,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                    lineNumber: 913,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/lookup/page.tsx",
                lineNumber: 912,
                columnNumber: 9
            }, this),
            showEmailModal && quoteCreated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-slate-900",
                                    children: "Customer Details"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1074,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowEmailModal(false),
                                    className: "text-slate-400 hover:text-slate-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1079,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1075,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                            lineNumber: 1073,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600 bg-blue-50 p-3 rounded-lg",
                                    children: [
                                        "Enter customer details to send quote ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: quoteCreated.quoteNumber
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1084,
                                            columnNumber: 54
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1083,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: [
                                                "Customer Name ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 1088,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1087,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: customerDetails.name,
                                            onChange: (e)=>setCustomerDetails({
                                                    ...customerDetails,
                                                    name: e.target.value
                                                }),
                                            placeholder: "Enter customer name",
                                            className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1086,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: [
                                                "Email Address ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 1101,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            value: customerDetails.email,
                                            onChange: (e)=>setCustomerDetails({
                                                    ...customerDetails,
                                                    email: e.target.value
                                                }),
                                            placeholder: "Enter email address",
                                            className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1103,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1099,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-slate-700 mb-2",
                                            children: "Phone Number"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            value: customerDetails.phone,
                                            onChange: (e)=>setCustomerDetails({
                                                    ...customerDetails,
                                                    phone: e.target.value
                                                }),
                                            placeholder: "Enter phone number",
                                            className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowEmailModal(false),
                                            className: "flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSendEmailWithDetails,
                                            disabled: !customerDetails.name.trim() || !customerDetails.email.trim() || sendingEmail,
                                            className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: sendingEmail ? "Sending..." : "Send Email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1130,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1123,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                            lineNumber: 1082,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                    lineNumber: 1072,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/lookup/page.tsx",
                lineNumber: 1071,
                columnNumber: 9
            }, this),
            showQuoteBuilder && result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold mb-2",
                                        children: "Build Your Quote"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1148,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-blue-100",
                                        children: [
                                            "Customize services for ",
                                            customerDetails.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1149,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 max-h-96 overflow-y-auto",
                                        children: quoteItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border border-slate-200 rounded-lg bg-slate-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            checked: item.included,
                                                                            onChange: ()=>toggleItemInclusion(idx),
                                                                            className: "w-5 h-5 accent-blue-600 cursor-pointer"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 1158,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-bold px-2 py-1 bg-blue-100 text-blue-900 rounded",
                                                                            children: item.type
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 1164,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 1157,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: item.name,
                                                                    onChange: (e)=>{
                                                                        const updated = [
                                                                            ...quoteItems
                                                                        ];
                                                                        updated[idx].name = e.target.value;
                                                                        setQuoteItems(updated);
                                                                    },
                                                                    className: "w-full font-semibold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-600 mb-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 1168,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: item.description || "",
                                                                    onChange: (e)=>{
                                                                        const updated = [
                                                                            ...quoteItems
                                                                        ];
                                                                        updated[idx].description = e.target.value;
                                                                        setQuoteItems(updated);
                                                                    },
                                                                    placeholder: "Description (optional)",
                                                                    className: "w-full text-sm text-slate-500 bg-transparent border-b border-slate-200 focus:outline-none focus:border-blue-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 1178,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 1156,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right min-w-30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-xs text-slate-500 font-semibold",
                                                                    children: "Price"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 1191,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-slate-500",
                                                                            children: "£"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 1193,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            value: (item.unitPricePence / 100).toFixed(2),
                                                                            onChange: (e)=>updateItemPrice(idx, parseFloat(e.target.value) * 100),
                                                                            className: "w-20 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                            lineNumber: 1194,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                    lineNumber: 1192,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 1190,
                                                            columnNumber: 23
                                                        }, this),
                                                        idx > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>removeItem(idx),
                                                            className: "text-red-500 hover:text-red-700 mt-6",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                lineNumber: 1207,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                            lineNumber: 1203,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 21
                                                }, this)
                                            }, idx, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1154,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1152,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: addCustomItem,
                                        className: "mt-4 w-full px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-semibold hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1219,
                                                columnNumber: 17
                                            }, this),
                                            " Add Custom Service"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1151,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 1146,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 bg-slate-50 border-b border-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold",
                                            children: "Quote Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1228,
                                            columnNumber: 17
                                        }, this),
                                        quoteVatRate === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full whitespace-nowrap",
                                            children: "VAT OFF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1230,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                    lineNumber: 1227,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 mb-6",
                                        children: quoteItems.filter((item)=>item.included).map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-700",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1242,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: [
                                                            "£",
                                                            (item.totalPence / 100).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1243,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1241,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1237,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-slate-200 pt-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-600",
                                                        children: "Subtotal:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1250,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "£",
                                                            (subtotal / 100).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1251,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1249,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-600",
                                                        children: [
                                                            "VAT (",
                                                            quoteVatRate,
                                                            "%):"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "£",
                                                            (vat / 100).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1255,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-lg font-bold pt-2 border-t border-slate-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Total:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1258,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-emerald-600",
                                                        children: [
                                                            "£",
                                                            (total / 100).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1259,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1257,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowQuoteBuilder(false),
                                                className: "flex-1 px-4 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50",
                                                children: "Back"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1264,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleCreateQuote,
                                                className: "flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1274,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Create Quote"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1270,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1263,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1236,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 1225,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/lookup/page.tsx",
                lineNumber: 1145,
                columnNumber: 9
            }, this),
            quoteCreated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "animate-in fade-in slide-in-from-bottom-3 duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-6 text-white ${quoteCreated.status === "ACCEPTED" ? "bg-linear-to-r from-emerald-600 to-teal-600" : quoteCreated.status === "DECLINED" ? "bg-linear-to-r from-rose-600 to-red-600" : quoteCreated.status === "SENT" ? "bg-linear-to-r from-blue-600 to-indigo-600" : "bg-linear-to-r from-emerald-600 to-teal-600"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold mb-2",
                                children: "✓ Quote Created Successfully"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/90",
                                children: [
                                    "Quote #",
                                    quoteCreated.quoteNumber,
                                    " for ",
                                    customerDetails.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 1285,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8",
                        children: [
                            (quoteCreated.vatRate ?? 20) === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 inline-flex px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full",
                                children: "VAT OFF"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1296,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8 grid grid-cols-2 gap-4 md:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-slate-50 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500 uppercase font-semibold",
                                                children: "Quote Number"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1302,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold mt-1",
                                                children: quoteCreated.quoteNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1303,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-slate-50 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500 uppercase font-semibold",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1306,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-lg font-bold mt-1 ${quoteCreated.status === "ACCEPTED" ? "text-emerald-600" : quoteCreated.status === "DECLINED" ? "text-rose-600" : quoteCreated.status === "SENT" ? "text-blue-600" : "text-yellow-600"}`,
                                                children: quoteCreated.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1307,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1305,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-slate-50 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500 uppercase font-semibold",
                                                children: "Valid Until"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1317,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold mt-1",
                                                children: formatDate(quoteCreated.expiryDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1318,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-slate-50 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500 uppercase font-semibold",
                                                children: "Total Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1321,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold mt-1 text-emerald-600",
                                                children: [
                                                    "£",
                                                    (quoteCreated.totalPence / 100).toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1322,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1320,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1300,
                                columnNumber: 13
                            }, this),
                            quoteCreated.activities && quoteCreated.activities.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-slate-900 mb-3",
                                        children: "Activity Log"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1329,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: quoteCreated.activities.map((activity, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1333,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-slate-900",
                                                                children: activity.action
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 25
                                                            }, this),
                                                            activity.details && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-600",
                                                                children: activity.details
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                lineNumber: 1337,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500",
                                                                children: formatDate(activity.timestamp)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                                lineNumber: 1339,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1334,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1332,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1330,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1328,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-200 pt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-slate-900 mb-4",
                                        children: "Send to Customer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSendEmailClick,
                                            disabled: sendingEmail,
                                            className: "w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-60 flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                    lineNumber: 1356,
                                                    columnNumber: 19
                                                }, this),
                                                sendingEmail ? "Sending..." : "Send Email"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/lookup/page.tsx",
                                            lineNumber: 1351,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1349,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1347,
                                columnNumber: 13
                            }, this),
                            quoteCreated.status !== "ACCEPTED" && quoteCreated.status !== "DECLINED" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-200 pt-6 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-slate-900 mb-4",
                                        children: "Quote Response Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1364,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleQuoteAccepted,
                                                className: "px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1370,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Mark as Accepted"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1366,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleQuoteDeclined,
                                                className: "px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                        lineNumber: 1376,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Mark as Declined"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1365,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1363,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setResult(null);
                                            setVrm("");
                                            setShowQuoteBuilder(false);
                                            setQuoteCreated(null);
                                            setCustomerDetails({
                                                name: "",
                                                phone: "",
                                                email: ""
                                            });
                                            setQuoteItems([]);
                                        },
                                        className: "flex-1 px-6 py-3 border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50",
                                        children: "New Search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1383,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            // Navigate to CRM to see this quote
                                            window.location.href = "/garage/customers";
                                        },
                                        className: "flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800",
                                        children: "View in CRM"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                                        lineNumber: 1396,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/lookup/page.tsx",
                                lineNumber: 1382,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 1294,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/lookup/page.tsx",
                lineNumber: 1284,
                columnNumber: 9
            }, this),
            !result && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-12 text-center border-dashed border-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        size: 48,
                        className: "mx-auto text-slate-300 mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 1412,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 text-lg",
                        children: "Search for a vehicle to get started"
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/lookup/page.tsx",
                        lineNumber: 1413,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/lookup/page.tsx",
                lineNumber: 1411,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/lookup/page.tsx",
        lineNumber: 659,
        columnNumber: 5
    }, this);
}
_s(VehicleLookupPage, "tZwijx57qA5BIWWGEUqJVIutvns=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = VehicleLookupPage;
var _c;
__turbopack_context__.k.register(_c, "VehicleLookupPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_9ac988b6._.js.map