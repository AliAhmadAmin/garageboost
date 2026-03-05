import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";
import PricingCards from "@/components/landing/PricingCards";

export const metadata: Metadata = {
  title: "Simple & Transparent Garage Software Pricing | Garage Boost",
  description:
    "Affordable MOT and garage management software for UK garages. Free trial, no credit card required. Start at £0/month. Scale as your business grows.",
  keywords: [
    "garage software pricing",
    "MOT software cost",
    "garage management pricing",
    "affordable garage software",
    "garage CRM pricing",
    "UK garage tools cost",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "Simple & Transparent Garage Software Pricing | Garage Boost",
    description:
      "Affordable MOT management and garage software with flexible pricing. Free trial, no credit card needed.",
    url: "https://garageboost.co.uk/pricing",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/pricing",
  },
};

export default function PricingPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6">Simple, Transparent Pricing</h1>
            <p className="text-base md:text-xl text-blue-100 leading-relaxed mb-3 md:mb-4">
              Choose the perfect plan for your garage. All plans include 14 days free.
            </p>
            <p className="text-sm md:text-lg font-semibold text-blue-200">
              ✨ No credit card required • Cancel anytime
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <PricingCards />

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-4">
              Need a custom solution for multiple locations or chains?
            </p>
            <Link
              href="/contact"
              className="inline-block border border-slate-300 text-slate-700 font-semibold py-2 px-6 rounded-lg hover:bg-slate-50"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        <div className="bg-slate-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Can I change plans later?</h3>
                <p className="text-slate-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">What happens after the free trial?</h3>
                <p className="text-slate-600">We'll remind you before your trial ends. Add payment details to continue, or cancel anytime with no obligation.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Do you offer annual discounts?</h3>
                <p className="text-slate-600">Yes! Save 2 months with annual billing. Contact us for details and custom pricing.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Is my data secure?</h3>
                <p className="text-slate-600">Absolutely. All data is encrypted and stored securely in UK data centers with regular backups.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to grow your garage?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Join hundreds of UK garages using Garage Boost to increase revenue and improve customer retention.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 text-lg transition-colors"
            >
              Start Your 14-Day Free Trial
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              No credit card required • Full access • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
