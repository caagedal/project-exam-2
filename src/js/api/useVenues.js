import { useState, useEffect } from "react";
import { BASE_URL, VENUES_URL, API_KEY } from "../constants";

export default function useVenues(
  page = 1,
  limit = 40,
  sortField = "created",
  sortOrder = "desc",
  searchQuery = ""
) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        let url = "";
        if (searchQuery.trim().length > 0) {
          // Use search endpoint; note: sorting might not be supported on search.
          url = `${BASE_URL}${VENUES_URL}/search?q=${encodeURIComponent(
            searchQuery
          )}&page=${page}&limit=${limit}`;
        } else {
          // Use standard endpoint with sorting parameters.
          url = `${BASE_URL}${VENUES_URL}?page=${page}&limit=${limit}&sort=${sortField}&sortOrder=${sortOrder}`;
        }
        const response = await fetch(url, {
          headers: {
            "X-Noroff-API-Key": API_KEY,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.errors?.[0]?.message || "Error fetching venues"
          );
        }
        const json = await response.json();
        setVenues(json.data || []);
        setMeta(json.meta || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [page, limit, sortField, sortOrder, searchQuery]);

  return { venues, loading, error, meta };
}
