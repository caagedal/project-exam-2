import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useVenues from "../../js/api/useVenues";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 40; // 40 venues per page
  const [searchTerm, setSearchTerm] = useState(""); // input field state
  const [searchQuery, setSearchQuery] = useState(""); // actual query passed to API
  const [sortOption, setSortOption] = useState("newest"); // default: newest

  // Map sortOption to API parameters.
  let sortField = "created";
  let sortOrder = "desc";
  switch (sortOption) {
    case "newest":
      sortField = "created";
      sortOrder = "desc";
      break;
    case "name-asc":
      sortField = "name";
      sortOrder = "asc";
      break;
    case "name-desc":
      sortField = "name";
      sortOrder = "desc";
      break;
    case "price-asc":
      sortField = "price";
      sortOrder = "asc";
      break;
    case "price-desc":
      sortField = "price";
      sortOrder = "desc";
      break;
    case "stars-asc":
      sortField = "rating";
      sortOrder = "asc";
      break;
    case "stars-desc":
      sortField = "rating";
      sortOrder = "desc";
      break;
    default:
      sortField = "created";
      sortOrder = "desc";
      break;
  }

  // Get venues from API using our hook.
  const { venues, loading, error, meta } = useVenues(
    page,
    limit,
    sortField,
    sortOrder,
    searchQuery
  );

  // Calculate total pages from meta (if available) or default.
  const totalPages = meta.pageCount || 1;

  // Handle search submission: update the search query and reset page.
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setPage(1);
  };

  return (
    <div className="min-h-screen text-neutral-dark">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative bg-gradient-to-b from-black/50 to-black/20">
          <img
            src="https://images.unsplash.com/photo-1638297184082-bd7fe6081c82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Beautiful destination"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <h1 className="text-5xl font-bold mb-6">Find your perfect stay</h1>
              <p className="text-xl mb-8">
                Discover unique places to stay around the world
              </p>
            </div>
          </div>
        </div>
        {/* Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 w-full max-w-6xl">
          <div className="mx-4 bg-blue-main rounded-lg shadow-xl py-12 px-20">
            <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center">
              <form onSubmit={handleSearch} className="flex items-center w-full">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search venues..."
                    className="w-full px-4 py-2 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Venues List Section */}
      <div className="mt-32 max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">All Venues</h2>
          {/* Sort Dropdown */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setPage(1); // reset page on new sort option
              }}
              className="px-4 py-2 border rounded"
            >
              <option value="newest">Newest (New to Old)</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
              <option value="stars-asc">Stars Low to High</option>
              <option value="stars-desc">Stars High to Low</option>
            </select>
          </div>
        </div>

        {loading && <p>Loading venues...</p>}
        {error && (
          <div className="text-warning p-4 rounded-lg bg-warning/10">
            <p>Error: {error.message}</p>
          </div>
        )}

        {!loading && !error && venues.length === 0 && <p>No venues found.</p>}

        {!loading && !error && venues.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {venue.media?.[0]?.url ? (
                    <img
                      src={venue.media[0].url}
                      alt={venue.media[0].alt || "Venue image"}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-neutral-light flex items-center justify-center text-neutral-medium">
                      No image available
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{venue.name}</h3>
                    {venue.location && (
                      <p className="text-sm text-neutral-medium">
                        {venue.location.city}, {venue.location.country}
                      </p>
                    )}
                    {venue.price !== undefined && (
                      <p className="text-sm text-neutral-medium">
                        Price: ${venue.price} per night
                      </p>
                    )}
                    {venue.rating !== undefined && (
                      <p className="text-sm text-neutral-medium">
                        Rating: {venue.rating} ★
                      </p>
                    )}
                    <Link
                      to={`/venues/${venue.id}`}
                      className="inline-block mt-2 text-blue-main underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
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
                disabled={page === totalPages}
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
