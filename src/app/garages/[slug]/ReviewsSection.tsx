"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { formatUKDate } from "@/lib/uk-date";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  customerName: string;
  response: string | null;
  createdAt: string;
}

interface ReviewsSectionProps {
  garageSlug: string;
}

export default function ReviewsSection({ garageSlug }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [garageSlug]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/garages/public/${garageSlug}/reviews`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return formatUKDate(dateStr, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
        <div className="animate-pulse">
          <div className="h-20 bg-slate-200 rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
        <p className="text-slate-600 mt-1">
          {totalReviews === 0
            ? "No reviews yet. Be the first to review!"
            : `Based on ${totalReviews} review${totalReviews !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Average Rating Card */}
      {totalReviews > 0 && (
        <Card className="p-6 bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
            <div>
              <div className="text-5xl font-bold text-slate-900">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-slate-600 mt-1">out of 5</div>
            </div>
            <div className="col-span-1">
              <StarRating rating={averageRating} size="lg" showText={false} />
            </div>
            <div className="text-sm text-slate-600">
              <div className="font-semibold">{totalReviews}</div>
              <div>rating{totalReviews !== 1 ? "s" : ""}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <StarRating rating={review.rating} size="sm" showText={false} />
                  <h4 className="text-lg font-bold text-slate-900 mt-2">
                    {review.title}
                  </h4>
                </div>
                <span className="text-sm text-slate-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              <p className="text-slate-700 mb-3">{review.content}</p>

              <div className="text-sm text-slate-600">
                <strong>{review.customerName}</strong>
              </div>

              {review.response && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Garage Response:
                  </p>
                  <p className="text-sm text-blue-800">{review.response}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Leave a Review Button & Form */}
      <div className="mt-8">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Leave a Review
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors duration-200"
            >
              ← Close
            </button>
            <ReviewForm garageSlug={garageSlug} onSuccess={() => {
              fetchReviews();
              setShowForm(false);
            }} />
          </div>
        )}
      </div>
    </section>
  );
}
