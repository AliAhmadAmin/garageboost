import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { MapPin, Phone, Mail, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const matadata: Metadata = {
  title: "MOT Management Software For London Garages | Garage Boost",
  description:
    "Best garage and MOT reminder software for London garages. Increase revenue by 40% with automated reminders, DVSA integration, and smart advisory tracking. Based in Great Portland Street.",
  keywords: [
    "MOT software London",
    "garage software London",
    "garage management London",
    "MOT reminders London",
    "garage CRM London",
    "automotive software London",
    "MOT advisory software London",
    "garage near Great Portland Street",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "MOT Management Software For London Garages | Garage Boost",
    description:
      "Increase garage revenue by 40% with Garage Boost MOT reminder software. Trusted by London and UK garages.",
    url: "https://garageboost.co.uk/garage-software/london",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/garage-software/london",
  },
};

export default function LondonPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="text-blue-200" size={24} />
              <p className="text-blue-100 font-semibold">Based in Great Portland Street, London</p>
            </div>
            <h1 className="text-5xl font-black mb-6">
              MOT & Garage Management Software for London Garages
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Increase your garage revenue by 40% with automated MOT reminders, DVSA integration, and smart advisory tracking. Local support from our London office.
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
          <h2 className="text-4xl font-bold text-center mb-4">Why London Garages Choose Garage Boost</h2>
          <p className="text-center text-slate-600 text-lg mb-16 max-w-3xl mx-auto">
            We understand the unique challenges of running a garage in London and across the UK. Our MOT reminder software is built for garages like yours.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Local Support Team",
                desc: "Our support team is based in Great Portland Street, London. Fast response times, local understanding.",
                icon: "🏢",
              },
              {
                title: "DVSA MOT Integration",
                desc: "Direct access to official DVSA MOT data. Automated reminders based on real compliance dates.",
                icon: "🔗",
              },
              {
                title: "40% Revenue Increase",
                desc: "Average increase for London garages: £3,200-5,100 per month in the first 90 days.",
                icon: "📈",
              },
              {
                title: "SMS & Email Reminders",
                desc: "Automated reminders at 30, 14, and 7 days before MOT expiry. 98% SMS open rate.",
                icon: "📱",
              },
              {
                title: "Smart Advisory Capture",
                desc: "Automatically extract MOT advisories and turn them into quoted jobs. No manual data entry.",
                icon: "💡",
              },
              {
                title: "Customer CRM",
                desc: "Complete customer database with vehicle history, MOT dates, and service records.",
                icon: "👥",
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

        {/* London Garages Success Stories */}
        <div className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">London Garage Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Central London Motors",
                  area: "King's Cross, London",
                  stat: "+£3,200/month",
                  result: "Went from 20 bookings/month to 35 with automated reminders. Customers love the convenience.",
                  rating: 5,
                },
                {
                  name: "Thames Valley Automotive",
                  area: "Hammersmith, London",
                  stat: "+£4,800/month",
                  result: "Recovered £2,100 in advisory work previously missed. Now 60% of customers book maintenance after MOT.",
                  rating: 5,
                },
              ].map((story, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(story.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="#3b82f6" className="text-blue-500" />
                    ))}
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{story.stat}</div>
                    <p className="text-sm text-slate-500">Monthly revenue increase</p>
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">&quot;{story.result}&quot;</p>
                  <div>
                    <p className="font-bold text-slate-900">{story.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <MapPin size={14} />
                      {story.area}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16">How Garage Boost Works For Your London Garage</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Import MOT Data",
                desc: "Connect your DVSA account (2 minutes). We automatically fetch all customer MOT records.",
              },
              {
                step: "2",
                title: "Set Reminders",
                desc: "Choose reminder dates (30/14/7 days). Customize SMS/Email messages with your branding.",
              },
              {
                step: "3",
                title: "Automate Advisories",
                desc: "We extract MOT advisories and generate professional quotes in seconds. No manual work.",
              },
              {
                step: "4",
                title: "Track Results",
                desc: "Watch conversions, revenue, and customer engagement in real-time dashboard.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">What You Get Free (vs. Manual Work)</h2>
            <div className="space-y-4">
              {[
                { feature: "MOT reminder automation", manual: "5+ hours/month", garageboost: "Automatic" },
                { feature: "Advisory extraction & quoting", manual: "8+ hours/month", garageboost: "2 minutes" },
                { feature: "Customer database management", manual: "3+ hours/month", garageboost: "Automatic" },
                { feature: "Revenue tracking & analytics", manual: "Time-consuming", garageboost: "Real-time" },
                { feature: "Multi-channel follow-ups", manual: "Manual staff", garageboost: "Automated" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 grid grid-cols-3 gap-4 items-center">
                  <div className="font-semibold text-slate-900">{item.feature}</div>
                  <div className="text-slate-600 text-center text-sm">{item.manual}</div>
                  <div className="text-blue-600 font-bold flex items-center gap-2 justify-center">
                    <CheckCircle2 size={18} />
                    {item.garageboost}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Is Garage Boost suitable for small London garages?",
                a: "Yes! We start at £0/month free plan for garages with up to 50 vehicles. Scale to Pro (£49/month) as you grow. Most London garages are on the free or Pro plan.",
              },
              {
                q: "How is your support based in London?",
                a: "Our team is based at Great Portland Street, London W1W 5PF. Call us at 07380 448187 or email cs@bizzboost.uk for direct support.",
              },
              {
                q: "Does Garage Boost work with DVSA data for London garages?",
                a: "Yes. Directly integrates with DVSA MOT records. Works nationwide, including all London postcodes (SW, SE, NW, NE, E, W, etc.).",
              },
              {
                q: "How quickly will I see revenue increase?",
                a: "Most garages see +15-20% revenue lift in the first 30 days. London garages average +£3,200-5,100/month within 90 days.",
              },
              {
                q: "Can I customize reminder messages?",
                a: "Yes. Full control over SMS and email templates. Include your garage name, phone, link to online booking, anything you want.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-slate-200 pb-6">
                <h3 className="font-bold text-slate-900 text-lg mb-3">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact London Office */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Talk To Our London Team</h2>
            <p className="text-xl text-blue-100 mb-8">
              Based at Great Portland Street. Available Mon-Fri, 8am-6pm GMT.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <Phone className="mb-3" size={32} />
                <a href="tel:07380448187" className="text-xl font-bold hover:text-blue-200 transition-colors">
                  07380 448187
                </a>
                <p className="text-sm text-blue-100 mt-1">Call or WhatsApp</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="mb-3" size={32} />
                <a href="mailto:cs@bizzboost.uk" className="text-xl font-bold hover:text-blue-200 transition-colors">
                  cs@bizzboost.uk
                </a>
                <p className="text-sm text-blue-100 mt-1">Email us</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="mb-3" size={32} />
                <p className="text-lg font-bold">Great Portland St</p>
                <p className="text-sm text-blue-100 mt-1">London W1W 5PF</p>
              </div>
            </div>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all"
            >
              Start Your Free Trial Today
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
