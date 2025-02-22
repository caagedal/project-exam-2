import React from "react";
import useAuthStore from "../../../js/store/useAuthStore";
import { Loader} from "lucide-react";
import useBookings from "../../../js/api/useBookings";
import BookingCard from "./bookingCard";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { bookings, loading, error } = useBookings();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Please log in to view this profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 text-neutral-dark">
      {/* Banner */}
      <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={user.banner?.url || "/api/placeholder/1200/300"}
          alt={`${user.name}'s banner` || "Profile banner"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex items-start space-x-4 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white">
          <img
            src={user.avatar?.url || "/api/placeholder/96/96"}
            alt={user.avatar?.alt || "Profile avatar"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pt-12">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
        
        {loading && (
          <div className="flex justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-red-500 p-4 rounded-lg bg-red-50">
            <p>Error loading bookings: {error.message}</p>
          </div>
        )}

        {!loading && !error && (!bookings || bookings.length === 0) && (
          <p className="text-gray-500">No bookings yet</p>
        )}

        {!loading && !error && bookings && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;



// <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="font-semibold text-lg">{booking.venue.name}</h3>
//                     <div className="space-y-2 mt-2">
//                       <div className="flex items-center text-gray-600">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         <span>
//                           {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         <span>
//                           {booking.venue.location?.city}, {booking.venue.location?.country}
//                         </span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Users className="w-4 h-4 mr-2" />
//                         <span>{booking.guests} guests</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {booking.venue.media?.[0]?.url && (
//                       <img
//                         src={booking.venue.media[0].url}
//                         alt={booking.venue.media[0].alt || "Venue image"}
//                         className="w-24 h-24 rounded-lg object-cover"
//                       />
//                     )}
//                   </div>
//                 </div>


// const { username } = useParams();
// const { isLoggedIn, token, user } = useAuthStore();
// const [profile, setProfile] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);


// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       if (!username) throw new Error("Username is missing.");
//       if (!token) throw new Error("No token available");
      
//       const cleanToken = token.replace('Bearer ', '');
//       const requestUrl = `${BASE_URL}${PROFILES_URL}/${username}`;
      
//       const headers = {
//         "Authorization": `Bearer ${cleanToken}`,
//         "Content-Type": "application/json",
//         "X-Noroff-API-Key": API_KEY
//       };

//       const response = await fetch(requestUrl, {
//         method: 'GET',
//         headers: headers,
//       });

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
//       }

//       setProfile(responseData.data);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//       setError(err.message);
      
//       if (user) {
//         setProfile({
//           ...user,
//           bookings: []
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoggedIn && username) {
//     fetchProfile();
//   } else if (isLoggedIn && user) {
//     setProfile({
//       ...user,
//       bookings: []
//     });
//     setLoading(false);
//   } else {
//     setLoading(false);
//   }
// }, [isLoggedIn, username, token, user]);

// if (!isLoggedIn) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-lg">Please log in to view this profile</p>
//     </div>
//   );
// }

// if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Loader className="animate-spin" />
//     </div>
//   );
// }

// if (error && !profile) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-warning">Error: {error}</p>
//     </div>
//   );
// }