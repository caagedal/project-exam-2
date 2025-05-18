import { useState, useEffect } from 'react';
import { BASE_URL, VENUES_URL, API_KEY } from '../constants';

/**
 * Custom hook for fetching venues with pagination, sorting, and search support.
 *
 * @param {number} [page=1] - Current page number.
 * @param {number} [limit=40] - Number of venues per page.
 * @param {string} [sortField='created'] - Field to sort by.
 * @param {string} [sortOrder='desc'] - Sort order, 'asc' or 'desc'.
 * @param {string} [searchQuery=''] - Search term for venue names.
 * @returns {{ venues: Array, loading: boolean, error: Error|null, meta: Object }}
 *   venues: Array of fetched venues
 *   loading: Boolean indicating fetch in progress
 *   error: Error object if fetch fails
 *   meta: Metadata such as total pages, count, etc.
 */
export default function useVenues(
  page = 1,
  limit = 40,
  sortField = 'created',
  sortOrder = 'desc',
  searchQuery = ''
) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      setError(null);

      try {
        const base = `${BASE_URL}${VENUES_URL}`;
        const url = searchQuery.trim()
          ? `${base}/search?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`
          : `${base}?page=${page}&limit=${limit}&sort=${sortField}&sortOrder=${sortOrder}`;

        const response = await fetch(url, {
          headers: { 'X-Noroff-API-Key': API_KEY },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors?.[0]?.message || 'Error fetching venues');
        }

        const json = await response.json();
        setVenues(json.data || []);
        setMeta(json.meta || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [page, limit, sortField, sortOrder, searchQuery]);

  return { venues, loading, error, meta };
}