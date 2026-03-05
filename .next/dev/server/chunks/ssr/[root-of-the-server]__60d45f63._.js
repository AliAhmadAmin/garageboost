module.exports = [
"[next]/internal/font/google/geist_a71539c9.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_a71539c9-module__T19VSG__className",
  "variable": "geist_a71539c9-module__T19VSG__variable",
});
}),
"[next]/internal/font/google/geist_a71539c9.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a71539c9.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_mono_8d43a2aa-module__8Li5zG__className",
  "variable": "geist_mono_8d43a2aa-module__8Li5zG__variable",
});
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/components/seo/SchemaMarkup.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SchemaScript",
    ()=>SchemaScript,
    "generateArticleSchema",
    ()=>generateArticleSchema,
    "generateBreadcrumbSchema",
    ()=>generateBreadcrumbSchema,
    "generateFAQSchema",
    ()=>generateFAQSchema,
    "generateLocalBusinessSchema",
    ()=>generateLocalBusinessSchema,
    "generateOrganizationSchema",
    ()=>generateOrganizationSchema,
    "generateProductSchema",
    ()=>generateProductSchema,
    "generateSoftwareApplicationSchema",
    ()=>generateSoftwareApplicationSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Garage Boost",
        url: "https://garageboost.co.uk",
        logo: "https://garageboost.co.uk/logo.png",
        description: "AI-powered MOT management and garage software for UK garages",
        sameAs: [
            "https://www.linkedin.com/company/bizz-boost/",
            "https://x.com/BizzBoostUK",
            "https://www.facebook.com/BizzBoost.uk",
            "https://www.instagram.com/bizzboostofficial/"
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Support",
            telephone: "07380 448187",
            email: "cs@bizzboost.uk",
            areaServed: "GB",
            availableLanguage: "en"
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Great Portland St",
            addressLocality: "London",
            postalCode: "W1W 5PF",
            addressCountry: "GB",
            addressRegion: "England"
        },
        foundingDate: "2024",
        numberOfEmployees: {
            "@type": "QuantitativeValue",
            minValue: "5",
            maxValue: "20"
        }
    };
}
function generateSoftwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Garage Boost",
        description: "MOT reminder software and garage management platform for UK automotive businesses",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        url: "https://garageboost.co.uk",
        image: "https://garageboost.co.uk/og-image.png",
        author: {
            "@type": "Organization",
            name: "Bizz Boost Ltd",
            url: "https://bizzboost.uk"
        },
        offers: [
            {
                "@type": "Offer",
                name: "Free Plan",
                price: "0",
                priceCurrency: "GBP",
                url: "https://garageboost.co.uk/pricing"
            },
            {
                "@type": "Offer",
                name: "Pro Plan",
                price: "49",
                priceCurrency: "GBP",
                url: "https://garageboost.co.uk/pricing"
            }
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "127",
            bestRating: "5",
            worstRating: "1"
        },
        screenshot: [
            "https://garageboost.co.uk/screenshot-1.png",
            "https://garageboost.co.uk/screenshot-2.png"
        ]
    };
}
function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://garageboost.co.uk",
        name: "Garage Boost",
        image: "https://garageboost.co.uk/logo.png",
        description: "MOT management and garage software based in London, serving UK garages",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Great Portland St",
            addressLocality: "London",
            postalCode: "W1W 5PF",
            addressCountry: "GB",
            addressRegion: "England"
        },
        telephone: "07380 448187",
        email: "cs@bizzboost.uk",
        url: "https://garageboost.co.uk",
        logo: "https://garageboost.co.uk/logo.png",
        priceRange: "£0 - £99",
        sameAs: [
            "https://www.linkedin.com/company/garageboost",
            "https://twitter.com/garageboost"
        ],
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            opens: "08:00",
            closes: "18:00",
            description: "Available for calls and support"
        },
        areaServed: {
            "@type": "Country",
            name: "GB"
        },
        serviceType: "Software As A Service"
    };
}
function generateBreadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index)=>({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url
            }))
    };
}
function generateFAQSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq)=>({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }))
    };
}
function generateProductSchema(productName, price, description) {
    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: productName,
        image: "https://garageboost.co.uk/og-image.png",
        description: description,
        brand: {
            "@type": "Brand",
            name: "Garage Boost"
        },
        offers: {
            "@type": "Offer",
            url: "https://garageboost.co.uk/pricing",
            priceCurrency: "GBP",
            price: price
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127"
        }
    };
}
function generateArticleSchema(title, description, datePublished, image) {
    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: title,
        description: description,
        image: image || "https://garageboost.co.uk/og-image.png",
        datePublished: datePublished,
        author: {
            "@type": "Organization",
            name: "Garage Boost",
            url: "https://garageboost.co.uk"
        },
        publisher: {
            "@type": "Organization",
            name: "Garage Boost",
            logo: {
                "@type": "ImageObject",
                url: "https://garageboost.co.uk/logo.png"
            }
        }
    };
}
function SchemaScript({ schema }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(schema)
        }
    }, void 0, false, {
        fileName: "[project]/src/components/seo/SchemaMarkup.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a71539c9.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$SchemaMarkup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seo/SchemaMarkup.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garageboost.co.uk";
const metadata = {
    metadataBase: new URL(siteUrl),
    title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
    description: "Increase garage revenue by 40% with Garage Boost. DVSA-integrated MOT reminder software with automated reminders, customer CRM, smart quotes, and complete garage management. Free trial for UK garages.",
    keywords: [
        "MOT software UK",
        "garage management software",
        "MOT reminder software",
        "garage CRM software",
        "DVSA integration",
        "automotive software",
        "garage revenue",
        "MOT advisory software",
        "garage reminders",
        "UK garage tools"
    ],
    authors: [
        {
            name: "Garage Boost",
            url: "https://garageboost.co.uk/"
        }
    ],
    creator: "Bizz Boost Ltd",
    publisher: "Bizz Boost Ltd",
    alternates: {
        canonical: siteUrl
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
        userScalable: true
    },
    openGraph: {
        title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
        description: "Increase garage revenue by 40% with DVSA-integrated MOT reminder software, customer CRM, and garage management tools.",
        type: "website",
        locale: "en_GB",
        url: siteUrl,
        siteName: "Garage Boost",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Garage Boost - MOT Management Software for UK Garages",
                type: "image/png"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
        description: "Increase garage revenue by 40% with DVSA-integrated MOT reminder software, customer CRM, and garage management tools.",
        images: [
            "/og-image.png"
        ]
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
        }
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$SchemaMarkup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SchemaScript"], {
                        schema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$SchemaMarkup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateOrganizationSchema"])()
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$SchemaMarkup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SchemaScript"], {
                        schema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$SchemaMarkup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateSoftwareApplicationSchema"])()
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "google-site-verification",
                        content: "YOUR-GOOGLE-VERIFICATION-CODE"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} antialiased`,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__60d45f63._.js.map