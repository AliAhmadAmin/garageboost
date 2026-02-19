import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "FAQ | Garage Management Software & MOT Reminders | Garage Boost",
  description:
    "Frequently asked questions about Garage Boost. Learn how MOT reminder software works, setup, pricing, and support for UK garages.",
  keywords: [
    "garage software FAQ",
    "MOT software questions",
    "garage CRM help",
    "garage management FAQ",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "FAQ | Garage Management Software & MOT Reminders | Garage Boost",
    description:
      "Get answers to common questions about Garage Boost MOT reminder and garage management software.",
    url: "https://garageboost.co.uk/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/faq",
  },
};

const faqs = [
  {
    question: "How does Garage Boost access MOT data?",
    answer:
      "Garage Boost integrates with DVSA data sources to fetch MOT history and advisories for eligible vehicles.",
  },
  {
    question: "Do I need any special hardware?",
    answer:
      "No. Garage Boost is cloud-based and works from any browser on desktop, tablet, or mobile.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most garages are up and running in under 10 minutes. You can start sending reminders immediately.",
  },
  {
    question: "Can I customize reminder messages?",
    answer:
      "Yes. You can tailor SMS and email templates with your branding and contact details.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No long-term contract. Cancel any time from your dashboard.",
  },
  {
    question: "Do you support multiple garages?",
    answer:
      "Yes. Multi-location support is available on request. Contact sales for details.",
  },
];

export default function FaqPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-black mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Everything you need to know about Garage Boost.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
