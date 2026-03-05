(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/garage-settings.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMMON_AMENITIES",
    ()=>COMMON_AMENITIES,
    "COMMON_CERTIFICATIONS",
    ()=>COMMON_CERTIFICATIONS,
    "COMMON_SERVICES",
    ()=>COMMON_SERVICES,
    "COMMON_SPECIALTIES",
    ()=>COMMON_SPECIALTIES,
    "formatOpeningHours",
    ()=>formatOpeningHours,
    "parseOpeningHours",
    ()=>parseOpeningHours
]);
const COMMON_SERVICES = [
    "MOT Testing",
    "Full Service",
    "Interim Service",
    "Diagnostics",
    "Brake Service",
    "Oil Change",
    "Tyres",
    "Exhausts",
    "Clutch Repair",
    "Battery Replacement",
    "Air Conditioning",
    "Wheel Alignment",
    "Suspension",
    "Transmission",
    "Engine Repair"
];
const COMMON_SPECIALTIES = [
    "Electric Vehicles (EV)",
    "Hybrid Vehicles",
    "Classic Cars",
    "Performance Tuning",
    "4x4 & Off-Road",
    "Vans & Light Commercial",
    "Luxury & Prestige",
    "Japanese Cars",
    "German Cars",
    "Italian Cars",
    "French Cars",
    "Korean Cars"
];
const COMMON_CERTIFICATIONS = [
    "IMI Accredited",
    "Bosch Service",
    "AA Approved",
    "RAC Approved",
    "MOT Authorised",
    "Halfords Autocentre",
    "Good Garage Scheme",
    "Trust My Garage",
    "Motor Codes",
    "Trading Standards Approved"
];
const COMMON_AMENITIES = [
    "Waiting Area",
    "Free Wi-Fi",
    "Coffee & Tea",
    "Kids Play Area",
    "Courtesy Car",
    "Collection & Delivery",
    "Free Parking",
    "Disabled Access",
    "Air Conditioned",
    "TV & Magazines"
];
function parseOpeningHours(hoursString) {
    const defaultHours = {
        monday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        tuesday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        wednesday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        thursday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        friday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        saturday: {
            open: "09:00",
            close: "14:00",
            closed: false
        },
        sunday: {
            open: "09:00",
            close: "17:00",
            closed: true
        }
    };
    if (!hoursString) return defaultHours;
    const lines = hoursString.split('\n');
    const result = {
        ...defaultHours
    };
    const dayMap = {
        'mon': 'monday',
        'monday': 'monday',
        'tue': 'tuesday',
        'tues': 'tuesday',
        'tuesday': 'tuesday',
        'wed': 'wednesday',
        'wednesday': 'wednesday',
        'thu': 'thursday',
        'thur': 'thursday',
        'thurs': 'thursday',
        'thursday': 'thursday',
        'fri': 'friday',
        'friday': 'friday',
        'sat': 'saturday',
        'saturday': 'saturday',
        'sun': 'sunday',
        'sunday': 'sunday'
    };
    lines.forEach((line)=>{
        const lower = line.toLowerCase().trim();
        if (lower.includes('closed')) {
            Object.keys(dayMap).forEach((key)=>{
                if (lower.includes(key)) {
                    result[dayMap[key]].closed = true;
                }
            });
        } else {
            const timeMatch = line.match(/(\d{1,2}):?(\d{2})\s*(am|pm)?\s*-\s*(\d{1,2}):?(\d{2})\s*(am|pm)?/i);
            if (timeMatch) {
                const [, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = timeMatch;
                let open24 = parseInt(openHour);
                let close24 = parseInt(closeHour);
                if (openPeriod?.toLowerCase() === 'pm' && open24 !== 12) open24 += 12;
                if (closePeriod?.toLowerCase() === 'pm' && close24 !== 12) close24 += 12;
                if (openPeriod?.toLowerCase() === 'am' && open24 === 12) open24 = 0;
                if (closePeriod?.toLowerCase() === 'am' && close24 === 12) close24 = 0;
                const openTime = `${open24.toString().padStart(2, '0')}:${openMin}`;
                const closeTime = `${close24.toString().padStart(2, '0')}:${closeMin}`;
                Object.keys(dayMap).forEach((key)=>{
                    if (lower.includes(key)) {
                        result[dayMap[key]] = {
                            open: openTime,
                            close: closeTime,
                            closed: false
                        };
                    }
                });
            }
        }
    });
    return result;
}
function formatOpeningHours(hours) {
    const lines = [];
    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];
    days.forEach((day)=>{
        const h = hours[day];
        const dayLabel = day.charAt(0).toUpperCase() + day.slice(1, 3);
        if (h.closed) {
            lines.push(`${dayLabel}: Closed`);
        } else {
            const formatTime = (time)=>{
                const [hour, min] = time.split(':').map(Number);
                const period = hour >= 12 ? 'pm' : 'am';
                const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                return `${hour12}:${min.toString().padStart(2, '0')}${period}`;
            };
            lines.push(`${dayLabel}: ${formatTime(h.open)} - ${formatTime(h.close)}`);
        }
    });
    return lines.join('\n');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/garage/settings/general/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneralSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geolocation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/uk-cities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/garage-settings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
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
function GeneralSettings() {
    _s();
    const [garage, setGarage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [verificationStatus, setVerificationStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [verificationMessage, setVerificationMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [cityVerified, setCityVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countyVerified, setCountyVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [citySuggestions, setCitySuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCitySuggestions, setShowCitySuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openingHours, setOpeningHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        monday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        tuesday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        wednesday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        thursday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        friday: {
            open: "09:00",
            close: "17:00",
            closed: false
        },
        saturday: {
            open: "09:00",
            close: "14:00",
            closed: false
        },
        sunday: {
            open: "09:00",
            close: "17:00",
            closed: true
        }
    });
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        ownerName: "",
        slug: "",
        isPublic: true,
        shortDescription: "",
        description: "",
        website: "",
        phone: "+44",
        email: "",
        address: "",
        postcode: "",
        city: "",
        county: "",
        logoUrl: "",
        vatEnabled: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeneralSettings.useEffect": ()=>{
            const loadData = {
                "GeneralSettings.useEffect.loadData": async ()=>{
                    try {
                        // Use cached garage data from localStorage
                        const cached = localStorage.getItem("garage-data");
                        if (cached) {
                            const current = JSON.parse(cached);
                            setGarage(current);
                            updateFormData(current);
                        }
                    } catch (error) {
                        console.error("Error loading garage data:", error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["GeneralSettings.useEffect.loadData"];
            loadData();
        }
    }["GeneralSettings.useEffect"], []);
    const updateFormData = (current_0)=>{
        setFormData({
            name: current_0.name || "",
            ownerName: current_0.ownerName || "",
            slug: current_0.slug || "",
            isPublic: current_0.isPublic ?? true,
            shortDescription: current_0.shortDescription || "",
            description: current_0.description || "",
            website: current_0.website || "",
            phone: current_0.phone || "+44",
            email: current_0.email || "",
            address: current_0.address || "",
            postcode: current_0.postcode || "",
            city: current_0.city || "",
            county: current_0.county || "",
            logoUrl: current_0.logoUrl || "",
            vatEnabled: current_0.vatEnabled ?? true
        });
        setOpeningHours((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseOpeningHours"])(current_0.openingHours));
    };
    const handleGeocodePostcode = async (postcode)=>{
        if (!postcode || postcode.length < 5) {
            setVerificationStatus('idle');
            setVerificationMessage('');
            setCityVerified(false);
            setCountyVerified(false);
            return;
        }
        setVerificationStatus('verifying');
        setVerificationMessage('Verifying...');
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geocodePostcode"])(postcode);
            if (data) {
                setVerificationStatus('success');
                setVerificationMessage(`Verified: ${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`);
                if (data.city) {
                    setFormData((prev)=>({
                            ...prev,
                            city: data.city || ''
                        }));
                    setCityVerified(true);
                }
                if (data.county) {
                    setFormData((prev_0)=>({
                            ...prev_0,
                            county: data.county || ''
                        }));
                    setCountyVerified(true);
                }
            } else {
                setVerificationStatus('error');
                setVerificationMessage('Invalid UK postcode');
                setCityVerified(false);
                setCountyVerified(false);
            }
        } catch (error_0) {
            setVerificationStatus('error');
            setVerificationMessage('Verification failed');
            setCityVerified(false);
            setCountyVerified(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeneralSettings.useEffect": ()=>{
            const timeoutId = setTimeout({
                "GeneralSettings.useEffect.timeoutId": ()=>{
                    if (formData.postcode) {
                        handleGeocodePostcode(formData.postcode);
                    } else {
                        setVerificationStatus('idle');
                        setVerificationMessage('');
                    }
                }
            }["GeneralSettings.useEffect.timeoutId"], 800);
            return ({
                "GeneralSettings.useEffect": ()=>clearTimeout(timeoutId)
            })["GeneralSettings.useEffect"];
        }
    }["GeneralSettings.useEffect"], [
        formData.postcode
    ]);
    const handleSave = async ()=>{
        if (!garage) {
            setSaveMessage("Error: Garage data not loaded");
            return;
        }
        setSaving(true);
        setSaveMessage(null);
        try {
            const updateData = {
                name: formData.name,
                ownerName: formData.ownerName,
                slug: formData.slug,
                isPublic: formData.isPublic,
                shortDescription: formData.shortDescription,
                description: formData.description,
                website: formData.website,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                postcode: formData.postcode,
                city: formData.city,
                county: formData.county,
                openingHours: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatOpeningHours"])(openingHours),
                logoUrl: formData.logoUrl,
                vatEnabled: formData.vatEnabled
            };
            if (formData.postcode && formData.postcode.trim()) {
                const coords = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geocodePostcode"])(formData.postcode);
                if (coords) {
                    updateData.latitude = coords.latitude;
                    updateData.longitude = coords.longitude;
                }
            }
            console.log("Sending update to:", `/api/garages/${garage.id}`);
            console.log("Update data:", updateData);
            const response = await fetch(`/api/garages/${garage.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(updateData)
            });
            console.log("Response status:", response.status);
            const data_0 = await response.json();
            console.log("Response data:", data_0);
            if (!response.ok) {
                throw new Error(data_0.error || `Failed to save settings (${response.status})`);
            }
            setGarage(data_0);
            localStorage.setItem("garage-data", JSON.stringify(data_0));
            setSaveMessage("✓ Saved successfully.");
            setTimeout(()=>{
                setSaveMessage(null);
            }, 3000);
        } catch (error_1) {
            console.error("Save error:", error_1);
            setSaveMessage(error_1 instanceof Error ? error_1.message : "Failed to save settings");
        } finally{
            setSaving(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/general/page.tsx",
            lineNumber: 249,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold",
                                        children: "Business Information"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: "Basic information about your garage"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm font-semibold text-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: formData.isPublic,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                isPublic: e.target.checked
                                            }),
                                        className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    "List in public directory"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-slate-900",
                                            children: "VAT Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-600",
                                            children: "Turn VAT on/off for new jobs, invoices, and quotes."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2 text-sm font-semibold text-slate-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: formData.vatEnabled,
                                            onChange: (e_0)=>setFormData({
                                                    ...formData,
                                                    vatEnabled: e_0.target.checked
                                                }),
                                            className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        "VAT enabled"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Garage Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.name,
                                        onChange: (e_1)=>setFormData({
                                                ...formData,
                                                name: e_1.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Owner Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.ownerName,
                                        onChange: (e_2)=>setFormData({
                                                ...formData,
                                                ownerName: e_2.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Public Slug"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.slug,
                                        onChange: (e_3)=>setFormData({
                                                ...formData,
                                                slug: e_3.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "your-garage-name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500 mt-1.5",
                                        children: [
                                            "Public URL: /garages/",
                                            formData.slug || "your-garage"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Logo (optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-24 h-24 rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center",
                                                children: formData.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: formData.logoUrl,
                                                    alt: formData.name || "logo",
                                                    width: 96,
                                                    height: 96,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-400",
                                                    children: "No logo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 164
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-2 rounded-lg border-2 border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer",
                                                        children: [
                                                            "Upload Logo",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                accept: "image/*",
                                                                className: "hidden",
                                                                onChange: async (e_4)=>{
                                                                    const file = e_4.target.files?.[0];
                                                                    if (file && garage) {
                                                                        try {
                                                                            setUploading(true);
                                                                            const form = new FormData();
                                                                            form.append("file", file);
                                                                            const res = await fetch(`/api/garages/${garage.id}/images`, {
                                                                                method: "POST",
                                                                                body: form
                                                                            });
                                                                            const data_1 = await res.json();
                                                                            if (!res.ok) throw new Error(data_1.error || "Upload failed");
                                                                            const put = await fetch(`/api/garages/${garage.id}`, {
                                                                                method: "PUT",
                                                                                headers: {
                                                                                    "Content-Type": "application/json"
                                                                                },
                                                                                body: JSON.stringify({
                                                                                    logoUrl: data_1.url
                                                                                })
                                                                            });
                                                                            const updated = await put.json();
                                                                            if (!put.ok) throw new Error(updated.error || "Failed to set logo");
                                                                            setGarage(updated);
                                                                            setFormData((f)=>({
                                                                                    ...f,
                                                                                    logoUrl: updated.logoUrl || ""
                                                                                }));
                                                                            localStorage.setItem("garage-data", JSON.stringify(updated));
                                                                            setSaveMessage("Logo uploaded.");
                                                                        } catch (err) {
                                                                            setSaveMessage(err?.message || "Failed to upload logo");
                                                                        } finally{
                                                                            setUploading(false);
                                                                            e_4.currentTarget.value = "";
                                                                        }
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 17
                                                    }, this),
                                                    formData.logoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: async ()=>{
                                                            if (!garage) return;
                                                            try {
                                                                const res_0 = await fetch(`/api/garages/${garage.id}`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-Type": "application/json"
                                                                    },
                                                                    body: JSON.stringify({
                                                                        logoUrl: null
                                                                    })
                                                                });
                                                                const updated_0 = await res_0.json();
                                                                if (!res_0.ok) throw new Error(updated_0.error || "Failed to remove logo");
                                                                setGarage(updated_0);
                                                                setFormData((f_0)=>({
                                                                        ...f_0,
                                                                        logoUrl: ""
                                                                    }));
                                                                localStorage.setItem("garage-data", JSON.stringify(updated_0));
                                                                setSaveMessage("Logo removed.");
                                                            } catch (err_0) {
                                                                setSaveMessage(err_0?.message || "Failed to remove logo");
                                                            }
                                                        },
                                                        className: "text-sm text-red-600 hover:underline",
                                                        children: "Remove logo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 38
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Short Description (SEO)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.shortDescription,
                                        onChange: (e_5)=>setFormData({
                                                ...formData,
                                                shortDescription: e_5.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "Independent garage specializing in MOT and servicing."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 396,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Full Description"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        rows: 5,
                                        value: formData.description,
                                        onChange: (e_6)=>setFormData({
                                                ...formData,
                                                description: e_6.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "Tell customers about your garage, experience, and services."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 401,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "text-blue-600",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this),
                                    "Contact & Location"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: "Your location helps customers find you"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 417,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-2 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 16,
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Phone Number"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                value: formData.phone,
                                                onChange: (e_7)=>setFormData({
                                                        ...formData,
                                                        phone: e_7.target.value
                                                    }),
                                                className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                                placeholder: "e.g., 020 1234 5678"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 427,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        size: 16,
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Email Address"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: formData.email,
                                                onChange: (e_8)=>setFormData({
                                                        ...formData,
                                                        email: e_8.target.value
                                                    }),
                                                className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                                placeholder: "e.g., info@yourgarage.co.uk"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 437,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                size: 16,
                                                className: "text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 15
                                            }, this),
                                            "Website (optional)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "url",
                                        value: formData.website,
                                        onChange: (e_9)=>setFormData({
                                                ...formData,
                                                website: e_9.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "e.g., https://www.yourgarage.co.uk"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 449,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 444,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                                                size: 16,
                                                className: "text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 15
                                            }, this),
                                            "Country"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 font-medium flex items-center gap-2",
                                        children: "🇬🇧 United Kingdom"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                size: 16,
                                                className: "text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 15
                                            }, this),
                                            "Street Address"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.address,
                                        onChange: (e_10)=>setFormData({
                                                ...formData,
                                                address: e_10.target.value
                                            }),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "e.g., 123 High Street"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 470,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Postcode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 478,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.postcode,
                                                        onChange: (e_11)=>setFormData({
                                                                ...formData,
                                                                postcode: e_11.target.value.toUpperCase()
                                                            }),
                                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-12 transition-colors",
                                                        placeholder: "SW1A 1AA"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: [
                                                            verificationStatus === 'verifying' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                size: 20,
                                                                className: "animate-spin text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 58
                                                            }, this),
                                                            verificationStatus === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                width: "20",
                                                                height: "20",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "3",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                className: "text-emerald-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M20 6 9 17l-5-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 488,
                                                                columnNumber: 56
                                                            }, this),
                                                            verificationStatus === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                width: "20",
                                                                height: "20",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "3",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                className: "text-red-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                        lineNumber: 492,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "m15 9-6 6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "m9 9 6 6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                        lineNumber: 494,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 491,
                                                                columnNumber: 54
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 481,
                                                columnNumber: 15
                                            }, this),
                                            verificationMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs mt-1.5 font-medium ${verificationStatus === 'success' ? 'text-emerald-600' : verificationStatus === 'error' ? 'text-red-600' : 'text-blue-600'}`,
                                                children: verificationMessage
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 477,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "City / Town"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.city,
                                                        onChange: (e_12)=>{
                                                            const value = e_12.target.value;
                                                            setFormData({
                                                                ...formData,
                                                                city: value
                                                            });
                                                            setCityVerified(false);
                                                            if (value.length >= 2) {
                                                                const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchCities"])(value, 8);
                                                                setCitySuggestions(suggestions);
                                                                setShowCitySuggestions(suggestions.length > 0);
                                                            } else {
                                                                setShowCitySuggestions(false);
                                                            }
                                                        },
                                                        onBlur: ()=>setTimeout(()=>setShowCitySuggestions(false), 200),
                                                        onFocus: ()=>{
                                                            if (formData.city && formData.city.length >= 2) {
                                                                const suggestions_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchCities"])(formData.city, 8);
                                                                setCitySuggestions(suggestions_0);
                                                                setShowCitySuggestions(suggestions_0.length > 0);
                                                            }
                                                        },
                                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 transition-colors",
                                                        placeholder: "e.g., London",
                                                        autoComplete: "off"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 17
                                                    }, this),
                                                    cityVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            width: "20",
                                                            height: "20",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "3",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            className: "text-emerald-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20 6 9 17l-5-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 530,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 529,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 34
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 506,
                                                columnNumber: 15
                                            }, this),
                                            showCitySuggestions && citySuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-lg max-h-48 overflow-y-auto",
                                                children: citySuggestions.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setFormData({
                                                                ...formData,
                                                                city
                                                            });
                                                            setShowCitySuggestions(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700",
                                                        children: city
                                                    }, city, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 48
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 534,
                                                columnNumber: 69
                                            }, this),
                                            cityVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-600 mt-1.5 font-medium",
                                                children: "✓ Auto-filled from verified postcode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 545,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "County"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 550,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.county,
                                                        onChange: (e_13)=>{
                                                            setFormData({
                                                                ...formData,
                                                                county: e_13.target.value
                                                            });
                                                            setCountyVerified(false);
                                                        },
                                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 transition-colors",
                                                        placeholder: "e.g., Greater London"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 17
                                                    }, this),
                                                    countyVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            width: "20",
                                                            height: "20",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "3",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            className: "text-emerald-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20 6 9 17l-5-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 563,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 562,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 36
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 15
                                            }, this),
                                            countyVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-600 mt-1.5 font-medium",
                                                children: "✓ Auto-filled from verified postcode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 567,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 476,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 411,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "text-violet-600",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 578,
                                        columnNumber: 13
                                    }, this),
                                    "Opening Hours"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 577,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: "Set your business hours for each day"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 581,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 576,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            Object.entries(openingHours).map(([day, hours])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3 p-3 lg:p-4 border-2 border-slate-200 rounded-lg hover:border-violet-500 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-slate-900 capitalize",
                                                    children: day
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 587,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: hours.closed,
                                                            onChange: (e_14)=>setOpeningHours({
                                                                    ...openingHours,
                                                                    [day]: {
                                                                        ...hours,
                                                                        closed: e_14.target.checked
                                                                    }
                                                                }),
                                                            className: "w-5 h-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-slate-700",
                                                            children: "Closed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 586,
                                            columnNumber: 15
                                        }, this),
                                        !hours.closed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-xs font-semibold text-slate-600 w-10",
                                                            children: "Open"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 602,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "time",
                                                            value: hours.open,
                                                            onChange: (e_15)=>setOpeningHours({
                                                                    ...openingHours,
                                                                    [day]: {
                                                                        ...hours,
                                                                        open: e_15.target.value
                                                                    }
                                                                }),
                                                            className: "border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 hidden sm:block",
                                                    children: "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-xs font-semibold text-slate-600 w-12",
                                                            children: "Close"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 613,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "time",
                                                            value: hours.close,
                                                            onChange: (e_16)=>setOpeningHours({
                                                                    ...openingHours,
                                                                    [day]: {
                                                                        ...hours,
                                                                        close: e_16.target.value
                                                                    }
                                                                }),
                                                            className: "border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 612,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, day, true, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 585,
                                    columnNumber: 63
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-4 border-t-2 border-slate-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            const weekdayHours = {
                                                open: "09:00",
                                                close: "17:00",
                                                closed: false
                                            };
                                            setOpeningHours({
                                                monday: weekdayHours,
                                                tuesday: weekdayHours,
                                                wednesday: weekdayHours,
                                                thursday: weekdayHours,
                                                friday: weekdayHours,
                                                saturday: {
                                                    open: "09:00",
                                                    close: "14:00",
                                                    closed: false
                                                },
                                                sunday: {
                                                    open: "09:00",
                                                    close: "17:00",
                                                    closed: true
                                                }
                                            });
                                        },
                                        className: "flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-semibold text-xs sm:text-sm transition-colors",
                                        children: "🕒 Standard Hours (9-5 Mon-Fri)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            const samehours = openingHours.monday;
                                            setOpeningHours({
                                                monday: samehours,
                                                tuesday: samehours,
                                                wednesday: samehours,
                                                thursday: samehours,
                                                friday: samehours,
                                                saturday: samehours,
                                                sunday: samehours
                                            });
                                        },
                                        className: "flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs sm:text-sm transition-colors",
                                        children: "🔄 Copy Monday to All Days"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 652,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 625,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-lg px-4 py-3 text-sm font-medium ${saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`,
                children: saveMessage
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 670,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSave,
                    disabled: saving,
                    className: "bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors",
                    children: saving ? "Saving..." : "Save Changes"
                }, void 0, false, {
                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                    lineNumber: 675,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 674,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/settings/general/page.tsx",
        lineNumber: 253,
        columnNumber: 10
    }, this);
}
_s(GeneralSettings, "Qlp7o24+dQum4kBsCGvkas1lkFE=");
_c = GeneralSettings;
var _c;
__turbopack_context__.k.register(_c, "GeneralSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_07fa5f4b._.js.map