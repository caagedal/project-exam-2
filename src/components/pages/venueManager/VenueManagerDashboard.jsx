import React, { useState } from 'react';
import useManagerVenues from '../../../js/api/useManagerVenues';
import useAuthStore from '../../../js/store/useAuthStore';
import { BASE_URL, VENUES_URL, API_KEY } from '../../../js/constants';
import UpdateVenueModal from '../../modals/UpdateVenueModal';
import CreateVenueModal from '../../modals/CreateVenueModal';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';

/**
 * Props for VenueManagerDashboard component.
 *
 * @typedef {Object} VenueManagerDashboardProps
 */

/**
 * Dashboard for venue managers to view, create, update, and delete venues.
 *
 * @returns {JSX.Element} The venue manager dashboard element.
 */
export default function VenueManagerDashboard() {
  const { venues, loading, error, refetch } = useManagerVenues();
  const { token } = useAuthStore();
  const [editingVenue, setEditingVenue] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /**
   * Deletes a venue via API and refreshes the list.
   * @param {number|string} venueId - ID of the venue to delete.
   */
  async function handleDelete(venueId) {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;

    try {
      const response = await fetch(
        `${BASE_URL}${VENUES_URL}/${venueId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': API_KEY,
          },
        }
      );

      if (response.status !== 204) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message || 'Error deleting venue');
      }

      refetch();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-neutral-dark'>Your Venues</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className='flex items-center gap-2 px-4 py-2 bg-blue-main text-white rounded hover:bg-blue-600 transition'
        >
          <Plus size={16} />
          Create Venue
        </button>
      </div>

      {loading && <p className='text-neutral-medium'>Loading your venues...</p>}
      {error && <p className='text-warning'>Error: {error.message || error}</p>}
      {!loading && !error && venues.length === 0 && (
        <p className='text-neutral-medium'>You have not created any venues yet.</p>
      )}

      {!loading && !error && venues.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {venues.map(venue => (
            <div
              key={venue.id}
              className='border-b-neutral-medium rounded-lg bg-white shadow-md overflow-hidden'
            >
              <div className='aspect-video relative'>
                {venue.media?.[0]?.url ? (
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-neutral-light flex items-center justify-center'>
                    <p className='text-neutral-medium'>No image available</p>
                  </div>
                )}
              </div>

              <div className='p-4 space-y-3'>
                <h2 className='text-xl font-semibold text-neutral-dark line-clamp-1'>{venue.name}</h2>
                <p className='text-sm text-neutral-medium line-clamp-2'>{venue.description}</p>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
                  <p className='text-blue-main font-medium'>${venue.price}/night</p>
                  {venue.bookings && (
                    <p className='text-neutral-medium'>{venue.bookings.length} bookings</p>
                  )}
                </div>

                <div className='flex flex-col sm:flex-row gap-2 pt-2'>
                  <button
                    onClick={() => window.location.assign(`/venues/${venue.id}`)}
                    className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-main text-white rounded hover:bg-blue-main/90 transition'
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => setEditingVenue(venue)}
                    className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green text-white rounded hover:bg-green/90 transition'
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-warning text-white rounded hover:bg-warning/90 transition'
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateVenueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => {
          setIsCreateModalOpen(false);
          refetch();
        }}
      />

      {editingVenue && (
        <UpdateVenueModal
          isOpen
          onClose={() => setEditingVenue(null)}
          venue={editingVenue}
          onUpdated={() => {
            setEditingVenue(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
