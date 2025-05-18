import { useState, useEffect, useCallback } from 'react';
import useAuthStore from '../store/useAuthStore';
import { BASE_URL, PROFILES_URL, API_KEY } from '../constants';

/**
 * Custom hook for fetching venues managed by the current user.
 * Retrieves venues and supports manual refetch.
 *
 * @returns {{
 *   venues: Array,        // Managed venues array
 *   loading: boolean,     // Fetching state
 *   error: Error|null,    // Error from fetch, if any
 *   refetch: Function     // Function to manually refetch venues
 * }}
 */
export default function useManagerVenues() {
  const { user, token } = useAuthStore();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches venues managed by the current user.
   */
  const fetchVenues = useCallback(async () => {
    if (!user || !token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}${PROFILES_URL}/${user.name}/venues?_bookings=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': API_KEY,
          },
        }
      );

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message || 'Error fetching venues');
      }

      const json = await response.json();
      setVenues(json.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, error, refetch: fetchVenues };
}
