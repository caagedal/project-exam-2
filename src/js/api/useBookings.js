import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { API_KEY, BASE_URL, PROFILES_URL } from "../constants";

export default function useBookings() {
    const {user, token} = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !token){
            setLoading(false);
            return;
        }

        const fetchBooking = async () => {
            setLoading(true);
            try {
                const url = `${BASE_URL}${PROFILES_URL}/${user.name}?_bookings=true`;

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Noroff-API-Key": API_KEY,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error trying to fetch bookings");
                }

                const data = await response.json();
                const unsortedBookings = data.data.bookings || [];
                const sortedBookings = unsortedBookings.sort(
                    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
                );

                setBookings(sortedBookings);
            } catch(err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [user, token]);

    return {bookings, loading, error};
}