import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  const placeholderImage = "/full-logo.svg"; // Ensure this path is correct and points to the placeholder image in the public directory

  return (
    <Link 
      to={`/venues/${venue.id}`}
      className="block w-full h-[400px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow no-underline border-b-neutral-medium"
    >
      {/* Image */}
      <div className="h-[250px]">
        {venue.media?.[0]?.url ? (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/full-logo.svg"
            alt={venue.name}
            className="w-full h-full object-contain p-2"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-normal text-gray-900">{venue.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm">{venue.rating || 4}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600 text-sm">
            {venue.location.country && venue.location.city
              ? `${venue.location.country}, ${venue.location.city}`
              : "No location provided"}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <span className="text-lg font-normal">${venue.price || 0}</span>
          <span className="text-gray-600 text-sm ml-1">/person</span>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;