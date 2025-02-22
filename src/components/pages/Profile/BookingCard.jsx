
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

// BookingCard.jsx
export default function BookingCard({ booking }) {
  return (
    <div className="border text-neutral-dark border-neutral-b rounded-2xl hover:shadow-md transition-shadow group">
      {booking.venue.media?.[0]?.url && (
        <div className="aspect-video mb-4 overflow-hidden rounded-t-2xl">
          <img
            src={booking.venue.media[0].url}
            alt={booking.venue.media[0].alt || "Venue image"}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      <div className="space-y-3 p-4 flex flex-col">
        <h3 className="text-lg font-semibold">{booking.venue.name}</h3>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-blue-main" />
          <span>
            {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2  text-blue-main" />
          <span>{booking.guests} guests</span>
        </div>
        <Link
          to={`/venues/${booking.venue.id}`}
          className="flex align-middle justify-center text-white bg-green hover:text-blue-800 font-medium mt-2 py-3 rounded-2xl"
        >
          View venue
        </Link>
      </div>
    </div>
  );
}