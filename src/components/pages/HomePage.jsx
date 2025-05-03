import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import useVenues from "../../js/api/useVenues";
import VenueCard from "../VenueCard";
import Loader from "../Loader";
import { getSortParams } from "../../js/utils/sortUtils";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 40; // 40 venues per page
  const [searchTerm, setSearchTerm] = useState(""); // input field state
  const [searchQuery, setSearchQuery] = useState(""); // actual query passed to API
  const [sortOption, setSortOption] = useState("newest"); // default: newest
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // track if search is performed

  const { sortField, sortOrder } = getSortParams(sortOption);

  // Get venues from API using our hook.
  const { venues, loading, error, meta } = useVenues(
    page,
    limit,
    sortField,
    sortOrder,
    searchQuery
  );

  // Calculate total pages from meta (if available) or default.
  const totalPages = meta?.pageCount || 1;

  // Handle search submission: update the search query and reset page.
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setPage(1);
    setIsSearchPerformed(true);
  };

  // Handle clearing the search input and results
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchQuery("");
    setPage(1);
    setIsSearchPerformed(false);
  };

  // Reset search results when the component mounts
  useEffect(() => {
    setSearchTerm("");
    setSearchQuery("");
    setPage(1);
    setIsSearchPerformed(false);
  }, []);

  return (
    <div className="min-h-screen text-neutral-dark mx-auto flex flex-col p-4">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1638297184082-bd7fe6081c82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Beautiful destination"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 text-center text-white rounded-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 shadow-blue-main">Find your perfect stay</h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">Discover unique places to stay around the world</p>
            </div>
          </div>
        </div>
        {/* Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 w-full max-w-6xl">
          <div className="mx-4 bg-blue-main rounded-lg shadow-xl md:py-12 md:px-20 p-5">
            <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center">
              <form onSubmit={handleSearch} className="flex items-center w-full">
                <div className="flex-1 flex items-center px-2">
                  
                  <input
                    type="text"
                    placeholder="Search venues..."
                    className="w-full px-2 py-2 focus:outline-none text-sm lg:text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {isSearchPerformed ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="bg-red-600 text-neutral-dark px-4 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 text-neutral-dark px-4 py-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Search className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Venues List Section */}
      <div className="mt-20 sm:mt-32 p-4">
        {loading && <Loader />}
        {error && (
          <div className="text-warning p-4 rounded-lg bg-warning/10">
            <p>Error: {error.message}</p>
            <button
              onClick={() => setPage(1)}
              className="mt-4 px-4 py-2 bg-blue-main text-white rounded"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && venues.length === 0 && <p>No venues found.</p>}

        {!loading && !error && venues.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className="px-4 py-2 bg-blue-main text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                }
                disabled={page === totalPages || loading}
                className="px-4 py-2 bg-blue-main text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}