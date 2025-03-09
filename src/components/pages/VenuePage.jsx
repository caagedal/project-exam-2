import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { BASE_URL, VENUES_URL } from "../../js/constants";
import Loader from "../Loader";
import VenueGallery from "../Gallery/VenueGallery";
import StarRating from "../StarRating";
import Amenities from "../Amenities";
import BookingForm from "../BookingForm";

export default function VenuePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { venueID } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url);
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData(`${BASE_URL}${VENUES_URL}/${venueID}?_bookings=true&_owner=true`);
  }, [venueID]);

 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-[var(--color-warning)] font-semibold">
        Error fetching venue!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Gallery */}
      <VenueGallery images={data.media.map((img) => img.url)} />

      {/* Venue Information & Booking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: Venue Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">{data.name}</h1>
            <p className="flex items-center gap-2 text-[var(--color-neutral-medium)]">
              <MapPin className="w-5 h-5" />
              {data.location.country && data.location.city
                ? `${data.location.country}, ${data.location.city}`
                : "No location provided"}
            </p>
            <StarRating rating={data.rating} />
            <p className="text-xl font-semibold text-[var(--color-blue-main)]">${data.price} / night</p>
          </div>
          <Amenities meta={data.meta} maxGuests={data.maxGuests} />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-neutral-dark)]">Description</h2>
            <p className="text-[var(--color-neutral-medium)] leading-relaxed">{data.description}</p>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="w-full max-w-md p-6 bg-[var(--color-white)] shadow-lg rounded-lg border border-[var(--color-neutral-b)]">
          <BookingForm bookings={data.bookings} venue={data} />
        </div>
      </div>
    </div>
  );
}