import { Metadata } from "next";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
      name: "Garage Boost",
    url: "https://garageboost.co.uk",
    logo: "https://garageboost.co.uk/logo.svg",
    description: "AI-powered MOT management and garage software for UK garages",
    sameAs: [
      "https://www.linkedin.com/company/bizz-boost/",
      "https://x.com/BizzBoostUK",
      "https://www.facebook.com/BizzBoost.uk",
      "https://www.instagram.com/bizzboostofficial/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "07380 448187",
      email: "cs@bizzboost.uk",
      areaServed: "GB",
      availableLanguage: "en",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Great Portland St",
      addressLocality: "London",
      postalCode: "W1W 5PF",
      addressCountry: "GB",
      addressRegion: "England",
    },
    foundingDate: "2024",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: "5",
      maxValue: "20",
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
      name: "Garage Boost",
    description:
      "MOT reminder software and garage management platform for UK automotive businesses",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    url: "https://garageboost.co.uk",
    image: "https://garageboost.co.uk/og-image.svg",
    author: {
      "@type": "Organization",
      name: "Bizz Boost Ltd",
      url: "https://bizzboost.uk",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free Plan",
        price: "0",
        priceCurrency: "GBP",
        url: "https://garageboost.co.uk/pricing",
      },
      {
        "@type": "Offer",
        name: "Pro Plan",
        price: "49",
        priceCurrency: "GBP",
        url: "https://garageboost.co.uk/pricing",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    screenshot: [
      "https://garageboost.co.uk/og-image.svg",
    ],
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://garageboost.co.uk",
      name: "Garage Boost",
    image: "https://garageboost.co.uk/logo.svg",
    description:
      "MOT management and garage software based in London, serving UK garages",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Great Portland St",
      addressLocality: "London",
      postalCode: "W1W 5PF",
      addressCountry: "GB",
      addressRegion: "England",
    },
    telephone: "07380 448187",
    email: "cs@bizzboost.uk",
    url: "https://garageboost.co.uk",
    logo: "https://garageboost.co.uk/logo.svg",
    priceRange: "£0 - £99",
    sameAs: [
      "https://www.linkedin.com/company/garageboost",
      "https://twitter.com/garageboost",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
      description: "Available for calls and support",
    },
    areaServed: {
      "@type": "Country",
      name: "GB",
    },
    serviceType: "Software As A Service",
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateProductSchema(productName: string, price: string, description: string) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productName,
    image: "https://garageboost.co.uk/og-image.svg",
    description: description,
    brand: {
      "@type": "Brand",
        name: "Garage Boost",
    },
    offers: {
      "@type": "Offer",
      url: "https://garageboost.co.uk/pricing",
      priceCurrency: "GBP",
      price: price,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  datePublished: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: image || "https://garageboost.co.uk/og-image.svg",
    datePublished: datePublished,
    author: {
      "@type": "Organization",
      name: "Garage Boost",
      url: "https://garageboost.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "Garage Boost",
      logo: {
        "@type": "ImageObject",
        url: "https://garageboost.co.uk/logo.svg",
      },
    },
  };
}

// SchemaScript Component for embedding schema in Next.js pages
export function SchemaScript({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
