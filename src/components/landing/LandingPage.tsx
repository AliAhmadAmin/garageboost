import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import FeaturedGarages from "@/components/landing/FeaturedGarages";
import { BarChart3, Bell, CheckCircle2, Coins, Search, Star, Users, Wrench } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-slate-50 font-sans text-slate-900">

      <section className="py-12 md:py-20 px-4 md:px-6 text-center max-w-5xl mx-auto">
        <Badge variant="blue">🇬🇧 UK Only • DVSA Integrated • Trusted by 500+ Garages</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mt-6 leading-tight">
          Turn MOT data into <span className="text-blue-600">booked jobs.</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mt-6 leading-relaxed max-w-3xl mx-auto">
          Garage Boost automatically scans your customer&apos;s MOT history, identifies upcoming expiries
          and advisories, and sends follow-ups that <span className="font-bold text-slate-900">increase your revenue by up to 40%</span>.
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/pricing"
            className="w-full md:w-auto bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all touch-manipulation min-h-13.5 flex items-center justify-center"
          >
            Start 7-Day Free Trial →
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-4 px-4">✓ No credit card required ✓ Setup in 2 mins ✓ Cancel anytime</p>
        
        <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {[
            { label: "Revenue Increase", value: "40%" },
            { label: "Reminders Sent", value: "100K+" },
            { label: "Customer Retention", value: "92%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Nearby Garages Section */}
      <FeaturedGarages />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Grow Your Garage</h2>
            <p className="text-slate-600 mt-4 text-lg">Powerful tools built specifically for UK MOT garages</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Search,
                title: "Instant DVSA Lookup",
                desc: "One-click access to MOT history, mileage trends, and hidden advisories.",
              },
              {
                icon: Bell,
                title: "Automated Reminders",
                desc: "We send SMS & Emails 30, 14, and 7 days before an MOT expires.",
              },
              {
                icon: Coins,
                title: "Revenue Recovery",
                desc: "Identifies work flagged as advisories last year and prompts a booking.",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Track revenue, conversion rates, and customer lifetime value in real-time.",
              },
              {
                icon: Users,
                title: "Customer CRM",
                desc: "Manage all your customers, vehicles, and service history in one place.",
              },
              {
                icon: Wrench,
                title: "Smart Quotes",
                desc: "Generate professional quotes instantly from MOT advisories.",
              },
            ].map((feature, index) => (
              <div key={index} className="space-y-4 p-6 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Loved by UK Garages</h2>
            <p className="text-slate-600 mt-4 text-lg">See what garage owners are saying</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mike Johnson",
                garage: "City Motors, Manchester",
                text: "Garage Boost increased our monthly revenue by £3,200. The automated reminders alone pay for themselves.",
                rating: 5,
              },
              {
                name: "Sarah Williams",
                garage: "Elite Automotive, Bristol",
                text: "Best investment we've made. We're now booking 60% more MOTs and our customers love the reminders.",
                rating: 5,
              },
              {
                name: "David Brown",
                garage: "Quick Fix, Birmingham",
                text: "Setup was incredibly easy. Within a week we saw a massive improvement in customer retention.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="#fbbf24" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.garage}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 mt-4 text-lg">Choose the perfect plan for your garage. All plans include 14 days free.</p>
            <p className="text-slate-500 mt-2">✨ No credit card required • Cancel anytime</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
                <p className="text-slate-600 mt-2">Perfect for mobile mechanics</p>
              </div>

              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900">£9</div>
                <div className="text-slate-500">per month</div>
              </div>

              <div className="grid gap-3 mb-8">
                {[
                  "1 user account",
                  "Up to 200 vehicles",
                  "Basic job management",
                  "Invoice & quotes",
                  "DVLA/DVSA vehicle lookup",
                  "Email support",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/signup?plan=starter"
                className="w-full border-2 border-blue-600 text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 text-center transition-colors block"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 md:p-8 shadow-xl relative md:transform md:scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Professional</h3>
                <p className="text-slate-600 mt-2">Best for growing garages</p>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900">£29</div>
                <div className="text-slate-500">per month</div>
              </div>

              <div className="grid gap-3 mb-8">
                {[
                  "Up to 5 users",
                  "Up to 500 vehicles",
                  "Full job & CRM management",
                  "Advanced invoicing & quotes",
                  "Automated MOT reminders",
                  "Revenue recovery insights",
                  "Priority support",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/signup?plan=professional"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 text-center transition-colors block"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Enterprise</h3>
                <p className="text-slate-600 mt-2">For multi-site garages</p>
              </div>

              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900">£79</div>
                <div className="text-slate-500">per month</div>
              </div>

              <div className="grid gap-3 mb-8">
                {[
                  "Unlimited users",
                  "Unlimited vehicles",
                  "Multi-location reporting",
                  "Advanced automation rules",
                  "Dedicated onboarding",
                  "Priority phone support",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="w-full border-2 border-slate-900 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-slate-50 text-center transition-colors block"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
