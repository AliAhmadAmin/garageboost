"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatUKDate } from "@/lib/uk-date";
import { useToast } from "@/components/ui/Toast";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  customerName: string;
  customerEmail: string;
  status: string;
  response: string | null;
  createdAt: string;
}

export default function ReviewsPage() {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");

  const garageId = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("garage-data") || "{}")?.id
    : null;

  useEffect(() => {
    if (garageId) {
      fetchReviews();
    }
  }, [garageId, filter]);

  const fetchReviews = async () => {
    try {
      const url = filter === "ALL"
        ? `/api/garages/${garageId}/reviews`
        : `/api/garages/${garageId}/reviews?status=${filter}`;

      const res = await fetch(url);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      const res = await fetch(`/api/garages/${garageId}/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      });

      if (!res.ok) {
        addToast("Failed to approve review", "error");
        return;
      }

      addToast("Review approved!", "success");
      fetchReviews();
    } catch (error) {
      console.error("Error approving review:", error);
      addToast("Failed to approve review", "error");
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!confirm("Are you sure you want to reject this review?")) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });

      if (!res.ok) {
        addToast("Failed to reject review", "error");
        return;
      }

      addToast("Review rejected!", "success");
      fetchReviews();
    } catch (error) {
      console.error("Error rejecting review:", error);
      addToast("Failed to reject review", "error");
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        addToast("Failed to delete review", "error");
        return;
      }

      addToast("Review deleted!", "success");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      addToast("Failed to delete review", "error");
    }
  };

  const handleSubmitResponse = async (reviewId: string) => {
    if (!responseText.trim()) {
      addToast("Please enter a response", "error");
      return;
    }

    try {
      const res = await fetch(`/api/garages/${garageId}/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: responseText }),
      });

      if (!res.ok) {
        addToast("Failed to submit response", "error");
        return;
      }

      addToast("Response submitted!", "success");
      setRespondingId(null);
      setResponseText("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting response:", error);
      addToast("Failed to submit response", "error");
    }
  };

  const formatDate = (dateStr: string) => {
    return formatUKDate(dateStr, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "success" | "warning" | "danger" | "blue"> = {
      PENDING: "warning",
      APPROVED: "success",
      REJECTED: "danger",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const filterOptions = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading reviews...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-1">Manage and moderate customer feedback</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === option.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No reviews found</p>
          <p className="text-sm text-gray-400">
            {filter === "ALL"
              ? "Reviews will appear here when customers submit them"
              : `No ${filter.toLowerCase()} reviews`}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} size="sm" showText={false} />
                    <h3 className="text-lg font-bold text-gray-900">{review.title}</h3>
                    {getStatusBadge(review.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{review.customerName}</p>
                </div>
                <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
              </div>

              <p className="text-gray-700 mb-4">{review.content}</p>

              {review.response && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Your Response:</p>
                  <p className="text-sm text-blue-800">{review.response}</p>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                {review.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(review.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}

                {review.status === "APPROVED" && !review.response && (
                  <button
                    onClick={() => setRespondingId(review.id)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                  >
                    Respond
                  </button>
                )}

                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium ml-auto"
                >
                  Delete
                </button>
              </div>

              {respondingId === review.id && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Write your response:</p>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg mb-2"
                    placeholder="Thank you for your feedback..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmitResponse(review.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Submit Response
                    </button>
                    <button
                      onClick={() => {
                        setRespondingId(null);
                        setResponseText("");
                      }}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
