"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Bell, Mail, MessageSquare, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface Vehicle {
  id: string;
  vrm: string;
  ownerName: string;
  make: string;
  model: string;
  motExpiry: string;
}

function GarageMessagesContent() {
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [channel, setChannel] = useState<"email" | "sms">("email");
  const [messageType, setMessageType] = useState<"mot_reminder" | "service_reminder" | "promotional" | "custom">("mot_reminder");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setVehicles(Array.isArray(data) ? data : []);
  };

  // Get unique customers
  const customers = vehicles.reduce((acc, v) => {
    if (!acc.find(c => c.ownerName === v.ownerName)) {
      acc.push({ ownerName: v.ownerName, vehicleCount: vehicles.filter(vh => vh.ownerName === v.ownerName).length });
    }
    return acc;
  }, [] as { ownerName: string; vehicleCount: number }[]);

  const templates = {
    mot_reminder: {
      subject: "MOT Expiry Reminder - {vrm}",
      message: `Hi {name},\n\nThis is a friendly reminder that the MOT for your {make} {typeApproval} {model} ({vrm}) is due to expire on {motExpiry}.\n\nBook your MOT with us today to avoid any inconvenience.\n\nCall us or reply to schedule.\n\nBest regards,\nYour Garage Team`,
    },
    service_reminder: {
      subject: "Service Reminder - {vrm}",
      message: `Hi {name},\n\nIt's time for your {make} {typeApproval} {model} ({vrm}) to have its regular service.\n\nRegular servicing keeps your vehicle running smoothly and helps prevent costly repairs.\n\nContact us to book your service appointment.\n\nBest regards,\nYour Garage Team`,
    },
    promotional: {
      subject: "Special Offer - Save on Services",
      message: `Hi {name},\n\nWe're offering 15% OFF all services this month!\n\nWhether you need an MOT, service, or repairs - we've got you covered.\n\nBook before month-end to claim your discount.\n\nBest regards,\nYour Garage Team`,
    },
  };

  const handleTemplateSelect = (type: typeof messageType) => {
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
    if (selectedCustomers.length === 0) {
      addToast("Please select at least one customer", "error");
      return;
    }
    if (channel === "email" && !subject) {
      addToast("Please enter a subject", "error");
      return;
    }
    if (!message) {
      addToast("Please enter a message", "error");
      return;
    }

    setSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addToast(`${channel.toUpperCase()} sent to ${selectedCustomers.length} customer(s)!`, "success");
      setSelectedCustomers([]);
    } catch (error) {
      addToast("Failed to send message", "error");
    } finally {
      setSending(false);
    }
  };

  const toggleCustomer = (name: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const selectAll = () => {
    setSelectedCustomers(customers.map((c) => c.ownerName));
  };

  const clearAll = () => {
    setSelectedCustomers([]);
  };

  // Filter customers based on message type
  const getFilteredCustomers = () => {
    if (messageType === "mot_reminder") {
      // Only show customers with MOT expiring in next 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const expiringVehicles = vehicles.filter(v => {
        const expiry = new Date(v.motExpiry);
        return expiry <= thirtyDaysFromNow && expiry > new Date();
      });
      
      return customers.filter(c => 
        expiringVehicles.some(v => v.ownerName === c.ownerName)
      );
    }
    return customers;
  };

  const filteredCustomers = getFilteredCustomers();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Reminders</h1>
        <p className="text-slate-600 mt-1">Send messages and automate MOT reminders for your customers</p>
      </header>

      {/* Automated Reminder Schedule */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Automated Reminder Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <Bell className="text-amber-500 mb-4" size={24} />
            <p className="text-slate-500 text-sm">30 Days Before</p>
            <p className="text-3xl font-bold text-slate-900">Auto</p>
            <p className="text-xs text-slate-500 mt-2">Automated reminders sent</p>
          </Card>
          <Card className="p-6">
            <Bell className="text-blue-500 mb-4" size={24} />
            <p className="text-slate-500 text-sm">14 Days Before</p>
            <p className="text-3xl font-bold text-slate-900">Auto</p>
            <p className="text-xs text-slate-500 mt-2">Automated reminders sent</p>
          </Card>
          <Card className="p-6">
            <Bell className="text-red-500 mb-4" size={24} />
            <p className="text-slate-500 text-sm">7 Days Before</p>
            <p className="text-3xl font-bold text-slate-900">Auto</p>
            <p className="text-xs text-slate-500 mt-2">Automated reminders sent</p>
          </Card>
        </div>
      </div>

      {/* Bulk Messaging */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Send Custom Messages</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipients */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recipients</h3>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-xs text-blue-600 hover:text-blue-700">
                  All
                </button>
                <button onClick={clearAll} className="text-xs text-slate-500 hover:text-slate-700">
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <label
                  key={customer.ownerName}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.ownerName)}
                    onChange={() => toggleCustomer(customer.ownerName)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{customer.ownerName}</p>
                    <p className="text-xs text-slate-500">{customer.vehicleCount} vehicle(s)</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Selected: <span className="font-bold text-slate-900">{selectedCustomers.length}</span> / {filteredCustomers.length}
              </p>
            </div>
          </div>
        </div>

        {/* Message Composer */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold mb-4">Compose Message</h3>

            {/* Channel Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Channel</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setChannel("email")}
                  className={`p-4 rounded-lg border transition-all ${
                    channel === "email"
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <Mail className="mx-auto mb-2" size={24} />
                  <p className="text-sm font-medium">Email</p>
                </button>
                <button
                  onClick={() => setChannel("sms")}
                  className={`p-4 rounded-lg border transition-all ${
                    channel === "sms"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <MessageSquare className="mx-auto mb-2" size={24} />
                  <p className="text-sm font-medium">SMS</p>
                </button>
              </div>
            </div>

            {/* Message Templates */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleTemplateSelect("mot_reminder")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  messageType === "mot_reminder"
                    ? "bg-red-50 border-red-500"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Clock size={20} className={messageType === "mot_reminder" ? "text-red-600" : "text-slate-400"} />
                <p className="text-sm font-medium mt-2">MOT Reminder</p>
              </button>
              <button
                onClick={() => handleTemplateSelect("service_reminder")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  messageType === "service_reminder"
                    ? "bg-amber-50 border-amber-500"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Calendar size={20} className={messageType === "service_reminder" ? "text-amber-600" : "text-slate-400"} />
                <p className="text-sm font-medium mt-2">Service Reminder</p>
              </button>
              <button
                onClick={() => handleTemplateSelect("promotional")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  messageType === "promotional"
                    ? "bg-blue-50 border-blue-500"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Send size={20} className={messageType === "promotional" ? "text-blue-600" : "text-slate-400"} />
                <p className="text-sm font-medium mt-2">Promotional</p>
              </button>
              <button
                onClick={() => handleTemplateSelect("custom")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  messageType === "custom"
                    ? "bg-emerald-50 border-emerald-500"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <MessageSquare size={20} className={messageType === "custom" ? "text-emerald-600" : "text-slate-400"} />
                <p className="text-sm font-medium mt-2">Custom</p>
              </button>
            </div>

            {/* Subject (Email only) */}
            {channel === "email" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message {channel === "sms" && `(${message.length}/160)`}
              </label>
              <textarea
                value={message}
                onChange={(e) => {
                  if (channel === "sms" && e.target.value.length > 160) return;
                  setMessage(e.target.value);
                }}
                placeholder={channel === "email" ? "Use {name}, {vrm}, {make}, {model}, {motExpiry}" : "Max 160 chars"}
                rows={channel === "email" ? 8 : 4}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                Variables: {"{name}"}, {"{vrm}"}, {"{make}"}, {"{model}"}, {"{motExpiry}"}
              </p>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending || selectedCustomers.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Send size={18} />
              {sending ? "Sending..." : `Send ${channel.toUpperCase()} to ${selectedCustomers.length} Customer(s)`}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function GarageMessagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-600">Loading...</div>}>
      <GarageMessagesContent />
    </Suspense>
  );
}
