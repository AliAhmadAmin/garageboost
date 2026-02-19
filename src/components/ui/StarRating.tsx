import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function StarRating({ rating, size = "md", showText = true }: StarRatingProps) {
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize}
            className={
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      {showText && <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>}
    </div>
  );
}

interface StarSelectProps {
  value: number;
  onChange: (rating: number) => void;
}

export function StarSelect({ value, onChange }: StarSelectProps) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
          type="button"
        >
          <Star
            size={32}
            className={
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }
          />
        </button>
      ))}
    </div>
  );
}
