import React from 'react';
import { Star } from 'lucide-react';

/**
 * Props for StarRating component.
 *
 * @typedef {Object} StarRatingProps
 * @property {number} rating - Numeric rating value (e.g., 3.5).
 */

/**
 * Renders a star-based rating display. Only full stars are shown.
 *
 * @param {StarRatingProps} props - Component props.
 * @returns {JSX.Element} A row of star icons representing the rating.
 */
export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);

  return (
    <div className='flex gap-1 py-2'>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={index}
          className='w-5 h-5 text-yellow-500 fill-yellow-500'
        />
      ))}
    </div>
  );
}
