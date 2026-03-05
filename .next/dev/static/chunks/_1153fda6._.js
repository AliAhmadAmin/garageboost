(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/garage/settings/notifications/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationsSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function NotificationsSettings() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(87);
    if ($[0] !== "21fc6ad587341a3972950552cae11a950c069a0072b9f313abba8f67f0ad558e") {
        for(let $i = 0; $i < 87; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "21fc6ad587341a3972950552cae11a950c069a0072b9f313abba8f67f0ad558e";
    }
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            emailNotifications: true,
            smsNotifications: true,
            weeklyReports: true,
            reminderSent: true,
            jobUpdates: true,
            bookingRequests: true
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [initialNotifications, setInitialNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(notifications);
    let t1;
    if ($[2] !== notifications) {
        t1 = JSON.stringify(notifications);
        $[2] = notifications;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== initialNotifications) {
        t2 = JSON.stringify(initialNotifications);
        $[4] = initialNotifications;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const hasUnsavedChanges = t1 !== t2;
    let t3;
    if ($[6] !== initialNotifications) {
        t3 = ({
            "NotificationsSettings[handleDiscard]": ()=>{
                setNotifications(initialNotifications);
                setSaveMessage(null);
            }
        })["NotificationsSettings[handleDiscard]"];
        $[6] = initialNotifications;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    const handleDiscard = t3;
    let t4;
    if ($[8] !== notifications) {
        t4 = ({
            "NotificationsSettings[handleSave]": async ()=>{
                setSaving(true);
                setSaveMessage(null);
                setTimeout({
                    "NotificationsSettings[handleSave > setTimeout()]": ()=>{
                        setSaveMessage("\u2713 Notification preferences saved.");
                        setInitialNotifications(notifications);
                        setSaving(false);
                        setTimeout({
                            "NotificationsSettings[handleSave > setTimeout() > setTimeout()]": ()=>setSaveMessage(null)
                        }["NotificationsSettings[handleSave > setTimeout() > setTimeout()]"], 3000);
                    }
                }["NotificationsSettings[handleSave > setTimeout()]"], 500);
            }
        })["NotificationsSettings[handleSave]"];
        $[8] = notifications;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const handleSave = t4;
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-slate-900",
                    children: "Notification Preferences"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 90,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-500 mt-1",
                    children: "Choose how you want to be notified"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 90,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-xl font-bold mb-6",
            children: "Communication Channels"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== notifications) {
        t7 = ({
            "NotificationsSettings[<input>.onChange]": (e)=>setNotifications({
                    ...notifications,
                    emailNotifications: e.target.checked
                })
        })["NotificationsSettings[<input>.onChange]"];
        $[12] = notifications;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== notifications.emailNotifications || $[15] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            checked: notifications.emailNotifications,
            onChange: t7,
            className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[14] = notifications.emailNotifications;
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
            className: "text-blue-600",
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-slate-900",
                    children: "Email Notifications"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 133,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "Receive email updates on important events"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 133,
                    columnNumber: 102
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors",
            children: [
                t8,
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, this);
        $[19] = t8;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== notifications) {
        t12 = ({
            "NotificationsSettings[<input>.onChange]": (e_0)=>setNotifications({
                    ...notifications,
                    smsNotifications: e_0.target.checked
                })
        })["NotificationsSettings[<input>.onChange]"];
        $[21] = notifications;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== notifications.smsNotifications || $[24] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            checked: notifications.smsNotifications,
            onChange: t12,
            className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[23] = notifications.smsNotifications;
        $[24] = t12;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
            className: "text-emerald-600",
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 170,
            columnNumber: 11
        }, this);
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    let t15;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-slate-900",
                    children: "SMS Notifications"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 177,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "Get SMS alerts for urgent actions"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 177,
                    columnNumber: 100
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[27] = t15;
    } else {
        t15 = $[27];
    }
    let t16;
    if ($[28] !== t13) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors",
            children: [
                t13,
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 184,
            columnNumber: 11
        }, this);
        $[28] = t13;
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    let t17;
    if ($[30] !== notifications) {
        t17 = ({
            "NotificationsSettings[<input>.onChange]": (e_1)=>setNotifications({
                    ...notifications,
                    weeklyReports: e_1.target.checked
                })
        })["NotificationsSettings[<input>.onChange]"];
        $[30] = notifications;
        $[31] = t17;
    } else {
        t17 = $[31];
    }
    let t18;
    if ($[32] !== notifications.weeklyReports || $[33] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            checked: notifications.weeklyReports,
            onChange: t17,
            className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[32] = notifications.weeklyReports;
        $[33] = t17;
        $[34] = t18;
    } else {
        t18 = $[34];
    }
    let t19;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
            className: "text-purple-600",
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 214,
            columnNumber: 11
        }, this);
        $[35] = t19;
    } else {
        t19 = $[35];
    }
    let t20;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-slate-900",
                    children: "Weekly Reports"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 221,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "Receive weekly revenue and activity reports"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 221,
                    columnNumber: 97
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 221,
            columnNumber: 11
        }, this);
        $[36] = t20;
    } else {
        t20 = $[36];
    }
    let t21;
    if ($[37] !== t18) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors",
            children: [
                t18,
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 228,
            columnNumber: 11
        }, this);
        $[37] = t18;
        $[38] = t21;
    } else {
        t21 = $[38];
    }
    let t22;
    if ($[39] !== t11 || $[40] !== t16 || $[41] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "p-4 lg:p-8",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        t11,
                        t16,
                        t21
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 236,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 236,
            columnNumber: 11
        }, this);
        $[39] = t11;
        $[40] = t16;
        $[41] = t21;
        $[42] = t22;
    } else {
        t22 = $[42];
    }
    let t23;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-xl font-bold mb-6",
            children: "Activity Notifications"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 246,
            columnNumber: 11
        }, this);
        $[43] = t23;
    } else {
        t23 = $[43];
    }
    let t24;
    if ($[44] !== notifications) {
        t24 = ({
            "NotificationsSettings[<input>.onChange]": (e_2)=>setNotifications({
                    ...notifications,
                    reminderSent: e_2.target.checked
                })
        })["NotificationsSettings[<input>.onChange]"];
        $[44] = notifications;
        $[45] = t24;
    } else {
        t24 = $[45];
    }
    let t25;
    if ($[46] !== notifications.reminderSent || $[47] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            checked: notifications.reminderSent,
            onChange: t24,
            className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 266,
            columnNumber: 11
        }, this);
        $[46] = notifications.reminderSent;
        $[47] = t24;
        $[48] = t25;
    } else {
        t25 = $[48];
    }
    let t26;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
            className: "text-amber-600",
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 275,
            columnNumber: 11
        }, this);
        $[49] = t26;
    } else {
        t26 = $[49];
    }
    let t27;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-slate-900",
                    children: "Reminder Sent"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 282,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "Get notified when automatic reminders are sent to customers"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 282,
                    columnNumber: 96
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[50] = t27;
    } else {
        t27 = $[50];
    }
    let t28;
    if ($[51] !== t25) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors",
            children: [
                t25,
                t26,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 289,
            columnNumber: 11
        }, this);
        $[51] = t25;
        $[52] = t28;
    } else {
        t28 = $[52];
    }
    let t29;
    if ($[53] !== notifications) {
        t29 = ({
            "NotificationsSettings[<input>.onChange]": (e_3)=>setNotifications({
                    ...notifications,
                    jobUpdates: e_3.target.checked
                })
        })["NotificationsSettings[<input>.onChange]"];
        $[53] = notifications;
        $[54] = t29;
    } else {
        t29 = $[54];
    }
    let t30;
    if ($[55] !== notifications.jobUpdates || $[56] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            checked: notifications.jobUpdates,
            onChange: t29,
            className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[55] = notifications.jobUpdates;
        $[56] = t29;
        $[57] = t30;
    } else {
        t30 = $[57];
    }
    let t31;
    if ($[58] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
            className: "text-blue-600",
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 319,
            columnNumber: 11
        }, this);
        $[58] = t31;
    } else {
        t31 = $[58];
    }
    let t32;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-slate-900",
                    children: "Job Updates"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 326,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "Notifications when job status changes"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 326,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 326,
            columnNumber: 11
        }, this);
        $[59] = t32;
    } else {
        t32 = $[59];
    }
    let t33;
    if ($[60] !== t30) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors",
            children: [
                t30,
                t31,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 333,
            columnNumber: 11
        }, this);
        $[60] = t30;
        $[61] = t33;
    } else {
        t33 = $[61];
    }
    let t34;
    if ($[62] !== notifications) {
        t34 = ({
            "NotificationsSettings[<input>.onChange]": (e_4)=>setNotifications({
                    ...notifications,
                    bookingRequests: e_4.target.checked
                })
        })["NotificationsSettings[<input>.onChange]"];
        $[62] = notifications;
        $[63] = t34;
    } else {
        t34 = $[63];
    }
    let t35;
    if ($[64] !== notifications.bookingRequests || $[65] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            checked: notifications.bookingRequests,
            onChange: t34,
            className: "w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 354,
            columnNumber: 11
        }, this);
        $[64] = notifications.bookingRequests;
        $[65] = t34;
        $[66] = t35;
    } else {
        t35 = $[66];
    }
    let t36;
    if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
            className: "text-emerald-600",
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 363,
            columnNumber: 11
        }, this);
        $[67] = t36;
    } else {
        t36 = $[67];
    }
    let t37;
    if ($[68] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-semibold text-slate-900",
                    children: "Booking Requests"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 370,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500",
                    children: "Alerts for new online booking requests"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 370,
                    columnNumber: 99
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[68] = t37;
    } else {
        t37 = $[68];
    }
    let t38;
    if ($[69] !== t35) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors",
            children: [
                t35,
                t36,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 377,
            columnNumber: 11
        }, this);
        $[69] = t35;
        $[70] = t38;
    } else {
        t38 = $[70];
    }
    let t39;
    if ($[71] !== t28 || $[72] !== t33 || $[73] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "p-4 lg:p-8",
            children: [
                t23,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        t28,
                        t33,
                        t38
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                    lineNumber: 385,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[71] = t28;
        $[72] = t33;
        $[73] = t38;
        $[74] = t39;
    } else {
        t39 = $[74];
    }
    let t40;
    if ($[75] !== saveMessage) {
        t40 = saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `rounded-lg px-4 py-3 text-sm font-medium ${saveMessage.includes("\u2713") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`,
            children: saveMessage
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 395,
            columnNumber: 26
        }, this);
        $[75] = saveMessage;
        $[76] = t40;
    } else {
        t40 = $[76];
    }
    let t41;
    if ($[77] !== handleDiscard || $[78] !== handleSave || $[79] !== hasUnsavedChanges || $[80] !== saving) {
        t41 = hasUnsavedChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-slate-700",
                        children: "You have unsaved changes"
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                        lineNumber: 403,
                        columnNumber: 227
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleDiscard,
                                disabled: saving,
                                className: "px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-60",
                                children: "Discard"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                                lineNumber: 403,
                                columnNumber: 346
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                disabled: saving,
                                className: "bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors",
                                children: saving ? "Saving..." : "Save Preferences"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                                lineNumber: 403,
                                columnNumber: 550
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                        lineNumber: 403,
                        columnNumber: 305
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
                lineNumber: 403,
                columnNumber: 134
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 403,
            columnNumber: 32
        }, this);
        $[77] = handleDiscard;
        $[78] = handleSave;
        $[79] = hasUnsavedChanges;
        $[80] = saving;
        $[81] = t41;
    } else {
        t41 = $[81];
    }
    let t42;
    if ($[82] !== t22 || $[83] !== t39 || $[84] !== t40 || $[85] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 pb-24",
            children: [
                t5,
                t22,
                t39,
                t40,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/garage/settings/notifications/page.tsx",
            lineNumber: 414,
            columnNumber: 11
        }, this);
        $[82] = t22;
        $[83] = t39;
        $[84] = t40;
        $[85] = t41;
        $[86] = t42;
    } else {
        t42 = $[86];
    }
    return t42;
}
_s(NotificationsSettings, "jSUEfYlo9gHe8FhBWTnGx9ydKBg=");
_c = NotificationsSettings;
var _c;
__turbopack_context__.k.register(_c, "NotificationsSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Mail
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
            key: "132q7q"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "4",
            width: "20",
            height: "16",
            rx: "2",
            key: "izxlao"
        }
    ]
];
const Mail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mail", __iconNode);
;
 //# sourceMappingURL=mail.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mail",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MessageSquare
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
            key: "18887p"
        }
    ]
];
const MessageSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("message-square", __iconNode);
;
 //# sourceMappingURL=message-square.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageSquare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Calendar
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
];
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("calendar", __iconNode);
;
 //# sourceMappingURL=calendar.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_1153fda6._.js.map