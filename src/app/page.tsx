import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
  description:
    "Increase garage revenue by 40% with Garage Boost. DVSA-integrated MOT reminder software, customer CRM, and smart quote generation. Free trial for UK garages.",
  keywords: [
    "MOT software UK",
    "garage management software",
    "MOT reminder software",
    "garage CRM",
    "DVSA integration",
    "automotive software",
    "garage revenue",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    type: "website",
    title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
    description:
      "Increase garage revenue by 40% with Garage Boost. DVSA-integrated MOT reminder software with automated reminders, CRM, and smart quotes.",
    siteName: "Garage Boost",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Garage Boost - MTD Revenue Software for UK Garages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered MOT Management Software for UK Garages | Garage Boost",
    description:
      "Increase garage revenue by 40%. DVSA-integrated MOT reminder software, CRM, and smart quotes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://garageboost.co.uk",
  },
};

export default function Home() {
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  );
}
