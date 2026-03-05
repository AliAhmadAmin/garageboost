module.exports = [
"[project]/src/lib/garage-settings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/app/garage/settings/profile/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfileSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-ssr] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-ssr] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/garage-settings.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const MAX_IMAGES = 3;
const MAX_IMAGE_MB = 1;
function ProfileSettings() {
    const [garage, setGarage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedServices, setSelectedServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSpecialties, setSelectedSpecialties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCertifications, setSelectedCertifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAmenities, setSelectedAmenities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [initialServices, setInitialServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [initialSpecialties, setInitialSpecialties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [initialCertifications, setInitialCertifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [initialAmenities, setInitialAmenities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = async ()=>{
            try {
                const cached = localStorage.getItem("garage-data");
                if (cached) {
                    const current = JSON.parse(cached);
                    setGarage({
                        ...current,
                        images: current.images || []
                    });
                    const services = current.services ? current.services.split(",").map((s)=>s.trim()) : [];
                    const specialties = current.specialties ? current.specialties.split(",").map((s)=>s.trim()) : [];
                    const certifications = current.certifications ? current.certifications.split(",").map((s)=>s.trim()) : [];
                    const amenities = current.amenities ? current.amenities.split(",").map((s)=>s.trim()) : [];
                    setSelectedServices(services);
                    setSelectedSpecialties(specialties);
                    setSelectedCertifications(certifications);
                    setSelectedAmenities(amenities);
                    setInitialServices(services);
                    setInitialSpecialties(specialties);
                    setInitialCertifications(certifications);
                    setInitialAmenities(amenities);
                } else {
                    const res = await fetch("/api/garages");
                    const data = await res.json();
                    if (data[0]) {
                        setGarage({
                            ...data[0],
                            images: data[0].images || []
                        });
                        const services = data[0].services ? data[0].services.split(",").map((s)=>s.trim()) : [];
                        const specialties = data[0].specialties ? data[0].specialties.split(",").map((s)=>s.trim()) : [];
                        const certifications = data[0].certifications ? data[0].certifications.split(",").map((s)=>s.trim()) : [];
                        const amenities = data[0].amenities ? data[0].amenities.split(",").map((s)=>s.trim()) : [];
                        setSelectedServices(services);
                        setSelectedSpecialties(specialties);
                        setSelectedCertifications(certifications);
                        setSelectedAmenities(amenities);
                        setInitialServices(services);
                        setInitialSpecialties(specialties);
                        setInitialCertifications(certifications);
                        setInitialAmenities(amenities);
                    }
                }
            } catch (error) {
                console.error("Error loading garage:", error);
            } finally{
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const handleImageUpload = async (file)=>{
        if (!garage) return;
        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
            setSaveMessage("Image must be 1MB or smaller.");
            setTimeout(()=>setSaveMessage(null), 3000);
            return;
        }
        if ((garage.images || []).length >= MAX_IMAGES) {
            setSaveMessage("You can upload up to 3 images.");
            setTimeout(()=>setSaveMessage(null), 3000);
            return;
        }
        setUploading(true);
        setSaveMessage(null);
        try {
            const form = new FormData();
            form.append("file", file);
            const response = await fetch(`/api/garages/${garage.id}/images`, {
                method: "POST",
                body: form
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to upload image");
            }
            const updatedGarage = {
                ...garage,
                images: [
                    ...garage.images || [],
                    data
                ]
            };
            setGarage(updatedGarage);
            localStorage.setItem("garage-data", JSON.stringify(updatedGarage));
            setSaveMessage("✓ Image uploaded successfully.");
            setTimeout(()=>setSaveMessage(null), 3000);
        } catch (error) {
            setSaveMessage(error instanceof Error ? error.message : "Failed to upload image");
        } finally{
            setUploading(false);
        }
    };
    const handleRemoveImage = async (imageId)=>{
        if (!garage) return;
        try {
            const response = await fetch(`/api/garages/${garage.id}/images?imageId=${imageId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to delete image");
            }
            const updatedGarage = {
                ...garage,
                images: (garage.images || []).filter((image)=>image.id !== imageId)
            };
            setGarage(updatedGarage);
            localStorage.setItem("garage-data", JSON.stringify(updatedGarage));
            setSaveMessage("✓ Image removed.");
            setTimeout(()=>setSaveMessage(null), 3000);
        } catch (error) {
            setSaveMessage(error instanceof Error ? error.message : "Failed to delete image");
        }
    };
    const handleSave = async ()=>{
        if (!garage) return;
        setSaving(true);
        setSaveMessage(null);
        try {
            const updateData = {
                services: selectedServices.join(", "),
                specialties: selectedSpecialties.join(", "),
                certifications: selectedCertifications.join(", "),
                amenities: selectedAmenities.join(", ")
            };
            const response = await fetch(`/api/garages/${garage.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to save settings");
            }
            setGarage(data);
            localStorage.setItem("garage-data", JSON.stringify(data));
            setInitialServices(selectedServices);
            setInitialSpecialties(selectedSpecialties);
            setInitialCertifications(selectedCertifications);
            setInitialAmenities(selectedAmenities);
            setSaveMessage("✓ Saved successfully.");
            setTimeout(()=>{
                setSaveMessage(null);
            }, 3000);
        } catch (error) {
            setSaveMessage(error instanceof Error ? error.message : "Failed to save settings");
        } finally{
            setSaving(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 213,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/profile/page.tsx",
            lineNumber: 212,
            columnNumber: 7
        }, this);
    }
    const hasUnsavedChanges = JSON.stringify(selectedServices) !== JSON.stringify(initialServices) || JSON.stringify(selectedSpecialties) !== JSON.stringify(initialSpecialties) || JSON.stringify(selectedCertifications) !== JSON.stringify(initialCertifications) || JSON.stringify(selectedAmenities) !== JSON.stringify(initialAmenities);
    const handleDiscard = ()=>{
        setSelectedServices(initialServices);
        setSelectedSpecialties(initialSpecialties);
        setSelectedCertifications(initialCertifications);
        setSelectedAmenities(initialAmenities);
        setSaveMessage(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-slate-900",
                        children: "Profile & Expertise"
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 mt-1",
                        children: "Showcase your services, expertise, and facilities"
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold",
                                        children: "Gallery Images"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: [
                                            "Upload up to ",
                                            MAX_IMAGES,
                                            " images (max ",
                                            MAX_IMAGE_MB,
                                            "MB each). These appear on your public garage page."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 rounded-lg border-2 border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this),
                                    "Add Image",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        className: "hidden",
                                        onChange: (event)=>{
                                            const file = event.target.files?.[0];
                                            if (file) handleImageUpload(file);
                                            event.currentTarget.value = "";
                                        },
                                        disabled: uploading || (garage?.images.length ?? 0) >= MAX_IMAGES
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 md:grid-cols-3",
                        children: [
                            (garage?.images || []).map((image)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group overflow-hidden rounded-xl border-2 border-slate-200 aspect-square bg-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: image.url,
                                            alt: image.alt || garage?.name || "Gallery image",
                                            fill: true,
                                            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                                            className: "object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleRemoveImage(image.id),
                                            className: "absolute top-3 right-3 rounded-full bg-red-600 p-2.5 text-white shadow-lg hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, image.id, true, {
                                    fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this)),
                            garage && (garage.images || []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border-2 border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 col-span-3",
                                children: 'No images uploaded yet. Click "Add Image" to upload your first photo.'
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: "Uploading..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-6 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                className: "text-emerald-600",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            "Services Offered"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-3 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMON_SERVICES"].map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: selectedServices.includes(service),
                                        onChange: (e)=>{
                                            if (e.target.checked) {
                                                setSelectedServices([
                                                    ...selectedServices,
                                                    service
                                                ]);
                                            } else {
                                                setSelectedServices(selectedServices.filter((s)=>s !== service));
                                            }
                                        },
                                        className: "w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-slate-700",
                                        children: service
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, service, true, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-6 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                className: "text-amber-600",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            "Specialties"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-3 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMON_SPECIALTIES"].map((specialty)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: selectedSpecialties.includes(specialty),
                                        onChange: (e)=>{
                                            if (e.target.checked) {
                                                setSelectedSpecialties([
                                                    ...selectedSpecialties,
                                                    specialty
                                                ]);
                                            } else {
                                                setSelectedSpecialties(selectedSpecialties.filter((s)=>s !== specialty));
                                            }
                                        },
                                        className: "w-5 h-5 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-slate-700",
                                        children: specialty
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, specialty, true, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-6 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                className: "text-blue-600",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this),
                            "Certifications & Accreditations"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMON_CERTIFICATIONS"].map((cert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: selectedCertifications.includes(cert),
                                        onChange: (e)=>{
                                            if (e.target.checked) {
                                                setSelectedCertifications([
                                                    ...selectedCertifications,
                                                    cert
                                                ]);
                                            } else {
                                                setSelectedCertifications(selectedCertifications.filter((c)=>c !== cert));
                                            }
                                        },
                                        className: "w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-slate-700",
                                        children: cert
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 379,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, cert, true, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-6 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"], {
                                className: "text-purple-600",
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            "Customer Amenities"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-3 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMON_AMENITIES"].map((amenity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: selectedAmenities.includes(amenity),
                                        onChange: (e)=>{
                                            if (e.target.checked) {
                                                setSelectedAmenities([
                                                    ...selectedAmenities,
                                                    amenity
                                                ]);
                                            } else {
                                                setSelectedAmenities(selectedAmenities.filter((a)=>a !== amenity));
                                            }
                                        },
                                        className: "w-5 h-5 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 396,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-slate-700",
                                        children: amenity
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, amenity, true, {
                                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-lg px-4 py-3 text-sm font-medium ${saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`,
                children: saveMessage
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 415,
                columnNumber: 9
            }, this),
            hasUnsavedChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 bottom-16 lg:bottom-0 lg:left-64 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-slate-700",
                            children: "You have unsaved changes"
                        }, void 0, false, {
                            fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                            lineNumber: 425,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleDiscard,
                                    disabled: saving,
                                    className: "px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-60",
                                    children: "Discard"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    disabled: saving,
                                    className: "bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors",
                                    children: saving ? "Saving..." : "Save Changes"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                                    lineNumber: 435,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                            lineNumber: 426,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                    lineNumber: 424,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/profile/page.tsx",
                lineNumber: 423,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/settings/profile/page.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_36546900._.js.map