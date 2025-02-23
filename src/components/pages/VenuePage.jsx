import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import { BASE_URL, VENUES_URL, API_KEY } from "../../js/constants";
import UpdateVenueModal from "../modals/UpdateVenueModal";
import ImageCarouselModal from "../modals/ImageCarouselModal";

export default function VenuePage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}${VENUES_URL}/${id}?_bookings=true&_owner=true`,  // ✅ Added `_owner=true`
          {
            headers: {
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );
  
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.errors?.[0]?.message || "Error fetching venue");
        }
  
        const json = await response.json();
        console.log("Fetched Venue Data:", json.data); // ✅ Debugging log
        setVenue(json.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVenue();
  }, [id]);
  

  // 🚨 Prevent error: Ensure `venue` exists before trying to access `venue.owner`
  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (!venue) return <p>Venue not found.</p>;

  // ✅ Now that `venue` is defined, check ownership safely
  const isOwner = user && venue.owner && user.name === venue.owner.name;

  console.log("Logged-in User:", user);
  console.log("Venue Owner:", venue.owner);
  console.log("Is Owner?", isOwner);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Venue Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">{venue.name}</h1>
        {isOwner && (
          <button
            onClick={() => setEditOpen(true)}
            className="px-4 py-2 bg-blue-600 text-text-dark rounded"
          >
            Edit Venue
          </button>
        )}
      </div>

      {/* Image Gallery */}
      <div className="mb-6">
        {venue.media?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venue.media.map((item, idx) => (
              <img
                key={idx}
                src={item.url}
                alt={item.alt || `Image ${idx + 1}`}
                className="w-full h-64 object-cover rounded cursor-pointer"
                onClick={() => {
                  setCarouselIndex(idx);
                  setCarouselOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p>No images available</p>
          </div>
        )}
      </div>

      {/* Venue Details */}
      <div className="mb-6">
        <p className="text-lg mb-2">{venue.description}</p>
        <p className="text-lg font-semibold">Price: ${venue.price} per night</p>
        <p className="text-lg font-semibold">Max Guests: {venue.maxGuests}</p>
        <p className="text-lg font-semibold">Rating: {venue.rating} ★</p>
      </div>

      {/* Amenities */}
      {venue.meta && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Amenities</h2>
          <ul className="list-disc list-inside">
            {venue.meta.wifi && <li>WiFi</li>}
            {venue.meta.parking && <li>Parking</li>}
            {venue.meta.breakfast && <li>Breakfast</li>}
            {venue.meta.pets && <li>Pets Allowed</li>}
          </ul>
        </div>
      )}

      {/* Location */}
      {venue.location && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Location</h2>
          <p>
            {venue.location.address ? `${venue.location.address}, ` : ""}
            {venue.location.city ? `${venue.location.city}, ` : ""}
            {venue.location.zip ? `${venue.location.zip}, ` : ""}
            {venue.location.country ? `${venue.location.country}` : ""}
          </p>
          {venue.location.continent && <p>Continent: {venue.location.continent}</p>}
        </div>
      )}

      {/* Book Now Button */}
      {!isOwner && user && (
        <div className="mb-6">
          <Link to={`/venues/${venue.id}/book`} className="px-4 py-2 bg-green-600 text-white rounded">
            Book Now
          </Link>
        </div>
      )}

      {/* Bookings for Venue Owner */}
      {isOwner && venue.bookings?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Bookings</h2>
          <ul className="list-disc list-inside">
            {venue.bookings.map((booking) => (
              <li key={booking.id}>
                {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                {new Date(booking.dateTo).toLocaleDateString()} for {booking.guests} guest(s)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Edit Venue Modal */}
      {isOwner && editOpen && (
        <UpdateVenueModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          venue={venue}
        />
      )}

      {/* Image Carousel Modal */}
      {carouselOpen && (
        <ImageCarouselModal
          isOpen={carouselOpen}
          onClose={() => setCarouselOpen(false)}
          images={venue.media}
          initialIndex={carouselIndex}
        />
      )}
    </div>
  );
}
