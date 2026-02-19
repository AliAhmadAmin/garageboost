"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

interface ApiConfig {
  key: string;
  value: string;
  isActive: boolean;
}

export default function AdminSettingsPage() {
  const [configs, setConfigs] = useState<Record<string, ApiConfig>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const systemSettings = [
    { key: "REQUIRE_EMAIL_VERIFICATION", label: "Require Email Verification", description: "Require new users to verify their email during signup", type: "boolean" },
  ];

  const apiKeys = [
    { key: "DVLA_API_KEY", label: "DVLA API Key", description: "For vehicle registration lookups", link: "https://developer-portal.driver-vehicle-licensing.api.gov.uk/" },
    { key: "DVSA_API_KEY", label: "DVSA MOT History API Key", description: "Main API key for MOT data (required)", link: "https://documentation.history.mot.api.gov.uk/" },
    { key: "DVSA_CLIENT_ID", label: "DVSA Client ID (Optional)", description: "Only if using OAuth authentication", link: "https://documentation.history.mot.api.gov.uk/" },
    { key: "DVSA_CLIENT_SECRET", label: "DVSA Client Secret (Optional)", description: "Only if using OAuth authentication", link: "https://documentation.history.mot.api.gov.uk/" },
    { key: "STRIPE_SECRET_KEY", label: "Stripe Secret Key", description: "For payment processing (sk_test_ or sk_live_)", link: "https://dashboard.stripe.com/apikeys" },
    { key: "STRIPE_PUBLISHABLE_KEY", label: "Stripe Publishable Key", description: "For frontend payment forms (pk_test_ or pk_live_)", link: "https://dashboard.stripe.com/apikeys" },
    { key: "STRIPE_WEBHOOK_SECRET", label: "Stripe Webhook Secret", description: "For webhook event verification (whsec_)", link: "https://dashboard.stripe.com/webhooks" },
    { key: "RESEND_API_KEY", label: "Resend API Key", description: "Transactional email sending (re_...)", link: "https://resend.com/api-keys" },
    { key: "RESEND_FROM_EMAIL", label: "Resend From Email", description: "Verified sender address (e.g., no-reply@yourdomain.com)", link: "https://resend.com/domains" },
    { key: "RESEND_FROM_NAME", label: "Resend From Name", description: "Sender name shown to customers", link: "https://resend.com/domains" },
    { key: "QUOTE_VALID_DAYS", label: "Quote Valid Days", description: "Number of days a quote is valid (default 30)", link: "#" },
    { key: "QUOTE_PDF_FOOTER", label: "Quote PDF Footer", description: "Footer text for PDF/Email quote", link: "#" },
  ];

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const res = await fetch("/api/admin/config");
      if (res.ok) {
        const data = await res.json();
        setConfigs(data);
      }
    } catch (error) {
      console.error("Failed to load configs:", error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configs),
      });

      if (!res.ok) throw new Error("Failed to save configuration");

      setMessage({ type: "success", text: "API keys saved successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save configuration" });
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [key]: { key, value, isActive: true },
    }));
  };

  const toggleBooleanConfig = (key: string) => {
    setConfigs((prev) => ({
      ...prev,
      [key]: { key, value: prev[key]?.value === "true" ? "false" : "true", isActive: true },
    }));
  };

  const toggleVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">API Configuration</h1>
            <p className="text-slate-400 mt-2">
              Configure your third-party API keys for DVLA, DVSA, and Stripe integrations
            </p>
          </header>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                : "bg-red-500/20 border border-red-500/50 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <XCircle size={20} />
            )}
            {message.text}
          </div>
        )}

        {/* System Settings Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">System Settings</h2>
          <div className="space-y-4">
            {systemSettings.map((setting) => (
              <div
                key={setting.key}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{setting.label}</h3>
                    <p className="text-sm text-slate-400 mt-1">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => toggleBooleanConfig(setting.key)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      configs[setting.key]?.value === "true" ? "bg-blue-600" : "bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        configs[setting.key]?.value === "true" ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Configuration Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">API Configuration</h2>
        <div className="space-y-6">
          {apiKeys.map((api) => (
            <div
              key={api.key}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{api.label}</h3>
                  <p className="text-sm text-slate-400 mt-1">{api.description}</p>
                  <a
                    href={api.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
                  >
                    Get your key →
                  </a>
                </div>
              </div>

              <div className="relative">
                <input
                  type={showKeys[api.key] ? "text" : "password"}
                  value={configs[api.key]?.value || ""}
                  onChange={(e) => updateConfig(api.key, e.target.value)}
                  placeholder={`Enter your ${api.label}...`}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(api.key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showKeys[api.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {configs[api.key]?.value && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-400 font-medium">Configured</span>
                </div>
              )}
            </div>
          ))}
        </div>
        </section>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Configuration"}
          </button>

          <button
            onClick={loadConfigs}
            className="px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Reset Changes
          </button>
        </div>

        <div className="mt-12 bg-amber-500/10 border border-amber-500/50 rounded-xl p-6">
          <h4 className="font-bold text-amber-400 mb-2">🔐 Security Note</h4>
          <p className="text-sm text-slate-300">
            API keys are encrypted before storage. Never share your keys publicly. For production, always use live keys (sk_live_, pk_live_). For testing, use test keys (sk_test_, pk_test_).
          </p>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
