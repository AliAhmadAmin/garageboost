"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { StarSelect } from "@/components/ui/StarRating";

interface ReviewFormProps {
  garageSlug: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ garageSlug, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/garages/public/${garageSlug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          title,
          content,
          customerName,
          customerEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit review");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setTitle("");
        setContent("");
        setCustomerName("");
        setCustomerEmail("");
        setRating(5);
        setSubmitted(false);
        if (onSuccess) onSuccess();
      }, 3000);
    } catch (error) {
      setError("Failed to submit review");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-6 bg-emerald-50 border-2 border-emerald-200">
        <p className="text-emerald-700 font-semibold">
          ✓ Thank you for your review! It will be displayed after approval.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating *
          </label>
          <StarSelect value={rating} onChange={setRating} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Excellent Service"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Share your experience with this garage..."
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        <p className="text-xs text-gray-500">
          Your review will be published after moderation.
        </p>
      </form>
    </Card>
  );
}
