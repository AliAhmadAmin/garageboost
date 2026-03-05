(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/app/garage/reminders/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GarageRemindersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const getMOTStatus = (motExpiry)=>{
    const expiry = new Date(motExpiry);
    const today = new Date();
    const daysRemaining = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysRemaining < 0) {
        return {
            status: "EXPIRED",
            daysRemaining: 0,
            color: "text-red-600",
            bgColor: "bg-red-50",
            badge: "text-red-700 bg-red-100"
        };
    } else if (daysRemaining < 14) {
        return {
            status: "URGENT",
            daysRemaining,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
            badge: "text-amber-700 bg-amber-100"
        };
    } else {
        return {
            status: "VALID",
            daysRemaining,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            badge: "text-emerald-700 bg-emerald-100"
        };
    }
};
function GarageRemindersContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [vehicles, setVehicles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allCustomers, setAllCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCustomers, setSelectedCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customerSearchQuery, setCustomerSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customerFilter, setCustomerFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [sourceFilter, setSourceFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [motFilter, setMotFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [messageType, setMessageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("mot_reminder");
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [scheduleDate, setScheduleDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMotConfig, setShowMotConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showServiceConfig, setShowServiceConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [motReminders, setMotReminders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        30
    ]);
    const [serviceReminders, setServiceReminders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [motCustomDays, setMotCustomDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [serviceCustomDays, setServiceCustomDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [queueStatus, setQueueStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        pending: 0,
        processing: 0,
        retry: 0,
        sent: 0,
        failed: 0,
        totalActive: 0
    });
    const [queueLoading, setQueueLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getGarageId = async ()=>{
        let garageId = localStorage.getItem("currentGarageId");
        if (garageId) return garageId;
        const res = await fetch("/api/garages");
        const garages = await res.json();
        if (Array.isArray(garages) && garages[0]?.id) {
            const resolvedGarageId = String(garages[0].id);
            localStorage.setItem("currentGarageId", resolvedGarageId);
            return resolvedGarageId;
        }
        return null;
    };
    const loadQueueStatus = async (garageId, silent = true)=>{
        if (!garageId) return;
        if (!silent) {
            setQueueLoading(true);
        }
        try {
            const response = await fetch(`/api/email-queue-status?garageId=${garageId}`, {
                cache: "no-store",
                credentials: "include"
            });
            if (!response.ok) {
                if (!silent) {
                    console.warn("[Reminders] Queue status unavailable", response.status);
                }
                setQueueStatus({
                    pending: 0,
                    processing: 0,
                    retry: 0,
                    sent: 0,
                    failed: 0,
                    totalActive: 0
                });
                return;
            }
            const data = await response.json().catch(()=>null);
            if (data?.queueStatus) {
                setQueueStatus(data.queueStatus);
            }
        } catch (error) {
            if (!silent) {
                console.warn("[Reminders] Queue status fetch failed", error);
            }
        } finally{
            if (!silent) {
                setQueueLoading(false);
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GarageRemindersContent.useEffect": ()=>{
            loadData();
            loadReminderConfigs();
            const interval = window.setInterval({
                "GarageRemindersContent.useEffect.interval": ()=>{
                    const garageId = localStorage.getItem("currentGarageId");
                    if (garageId) {
                        loadQueueStatus(garageId);
                    }
                }
            }["GarageRemindersContent.useEffect.interval"], 10000);
            return ({
                "GarageRemindersContent.useEffect": ()=>window.clearInterval(interval)
            })["GarageRemindersContent.useEffect"];
        }
    }["GarageRemindersContent.useEffect"], []);
    const loadData = async ()=>{
        try {
            // Get garage ID
            let garageId = localStorage.getItem("currentGarageId");
            if (!garageId) {
                const res = await fetch("/api/garages");
                const garages = await res.json();
                if (Array.isArray(garages) && garages[0]?.id) {
                    garageId = String(garages[0].id);
                    localStorage.setItem("currentGarageId", garageId);
                }
            }
            if (!garageId) {
                console.error("No garage ID found");
                return;
            }
            loadQueueStatus(garageId);
            // Fetch customers with vehicles
            const customersRes = await fetch(`/api/garages/${garageId}/customers`);
            const customers = customersRes.ok ? await customersRes.json() : [];
            console.log("[Reminders] Loaded customers:", customers.length);
            // Extract all vehicles from customers
            const allVehicles = [];
            const allCustomers = [
                ...customers
            ];
            if (Array.isArray(customers)) {
                customers.forEach((customer)=>{
                    if (customer.vehicles && Array.isArray(customer.vehicles)) {
                        customer.vehicles.forEach((vehicle)=>{
                            allVehicles.push({
                                id: vehicle.id,
                                vrm: vehicle.vrm,
                                ownerName: customer.name || vehicle.ownerName,
                                make: vehicle.make,
                                model: vehicle.model,
                                motExpiry: vehicle.motExpiry
                            });
                        });
                    }
                });
            }
            // Also fetch online bookings
            const bookingsRes = await fetch(`/api/garages/${garageId}/bookings`);
            if (bookingsRes.ok) {
                const { bookings } = await bookingsRes.json();
                console.log("[Reminders] Loaded bookings:", Array.isArray(bookings) ? bookings.length : 0);
                if (Array.isArray(bookings)) {
                    bookings.forEach((booking)=>{
                        // Add booking customer if not already in list
                        const customerExists = allCustomers.some((c)=>c.name?.toLowerCase() === booking.customerName?.toLowerCase());
                        if (!customerExists) {
                            allCustomers.push({
                                id: `booking-${booking.id}`,
                                name: booking.customerName || "Unknown",
                                email: booking.customerEmail,
                                phone: booking.customerPhone,
                                source: "ONLINE_BOOKING"
                            });
                            console.log("[Reminders] Added booking customer:", booking.customerName);
                        }
                        // Add booking vehicle if has VRM
                        if (booking.vehicleVrm) {
                            const vehicleExists = allVehicles.some((v)=>v.vrm === booking.vehicleVrm);
                            if (!vehicleExists) {
                                allVehicles.push({
                                    id: `booking-${booking.id}`,
                                    vrm: booking.vehicleVrm,
                                    ownerName: booking.customerName || "Unknown",
                                    make: booking.vehicleMake || "Unknown",
                                    model: booking.vehicleModel || "",
                                    motExpiry: booking.bookingDate || new Date().toISOString()
                                });
                            }
                        }
                    });
                }
            }
            console.log("[Reminders] Setting state - customers:", allCustomers.length, "vehicles:", allVehicles.length);
            setAllCustomers(allCustomers);
            setVehicles(allVehicles);
        } catch (error) {
            console.error("Error loading reminders data:", error);
            setVehicles([]);
            setAllCustomers([]);
        }
    };
    const loadReminderConfigs = ()=>{
        const load = async ()=>{
            try {
                const garageId = await getGarageId();
                if (garageId) {
                    const response = await fetch(`/api/reminder-config?garageId=${garageId}`, {
                        cache: "no-store"
                    });
                    if (response.ok) {
                        const config = await response.json();
                        if (Array.isArray(config.mot) && config.mot.length > 0) {
                            setMotReminders(config.mot);
                        }
                        if (Array.isArray(config.service)) {
                            setServiceReminders(config.service);
                        }
                        return;
                    }
                }
            } catch (error) {
                console.error("[Reminders] Failed to load server config", error);
            }
            const saved = localStorage.getItem("reminderConfigs");
            if (saved) {
                const { mot, service } = JSON.parse(saved);
                if (mot) setMotReminders(mot);
                if (service) setServiceReminders(service);
            }
        };
        void load();
    };
    const saveMotConfig = ()=>{
        const save = async ()=>{
            const configs = JSON.parse(localStorage.getItem("reminderConfigs") || "{}");
            configs.mot = motReminders;
            if (motCustomDays && !motReminders.includes(parseInt(motCustomDays))) {
                configs.mot = [
                    ...motReminders,
                    parseInt(motCustomDays)
                ];
            }
            localStorage.setItem("reminderConfigs", JSON.stringify(configs));
            try {
                const garageId = await getGarageId();
                if (garageId) {
                    await fetch("/api/reminder-config", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            garageId,
                            mot: configs.mot,
                            service: serviceReminders,
                            motEnabled: true,
                            serviceEnabled: serviceReminders.length > 0,
                            taxEnabled: true
                        })
                    });
                }
            } catch (error) {
                console.error("[Reminders] Failed to save MOT config", error);
            }
            setMotCustomDays("");
            setShowMotConfig(false);
            addToast("MOT automation settings saved", "success");
        };
        void save();
    };
    const saveServiceConfig = ()=>{
        const save = async ()=>{
            const configs = JSON.parse(localStorage.getItem("reminderConfigs") || "{}");
            configs.service = serviceReminders;
            if (serviceCustomDays && !serviceReminders.includes(parseInt(serviceCustomDays))) {
                configs.service = [
                    ...serviceReminders,
                    parseInt(serviceCustomDays)
                ];
            }
            localStorage.setItem("reminderConfigs", JSON.stringify(configs));
            try {
                const garageId = await getGarageId();
                if (garageId) {
                    await fetch("/api/reminder-config", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            garageId,
                            mot: motReminders,
                            service: configs.service,
                            motEnabled: true,
                            serviceEnabled: configs.service.length > 0,
                            taxEnabled: true
                        })
                    });
                }
            } catch (error) {
                console.error("[Reminders] Failed to save service config", error);
            }
            setServiceCustomDays("");
            setShowServiceConfig(false);
            addToast("Service automation settings saved", "success");
        };
        void save();
    };
    const toggleMotReminder = (days)=>{
        setMotReminders((prev)=>prev.includes(days) ? prev.filter((d)=>d !== days) : [
                ...prev,
                days
            ].sort((a, b)=>a - b));
    };
    const toggleServiceReminder = (days)=>{
        setServiceReminders((prev)=>prev.includes(days) ? prev.filter((d)=>d !== days) : [
                ...prev,
                days
            ].sort((a, b)=>a - b));
    };
    const customerEntries = [
        ...allCustomers.map((c)=>[
                c.name,
                {
                    ownerName: c.name,
                    vehicleCount: vehicles.filter((v)=>v.ownerName === c.name).length
                }
            ]),
        ...vehicles.map((v)=>[
                v.ownerName,
                {
                    ownerName: v.ownerName,
                    vehicleCount: vehicles.filter((vh)=>vh.ownerName === v.ownerName).length
                }
            ])
    ];
    // Get unique customers from all customers + vehicles
    const customers = Array.from(new Map(customerEntries).values());
    console.log("[Reminders] allCustomers:", allCustomers.length, "vehicles:", vehicles.length, "final customers:", customers.length);
    const templates = {
        mot_reminder: {
            subject: "MOT Expiry Reminder - {vrm}",
            message: `Hi {name},\n\nThis is a friendly reminder that the MOT for your {make} {model} ({vrm}) is due to expire on {motExpiry}.\n\nBook your MOT with us today to avoid any inconvenience.\n\nCall us or reply to schedule.\n\nBest regards,\n{garageName}`
        },
        service_reminder: {
            subject: "Service Reminder - {vrm}",
            message: `Hi {name},\n\nIt's time for your {make} {model} ({vrm}) to have its regular service.\n\nRegular servicing keeps your vehicle running smoothly and helps prevent costly repairs.\n\nContact us to book your service appointment.\n\nBest regards,\n{garageName}`
        },
        promotional: {
            subject: "Special Offer - Save on Services",
            message: `Hi {name},\n\nWe're offering 15% OFF all services this month!\n\nWhether you need an MOT, service, or repairs - we've got you covered.\n\nBook before month-end to claim your discount.\n\nBest regards,\n{garageName}`
        }
    };
    const handleTemplateSelect = (type)=>{
        setMessageType(type);
        if (type !== "custom") {
            setSubject(templates[type].subject);
            setMessage(templates[type].message);
        } else {
            setSubject("");
            setMessage("");
        }
    };
    const handleSend = async ()=>{
        if (selectedCustomers.length === 0) {
            addToast("Please select at least one customer", "error");
            return;
        }
        if (!subject) {
            addToast("Please enter a subject", "error");
            return;
        }
        if (!message) {
            addToast("Please enter a message", "error");
            return;
        }
        setSending(true);
        try {
            const garageId = localStorage.getItem("currentGarageId");
            if (!garageId) {
                addToast("Garage information not found. Please refresh the page.", "error");
                setSending(false);
                return;
            }
            // Send via Resend API
            const response = await fetch("/api/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    garageId,
                    channel: "email",
                    subject,
                    message,
                    selectedCustomers,
                    scheduledFor: scheduleDate || undefined
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to send email");
            }
            addToast(data.message, "success");
            setSelectedCustomers([]);
            setSubject("");
            setMessage("");
            setScheduleDate("");
            loadQueueStatus(garageId, false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to send message";
            addToast(`Error: ${errorMessage}`, "error");
            console.error("[Send Message]", error);
        } finally{
            setSending(false);
        }
    };
    const toggleCustomer = (name)=>{
        setSelectedCustomers((prev)=>prev.includes(name) ? prev.filter((n)=>n !== name) : [
                ...prev,
                name
            ]);
    };
    // Filter customers based on search query and filters
    const getFilteredCustomers = ()=>{
        let filtered = customers;
        // Apply customer contact filter
        if (customerFilter === "has-email") {
            filtered = filtered.filter((c)=>{
                const customer = allCustomers.find((ac)=>ac.name === c.ownerName);
                return customer?.email;
            });
        } else if (customerFilter === "has-phone") {
            filtered = filtered.filter((c)=>{
                const customer = allCustomers.find((ac)=>ac.name === c.ownerName);
                return customer?.phone;
            });
        }
        // Apply source filter
        if (sourceFilter === "manual") {
            filtered = filtered.filter((c)=>{
                const customer = allCustomers.find((ac)=>ac.name === c.ownerName);
                return customer?.source !== "ONLINE_BOOKING";
            });
        } else if (sourceFilter === "online") {
            filtered = filtered.filter((c)=>{
                const customer = allCustomers.find((ac)=>ac.name === c.ownerName);
                return customer?.source === "ONLINE_BOOKING";
            });
        }
        // Apply MOT filter
        if (motFilter !== "all") {
            filtered = filtered.filter((c)=>{
                const customerVehicles = vehicles.filter((v)=>v.ownerName === c.ownerName);
                return customerVehicles.some((v)=>{
                    const motStatus = getMOTStatus(v.motExpiry);
                    if (motFilter === "expired") return motStatus.status === "EXPIRED";
                    if (motFilter === "urgent") return motStatus.status === "URGENT";
                    if (motFilter === "valid") return motStatus.status === "VALID";
                    return true;
                });
            });
        }
        // Apply search
        if (customerSearchQuery.trim()) {
            const query = customerSearchQuery.toLowerCase();
            filtered = filtered.filter((customer)=>customer.ownerName.toLowerCase().includes(query));
        }
        return filtered;
    };
    const filteredCustomers = getFilteredCustomers();
    const selectAll = ()=>{
        setSelectedCustomers(filteredCustomers.map((c)=>c.ownerName));
    };
    const clearAll = ()=>{
        setSelectedCustomers([]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-between items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900",
                            children: "Reminders"
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/reminders/page.tsx",
                            lineNumber: 542,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mt-1",
                            children: "Manage automated MOT and service reminder settings"
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/reminders/page.tsx",
                            lineNumber: 543,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                    lineNumber: 541,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/reminders/page.tsx",
                lineNumber: 540,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-white to-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-6 h-6 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold text-gray-900",
                                                children: "Recipients"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-gray-700",
                                                children: selectedCustomers.length > 0 ? `✅ ${selectedCustomers.length} customer${selectedCustomers.length !== 1 ? 's' : ''} selected` : "👥 Select customers to message"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search customers...",
                                                value: customerSearchQuery,
                                                onChange: (e)=>setCustomerSearchQuery(e.target.value),
                                                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 564,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: customerFilter,
                                                        onChange: (e)=>setCustomerFilter(e.target.value),
                                                        className: "w-full px-2 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "all",
                                                                children: "All Customers"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 579,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "has-email",
                                                                children: "Has Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 580,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "has-phone",
                                                                children: "Has Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: sourceFilter,
                                                        onChange: (e)=>setSourceFilter(e.target.value),
                                                        className: "w-full px-2 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "all",
                                                                children: "All Sources"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 589,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "manual",
                                                                children: "Manual"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 590,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "online",
                                                                children: "Online Booking"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 591,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 573,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: motFilter,
                                                onChange: (e)=>setMotFilter(e.target.value),
                                                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "all",
                                                        children: "All MOT Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 600,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "expired",
                                                        children: "❌ Expired"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "urgent",
                                                        children: "⚠️ Urgent (14d)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 602,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "valid",
                                                        children: "✅ Valid"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: selectAll,
                                                        className: "flex-1 px-3 py-1.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all",
                                                        children: "Select All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: clearAll,
                                                        className: "flex-1 px-3 py-1.5 text-xs font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all",
                                                        children: "Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 606,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 556,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5 max-h-64 overflow-y-auto border border-gray-200 rounded-xl p-2 bg-white",
                                        children: [
                                            filteredCustomers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedCustomers.includes(customer.ownerName) ? "bg-blue-500 border-blue-500" : "border-gray-300 hover:border-blue-400"}`,
                                                            children: selectedCustomers.includes(customer.ownerName) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-xs font-bold",
                                                                children: "✓"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                lineNumber: 634,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-semibold text-gray-900 truncate",
                                                                    children: customer.ownerName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                    lineNumber: 638,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: [
                                                                        customer.vehicleCount,
                                                                        " vehicle",
                                                                        customer.vehicleCount !== 1 ? 's' : ''
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                                    lineNumber: 639,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                            lineNumber: 637,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selectedCustomers.includes(customer.ownerName),
                                                            onChange: ()=>toggleCustomer(customer.ownerName),
                                                            className: "hidden"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                            lineNumber: 641,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, customer.ownerName, true, {
                                                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 17
                                                }, this)),
                                            filteredCustomers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 text-center py-8",
                                                children: customerSearchQuery ? "No customers match your search" : "No customers available"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 650,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 622,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 551,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-blue-50 via-blue-50 to-indigo-50 border-blue-200 shadow-md hover:shadow-lg transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 bg-blue-100 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "w-5 h-5 text-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 660,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-gray-900",
                                                children: "Auto MOT Reminders"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 659,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-700 mb-4",
                                        children: motReminders.length > 0 ? `⏰ Reminders at: ${motReminders.sort((a, b)=>a - b).join(", ")} days` : "📋 No reminders configured"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 665,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowMotConfig(true),
                                        className: "w-full px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg",
                                        children: "⚙️ Configure"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 670,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 658,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-green-50 via-green-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 bg-green-100 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "w-5 h-5 text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 679,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-gray-900",
                                                children: "Service Reminders"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 678,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-700 mb-4",
                                        children: serviceReminders.length > 0 ? `⏰ Reminders at: ${serviceReminders.sort((a, b)=>a - b).join(", ")} month${serviceReminders.length !== 1 ? 's' : ''}` : "📋 No reminders configured"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowServiceConfig(true),
                                        className: "w-full px-4 py-2.5 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg",
                                        children: "⚙️ Configure"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 689,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 677,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                        lineNumber: 549,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-white to-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                        className: "w-5 h-5 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 705,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-gray-900",
                                                        children: "Delivery Queue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 706,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 704,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const garageId = localStorage.getItem("currentGarageId");
                                                    if (garageId) {
                                                        loadQueueStatus(garageId, false);
                                                    }
                                                },
                                                className: "px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all",
                                                disabled: queueLoading,
                                                children: queueLoading ? "Refreshing..." : "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 708,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 703,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-5 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-amber-200 bg-amber-50 p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-amber-700 font-semibold",
                                                        children: "Pending"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-amber-800",
                                                        children: queueStatus.pending
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 723,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-blue-200 bg-blue-50 p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-blue-700 font-semibold",
                                                        children: "Processing"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-blue-800",
                                                        children: queueStatus.processing
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-purple-200 bg-purple-50 p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-purple-700 font-semibold",
                                                        children: "Retry"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-purple-800",
                                                        children: queueStatus.retry
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 733,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 731,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-emerald-200 bg-emerald-50 p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-emerald-700 font-semibold",
                                                        children: "Sent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 736,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-emerald-800",
                                                        children: queueStatus.sent
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 737,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 735,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-red-200 bg-red-50 p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-700 font-semibold",
                                                        children: "Failed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 740,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-red-800",
                                                        children: queueStatus.failed
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 739,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-3",
                                        children: [
                                            "Active jobs: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-gray-700",
                                                children: queueStatus.totalActive
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 746,
                                                columnNumber: 28
                                            }, this),
                                            " • Auto-refresh every 10 seconds"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 745,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 702,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-white to-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-gray-900 mb-4",
                                        children: "Message Templates"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 752,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            {
                                                id: "mot_reminder",
                                                label: "🔴 MOT Reminder",
                                                desc: "MOT expiry"
                                            },
                                            {
                                                id: "service_reminder",
                                                label: "🟡 Service Reminder",
                                                desc: "Service due"
                                            },
                                            {
                                                id: "promotional",
                                                label: "🟢 Promotional",
                                                desc: "Special offer"
                                            },
                                            {
                                                id: "custom",
                                                label: "✏️ Custom",
                                                desc: "Write your own"
                                            }
                                        ].map(({ id, label, desc })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleTemplateSelect(id),
                                                className: `p-3 rounded-xl border-2 transition-all text-left ${messageType === id ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-gray-900 text-sm",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 769,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600",
                                                        children: desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 770,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, id, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 760,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 753,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 751,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-white to-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-gray-900 mb-3",
                                        children: "📝 Email Subject"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 778,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: subject,
                                        onChange: (e)=>setSubject(e.target.value),
                                        className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                                        placeholder: "Enter an engaging subject line..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 781,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 777,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-white to-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-gray-900 mb-3",
                                        children: "💌 Message Content"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 792,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: message,
                                        onChange: (e)=>setMessage(e.target.value),
                                        className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-40 resize-none",
                                        placeholder: "Enter your message here..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 795,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-3",
                                        children: [
                                            "💡 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: "Dynamic variables:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 802,
                                                columnNumber: 18
                                            }, this),
                                            " ",
                                            "{name}",
                                            ", ",
                                            "{vrm}",
                                            ", ",
                                            "{make}",
                                            ", ",
                                            "{model}",
                                            ", ",
                                            "{motExpiry}",
                                            ", ",
                                            "{garageName}"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 801,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 791,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "p-6 bg-linear-to-br from-white to-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-gray-900 mb-3",
                                        children: "⏱️ Schedule Send (Optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 808,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "datetime-local",
                                        value: scheduleDate,
                                        onChange: (e)=>setScheduleDate(e.target.value),
                                        className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 811,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-2",
                                        children: "Leave empty to send immediately."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 817,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 807,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSend,
                                disabled: sending || selectedCustomers.length === 0,
                                className: "w-full px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 826,
                                        columnNumber: 13
                                    }, this),
                                    sending ? "Sending..." : scheduleDate ? "Schedule Email" : "Send Email"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 821,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                        lineNumber: 698,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/reminders/page.tsx",
                lineNumber: 547,
                columnNumber: 7
            }, this),
            showMotConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "w-full max-w-md",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-900",
                                children: "Configure MOT Reminders"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 837,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Select when to send MOT reminders before expiry"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 838,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    30,
                                    14,
                                    7
                                ].map((days)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: motReminders.includes(days),
                                                onChange: ()=>toggleMotReminder(days),
                                                className: "w-4 h-4 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 843,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-900",
                                                        children: [
                                                            days,
                                                            " days before"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 850,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: [
                                                            "Send reminder ",
                                                            days,
                                                            " days before MOT expires"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 849,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, days, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 842,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 840,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Custom days (optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 858,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "1",
                                                max: "365",
                                                value: motCustomDays,
                                                onChange: (e)=>setMotCustomDays(e.target.value),
                                                placeholder: "e.g., 60",
                                                className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 860,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (motCustomDays && !motReminders.includes(parseInt(motCustomDays))) {
                                                        toggleMotReminder(parseInt(motCustomDays));
                                                        setMotCustomDays("");
                                                    }
                                                },
                                                className: "px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300",
                                                children: "Add"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 869,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 859,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 857,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: saveMotConfig,
                                        className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium",
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowMotConfig(false),
                                        className: "flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 890,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 883,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                        lineNumber: 836,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                    lineNumber: 835,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/reminders/page.tsx",
                lineNumber: 834,
                columnNumber: 9
            }, this),
            showServiceConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "w-full max-w-md",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-900",
                                children: "Configure Service Reminders"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 907,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: "Select service intervals for reminders"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 908,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    6,
                                    12,
                                    24
                                ].map((months)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: serviceReminders.includes(months),
                                                onChange: ()=>toggleServiceReminder(months),
                                                className: "w-4 h-4 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 913,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-900",
                                                        children: [
                                                            "Every ",
                                                            months,
                                                            " months"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 920,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: [
                                                            "Remind customers for ",
                                                            months,
                                                            "-month service intervals"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                        lineNumber: 921,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 919,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, months, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 912,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 910,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Custom interval (optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 928,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "1",
                                                max: "60",
                                                value: serviceCustomDays,
                                                onChange: (e)=>setServiceCustomDays(e.target.value),
                                                placeholder: "e.g., 3",
                                                className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 930,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (serviceCustomDays && !serviceReminders.includes(parseInt(serviceCustomDays))) {
                                                        toggleServiceReminder(parseInt(serviceCustomDays));
                                                        setServiceCustomDays("");
                                                    }
                                                },
                                                className: "px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300",
                                                children: "Add"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                                lineNumber: 939,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 929,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 927,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: saveServiceConfig,
                                        className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium",
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 954,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowServiceConfig(false),
                                        className: "flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                                        lineNumber: 960,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/reminders/page.tsx",
                                lineNumber: 953,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/reminders/page.tsx",
                        lineNumber: 906,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/reminders/page.tsx",
                    lineNumber: 905,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/reminders/page.tsx",
                lineNumber: 904,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/reminders/page.tsx",
        lineNumber: 539,
        columnNumber: 5
    }, this);
}
_s(GarageRemindersContent, "Ld5L5ERUe3trCZq4HNJ1KCbpQAk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = GarageRemindersContent;
function GarageRemindersPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-gray-600",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/garage/reminders/page.tsx",
            lineNumber: 977,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GarageRemindersContent, {}, void 0, false, {
            fileName: "[project]/src/app/garage/reminders/page.tsx",
            lineNumber: 978,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/garage/reminders/page.tsx",
        lineNumber: 977,
        columnNumber: 5
    }, this);
}
_c1 = GarageRemindersPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "GarageRemindersContent");
__turbopack_context__.k.register(_c1, "GarageRemindersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_53d95de4._.js.map