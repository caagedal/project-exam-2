import { useState, useEffect, useCallback } from "react";
import useAuthStore from "../store/useAuthStore";
import { BASE_URL, PROFILES_URL, API_KEY } from "../constants";

export default function useManagerVenues() {
  const { user, token } = useAuthStore();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function can be called on mount and manually via refetch
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
            "X-Noroff-API-Key": API_KEY,
          },
        }
      );
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message || "Error fetching venues");
      }
      const json = await response.json();
      setVenues(json.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  // Initial fetch on mount or when user/token changes
  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, error, refetch: fetchVenues };
}
