import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { API_KEY, BASE_URL, PROFILES_URL } from '../constants';

/**
 * Custom hook for fetching and managing user bookings.
 * Retrieves bookings for the current authenticated user and sorts them by start date.
 *
 * @returns {{ bookings: Array, loading: boolean, error: Error|null, setBookings: function }}
 *   bookings: Array of booking objects
 *   loading: Indicates fetch status
 *   error: Error encountered during fetch, or null
 *   setBookings: Function to manually update bookings state
 */
export default function useBookings() {
  const { user, token } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    async function fetchBookings() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}${PROFILES_URL}/${user.name}?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Noroff-API-Key': API_KEY,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching bookings');
        }

        const json = await response.json();
        const unsorted = json.data.bookings || [];
        const sorted = unsorted.sort(
          (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
        );

        setBookings(sorted);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user, token]);

  return { bookings, loading, error, setBookings };
}
