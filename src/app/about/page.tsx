import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { Award, Users, Target, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Garage Boost | MOT Software Built for UK Garages",
  description:
    "Garage Boost is the UK's leading MOT management and garage software platform. Trusted by 500+ garages, helping increase revenue by 40% through automated reminders and smart advisory tracking.",
  keywords: [
    "about Garage Boost",
    "garage software company",
    "MOT software provider",
    "UK garage solutions",
    "garage management platform",
  ],
  metadataBase: new URL("https://garageboost.co.uk"),
  openGraph: {
    title: "About Garage Boost | MOT Software Built for UK Garages",
    description:
      "Learn about Garage Boost, the trusted MOT and garage management software for UK automotive businesses.",
    url: "https://garageboost.co.uk/about",
    type: "website",
  },
  alternates: {
    canonical: "https://garageboost.co.uk/about",
  },
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-black mb-6">About Garage Boost</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We help UK MOT garages increase revenue by turning MOT data into booked jobs through intelligent automation.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Every day, thousands of vehicles fail their MOT across the UK. These represent real opportunities for garages to provide essential repair services and build lasting customer relationships.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Garage Boost was built to bridge the gap between MOT data and revenue. We automate the follow-up process, ensuring no opportunity is missed while saving you time and increasing your bookings.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our platform integrates directly with DVSA data, providing real-time insights and intelligent automation that helps garages increase revenue by up to 40%.
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Data-Driven</h3>
                    <p className="text-slate-600">Direct DVSA integration for accurate, real-time MOT data</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">UK Compliant</h3>
                    <p className="text-slate-600">Built for UK garages with GDPR compliance at our core</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Proven Results</h3>
                    <p className="text-slate-600">Trusted by 500+ garages across the United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Users className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Customer First</h3>
                <p className="text-slate-600">
                  Every feature we build is designed to help garages serve their customers better and grow their business.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Shield className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Trust & Security</h3>
                <p className="text-slate-600">
                  We handle sensitive customer data with the highest standards of security and UK data protection compliance.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Award className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence</h3>
                <p className="text-slate-600">
                  We continuously improve our platform based on feedback from real garage owners and industry best practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-blue-600 mb-3">500+</div>
              <div className="text-slate-600 font-medium">UK Garages</div>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-3">100K+</div>
              <div className="text-slate-600 font-medium">Reminders Sent</div>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-3">92%</div>
              <div className="text-slate-600 font-medium">Customer Retention</div>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-600 mb-3">40%</div>
              <div className="text-slate-600 font-medium">Revenue Increase</div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
