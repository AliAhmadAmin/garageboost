import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Garage Boost",
  description: "Garage Boost terms of service for UK garages and customers.",
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
            <p className="text-blue-100">Last updated: February 7, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Agreement</h2>
            <p className="text-slate-600 leading-relaxed">
              By using Garage Boost, you agree to these terms. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Use of Service</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>You are responsible for maintaining the accuracy of your account and garage data.</li>
              <li>You must comply with applicable UK laws and data protection regulations.</li>
              <li>Unauthorized access or misuse of the platform is prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Payments and Billing</h2>
            <p className="text-slate-600 leading-relaxed">
              Subscription fees are billed monthly unless otherwise agreed. You can cancel anytime.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions? Contact support@garageboost.co.uk.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
