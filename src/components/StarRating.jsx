import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex gap-1 py-2">
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <Star key={index} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ))}
    </div>
  );
};

export default StarRating;
