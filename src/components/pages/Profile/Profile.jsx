import React, {useState} from "react";
import useAuthStore from "../../../js/store/useAuthStore";
import { Loader, Upload} from "lucide-react";
import useBookings from "../../../js/api/useBookings";
import BookingCard from "./bookingCard";
import UpdateProfileModal from "../../modals/EditProfile";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { bookings, loading, error } = useBookings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Please log in to view this profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Banner */}
      <div className="relative h-48 rounded-2xl overflow-hidden bg-neutral-light">
        <img
          src={user.banner?.url || "/api/placeholder/1200/300"}
          alt={`${user.name}'s banner` || "Profile banner"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 -mt-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white shrink-0">
            <img
              src={user.avatar?.url || "/api/placeholder/96/96"}
              alt={user.avatar?.alt || "Profile avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:mb-1">
            <h1 className="text-2xl font-bold text-text-dark">{user.name}</h1>
            <p className="text-neutral-medium">{user.email}</p>
            
          </div>
          
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-main text-white rounded-2xl hover:bg-blue-main/90 transition-colors sm:mb-1"
        >
          <Upload size={16} />
          Update profile
        </button>
      </div>
      <p className="mt-2 text-neutral-dark">{user.bio || "No bio available"}</p>

      {/* Bookings Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-text-dark">My Bookings</h2>
        
        {loading && (
          <div className="flex justify-center">
            <Loader className="animate-spin text-blue-main" />
          </div>
        )}

        {error && (
          <div className="text-warning p-4 rounded-lg bg-warning/10">
            <p>Error loading bookings: {error.message}</p>
          </div>
        )}

        {!loading && !error && (!bookings || bookings.length === 0) && (
          <p className="text-neutral-medium">No bookings yet</p>
        )}

        {!loading && !error && bookings && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;