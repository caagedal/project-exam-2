import React, { useState } from "react";
import { Calendar, Users, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL, BOOKINGS_URL, API_KEY } from "../../../js/constants";
import useAuthStore from "../../../js/store/useAuthStore";
import Modal from "../../modals/Modal";

export default function BookingCard({ booking, onCancel }) {
  const { token } = useAuthStore();
  const [isCancelling, setIsCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [error, setError] = useState(null);

  const handleCancelBooking = async () => {
    setIsCancelling(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}${BOOKINGS_URL}/${booking.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Failed to cancel booking");
      }

      // Call the onCancel callback to update the parent component's state
      onCancel(booking.id);

      // Reload the page to fetch updated bookings
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsCancelling(false);
      setConfirmCancel(false);
    }
  };

  return (
    <div className="border text-neutral-dark border-neutral-b rounded-2xl hover:shadow-md transition-shadow group">
      {booking.venue?.media?.[0]?.url && (
        <div className="aspect-video mb-4 overflow-hidden rounded-t-2xl">
          <img
            src={booking.venue.media[0].url}
            alt={booking.venue.media[0].alt || "Venue image"}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      <div className="space-y-3 p-4 flex flex-col">
        <h3 className="text-lg font-semibold">{booking.venue?.name || "Unknown Venue"}</h3>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-blue-main" />
          <span>
            {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2 text-blue-main" />
          <span>{booking.guests} guests</span>
        </div>
        {booking.venue && (
          <Link
            to={`/venues/${booking.venue.id}`}
            className="flex align-middle justify-center text-white bg-green hover:bg-green/90 font-medium mt-2 py-3 rounded-2xl transition-colors"
          >
            View venue
          </Link>
        )}
        <button
          onClick={() => setConfirmCancel(true)}
          className="flex items-center justify-center text-warning font-medium"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Cancel booking
        </button>
        {error && (
          <div className="text-warning p-2 rounded-lg bg-warning/10 mt-2">
            <p>{error}</p>
          </div>
        )}
      </div>

      <Modal isOpen={confirmCancel} onClose={() => setConfirmCancel(false)}>
        <h2 className="text-xl font-bold text-neutral-dark text-center">
          Confirm Cancellation
        </h2>
        <p className="mt-4 text-center text-neutral-dark">
          Are you sure you want to cancel this booking?
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleCancelBooking}
            disabled={isCancelling}
            className="flex items-center justify-center text-green "
          >
            {isCancelling ? "Cancelling..." : "Confirm"}
          </button>
          <button
            onClick={() => setConfirmCancel(false)}
            className="flex items-center justify-center text-warning"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}