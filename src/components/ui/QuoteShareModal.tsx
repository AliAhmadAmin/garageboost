"use client";

import { useState } from "react";
import { Mail, MessageSquare, X } from "lucide-react";
import { Card } from "./Card";

interface QuoteShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  vrm: string;
  totalPrice: number;
  onSendEmail?: () => Promise<void>;
  onSendSMS?: () => Promise<void>;
}

export function QuoteShareModal({
  isOpen,
  onClose,
  vrm,
  totalPrice,
  onSendEmail,
  onSendSMS,
}: QuoteShareModalProps) {
  const [method, setMethod] = useState<"email" | "sms">("email");
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSend = async () => {
    setError("");

    if (!contact.trim()) {
      setError("Please enter a contact method");
      return;
    }

    if (method === "email" && !contact.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (method === "sms" && contact.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      if (method === "email" && onSendEmail) {
        await onSendEmail();
      } else if (method === "sms" && onSendSMS) {
        await onSendSMS();
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 z-40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-4 p-4 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Share Quote</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Quote Summary</p>
            <p className="text-white font-bold">{vrm}</p>
            <p className="text-green-400 font-bold text-lg">£{(totalPrice / 100).toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Send via:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setMethod("email")}
                className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  method === "email"
                    ? "border-blue-600 bg-blue-600/10 text-blue-400"
                    : "border-slate-700 text-slate-400 hover:border-slate-600"
                }`}
              >
                <Mail size={18} />
                Email
              </button>
              <button
                onClick={() => setMethod("sms")}
                className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  method === "sms"
                    ? "border-blue-600 bg-blue-600/10 text-blue-400"
                    : "border-slate-700 text-slate-400 hover:border-slate-600"
                }`}
              >
                <MessageSquare size={18} />
                SMS
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              {method === "email" ? "Email Address" : "Phone Number"}
            </label>
            <input
              type={method === "email" ? "email" : "tel"}
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setError("");
              }}
              placeholder={method === "email" ? "customer@example.com" : "+44 1234 567890"}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors"
            >
              {loading ? "Sending..." : "Send Quote"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
