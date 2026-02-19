import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { Bell, Search, Coins, BarChart3, Users, Wrench, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Garage Management Features | MOT Software & Automation | Garage Boost",
  description:
    "Discover Garage Boost features: DVSA MOT lookup, automated SMS/email reminders, customer CRM, smart quote generation, revenue analytics, and complete garage management tools.",
  keywords: [
    "MOT software features",
    "garage CRM software",
    "MOT reminder automation",
    "garage analytics",
    "garage invoice software",
    "garage management features",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "Garage Management Features | MOT Software & Automation | Garage Boost",
    description:
      "Complete feature suite for UK garages: DVSA integration, automated reminders, CRM, invoicing, analytics, and more.",
    url: "https://garageboost.co.uk/features",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/features",
  },
};

const features = [
  {
    icon: Search,
    title: "Instant DVSA Lookup",
    description: "Access MOT history, mileage trends, and hidden advisories in seconds.",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "SMS and email reminders at 30, 14, and 7 days before expiry.",
  },
  {
    icon: Coins,
    title: "Revenue Recovery",
    description: "Identify advisory work and turn it into booked jobs automatically.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track conversions, revenue, and customer lifetime value in real time.",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Keep customer and vehicle history in one place with fast search.",
  },
  {
    icon: Wrench,
    title: "Smart Quotes",
    description: "Generate professional quotes from MOT advisories in minutes.",
  },
  {
    icon: Shield,
    title: "UK Compliance",
    description: "Built for UK garages with GDPR-friendly workflows and data handling.",
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "Automate follow-ups and reduce admin time without extra staff.",
  },
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-black mb-6">Features Built For UK Garages</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Everything you need to turn MOT data into predictable revenue.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-5">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              See Garage Boost in action
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Start a free trial and experience automated reminders and smart quoting.
            </p>
            <a
              href="/signup"
              className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
