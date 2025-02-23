import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { BASE_URL, PROFILES_URL, API_KEY } from "../constants";

export default function useManagerVenues() {
  const { user, token } = useAuthStore();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }
    const fetchVenues = async () => {
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
    };
    fetchVenues();
  }, [user, token]);
  
  return { venues, loading, error };
}
