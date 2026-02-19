import type { Metadata } from "next";
import "./globals.css";
import { SchemaScript, generateOrganizationSchema, generateSoftwareApplicationSchema } from "@/components/seo/SchemaMarkup";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garageboost.co.uk";

export const metadata: Metadata = {
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
  authors: [{ name: "Garage Boost", url: "https://garageboost.co.uk/" }],
  creator: "Bizz Boost Ltd",
  publisher: "Bizz Boost Ltd",
  alternates: {
    canonical: siteUrl,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
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
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
    description: "Increase garage revenue by 40% with DVSA-integrated MOT reminder software, customer CRM, and garage management tools.",
    images: ["/og-image.png"],
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
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <SchemaScript schema={generateOrganizationSchema()} />
        {/* Software Application Schema */}
        <SchemaScript schema={generateSoftwareApplicationSchema()} />
        {/* Google Analytics (if needed) */}
        <meta name="google-site-verification" content="YOUR-GOOGLE-VERIFICATION-CODE" />
      </head>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
