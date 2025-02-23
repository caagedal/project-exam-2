import React from "react";
import useManagerVenues from "../../../js/api/useManagerVenues";
import useAuthStore from "../../../js/store/useAuthStore";
import { BASE_URL, VENUES_URL, API_KEY } from "../../../js/constants";

export default function VenueManagerDashboard() {
  const { venues, loading, error } = useManagerVenues();
  const { token } = useAuthStore();
  
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
      // Refresh the page or update state accordingly.
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Venues</h1>
      
      {loading && <p>Loading your venues...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {!loading && !error && venues.length === 0 && (
        <p>You have not created any venues yet.</p>
      )}
      {!loading && !error && venues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="border p-4 rounded flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{venue.name}</h2>
                <p className="text-sm text-gray-600">{venue.description}</p>
                {venue.bookings && (
                  <p className="mt-2">
                    Bookings: {venue.bookings.length}
                  </p>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <button 
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(venue.id)}
                >
                  Delete
                </button>
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => window.location.assign(`/venues/${venue.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
