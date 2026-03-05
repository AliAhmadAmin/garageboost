module.exports = [
"[project]/src/lib/geolocation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/lib/uk-cities.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
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
"[project]/src/app/garage/settings/general/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneralSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-ssr] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geolocation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/uk-cities.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/garage-settings.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function GeneralSettings() {
    const toSlug = (value)=>value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    const [garage, setGarage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [verificationStatus, setVerificationStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [verificationMessage, setVerificationMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [cityVerified, setCityVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countyVerified, setCountyVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [citySuggestions, setCitySuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCitySuggestions, setShowCitySuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openingHours, setOpeningHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        ownerName: "",
        slug: "",
        isPublic: true,
        shortDescription: "",
        description: "",
        website: "",
        phone: "",
        email: "",
        address: "",
        postcode: "",
        city: "",
        county: "",
        vatEnabled: true
    });
    const [initialFormData, setInitialFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(formData);
    const [initialOpeningHours, setInitialOpeningHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(openingHours);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = async ()=>{
            try {
                const res = await fetch("/api/garages/me", {
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setGarage(data);
                    updateFormData(data);
                    localStorage.setItem("garage-data", JSON.stringify(data));
                    return;
                }
                localStorage.removeItem("garage-data");
                setGarage(null);
                setSaveMessage("Unable to load your garage. Please log in again.");
            } catch (error) {
                console.error("Error loading garage:", error);
                localStorage.removeItem("garage-data");
                setGarage(null);
                setSaveMessage("Unable to load your garage. Please log in again.");
            } finally{
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const updateFormData = (current)=>{
        const nextFormData = {
            name: current.name || "",
            ownerName: current.ownerName || "",
            slug: current.slug || "",
            isPublic: current.isPublic ?? true,
            shortDescription: current.shortDescription || "",
            description: current.description || "",
            website: current.website || "",
            phone: current.phone || "",
            email: current.email || "",
            address: current.address || "",
            postcode: current.postcode || "",
            city: current.city || "",
            county: current.county || "",
            vatEnabled: current.vatEnabled ?? true
        };
        const nextOpeningHours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseOpeningHours"])(current.openingHours);
        setFormData(nextFormData);
        setOpeningHours(nextOpeningHours);
        setInitialFormData(nextFormData);
        setInitialOpeningHours(nextOpeningHours);
    };
    const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData) || JSON.stringify(openingHours) !== JSON.stringify(initialOpeningHours);
    const handleDiscard = ()=>{
        setFormData(initialFormData);
        setOpeningHours(initialOpeningHours);
        setSaveMessage(null);
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
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geocodePostcode"])(postcode);
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
                    setFormData((prev)=>({
                            ...prev,
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
        } catch (error) {
            setVerificationStatus('error');
            setVerificationMessage('Verification failed');
            setCityVerified(false);
            setCountyVerified(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timeoutId = setTimeout(()=>{
            if (formData.postcode) {
                handleGeocodePostcode(formData.postcode);
            } else {
                setVerificationStatus('idle');
                setVerificationMessage('');
            }
        }, 800);
        return ()=>clearTimeout(timeoutId);
    }, [
        formData.postcode
    ]);
    const handleSave = async ()=>{
        if (!garage) return;
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
                openingHours: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatOpeningHours"])(openingHours),
                vatEnabled: formData.vatEnabled
            };
            if (formData.postcode && formData.postcode.trim()) {
                const coords = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["geocodePostcode"])(formData.postcode);
                if (coords) {
                    updateData.latitude = coords.latitude;
                    updateData.longitude = coords.longitude;
                }
            }
            let response = await fetch(`/api/garages/${garage.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            });
            if (response.status === 403) {
                const meRes = await fetch("/api/garages/me", {
                    credentials: "include",
                    cache: "no-store"
                });
                if (meRes.ok) {
                    const meGarage = await meRes.json();
                    if (meGarage?.id && meGarage.id !== garage.id) {
                        response = await fetch(`/api/garages/${meGarage.id}`, {
                            method: "PUT",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(updateData)
                        });
                    }
                }
            }
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to save settings");
            }
            let persisted = data;
            try {
                const meRes = await fetch("/api/garages/me", {
                    credentials: "include",
                    cache: "no-store"
                });
                if (meRes.ok) {
                    persisted = await meRes.json();
                }
            } catch (error) {
            // Keep PUT response as source of truth when /me read fails
            }
            setGarage(persisted);
            updateFormData(persisted);
            localStorage.setItem("garage-data", JSON.stringify(persisted));
            setInitialFormData({
                name: persisted.name || "",
                ownerName: persisted.ownerName || "",
                slug: persisted.slug || "",
                isPublic: persisted.isPublic ?? true,
                shortDescription: persisted.shortDescription || "",
                description: persisted.description || "",
                website: persisted.website || "",
                phone: persisted.phone || "",
                email: persisted.email || "",
                address: persisted.address || "",
                postcode: persisted.postcode || "",
                city: persisted.city || "",
                county: persisted.county || "",
                vatEnabled: persisted.vatEnabled ?? true
            });
            setInitialOpeningHours((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$garage$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseOpeningHours"])(persisted.openingHours));
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
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/garage/settings/general/page.tsx",
            lineNumber: 305,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pb-24",
        children: [
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
                                        children: "Business Information"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: "Basic information about your garage"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm font-semibold text-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: formData.isPublic,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    isPublic: e.target.checked
                                                })),
                                        className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this),
                                    "List in public directory"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-slate-900",
                                            children: "VAT Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 333,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-600",
                                            children: "Turn VAT on/off for new jobs, invoices, and quotes."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 334,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2 text-sm font-semibold text-slate-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: formData.vatEnabled,
                                            onChange: (e)=>setFormData((prev)=>({
                                                        ...prev,
                                                        vatEnabled: e.target.checked
                                                    })),
                                            className: "w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 337,
                                            columnNumber: 15
                                        }, this),
                                        "VAT enabled"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 336,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Garage Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.name,
                                        onChange: (e)=>{
                                            const nextName = e.target.value;
                                            setFormData((prev)=>({
                                                    ...prev,
                                                    name: nextName,
                                                    slug: toSlug(nextName)
                                                }));
                                        },
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Owner Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.ownerName,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    ownerName: e.target.value
                                                })),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Public Slug"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.slug,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    slug: toSlug(e.target.value)
                                                })),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "your-garage-name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500 mt-1.5",
                                        children: [
                                            "Public URL: /garages/",
                                            formData.slug || "your-garage"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Short Description (SEO)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.shortDescription,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    shortDescription: e.target.value
                                                })),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "Independent garage specializing in MOT and servicing."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-slate-700 mb-2",
                                        children: "Full Description"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        rows: 5,
                                        value: formData.description,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    description: e.target.value
                                                })),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "Tell customers about your garage, experience, and services."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 400,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "text-blue-600",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 416,
                                        columnNumber: 13
                                    }, this),
                                    "Contact & Location"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: "Your location helps customers find you"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 419,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-2 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 16,
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 426,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Phone Number"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 425,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                value: formData.phone,
                                                onChange: (e)=>setFormData((prev)=>({
                                                            ...prev,
                                                            phone: e.target.value
                                                        })),
                                                className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                                placeholder: "e.g., 020 1234 5678"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 429,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        size: 16,
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Email Address"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: formData.email,
                                                onChange: (e)=>setFormData((prev)=>({
                                                            ...prev,
                                                            email: e.target.value
                                                        })),
                                                className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                                placeholder: "e.g., info@yourgarage.co.uk"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 442,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                size: 16,
                                                className: "text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 15
                                            }, this),
                                            "Website (optional)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 453,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "url",
                                        value: formData.website,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    website: e.target.value
                                                })),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "e.g., https://www.yourgarage.co.uk"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 457,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 452,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                                                size: 16,
                                                className: "text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 15
                                            }, this),
                                            "Country"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 font-medium flex items-center gap-2",
                                        children: "🇬🇧 United Kingdom"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 466,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                size: 16,
                                                className: "text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 478,
                                                columnNumber: 15
                                            }, this),
                                            "Street Address"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 477,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.address,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    address: e.target.value
                                                })),
                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors",
                                        placeholder: "e.g., 123 High Street"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 476,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "Postcode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 492,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.postcode,
                                                        onChange: (e)=>setFormData((prev)=>({
                                                                    ...prev,
                                                                    postcode: e.target.value.toUpperCase()
                                                                })),
                                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-12 transition-colors",
                                                        placeholder: "SW1A 1AA"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: [
                                                            verificationStatus === 'verifying' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                size: 20,
                                                                className: "animate-spin text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 21
                                                            }, this),
                                                            verificationStatus === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M20 6 9 17l-5-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                    lineNumber: 509,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 21
                                                            }, this),
                                                            verificationStatus === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "m15 9-6 6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                        lineNumber: 515,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "m9 9 6 6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                        lineNumber: 516,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 513,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 495,
                                                columnNumber: 15
                                            }, this),
                                            verificationMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs mt-1.5 font-medium ${verificationStatus === 'success' ? 'text-emerald-600' : verificationStatus === 'error' ? 'text-red-600' : 'text-blue-600'}`,
                                                children: verificationMessage
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "City / Town"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.city,
                                                        onChange: (e)=>{
                                                            const value = e.target.value;
                                                            setFormData((prev)=>({
                                                                    ...prev,
                                                                    city: value
                                                                }));
                                                            setCityVerified(false);
                                                            if (value.length >= 2) {
                                                                const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchCities"])(value, 8);
                                                                setCitySuggestions(suggestions);
                                                                setShowCitySuggestions(suggestions.length > 0);
                                                            } else {
                                                                setShowCitySuggestions(false);
                                                            }
                                                        },
                                                        onBlur: ()=>setTimeout(()=>setShowCitySuggestions(false), 200),
                                                        onFocus: ()=>{
                                                            if (formData.city && formData.city.length >= 2) {
                                                                const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$uk$2d$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchCities"])(formData.city, 8);
                                                                setCitySuggestions(suggestions);
                                                                setShowCitySuggestions(suggestions.length > 0);
                                                            }
                                                        },
                                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 transition-colors",
                                                        placeholder: "e.g., London",
                                                        autoComplete: "off"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 17
                                                    }, this),
                                                    cityVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20 6 9 17l-5-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 566,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 15
                                            }, this),
                                            showCitySuggestions && citySuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-lg max-h-48 overflow-y-auto",
                                                children: citySuggestions.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setFormData((prev)=>({
                                                                    ...prev,
                                                                    city
                                                                }));
                                                            setShowCitySuggestions(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700",
                                                        children: city
                                                    }, city, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 572,
                                                columnNumber: 17
                                            }, this),
                                            cityVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-600 mt-1.5 font-medium",
                                                children: "✓ Auto-filled from verified postcode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 589,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-slate-700 mb-2",
                                                children: "County"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: formData.county,
                                                        onChange: (e)=>{
                                                            setFormData((prev)=>({
                                                                    ...prev,
                                                                    county: e.target.value
                                                                }));
                                                            setCountyVerified(false);
                                                        },
                                                        className: "w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 transition-colors",
                                                        placeholder: "e.g., Greater London"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 17
                                                    }, this),
                                                    countyVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20 6 9 17l-5-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                                lineNumber: 612,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 611,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 15
                                            }, this),
                                            countyVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-600 mt-1.5 font-medium",
                                                children: "✓ Auto-filled from verified postcode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                lineNumber: 618,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 594,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 490,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4 lg:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "text-violet-600",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 13
                                    }, this),
                                    "Opening Hours"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 629,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: "Set your business hours for each day"
                            }, void 0, false, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            Object.entries(openingHours).map(([day, hours])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3 p-3 lg:p-4 border-2 border-slate-200 rounded-lg hover:border-violet-500 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-slate-900 capitalize",
                                                    children: day
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: hours.closed,
                                                            onChange: (e)=>setOpeningHours({
                                                                    ...openingHours,
                                                                    [day]: {
                                                                        ...hours,
                                                                        closed: e.target.checked
                                                                    }
                                                                }),
                                                            className: "w-5 h-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-slate-700",
                                                            children: "Closed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 651,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 639,
                                            columnNumber: 15
                                        }, this),
                                        !hours.closed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-xs font-semibold text-slate-600 w-10",
                                                            children: "Open"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "time",
                                                            value: hours.open,
                                                            onChange: (e)=>setOpeningHours({
                                                                    ...openingHours,
                                                                    [day]: {
                                                                        ...hours,
                                                                        open: e.target.value
                                                                    }
                                                                }),
                                                            className: "border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 hidden sm:block",
                                                    children: "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-xs font-semibold text-slate-600 w-12",
                                                            children: "Close"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "time",
                                                            value: hours.close,
                                                            onChange: (e)=>setOpeningHours({
                                                                    ...openingHours,
                                                                    [day]: {
                                                                        ...hours,
                                                                        close: e.target.value
                                                                    }
                                                                }),
                                                            className: "border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                            lineNumber: 672,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                            lineNumber: 656,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, day, true, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 638,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-4 border-t-2 border-slate-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        lineNumber: 688,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        lineNumber: 706,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/garage/settings/general/page.tsx",
                        lineNumber: 636,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-lg px-4 py-3 text-sm font-medium ${saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`,
                children: saveMessage
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 729,
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
                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                            lineNumber: 739,
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
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 741,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    disabled: saving,
                                    className: "bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors",
                                    children: saving ? "Saving..." : "Save Changes"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                                    lineNumber: 749,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/garage/settings/general/page.tsx",
                            lineNumber: 740,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/garage/settings/general/page.tsx",
                    lineNumber: 738,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/garage/settings/general/page.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/garage/settings/general/page.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_21468ab1._.js.map