import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

/**
 * Venue data structure.
 *
 * @typedef {Object} Venue
 * @property {number|string} id - Unique identifier for the venue.
 * @property {string} name - Name of the venue.
 * @property {number} [rating] - Rating of the venue (0-5).
 * @property {number} [price] - Price per night.
 * @property {Object} location - Location details.
 * @property {string} [location.country] - Country of the venue.
 * @property {string} [location.city] - City of the venue.
 * @property {{ url: string, alt?: string }[]} [media] - Array of media items.
 */

/**
 * Props for VenueCard component.
 *
 * @typedef {Object} VenueCardProps
 * @property {Venue} venue - Venue details to display.
 */

/**
 * Renders a card for a single venue, including image, name, rating, location, and price.
 *
 * @param {VenueCardProps} props - Component props.
 * @returns {JSX.Element} The venue card element.
 */
export default function VenueCard({ venue }) {
  const imageUrl = venue.media?.[0]?.url || '/full-logo.svg';
  const imageAlt = venue.media?.[0]?.alt || venue.name;
  const locationText =
    venue.location.country && venue.location.city
      ? `${venue.location.country}, ${venue.location.city}`
      : 'No location provided';

  return (
    <Link
      to={`/venues/${venue.id}`}
      className='group block w-full h-[400px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border-b-neutral-medium no-underline'
    >
      <div className='h-[250px] overflow-hidden'>
        <img
          src={imageUrl}
          alt={imageAlt}
          className='w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 group-active:scale-105'
        />
      </div>
      <div className='p-4 flex flex-col h-[150px]'>
        <div className='flex items-center justify-between mb-2'>
          <h3
            className='text-lg font-normal text-gray-900 truncate'
            title={venue.name}
          >
            {venue.name}
          </h3>
          <div className='flex items-center gap-1'>
            <Star className='w-4 h-4 text-yellow-400 fill-current' />
            <span className='text-sm'>{venue.rating ?? 0}</span>
          </div>
        </div>
        <div className='flex items-center gap-2 mb-2'>
          <MapPin className='w-4 h-4 text-blue-600' />
          <span className='text-gray-600 text-sm truncate' title={locationText}>
            {locationText}
          </span>
        </div>
        <div className='mt-auto flex items-baseline'>
          <span className='text-lg font-normal'>${venue.price ?? 0}</span>
          <span className='text-gray-600 text-sm ml-1'>/night</span>
        </div>
      </div>
    </Link>
  );
}