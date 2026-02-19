"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function ContactForm({ slug }: { slug: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setRecaptchaReady(true);
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSent(false);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    setSending(true);
    try {
      // Get reCAPTCHA token
      const recaptchaToken = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "contact_inquiry" }
      );

      const response = await fetch(`/api/garages/public/${slug}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {sent && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Message sent. The garage will contact you soon.
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (optional)</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="07123 456 789"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="How can this garage help you?"
        />
      </div>
      <button
        type="submit"
        disabled={sending || !recaptchaReady}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
