import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  return (
    <Link
      to={`/venues/${venue.id}`}
      className="
        group
        block
        w-full
        h-[400px]
        bg-white
        rounded-lg
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition-shadow
        border-b-neutral-medium
        no-underline
      "
    >
      {/* Image */}
      <div className="h-[250px] overflow-hidden">
        {venue.media?.[0]?.url ? (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || venue.name}
            className="
              w-full
              h-full
              object-cover
              transform
              transition-transform
              duration-300
              group-hover:scale-110
              group-active:scale-105
            "
          />
        ) : (
          <img
            src="/full-logo.svg"
            alt={venue.name}
            className="
              w-full
              h-full
              object-contain
              p-2
              transform
              transition-transform
              duration-300
              group-hover:scale-105
              group-active:scale-95
            "
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[150px]">
        {/* Title and Rating */}
        <div className="flex items-center justify-between mb-2">
          <h3
            className="
              text-lg
              font-normal
              text-gray-900
              truncate
            "
            title={venue.name}
          >
            {venue.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm">{venue.rating ?? 0}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span
            className="
              text-gray-600
              text-sm
              truncate
            "
            title={
              venue.location.country && venue.location.city
                ? `${venue.location.country}, ${venue.location.city}`
                : 'No location provided'
            }
          >
            {venue.location.country && venue.location.city
              ? `${venue.location.country}, ${venue.location.city}`
              : 'No location provided'}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline">
          <span className="text-lg font-normal">${venue.price ?? 0}</span>
          <span className="text-gray-600 text-sm ml-1">/night</span>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
