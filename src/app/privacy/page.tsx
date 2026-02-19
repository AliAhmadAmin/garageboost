import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Garage Boost",
  description: "Garage Boost privacy policy for UK garages and customers.",
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
            <p className="text-blue-100">Last updated: February 7, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              Garage Boost respects your privacy and is committed to protecting your personal data.
              This policy explains how we collect, use, and safeguard information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Information We Collect</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Account details such as name, email address, and phone number.</li>
              <li>Garage information including address, contact details, and services.</li>
              <li>Usage data and system logs for security and performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How We Use Information</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Provide and improve Garage Boost services.</li>
              <li>Send reminders and operational notifications.</li>
              <li>Support billing, compliance, and fraud prevention.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this policy, contact us at support@garageboost.co.uk.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
