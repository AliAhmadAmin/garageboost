"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success - show confirmation message
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PublicLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-black mb-6">Get In Touch</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Have questions? We&apos;re here to help your garage succeed.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:cs@bizzboost.uk" className="text-blue-600 hover:text-blue-700 font-medium">
                      cs@bizzboost.uk
                    </a>
                    <p className="text-sm text-slate-500 mt-1">We typically respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone & WhatsApp</h3>
                    <a href="tel:07380448187" className="text-blue-600 hover:text-blue-700 font-medium">
                      07380 448187
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Mon-Fri, 8am-6pm GMT • Also available on WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Office Location</h3>
                    <p className="text-slate-600">
                      Great Portland St, London<br />
                      W1W 5PF, United Kingdom
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Serving garages across the entire UK</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-slate-900 mb-3">Quick Support</h3>
                <p className="text-slate-600 mb-4">
                  Already a customer? Log in to your dashboard for instant support chat and priority assistance.
                </p>
                <a
                  href="/login"
                  className="inline-block text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Go to Dashboard →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-slate-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us A Message</h2>
                
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                    <p className="font-medium">✓ Thank you for contacting us!</p>
                    <p className="text-sm mt-1">We&apos;ve received your message and will get back to you shortly at the email or phone number you provided.</p>
                  </div>
                ) : null}

                {error ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                    <p className="font-medium">Error sending message</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="demo">Request a Demo</option>
                      <option value="pricing">Pricing Question</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
