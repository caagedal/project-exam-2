import React, { useState } from "react";
import useManagerVenues from "../../../js/api/useManagerVenues";
import useAuthStore from "../../../js/store/useAuthStore";
import { BASE_URL, VENUES_URL, API_KEY } from "../../../js/constants";
import UpdateVenueModal from "../../modals/UpdateVenueModal";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function VenueManagerDashboard() {
  const { venues, loading, error } = useManagerVenues();
  const { token } = useAuthStore();
  const [editingVenue, setEditingVenue] = useState(null);
  
  const handleDelete = async (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      const response = await fetch(`${BASE_URL}${VENUES_URL}/${venueId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      if (response.status !== 204) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message || "Error deleting venue");
      }
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-neutral-dark">Your Venues</h1>
      
      {loading && <p className="text-neutral-medium">Loading your venues...</p>}
      {error && <p className="text-warning">Error: {error.message}</p>}
      {!loading && !error && venues.length === 0 && (
        <p className="text-neutral-medium">You have not created any venues yet.</p>
      )}
      
      {!loading && !error && venues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="border rounded-lg bg-white shadow-md overflow-hidden"
            >
              {/* Venue Image */}
              <div className="aspect-video relative">
                {venue.media?.[0]?.url ? (
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-light flex items-center justify-center">
                    <p className="text-neutral-medium">No image available</p>
                  </div>
                )}
              </div>

              {/* Venue Details */}
              <div className="p-4 space-y-3">
                <h2 className="text-xl font-semibold text-neutral-dark line-clamp-1">
                  {venue.name}
                </h2>
                <p className="text-sm text-neutral-medium line-clamp-2">
                  {venue.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-blue-main font-medium">
                    ${venue.price}/night
                  </p>
                  {venue.bookings && (
                    <p className="text-neutral-medium">
                      {venue.bookings.length} bookings
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.location.assign(`/venues/${venue.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-main text-white rounded hover:bg-blue-600 transition"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => setEditingVenue(venue)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green text-white rounded hover:bg-green/90 transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-warning text-white rounded hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingVenue && (
        <UpdateVenueModal
        isOpen={!!editingVenue}
        onClose={() => setEditingVenue(null)}
        venue={editingVenue}
        onUpdated={() => {
          // Refresh your venues list here
          window.location.reload();
        }}
      />
      )}
    </div>
  );
}


