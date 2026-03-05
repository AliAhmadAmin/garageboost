import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
  );
}