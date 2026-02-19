import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

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

const starterFeatures = [
  "1 user account",
  "Up to 200 vehicles",
  "Basic job management",
  "Invoice & quotes",
  "DVLA/DVSA vehicle lookup",
  "Email support",
];

const professionalFeatures = [
  "Up to 5 users",
  "Up to 500 vehicles",
  "Full job & CRM management",
  "Advanced invoicing & quotes",
  "Unlimited DVLA/DVSA lookups",
  "Campaign & reminder automation",
  "Analytics & reporting",
  "Priority email support",
];

const businessFeatures = [
  "Unlimited users",
  "Unlimited vehicles",
  "Everything in Professional",
  "Multi-location support",
  "Advanced analytics",
  "API access",
  "White-label options",
  "Priority phone & email support",
  "Dedicated account manager",
];

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Starter Plan */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Starter</h2>
                <p className="text-slate-600 mt-2">Perfect for mobile mechanics</p>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900">£9</div>
                <div className="text-slate-500">per month</div>
              </div>

              <div className="grid gap-3 mb-8">
                {starterFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/signup?plan=starter"
                className="w-full border-2 border-blue-600 text-blue-600 font-bold py-3 md:py-3.5 px-6 rounded-lg hover:bg-blue-50 text-center transition-colors touch-manipulation min-h-12 flex items-center justify-center text-sm md:text-base"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Professional Plan - Most Popular */}
            <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 md:p-8 shadow-xl relative md:transform md:scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Most Popular
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Professional</h2>
                <p className="text-slate-600 mt-2">Best for growing garages</p>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900">£29</div>
                <div className="text-slate-500">per month</div>
              </div>

              <div className="grid gap-3 mb-8">
                {professionalFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/signup?plan=professional"
                className="block w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 text-center transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Business</h2>
                <p className="text-slate-600 mt-2">For established garages</p>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900">£49</div>
                <div className="text-slate-500">per month</div>
              </div>

              <div className="grid gap-3 mb-8">
                {businessFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/signup?plan=business"
                className="block w-full border-2 border-blue-600 text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 text-center transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

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
