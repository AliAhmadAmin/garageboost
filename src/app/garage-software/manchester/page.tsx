import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { MapPin, Phone, Mail, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MOT Management Software For Manchester Garages | Garage Boost",
  description:
    "Best garage and MOT reminder software for Manchester. Increase revenue by 40% with automated DVSA MOT reminders, smart advisory tracking, and customer CRM designed for Northwest garages.",
  keywords: [
    "MOT software Manchester",
    "garage software Manchester",
    "garage management Manchester",
    "MOT reminders Northwest",
    "garage CRM Manchester",
    "automotive software Manchester",
    "MOT tracking Manchester",
    "vehicle reminder system",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "MOT Management Software For Manchester Garages | Garage Boost",
    description:
      "Increase garage revenue by 40% with automated MOT reminders tailored for Manchester and Northwest garages.",
    url: "https://garageboost.co.uk/garage-software/manchester",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/garage-software/manchester",
  },
};

export default function ManchesterPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="text-blue-200" size={24} />
              <p className="text-blue-100 font-semibold">Serving Manchester & The Northwest</p>
            </div>
            <h1 className="text-5xl font-black mb-6">
              MOT & Garage Management Software for Manchester Garages
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Increase your garage revenue by 40% with automated MOT reminders, DVSA integration, and smart advisory tracking. Supporting garages across Manchester, Salford, Stockport, and Cheshire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition-all"
              >
                Call Us: 07380 448187
              </Link>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-4">Why Manchester Garages Choose Garage Boost</h2>
          <p className="text-center text-slate-600 text-lg mb-16 max-w-3xl mx-auto">
            Manchester garages face unique challenges: high competition, mobile-heavy customer base, seasonal demand swings. Our software is built to help you win.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "DVSA MOT Integration",
                desc: "Direct access to official DVSA MOT data for Manchester vehicles. Know exact compliance dates.",
                icon: "🔗",
              },
              {
                title: "40% Revenue Increase",
                desc: "Manchester garages average +£3,200-5,100/month. Proven by City Motors, Manchester (+£3,200/month in 60 days).",
                icon: "📈",
              },
              {
                title: "Automated SMS/Email",
                desc: "Reminders at 30, 14, 7 days before MOT expiry. 98% SMS open rate. SMS outperforms email by 3x.",
                icon: "📱",
              },
              {
                title: "Advisory Capture",
                desc: "Automatically turn MOT advisories into quoted jobs. Average: £150+ per job. 2-3 advisories per failed MOT.",
                icon: "💡",
              },
              {
                title: "Complete CRM",
                desc: "Single customer view with vehicle history, MOT dates, advisories, and service records.",
                icon: "👥",
              },
              {
                title: "UK Support",
                desc: "Based in London but understand Manchester garage market. Phone, email, and chat support available.",
                icon: "🏢",
              },
            ].map((benefit, i) => (
              <div key={i} className="border border-slate-200 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manchester Success Story */}
        <div className="bg-slate-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Real Manchester Garage Success</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={20} fill="#3b82f6" className="text-blue-500" />
                ))}
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-3">+£3,200/month</div>
                <p className="text-sm text-slate-500 font-semibold">Additional monthly revenue increase</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 rounded">
                <p className="text-slate-700 leading-relaxed text-lg">
                  &quot;We went from 20 MOT bookings a month to 35 with Garage Boost. The automated reminders alone are worth the cost. 
                  We've also recovered thousands in advisory work that we were previously missing. Within 3 months, Garage Boost paid for 
                  itself 10x over.&quot;
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-2xl font-bold text-blue-600">200</p>
                  <p className="text-sm text-slate-600">Active customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">75%</p>
                  <p className="text-sm text-slate-600">Response rate (SMS)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">6 months</p>
                  <p className="text-sm text-slate-600">To ROI achievement</p>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6">
                <p className="font-bold text-slate-900 text-lg">City Motors</p>
                <p className="text-slate-600 flex items-center gap-1">
                  <MapPin size={16} />
                  Manchester, Greater Manchester
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16">Get Started In 3 Easy Steps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Connect DVSA",
                desc: "Link your garage MOT test station account. We fetch customer MOT records automatically. Takes 2 minutes.",
              },
              {
                num: "2",
                title: "Enable Reminders",
                desc: "Choose reminder dates. Customize messages. We send SMS at 30, 14, 7 days before expiry.",
              },
              {
                num: "3",
                title: "Watch Revenue Grow",
                desc: "Track bookings, conversions, and revenue in your dashboard. Analyze what's working.",
              },
            ].map((item, i) => (
              <div key={i} className="border-2 border-slate-200 p-8 rounded-xl hover:border-blue-600 transition-colors">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  {item.num}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features That Matter */}
        <div className="bg-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Features Built For Manchester Garages</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { feature: "MOT Reminder Automation", benefit: "Save 5+ hours/month on reminders" },
                { feature: "Advisory Extraction", benefit: "Turn advisories into £150+ jobs automatically" },
                { feature: "SMS + Email Delivery", benefit: "98% SMS open rate + email for detail" },
                { feature: "Customer CRM", benefit: "Single view of all vehicles & history" },
                { feature: "Revenue Dashboard", benefit: "Real-time tracking of conversions & revenue" },
                { feature: "Quote Templates", benefit: "Generate quotes in 2 minutes (not 20)" },
                { feature: "Mobile App", benefit: "Manage bookings from anywhere, anytime" },
                { feature: "Priority Support", benefit: "Fast responses by UK-based team" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-lg">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-1" size={22} />
                  <div>
                    <p className="font-bold text-slate-900">{item.feature}</p>
                    <p className="text-sm text-slate-600">{item.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-center text-slate-600 text-lg mb-16">No hidden fees. Scale as you grow.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                plan: "Free",
                price: "£0",
                desc: "Perfect to test drive",
                features: ["Up to 50 vehicles", "Basic SMS/Email", "Customer list", "7-day support"],
              },
              {
                plan: "Pro",
                price: "£49",
                desc: "For growing garages",
                features: ["Unlimited vehicles", "Full automation", "Advanced analytics", "Priority support"],
                popular: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border-2 ${
                  item.popular ? "border-blue-600 bg-blue-50" : "border-slate-200"
                }`}
              >
                <p className="text-2xl font-bold text-slate-900">{item.plan}</p>
                <p className="text-3xl font-black text-blue-600 my-2">{item.price}</p>
                <p className="text-sm text-slate-600 mb-6">{item.desc}</p>
                <ul className="space-y-3 mb-8">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full py-3 rounded-lg font-bold text-center transition-all ${
                    item.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white border border-slate-300 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Does Garage Boost work with Manchester MOT test stations?",
                  a: "Yes. We integrate with DVSA data, which covers all UK test stations including Manchester, Stockport, Salford, and surrounding areas.",
                },
                {
                  q: "How much garage revenue can I realistically gain?",
                  a: "Manchester garages average 15-20% revenue lift in month 1, 25-40% by month 3. City Motors saw +£3,200/month (+38%).",
                },
                {
                  q: "What if I have concerns about GDPR/Data?",
                  a: "We're fully GDPR compliant. Customer consent is required. Data is encrypted. You can delete records anytime. We keep your garage secure.",
                },
                {
                  q: "Can I customize reminder messages?",
                  a: "Yes. Complete control over SMS and email templates, branding, phone numbers, links, everything.",
                },
                {
                  q: "How long does implementation take?",
                  a: "Most Manchester garages are live within 2-3 days. Setup is 15 minutes. You can start sending reminders immediately.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-lg mb-3">{item.q}</p>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Manchester Garage Revenue?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 500+ UK garages already using Garage Boost. Start free. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all"
              >
                Start Free Trial
              </Link>
              <a href="tel:07380448187">
                <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-600 transition-all">
                  Call: 07380 448187
                </button>
              </a>
            </div>
            <p className="text-sm text-blue-100 mt-6">
              Have questions? Email <a href="mailto:cs@bizzboost.uk" className="text-blue-200 underline hover:text-white">cs@bizzboost.uk</a>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
