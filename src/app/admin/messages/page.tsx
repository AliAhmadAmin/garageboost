"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Send, Mail, MessageSquare, DollarSign, TrendingUp, Calendar } from "lucide-react";

interface Garage {
  id: string;
  name: string;
  ownerName: string;
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const [garages, setGarages] = useState<Garage[]>([]);
  const [selectedGarages, setSelectedGarages] = useState<string[]>([]);
  const [channel, setChannel] = useState<"email" | "sms">("email");
  const [messageType, setMessageType] = useState<"payment" | "promotional" | "custom">("promotional");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState({ sent: 0, openRate: 0, conversion: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    loadGarages();
    const garageId = searchParams.get("garageId");
    if (garageId) {
      setSelectedGarages([garageId]);
    }
  }, [searchParams]);

  const loadGarages = async () => {
    const res = await fetch("/api/garages?includeAll=true");
    const data = await res.json();
    setGarages(data);
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/admin/messages/stats');
        if (res.ok) {
          const d = await res.json();
          setStats({
            sent: d.sent ?? 0,
            openRate: d.openRate ?? 0,
            conversion: d.conversion ?? 0,
          });
        }
      } catch (e) {
        // ignore
      } finally {
        setStatsLoading(false);
      }
    };
    loadStats();
  }, []);

  const templates = {
    payment: {
      subject: "Payment Reminder - Garage Boost Subscription",
      message: `Hi {name},\n\nThis is a friendly reminder that your Garage Boost subscription payment is due.\n\nTo avoid service interruption, please update your payment details in your account settings.\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nGarage Boost Team`,
    },
    promotional: {
      subject: "Special Offer - Upgrade Your Garage Boost Plan",
      message: `Hi {name},\n\nWe're excited to share a special promotion just for you!\n\n🎉 Get 20% OFF when you upgrade to our Pro plan this month.\n\nPro features include:\n• Unlimited MOT lookups\n• Advanced analytics\n• Priority support\n• Custom branding\n\nClaim your discount: [Upgrade Now]\n\nOffer expires soon!\n\nBest regards,\nGarage Boost Team`,
    },
  };

  const handleTemplateSelect = (type: "payment" | "promotional" | "custom") => {
    setMessageType(type);
    if (type !== "custom") {
      setSubject(templates[type].subject);
      setMessage(templates[type].message);
    } else {
      setSubject("");
      setMessage("");
    }
  };

  const handleSend = async () => {
    if (selectedGarages.length === 0) {
      alert("Please select at least one garage");
      return;
    }
    if (!subject || !message) {
      alert("Please fill in subject and message");
      return;
    }

    setSending(true);
    try {
      // Here you would call your messaging API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Message sent to ${selectedGarages.length} garage(s)!`);
      setSelectedGarages([]);
      setSubject("");
      setMessage("");
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const toggleGarage = (id: string) => {
    setSelectedGarages((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedGarages(garages.map((g) => g.id));
  };

  const clearAll = () => {
    setSelectedGarages([]);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Message Center</h1>
            <p className="text-slate-400 mt-2">Send payment reminders, promotions, and announcements</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recipients Selection */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Recipients</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAll}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      All
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-xs text-slate-400 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {garages.map((garage) => (
                    <label
                      key={garage.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGarages.includes(garage.id)}
                        onChange={() => toggleGarage(garage.id)}
                        className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{garage.name}</p>
                        <p className="text-xs text-slate-400 truncate">{garage.ownerName}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400">
                    Selected: <span className="font-bold text-white">{selectedGarages.length}</span> / {garages.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Composer */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Compose Message</h3>

                {/* Channel Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-3">Channel</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setChannel("email")}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        channel === "email"
                          ? "bg-blue-500/20 border-blue-500 text-blue-400"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <Mail className="mx-auto mb-2" size={24} />
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs opacity-70 mt-1">Best for detailed messages</p>
                    </button>
                    <button
                      onClick={() => setChannel("sms")}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        channel === "sms"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <MessageSquare className="mx-auto mb-2" size={24} />
                      <p className="text-sm font-medium">SMS</p>
                      <p className="text-xs opacity-70 mt-1">Quick, high open rate</p>
                    </button>
                  </div>
                </div>

                {/* Message Type Templates */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    onClick={() => handleTemplateSelect("payment")}
                    className={`p-4 rounded-lg border transition-all ${
                      messageType === "payment"
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <DollarSign className="mx-auto mb-2" size={24} />
                    <p className="text-sm font-medium">Payment Reminder</p>
                  </button>

                  <button
                    onClick={() => handleTemplateSelect("promotional")}
                    className={`p-4 rounded-lg border transition-all ${
                      messageType === "promotional"
                        ? "bg-blue-500/20 border-blue-500 text-blue-400"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <TrendingUp className="mx-auto mb-2" size={24} />
                    <p className="text-sm font-medium">Promotional</p>
                  </button>

                  <button
                    onClick={() => handleTemplateSelect("custom")}
                    className={`p-4 rounded-lg border transition-all ${
                      messageType === "custom"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <MessageSquare className="mx-auto mb-2" size={24} />
                    <p className="text-sm font-medium">Custom</p>
                  </button>
                </div>

                {/* Subject (Email only) */}
                {channel === "email" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter email subject..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Message Body */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message {channel === "sms" && `(${message.length}/160 characters)`}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => {
                      if (channel === "sms" && e.target.value.length > 160) return;
                      setMessage(e.target.value);
                    }}
                    placeholder={channel === "email" 
                      ? "Enter your message... Use {name} to insert garage owner's name."
                      : "Enter SMS message (max 160 chars)... Use {name} for personalization."
                    }
                    rows={channel === "email" ? 12 : 4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {channel === "email" 
                      ? `Pro tip: Use {name} to personalize the message with each garage owner's name`
                      : `SMS is limited to 160 characters. Keep it short and clear. Use {name} for personalization.`
                    }
                  </p>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={sending || selectedGarages.length === 0 || (channel === "email" && !subject)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Send size={18} />
                  {sending ? "Sending..." : `Send ${channel.toUpperCase()} to ${selectedGarages.length} Garage(s)`}
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <Mail className="text-blue-400 mb-2" size={20} />
                  <p className="text-2xl font-bold">{statsLoading ? '—' : stats.sent.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">Messages Sent</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <Calendar className="text-emerald-400 mb-2" size={20} />
                  <p className="text-2xl font-bold">{statsLoading ? '—' : `${stats.openRate}%`}</p>
                  <p className="text-xs text-slate-400">Open Rate</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <TrendingUp className="text-amber-400 mb-2" size={20} />
                  <p className="text-2xl font-bold">{statsLoading ? '—' : `${stats.conversion}%`}</p>
                  <p className="text-xs text-slate-400">Conversion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-slate-400">Loading...</div>
        </div>
      </AdminLayout>
    }>
      <MessagesContent />
    </Suspense>
  );
}
