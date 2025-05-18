import React from 'react';
import { Wifi, Car, Coffee, Dog, Users } from 'lucide-react';

/**
 * Meta options for venue amenities.
 *
 * @typedef {Object} AmenitiesMeta
 * @property {boolean} wifi
 * @property {boolean} parking
 * @property {boolean} breakfast
 * @property {boolean} pets
 */

/**
 * Props for Amenities component.
 *
 * @typedef {Object} AmenitiesProps
 * @property {AmenitiesMeta} meta - Availability flags for each amenity.
 * @property {number} maxGuests - Maximum number of guests allowed.
 */

/**
 * Renders a list of venue amenities and the maximum guest count.
 * Each amenity displays an icon and availability status.
 *
 * @param {AmenitiesProps} props - Component props.
 * @returns {JSX.Element} The amenities list.
 */
export default function Amenities({ meta, maxGuests }) {
  const amenitiesList = [
    { name: 'WiFi', available: meta.wifi, Icon: Wifi },
    { name: 'Parking', available: meta.parking, Icon: Car },
    { name: 'Breakfast', available: meta.breakfast, Icon: Coffee },
    { name: 'Pets', available: meta.pets, Icon: Dog },
  ];

  return (
    <div className='mt-4'>
      <h3 className='text-lg font-semibold text-neutral-dark mb-2'>Amenities</h3>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center gap-2 text-neutral-dark font-medium'>
          <Users className='w-5 h-5 text-green fill-green' />
          Max Guests: {maxGuests}
        </div>
        {amenitiesList.map(({ name, available, Icon }) => (
          <div
            key={name}
            className='flex items-center gap-2 text-neutral-dark font-medium'
          >
            <Icon
              className={`w-5 h-5 ${
                available ? 'text-green fill-green' : 'text-warning fill-warning'
              }`}
            />
            {name}: {' '}
            <span className={available ? 'text-green' : 'text-warning'}>
              {available ? 'Yes' : 'No'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}