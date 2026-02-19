import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Garage Boost | Support & Sales | MOT Software",
  description:
    "Contact Garage Boost for support, sales demos, and questions. Based in London, serving UK garages. Call 07380 448187 or email cs@bizzboost.uk",
  keywords: [
    "contact Garage Boost",
    "garage software support",
    "MOT software help",
    "garage software demo",
    "contact garage software company",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "Contact Garage Boost | Support & Sales | MOT Software",
    description:
      "Get in touch with Garage Boost support team. Phone: 07380 448187, Email: cs@bizzboost.uk",
    url: "https://garageboost.co.uk/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
