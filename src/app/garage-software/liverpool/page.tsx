import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { MapPin, Phone, Mail, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MOT Management Software For Liverpool Garages | Garage Boost",
  description:
    "Best garage and MOT reminder software for Liverpool garages. Increase revenue by 40% with automated reminders, DVSA integration, and smart advisory tracking. Serving the North West.",
  keywords: [
    "MOT software Liverpool",
    "garage software Liverpool",
    "garage management Liverpool",
    "MOT reminders Liverpool",
    "garage CRM Liverpool",
    "automotive software Liverpool",
    "MOT advisory software Liverpool",
    "garage software North West",
    "vehicle management Liverpool",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "MOT Management Software For Liverpool Garages | Garage Boost",
    description:
      "Increase garage revenue by 40% with Garage Boost MOT reminder software. Trusted by Liverpool and UK garages.",
    url: "https://garageboost.co.uk/garage-software/liverpool",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/garage-software/liverpool",
  },
};

export default function LiverpoolPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="text-blue-200" size={24} />
              <p className="text-blue-100 font-semibold">Serving Liverpool & The North West</p>
            </div>
            <h1 className="text-5xl font-black mb-6">
              MOT & Garage Management Software for Liverpool Garages
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Increase your garage revenue by 40% with automated MOT reminders, DVSA integration, and smart advisory tracking. Trusted by garages across Liverpool and the North West.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-linear-to-r from-slate-50 to-slate-100 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-blue-600 mb-2">40%</div>
                <p className="text-slate-600">Average Revenue Increase</p>
              </div>
              <div>
                <div className="text-4xl font-black text-blue-600 mb-2">100K+</div>
                <p className="text-slate-600">Reminders Sent This Year</p>
              </div>
              <div>
                <div className="text-4xl font-black text-blue-600 mb-2">500+</div>
                <p className="text-slate-600">UK Garages Trusting Us</p>
              </div>
              <div>
                <div className="text-4xl font-black text-blue-600 mb-2">92%</div>
                <p className="text-slate-600">Customer Retention Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">
            Purpose-Built for Liverpool Garages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Automated MOT Reminders",
                description: "SMS and email reminders at 30, 14, and 7 days before expiry—automatically increasing your bookings.",
              },
              {
                icon: "🔍",
                title: "DVSA Data Integration",
                description: "Direct access to MOT history, mileage trends, and hidden advisories for every vehicle.",
              },
              {
                icon: "💼",
                title: "Customer CRM Built-In",
                description: "Manage all customer data, vehicles, and service history in one dashboard. No separate tool needed.",
              },
              {
                icon: "💰",
                title: "Smart Advisory Quotes",
                description: "Generate professional quotes instantly from MOT advisories. Perfect for converting leads to jobs.",
              },
              {
                icon: "📈",
                title: "Analytics & Reporting",
                description: "Track revenue, conversion rates, customer lifetime value, and ROI in real-time.",
              },
              {
                icon: "🛡️",
                title: "UK Compliance Built-In",
                description: "GDPR compliant, secure UK data centers, and audit-ready for vehicle data handling.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-slate-900 text-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-black mb-12 text-center">Success Stories from Liverpool Garages</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Merseyside Motors, Liverpool",
                  revenue: "£3,600/month",
                  quote: "Game-changer for our business. The automated reminders have completely transformed how we manage follow-ups.",
                  initial: "160 vehicles",
                },
                {
                  name: "Express Garage, Wirral",
                  revenue: "+£2,400/month",
                  quote: "Support team is brilliant. Any question we have gets answered quickly and professionally.",
                  initial: "100 vehicles",
                },
                {
                  name: "Reliable Automotive, Widnes",
                  revenue: "£1,900/month",
                  quote: "The ROI is incredible. We've increased our customer lifetime value dramatically since implementing Garage Boost.",
                  initial: "70 vehicles",
                },
              ].map((story, idx) => (
                <div key={idx} className="bg-slate-800 p-6 rounded-xl">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="italic text-slate-100 mb-4">"{story.quote}"</p>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-sm text-slate-300">Started with {story.initial}</p>
                    <p className="text-green-400 font-semibold mt-2">{story.revenue} revenue increase</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">How It Works (Setup in 10 Minutes)</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Connect Your Data",
                description: "Link your existing customer list and vehicle data. We handle the DVSA integration automatically.",
              },
              {
                step: "2",
                title: "Set Reminders",
                description: "Choose when to send reminders (30, 14, 7 days before expiry). Customize messages with your branding.",
              },
              {
                step: "3",
                title: "Watch Revenue Grow",
                description: "Our system automatically sends reminders, tracks conversions, and shows you what's working.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-slate-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-black text-slate-900 mb-8 text-center">Simple, Transparent Pricing</h2>
            <p className="text-center text-slate-600 mb-12 text-lg">
              No setup fees. No long-term contracts. Cancel anytime. 14-day free trial included.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Starter",
                  price: "£9",
                  desc: "Perfect for sole traders",
                  features: ["1 user account", "Up to 200 vehicles", "Basic job management", "Email support"],
                },
                {
                  name: "Professional",
                  price: "£29",
                  desc: "Best for growing garages",
                  popular: true,
                  features: ["Up to 5 users", "Up to 500 vehicles", "Full CRM & job management", "Automation & reports", "Priority support"],
                },
                {
                  name: "Business",
                  price: "£49",
                  desc: "For established garages",
                  features: ["Unlimited users", "Unlimited vehicles", "API access", "Multi-location support", "Dedicated account manager"],
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-8 ${
                    plan.popular
                      ? "bg-blue-600 text-white border-2 border-blue-600 ring-2 ring-blue-300 transform scale-105"
                      : "bg-white border-2 border-slate-200"
                  }`}
                >
                  <h3 className="font-bold text-2xl mb-1">{plan.name}</h3>
                  <p className={`text-sm mb-4 ${plan.popular ? "text-blue-100" : "text-slate-600"}`}>{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={plan.popular ? "text-blue-100" : "text-slate-600"}> per month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`block text-center font-bold py-3 px-6 rounded-lg transition ${
                      plan.popular
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Start Free Trial
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="bg-blue-50 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Ready to Grow Your Liverpool Garage?</h2>
            <p className="text-slate-600 text-lg mb-8">
              Join garages across the North West increasing their revenue. Start your free 14-day trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg transition"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-100 font-bold py-3 px-8 rounded-lg transition"
              >
                Contact Sales
              </Link>
            </div>
            <div className="mt-8 text-sm text-slate-600">
              <p>Questions? Call us: <a href="tel:07380448187" className="text-blue-600 font-bold hover:underline">07380 448187</a></p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
