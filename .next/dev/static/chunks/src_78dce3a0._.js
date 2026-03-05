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
"[project]/src/app/garage/jobs/new/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewJobPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// Predefined items for quick selection
const COMMON_LABOR = [
    {
        name: "Labor - Diagnostic",
        price: 5000
    },
    {
        name: "Labor - MOT Inspection",
        price: 5000
    },
    {
        name: "Labor - Oil Change",
        price: 3000
    },
    {
        name: "Labor - Tire Change",
        price: 4000
    },
    {
        name: "Labor - Brake Inspection",
        price: 3500
    },
    {
        name: "Labor - General Repair",
        price: 6000
    },
    {
        name: "Labor - Alignment",
        price: 8000
    },
    {
        name: "Labor - Transmission Service",
        price: 10000
    }
];
const COMMON_PARTS = [
    {
        name: "Oil Filter",
        price: 1500
    },
    {
        name: "Air Filter",
        price: 2000
    },
    {
        name: "Cabin Air Filter",
        price: 1800
    },
    {
        name: "Brake Pads (Front)",
        price: 4000
    },
    {
        name: "Brake Pads (Rear)",
        price: 3500
    },
    {
        name: "Spark Plugs",
        price: 2500
    },
    {
        name: "Tire (Standard)",
        price: 12000
    },
    {
        name: "Battery",
        price: 8000
    },
    {
        name: "Alternator",
        price: 15000
    },
    {
        name: "Starter Motor",
        price: 12000
    },
    {
        name: "Water Pump",
        price: 5500
    },
    {
        name: "Radiator",
        price: 10000
    }
];
const COMMON_SERVICES = [
    {
        name: "MOT Test",
        price: 5500
    },
    {
        name: "Full Service",
        price: 15000
    },
    {
        name: "Interim Service",
        price: 8000
    },
    {
        name: "Air Conditioning Service",
        price: 6000
    },
    {
        name: "Wheel Alignment",
        price: 8000
    },
    {
        name: "Brake Fluid Flush",
        price: 4000
    },
    {
        name: "Transmission Fluid Change",
        price: 7000
    }
];
function NewJobPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const vehiclePickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inventoryPickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [refreshingVehicles, setRefreshingVehicles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [garageId, setGarageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [vehicles, setVehicles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [staff, setStaff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inventory, setInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showInventoryPicker, setShowInventoryPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showVehiclePicker, setShowVehiclePicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [vehicleSearch, setVehicleSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isNewCustomer, setIsNewCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [vrmLookup, setVrmLookup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lookingUpVrm, setLookingUpVrm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newCustomerData, setNewCustomerData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        phone: ""
    });
    const [vehicleDataFromVrm, setVehicleDataFromVrm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        vehicleId: "",
        type: "SERVICE",
        status: "TODO",
        description: "",
        bookedDate: new Date().toISOString().split("T")[0],
        estimatedHours: "1",
        laborRate: 5000,
        assignedToId: "",
        notes: ""
    });
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [useCustomItem, setUseCustomItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newItem, setNewItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: "LABOR",
        name: "",
        description: "",
        quantity: "1",
        unitPricePence: "5000",
        totalPence: 5000
    });
    const getItemsForType = ()=>{
        if (newItem.type === "LABOR") return COMMON_LABOR;
        if (newItem.type === "PART") return COMMON_PARTS;
        if (newItem.type === "SERVICE") return COMMON_SERVICES;
        return [];
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewJobPage.useEffect": ()=>{
            loadData();
        }
    }["NewJobPage.useEffect"], []);
    // Refresh data when window gains focus or becomes visible
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewJobPage.useEffect": ()=>{
            const handleFocus = {
                "NewJobPage.useEffect.handleFocus": ()=>{
                    loadData();
                }
            }["NewJobPage.useEffect.handleFocus"];
            const handleVisibility = {
                "NewJobPage.useEffect.handleVisibility": ()=>{
                    if (document.visibilityState === "visible") {
                        loadData();
                    }
                }
            }["NewJobPage.useEffect.handleVisibility"];
            window.addEventListener("focus", handleFocus);
            document.addEventListener("visibilitychange", handleVisibility);
            return ({
                "NewJobPage.useEffect": ()=>{
                    window.removeEventListener("focus", handleFocus);
                    document.removeEventListener("visibilitychange", handleVisibility);
                }
            })["NewJobPage.useEffect"];
        }
    }["NewJobPage.useEffect"], []);
    // Close dropdowns on Escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewJobPage.useEffect": ()=>{
            const handleEscape = {
                "NewJobPage.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape') {
                        setShowInventoryPicker(false);
                        setShowVehiclePicker(false);
                    }
                }
            }["NewJobPage.useEffect.handleEscape"];
            window.addEventListener('keydown', handleEscape);
            return ({
                "NewJobPage.useEffect": ()=>window.removeEventListener('keydown', handleEscape)
            })["NewJobPage.useEffect"];
        }
    }["NewJobPage.useEffect"], []);
    // Close dropdowns when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewJobPage.useEffect": ()=>{
            const handleClickOutside = {
                "NewJobPage.useEffect.handleClickOutside": (event)=>{
                    if (vehiclePickerRef.current && !vehiclePickerRef.current.contains(event.target)) {
                        setShowVehiclePicker(false);
                    }
                    if (inventoryPickerRef.current && !inventoryPickerRef.current.contains(event.target)) {
                        setShowInventoryPicker(false);
                    }
                }
            }["NewJobPage.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "NewJobPage.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["NewJobPage.useEffect"];
        }
    }["NewJobPage.useEffect"], []);
    const handleVrmLookup = async ()=>{
        if (!vrmLookup.trim()) {
            addToast("Please enter a VRM", "error");
            return;
        }
        setLookingUpVrm(true);
        try {
            const res = await fetch(`/api/lookup/vrm?vrm=${encodeURIComponent(vrmLookup)}`);
            const data = await res.json();
            if (res.ok && data.vehicle) {
                // Save vehicle data for later
                setVehicleDataFromVrm(data.vehicle);
                // Show success message
                addToast(`Vehicle Found! ${data.vehicle.make} ${data.vehicle.model} - ${vrmLookup}. Now enter customer details below.`, "success");
            } else {
                addToast(data.error || "Vehicle not found in DVSA database", "error");
            }
        } catch (error) {
            console.error("VRM lookup error:", error);
            addToast("Failed to lookup VRM. Please enter details manually.", "error");
        } finally{
            setLookingUpVrm(false);
        }
    };
    const handleSaveNewCustomer = async ()=>{
        if (!newCustomerData.name.trim() || !newCustomerData.email.trim()) {
            addToast("Please enter customer name and email", "error");
            return;
        }
        if (!vehicleDataFromVrm) {
            addToast("Please lookup vehicle VRM first", "error");
            return;
        }
        if (!garageId) {
            addToast("Garage not loaded", "error");
            return;
        }
        setLoading(true);
        try {
            // Create customer with vehicle via CRM API
            const response = await fetch(`/api/garages/${garageId}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newCustomerData.name,
                    email: newCustomerData.email,
                    phone: newCustomerData.phone,
                    vehicleData: {
                        vrm: vrmLookup.toUpperCase(),
                        make: vehicleDataFromVrm.make,
                        model: vehicleDataFromVrm.model,
                        motExpiry: vehicleDataFromVrm.motExpiryDate || new Date().toISOString().split('T')[0],
                        mileage: 0
                    }
                })
            });
            const result = await response.json();
            if (response.ok && result.customer) {
                addToast(`Customer and vehicle added successfully! ${newCustomerData.name} - ${result.customer.email}`, "success");
                // Get the newly created vehicle from the response
                const newVehicle = result.customer.vehicles?.find((v)=>v.vrm === vrmLookup.toUpperCase());
                // Reload vehicles list
                await loadData();
                // Switch to existing customer mode and auto-select the newly created vehicle
                setIsNewCustomer(false);
                if (newVehicle) {
                    setFormData((prev)=>({
                            ...prev,
                            vehicleId: newVehicle.id
                        }));
                }
                // Reset form
                setVrmLookup("");
                setVehicleDataFromVrm(null);
                setNewCustomerData({
                    name: "",
                    email: "",
                    phone: ""
                });
            } else {
                addToast(result.error || "Failed to add customer", "error");
            }
        } catch (error) {
            console.error("Failed to add customer:", error);
            addToast("Failed to add customer. Please try again.", "error");
        } finally{
            setLoading(false);
        }
    };
    const loadData = async ()=>{
        try {
            let resolvedGarage = null;
            const storedGarage = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("garage-data") : "TURBOPACK unreachable";
            if (storedGarage) {
                try {
                    const parsed = JSON.parse(storedGarage);
                    if (parsed?.id) {
                        const garageRes = await fetch(`/api/garages/${parsed.id}`);
                        if (garageRes.ok) {
                            resolvedGarage = await garageRes.json();
                        }
                    }
                } catch (error) {
                    console.warn("Failed to parse stored garage data:", error);
                }
            }
            if (!resolvedGarage) {
                const garageRes = await fetch("/api/garages/me");
                const garageData = await garageRes.json();
                resolvedGarage = "id" in garageData ? garageData : null;
            }
            setGarageId(resolvedGarage?.id || null);
            if (resolvedGarage) {
                // Load vehicles with no-cache to ensure fresh data
                const vehiclesRes = await fetch(`/api/vehicles?garageId=${resolvedGarage.id}`, {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                const vehiclesData = await vehiclesRes.json();
                setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
                // Load staff (mechanics)
                const staffRes = await fetch(`/api/garages/${resolvedGarage.id}/staff`);
                const staffData = await staffRes.json();
                setStaff(staffData.staff?.filter((s)=>s.active) || []);
                // Load inventory
                const inventoryRes = await fetch(`/api/garages/${resolvedGarage.id}/inventory?activeOnly=true`);
                const inventoryData = await inventoryRes.json();
                setInventory(inventoryData.items || []);
            }
        } catch (error) {
            console.error("Failed to load data:", error);
            setVehicles([]);
            setStaff([]);
            setInventory([]);
        }
    };
    const handleAddItem = ()=>{
        if (!newItem.name.trim()) {
            addToast("Please enter an item name", "error");
            return;
        }
        const quantity = parseFloat(String(newItem.quantity)) || 1;
        const unitPrice = parseInt(String(newItem.unitPricePence)) || 5000;
        const totalPence = Math.round(quantity * unitPrice);
        setItems([
            ...items,
            {
                ...newItem,
                quantity,
                unitPricePence: unitPrice,
                totalPence
            }
        ]);
        setNewItem({
            type: "LABOR",
            name: "",
            description: "",
            quantity: "1",
            unitPricePence: "5000",
            totalPence: 5000
        });
        setUseCustomItem(false);
    };
    const handleAddInventoryItem = (item)=>{
        if (item.quantityOnHand <= 0) {
            addToast(`${item.name} is out of stock!`, "error");
            return;
        }
        const newJobItem = {
            type: "PART",
            name: item.name,
            description: item.category || "",
            quantity: 1,
            unitPricePence: item.unitPricePence,
            totalPence: item.unitPricePence,
            fromInventory: true,
            inventoryItemId: item.id
        };
        setItems([
            ...items,
            newJobItem
        ]);
        setShowInventoryPicker(false);
        // Show success feedback
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn z-50';
        notification.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span><strong>${item.name}</strong> added to job</span>
    `;
        document.body.appendChild(notification);
        setTimeout(()=>notification.remove(), 3000);
    };
    const handleRemoveItem = (index)=>{
        setItems(items.filter((_, i)=>i !== index));
    };
    const calculateTotals = ()=>{
        const laborTotal = items.filter((item)=>item.type === "LABOR").reduce((sum, item)=>sum + item.totalPence, 0);
        const partsTotal = items.filter((item)=>item.type === "PART").reduce((sum, item)=>sum + item.totalPence, 0);
        const subtotal = laborTotal + partsTotal;
        const vat = Math.round(subtotal * 0.2);
        const total = subtotal + vat;
        return {
            laborTotal,
            partsTotal,
            subtotal,
            vat,
            total
        };
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!formData.vehicleId) {
            addToast("Please select a vehicle", "error");
            return;
        }
        if (!garageId) {
            addToast("No garage found", "error");
            return;
        }
        setLoading(true);
        try {
            // Create job
            const jobRes = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    estimatedHours: parseFloat(String(formData.estimatedHours)) || 1,
                    assignedToId: formData.assignedToId || null,
                    garageId
                })
            });
            if (!jobRes.ok) {
                let errorMessage = "Failed to create job";
                try {
                    const errorData = await jobRes.json();
                    errorMessage = errorData.error || errorMessage;
                } catch  {
                    // If JSON parsing fails, use status text
                    errorMessage = jobRes.statusText || errorMessage;
                }
                console.error("Job creation failed:", errorMessage);
                throw new Error(errorMessage);
            }
            const job = await jobRes.json();
            // Add items if any
            if (items.length > 0) {
                const itemsRes = await fetch(`/api/jobs/${job.id}/items`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items
                    })
                });
                if (!itemsRes.ok) {
                    throw new Error("Failed to add items");
                }
            }
            addToast("Job created successfully!", "success");
            router.push(`/garage/jobs/${job.id}`);
        } catch (error) {
            console.error("Error creating job:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to create job. Please try again.";
            addToast(errorMessage, "error");
        } finally{
            setLoading(false);
        }
    };
    const selectedVehicle = vehicles.find((v)=>v.id === formData.vehicleId);
    const totals = calculateTotals();
    const getJobTypeClasses = (value, selected)=>{
        if (!selected) {
            return {
                wrapper: "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50",
                text: "text-slate-700",
                check: "text-slate-500"
            };
        }
        if (value === "MOT") {
            return {
                wrapper: "border-violet-400 bg-violet-50",
                text: "text-violet-900",
                check: "text-violet-600"
            };
        }
        if (value === "SERVICE") {
            return {
                wrapper: "border-blue-400 bg-blue-50",
                text: "text-blue-900",
                check: "text-blue-600"
            };
        }
        if (value === "REPAIR") {
            return {
                wrapper: "border-amber-400 bg-amber-50",
                text: "text-amber-900",
                check: "text-amber-600"
            };
        }
        return {
            wrapper: "border-emerald-400 bg-emerald-50",
            text: "text-emerald-900",
            check: "text-emerald-600"
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/garage/jobs",
                            className: "p-2 hover:bg-slate-100 rounded-lg transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 550,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                            lineNumber: 546,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-slate-900",
                                    children: "Create New Job"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                    lineNumber: 553,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-500 text-sm mt-0.5",
                                    children: "Add service, repair, or MOT job"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                    lineNumber: 554,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                            lineNumber: 552,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                    lineNumber: 545,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-4 md:p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-900 mb-3",
                                children: "Job Details"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 p-3 bg-slate-50 rounded-lg border-2 border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            checked: !isNewCustomer,
                                                            onChange: ()=>setIsNewCustomer(false),
                                                            className: "w-4 h-4 text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                                                    className: "text-blue-600",
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 576,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-slate-900 text-sm",
                                                                    children: "Existing Customer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 577,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            checked: isNewCustomer,
                                                            onChange: ()=>setIsNewCustomer(true),
                                                            className: "w-4 h-4 text-green-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                    className: "text-green-600",
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 588,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-slate-900 text-sm",
                                                                    children: "New Customer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 589,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 567,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 566,
                                        columnNumber: 13
                                    }, this),
                                    !isNewCustomer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 relative",
                                        ref: vehiclePickerRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-1.5",
                                                children: [
                                                    "Select Vehicle ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-600",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 34
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, this),
                                            formData.vehicleId && !showVehiclePicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setShowVehiclePicker(true),
                                                className: "w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg bg-white hover:border-blue-400 transition-colors flex items-center justify-between group cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold text-xs",
                                                                children: selectedVehicle?.vrm
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 609,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-left",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-slate-900 text-sm leading-tight",
                                                                        children: [
                                                                            selectedVehicle?.make,
                                                                            " ",
                                                                            selectedVehicle?.model
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 613,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: selectedVehicle?.ownerName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 616,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 612,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "text-slate-400 hover:text-red-600",
                                                        size: 16,
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            setFormData({
                                                                ...formData,
                                                                vehicleId: ""
                                                            });
                                                            setVehicleSearch("");
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 604,
                                                columnNumber: 19
                                            }, this),
                                            (!formData.vehicleId || showVehiclePicker) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10",
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 636,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: vehicleSearch,
                                                        onChange: (e)=>{
                                                            setVehicleSearch(e.target.value);
                                                            setShowVehiclePicker(true);
                                                        },
                                                        onFocus: ()=>setShowVehiclePicker(true),
                                                        placeholder: "Search for a vehicle...",
                                                        className: "w-full pl-10 pr-10 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 637,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: async ()=>{
                                                            setRefreshingVehicles(true);
                                                            await loadData();
                                                            setRefreshingVehicles(false);
                                                            addToast("Vehicles refreshed", "success");
                                                        },
                                                        disabled: refreshingVehicles,
                                                        className: "absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded transition-colors disabled:opacity-50",
                                                        title: "Refresh vehicle list",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            className: `text-slate-600 ${refreshingVehicles ? 'animate-spin' : ''}`,
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 635,
                                                columnNumber: 19
                                            }, this),
                                            showVehiclePicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute z-50 mt-1.5 w-full bg-white border-2 border-blue-300 rounded-lg shadow-2xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-h-64 overflow-y-auto p-1.5 space-y-1",
                                                        children: [
                                                            vehicles.filter((v)=>vehicleSearch === "" ? true : v.vrm.toLowerCase().includes(vehicleSearch.toLowerCase()) || v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) || `${v.make} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())).slice(0, vehicleSearch ? 50 : 8).map((vehicle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        setFormData({
                                                                            ...formData,
                                                                            vehicleId: vehicle.id
                                                                        });
                                                                        setShowVehiclePicker(false);
                                                                        setVehicleSearch("");
                                                                    },
                                                                    className: `w-full text-left p-2 rounded-lg transition-colors flex items-center gap-2.5 group ${formData.vehicleId === vehicle.id ? 'bg-blue-50 border-2 border-blue-300' : 'hover:bg-blue-50 border-2 border-transparent'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold text-xs shrink-0",
                                                                            children: vehicle.vrm
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 693,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: `font-semibold truncate text-sm leading-tight ${formData.vehicleId === vehicle.id ? 'text-blue-900' : 'text-slate-900'}`,
                                                                                    children: [
                                                                                        vehicle.make,
                                                                                        " ",
                                                                                        vehicle.model
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                    lineNumber: 697,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-xs text-slate-500 truncate",
                                                                                    children: vehicle.ownerName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                    lineNumber: 702,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 696,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        formData.vehicleId === vehicle.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "text-blue-600 shrink-0",
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 705,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, vehicle.id, true, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 679,
                                                                    columnNumber: 27
                                                                }, this)),
                                                            vehicles.filter((v)=>vehicleSearch === "" ? false : v.vrm.toLowerCase().includes(vehicleSearch.toLowerCase()) || v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) || `${v.make} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())).length === 0 && vehicleSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-center py-6 text-slate-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                                                        className: "mx-auto mb-2",
                                                                        size: 24
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 717,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium",
                                                                        children: "No vehicles found"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs mt-1",
                                                                        children: "Try searching with different keywords"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 719,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 716,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 669,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-1.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center",
                                                        children: vehicleSearch ? `Showing ${vehicles.filter((v)=>v.vrm.toLowerCase().includes(vehicleSearch.toLowerCase()) || v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) || `${v.make} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())).length} results` : `Showing ${Math.min(8, vehicles.length)} of ${vehicles.length} vehicles (search to see more)`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 667,
                                                columnNumber: 19
                                            }, this),
                                            selectedVehicle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-3 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-500 font-medium",
                                                                    children: "Customer:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 742,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-slate-900 text-sm leading-tight truncate",
                                                                    children: selectedVehicle.ownerName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 743,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 741,
                                                            columnNumber: 23
                                                        }, this),
                                                        selectedVehicle.ownerPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-500 font-medium",
                                                                    children: "Phone:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 747,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-slate-900 text-sm leading-tight truncate",
                                                                    children: selectedVehicle.ownerPhone
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 748,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 746,
                                                            columnNumber: 25
                                                        }, this),
                                                        selectedVehicle.ownerEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-500 font-medium",
                                                                    children: "Email:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 753,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-slate-900 text-sm truncate",
                                                                    children: selectedVehicle.ownerEmail
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 752,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 739,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 597,
                                        columnNumber: 15
                                    }, this),
                                    isNewCustomer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-3",
                                        children: [
                                            !vehicleDataFromVrm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-green-50 border-2 border-green-200 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-2.5 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                    className: "text-white",
                                                                    size: 18
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 771,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 770,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "font-bold text-slate-900",
                                                                        children: "Step 1: Lookup Vehicle"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 774,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-600 mt-0.5",
                                                                        children: "Enter registration to fetch DVSA data automatically"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 775,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 773,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 769,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: vrmLookup,
                                                                onChange: (e)=>setVrmLookup(e.target.value.toUpperCase()),
                                                                placeholder: "e.g. AB12 CDE",
                                                                className: "flex-1 px-3 py-2.5 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 font-bold text-center text-base uppercase",
                                                                maxLength: 8
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 780,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleVrmLookup,
                                                                disabled: lookingUpVrm || !vrmLookup.trim(),
                                                                className: "px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold text-sm flex items-center gap-2",
                                                                children: lookingUpVrm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 796,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        "Looking up..."
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                            size: 16
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 801,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        "Lookup"
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 788,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500 mt-3 flex items-center gap-1",
                                                        children: [
                                                            "💡 ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "This will fetch make, model, colour from DVSA database"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 26
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 808,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 768,
                                                columnNumber: 19
                                            }, this),
                                            vehicleDataFromVrm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                    className: "text-white",
                                                                                    size: 18
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                    lineNumber: 822,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 821,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                        className: "font-bold text-green-900",
                                                                                        children: "Vehicle Found"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                        lineNumber: 825,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs text-green-700",
                                                                                        children: [
                                                                                            vehicleDataFromVrm.make,
                                                                                            " ",
                                                                                            vehicleDataFromVrm.model
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                        lineNumber: 826,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 824,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 820,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>{
                                                                            setVehicleDataFromVrm(null);
                                                                            setVrmLookup("");
                                                                        },
                                                                        className: "text-green-700 hover:text-green-900 text-sm font-medium",
                                                                        children: "Change VRM"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 829,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 819,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-2 text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-green-700 font-medium",
                                                                                children: "VRM:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 842,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold inline-block mt-1 text-xs",
                                                                                children: vrmLookup
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 843,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 841,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-green-700 font-medium",
                                                                                children: "Colour:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 848,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-semibold text-slate-900",
                                                                                children: vehicleDataFromVrm.colour || 'N/A'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 849,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 847,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 840,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 818,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 bg-white border-2 border-green-200 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-bold text-slate-900 mb-3 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs",
                                                                        children: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 857,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "Enter Customer Details"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 856,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-semibold text-slate-700 mb-1",
                                                                                children: [
                                                                                    "Customer Name ",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-red-600",
                                                                                        children: "*"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                        lineNumber: 864,
                                                                                        columnNumber: 43
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 863,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: newCustomerData.name,
                                                                                onChange: (e)=>setNewCustomerData({
                                                                                        ...newCustomerData,
                                                                                        name: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500 text-sm",
                                                                                placeholder: "John Smith"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 866,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 862,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-semibold text-slate-700 mb-1",
                                                                                children: [
                                                                                    "Email ",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-red-600",
                                                                                        children: "*"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                        lineNumber: 877,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 876,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "email",
                                                                                value: newCustomerData.email,
                                                                                onChange: (e)=>setNewCustomerData({
                                                                                        ...newCustomerData,
                                                                                        email: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500 text-sm",
                                                                                placeholder: "john@example.com"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 879,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 875,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-semibold text-slate-700 mb-1",
                                                                                children: "Phone (Optional)"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 889,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "tel",
                                                                                value: newCustomerData.phone,
                                                                                onChange: (e)=>setNewCustomerData({
                                                                                        ...newCustomerData,
                                                                                        phone: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500 text-sm",
                                                                                placeholder: "07000 123456"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                lineNumber: 892,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 888,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: handleSaveNewCustomer,
                                                                        disabled: loading || !newCustomerData.name || !newCustomerData.email,
                                                                        className: "w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2",
                                                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                    lineNumber: 909,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                "Saving..."
                                                                            ]
                                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                    size: 16
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                                    lineNumber: 914,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                "Add Customer & Vehicle"
                                                                            ]
                                                                        }, void 0, true)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 901,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 861,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 855,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 816,
                                                columnNumber: 19
                                            }, this),
                                            !vehicleDataFromVrm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "💡 Tip:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 927,
                                                        columnNumber: 21
                                                    }, this),
                                                    ' If the customer already exists, switch to "Existing Customer" above.'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 926,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 765,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: [
                                                    "Job Type ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-600",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 936,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 935,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-4 gap-2.5",
                                                children: [
                                                    {
                                                        value: 'MOT',
                                                        label: 'MOT',
                                                        icon: '🔍',
                                                        color: 'purple'
                                                    },
                                                    {
                                                        value: 'SERVICE',
                                                        label: 'Service',
                                                        icon: '🔧',
                                                        color: 'blue'
                                                    },
                                                    {
                                                        value: 'REPAIR',
                                                        label: 'Repair',
                                                        icon: '🔨',
                                                        color: 'orange'
                                                    },
                                                    {
                                                        value: 'DIAGNOSTIC',
                                                        label: 'Diagnostic',
                                                        icon: '💻',
                                                        color: 'green'
                                                    }
                                                ].map((type)=>(()=>{
                                                        const selected = formData.type === type.value;
                                                        const classes = getJobTypeClasses(type.value, selected);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: `relative flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${classes.wrapper}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "jobType",
                                                                    value: type.value,
                                                                    checked: formData.type === type.value,
                                                                    onChange: (e)=>setFormData({
                                                                            ...formData,
                                                                            type: e.target.value
                                                                        }),
                                                                    className: "sr-only",
                                                                    required: true
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 953,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-base",
                                                                    children: type.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 962,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `font-semibold text-sm ${classes.text}`,
                                                                    children: type.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 963,
                                                                    columnNumber: 21
                                                                }, this),
                                                                selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: `ml-auto ${classes.check}`,
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 967,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, type.value, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 949,
                                                            columnNumber: 19
                                                        }, this);
                                                    })())
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 938,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 934,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Assign Mechanic"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 978,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: `relative flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${formData.assignedToId === "" ? 'border-slate-500 bg-slate-50' : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "mechanic",
                                                                value: "",
                                                                checked: formData.assignedToId === "",
                                                                onChange: (e)=>setFormData({
                                                                        ...formData,
                                                                        assignedToId: e.target.value
                                                                    }),
                                                                className: "sr-only"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 990,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
                                                                    className: "text-slate-500",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 999,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 998,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `font-semibold text-sm ${formData.assignedToId === "" ? 'text-slate-900' : 'text-slate-700'}`,
                                                                        children: "Unassigned"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1002,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "No mechanic assigned yet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1007,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1001,
                                                                columnNumber: 19
                                                            }, this),
                                                            formData.assignedToId === "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                className: "ml-auto text-slate-600",
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 983,
                                                        columnNumber: 17
                                                    }, this),
                                                    staff.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: `relative flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${formData.assignedToId === s.id ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "radio",
                                                                    name: "mechanic",
                                                                    value: s.id,
                                                                    checked: formData.assignedToId === s.id,
                                                                    onChange: (e)=>setFormData({
                                                                            ...formData,
                                                                            assignedToId: e.target.value
                                                                        }),
                                                                    className: "sr-only"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1024,
                                                                    columnNumber: 21
                                                                }, this),
                                                                s.avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: s.avatarUrl,
                                                                    alt: s.name,
                                                                    className: "w-10 h-10 rounded-full object-cover border-2 border-blue-200 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1033,
                                                                    columnNumber: 23
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${formData.assignedToId === s.id ? 'bg-blue-600 text-white border-blue-700' : 'bg-blue-100 text-blue-700 border-blue-200'}`,
                                                                    children: s.name.split(' ').map((n)=>n.charAt(0)).join('').toUpperCase().slice(0, 2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1039,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `font-semibold text-sm ${formData.assignedToId === s.id ? 'text-blue-900' : 'text-slate-900'}`,
                                                                            children: s.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 1048,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-slate-500",
                                                                            children: s.role
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                            lineNumber: 1053,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1047,
                                                                    columnNumber: 21
                                                                }, this),
                                                                formData.assignedToId === s.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "ml-auto text-blue-600",
                                                                    size: 14
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1056,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, s.id, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1016,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 981,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 977,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Booked Date"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1066,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: formData.bookedDate,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        bookedDate: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1069,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1065,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Estimated Hours"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1079,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.5",
                                                min: "0",
                                                value: formData.estimatedHours,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        estimatedHours: e.target.value
                                                    }),
                                                className: "w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1082,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1078,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1096,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: formData.description,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        description: e.target.value
                                                    }),
                                                rows: 2,
                                                className: "w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm",
                                                placeholder: "Describe the work to be done..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1099,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1095,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Internal Notes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: formData.notes,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        notes: e.target.value
                                                    }),
                                                rows: 2,
                                                className: "w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm",
                                                placeholder: "Internal notes (not visible to customer)..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1113,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 564,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-0 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full px-4 py-3 bg-linear-to-r from-slate-800 to-slate-700 text-white flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center w-9 h-9 bg-white/20 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    className: "text-white",
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1130,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1129,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-base font-bold",
                                                        children: "Parts & Labor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 1133,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-300",
                                                        children: [
                                                            items.length,
                                                            " item",
                                                            items.length !== 1 ? 's' : '',
                                                            " • Total: £",
                                                            (totals.laborTotal + totals.partsTotal) / 100 >= 0 ? ((totals.laborTotal + totals.partsTotal) / 100).toFixed(2) : '0.00'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 1134,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setShowInventoryPicker(!showInventoryPicker);
                                        },
                                        className: "px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2 text-xs transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1145,
                                                columnNumber: 15
                                            }, this),
                                            "Add From Stock"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 1127,
                                columnNumber: 11
                            }, this),
                            showInventoryPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: inventoryPickerRef,
                                className: "px-4 py-3 border-b border-b-slate-200 bg-linear-to-br from-green-50 to-emerald-50 border-l-4 border-l-green-400 animate-fadeIn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                className: "text-green-600",
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1154,
                                                columnNumber: 17
                                            }, this),
                                            "Add from Inventory"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1153,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "🔍 Search parts by name, SKU, or category...",
                                            className: "w-full px-3 py-2.5 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 bg-white shadow-sm text-sm",
                                            onChange: (e)=>{
                                                const search = e.target.value.toLowerCase();
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1160,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar",
                                        children: inventory.length > 0 ? inventory.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleAddInventoryItem(item),
                                                className: "group text-left p-3 bg-white border-2 border-green-200 rounded-lg hover:border-green-500 hover:shadow-sm transition-all duration-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-slate-900 truncate",
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1182,
                                                                    columnNumber: 27
                                                                }, this),
                                                                item.sku && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-600 font-mono mt-1",
                                                                    children: [
                                                                        "SKU: ",
                                                                        item.sku
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1184,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `text-sm font-semibold px-2 py-1 rounded-full mt-2 inline-block ${item.quantityOnHand === 0 ? "bg-red-100 text-red-700" : item.quantityOnHand <= item.reorderLevel ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`,
                                                                    children: item.quantityOnHand === 0 ? "OUT" : `${item.quantityOnHand} stock`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1186,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1181,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-bold text-green-700",
                                                                children: [
                                                                    "£",
                                                                    (item.unitPricePence / 100).toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1197,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1196,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1180,
                                                    columnNumber: 23
                                                }, this)
                                            }, item.id, false, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1174,
                                                columnNumber: 21
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-2 text-center py-8 text-slate-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    className: "mx-auto mb-2 text-slate-300",
                                                    size: 32
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1204,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: "No inventory items"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1205,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1203,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                        lineNumber: 1171,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 1152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-4 border-b border-slate-200 bg-slate-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-semibold text-slate-600 mb-2",
                                                            children: "Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1219,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: newItem.type,
                                                            onChange: (e)=>{
                                                                const type = e.target.value;
                                                                setNewItem({
                                                                    ...newItem,
                                                                    type,
                                                                    name: "",
                                                                    unitPricePence: "5000"
                                                                });
                                                                setUseCustomItem(false);
                                                            },
                                                            className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white font-medium",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "LABOR",
                                                                    children: "🔧 Labor"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1229,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "PART",
                                                                    children: "📦 Part"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1230,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "SERVICE",
                                                                    children: "⚙️ Service"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1231,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1220,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1218,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "md:col-span-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-semibold text-slate-600 mb-2",
                                                            children: "Item"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1237,
                                                            columnNumber: 21
                                                        }, this),
                                                        !useCustomItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: newItem.name,
                                                            onChange: (e)=>{
                                                                const selectedValue = e.target.value;
                                                                if (selectedValue === "__CUSTOM__") {
                                                                    setUseCustomItem(true);
                                                                    setNewItem({
                                                                        ...newItem,
                                                                        name: "",
                                                                        unitPricePence: "5000"
                                                                    });
                                                                } else {
                                                                    const item = getItemsForType().find((i)=>i.name === selectedValue);
                                                                    setNewItem({
                                                                        ...newItem,
                                                                        name: selectedValue,
                                                                        unitPricePence: String(item?.price || 5000)
                                                                    });
                                                                }
                                                            },
                                                            className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select item..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1257,
                                                                    columnNumber: 25
                                                                }, this),
                                                                getItemsForType().map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: item.name,
                                                                        children: item.name
                                                                    }, item.name, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1259,
                                                                        columnNumber: 27
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "__CUSTOM__",
                                                                    className: "font-semibold text-blue-600",
                                                                    children: "➕ Add Custom Item"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1263,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1239,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: newItem.name,
                                                                    onChange: (e)=>setNewItem({
                                                                            ...newItem,
                                                                            name: e.target.value
                                                                        }),
                                                                    placeholder: `Custom ${newItem.type.toLowerCase()}...`,
                                                                    className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1269,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        setUseCustomItem(false);
                                                                        setNewItem({
                                                                            ...newItem,
                                                                            name: ""
                                                                        });
                                                                    },
                                                                    className: "text-xs text-slate-500 hover:text-slate-700 underline",
                                                                    children: "Back to predefined items"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1276,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1268,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1236,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1216,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col md:flex-row gap-3 items-start md:items-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full md:w-40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-semibold text-slate-600 mb-2",
                                                            children: "Qty"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        const current = parseInt(String(newItem.quantity)) || 1;
                                                                        setNewItem({
                                                                            ...newItem,
                                                                            quantity: Math.max(1, current - 1).toString()
                                                                        });
                                                                    },
                                                                    className: "px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded font-bold text-slate-900 transition-colors shrink-0",
                                                                    children: "−"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1297,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    min: "1",
                                                                    step: "1",
                                                                    value: newItem.quantity,
                                                                    onChange: (e)=>{
                                                                        const val = e.target.value;
                                                                        const numVal = parseInt(val) || 1;
                                                                        setNewItem({
                                                                            ...newItem,
                                                                            quantity: Math.max(1, numVal).toString()
                                                                        });
                                                                    },
                                                                    className: "flex-1 px-2 py-2 border border-slate-300 rounded text-center font-semibold text-sm min-w-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1307,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        const current = parseInt(String(newItem.quantity)) || 1;
                                                                        setNewItem({
                                                                            ...newItem,
                                                                            quantity: (current + 1).toString()
                                                                        });
                                                                    },
                                                                    className: "px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded font-bold text-slate-900 transition-colors shrink-0",
                                                                    children: "+"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1319,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1296,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1294,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full md:w-40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-semibold text-slate-600 mb-2",
                                                            children: "Price (£)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "0.01",
                                                            min: "0",
                                                            value: parseInt(String(newItem.unitPricePence)) / 100 || "",
                                                            onChange: (e)=>setNewItem({
                                                                    ...newItem,
                                                                    unitPricePence: e.target.value ? String(Math.round(parseFloat(e.target.value) * 100)) : "0"
                                                                }),
                                                            className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1335,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1333,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full md:flex-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleAddItem,
                                                        className: "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1357,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Add"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 1352,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1351,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1292,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                    lineNumber: 1214,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 1213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2.5",
                                    children: [
                                        items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group flex items-center justify-between p-3 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `px-3 py-1 text-xs font-bold rounded-full ${item.type === "LABOR" ? "bg-blue-100 text-blue-700" : item.type === "PART" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`,
                                                                        children: [
                                                                            item.type === "LABOR" ? "🔧" : item.type === "PART" ? "📦" : "⚙️",
                                                                            " ",
                                                                            item.type
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1376,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-slate-900 text-sm",
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1387,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    item.fromInventory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded border border-green-300",
                                                                        children: "📦 Stock"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1389,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1375,
                                                                columnNumber: 23
                                                            }, this),
                                                            item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-slate-600 mt-2",
                                                                children: item.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1395,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 1374,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 ml-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-slate-600",
                                                                        children: [
                                                                            item.quantity,
                                                                            " × £",
                                                                            (Number(item.unitPricePence) / 100).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1400,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold text-slate-900 text-base",
                                                                        children: [
                                                                            "£",
                                                                            (item.totalPence / 100).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                        lineNumber: 1401,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1399,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleRemoveItem(index),
                                                                className: "text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                    lineNumber: 1408,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                                lineNumber: 1403,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                        lineNumber: 1398,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 19
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 pt-4 border-t-2 border-slate-200 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-slate-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Labor:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1417,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "£",
                                                                (totals.laborTotal / 100).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1418,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1416,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-slate-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Parts:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1421,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "£",
                                                                (totals.partsTotal / 100).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1422,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1420,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-slate-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Subtotal:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1425,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "£",
                                                                ((totals.laborTotal + totals.partsTotal) / 100).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1426,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1424,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-slate-700 pt-2 border-t border-slate-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: "Total (inc. VAT):"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1429,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-base text-blue-600",
                                                            children: [
                                                                "£",
                                                                (totals.total / 100).toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                            lineNumber: 1430,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                                    lineNumber: 1428,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1415,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                    lineNumber: 1368,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            className: "mx-auto text-slate-300 mb-2",
                                            size: 36
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1436,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-600 font-medium",
                                            children: "No items added yet"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1437,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500 mt-1",
                                            children: "Click the header to add parts or labor to this job"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1438,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                    lineNumber: 1435,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 1366,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                        lineNumber: 1125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/garage/jobs",
                                className: "flex-1 px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold text-sm text-center transition-colors",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 1446,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading || !formData.vehicleId,
                                className: "flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2",
                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1459,
                                            columnNumber: 17
                                        }, this),
                                        "Creating..."
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                            lineNumber: 1464,
                                            columnNumber: 17
                                        }, this),
                                        "Create Job"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                                lineNumber: 1452,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                        lineNumber: 1445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/jobs/new/page.tsx",
                lineNumber: 559,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/jobs/new/page.tsx",
        lineNumber: 542,
        columnNumber: 5
    }, this);
}
_s(NewJobPage, "rg/GTprjo8EelzGFdaKvtSIVYTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = NewJobPage;
var _c;
__turbopack_context__.k.register(_c, "NewJobPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_78dce3a0._.js.map