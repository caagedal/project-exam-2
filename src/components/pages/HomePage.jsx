import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useVenues from "../../js/api/useVenues";
import VenueCard from "../VenueCard";


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
    <div className="min-h-screen text-neutral-dark mx-auto flex flex-col">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1638297184082-bd7fe6081c82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Beautiful destination"
            className="w-full h-[600px] object-cover "
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0  " />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className=" max-w-4xl mx-auto px-8 py-12 text-center text-white  rounded-xl ">
              <h1 className="text-5xl font-bold mb-6 shadow-blue-main">Find your perfect stay</h1>
              <p className="text-xl mb-8  ">
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
                  className="bg-blue-600 text-neutral-dark px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Venues List Section */}
      <div className="mt-32 p-4">
        

        {loading && <p>Loading venues...</p>}
        {error && (
          <div className="text-warning p-4 rounded-lg bg-warning/10">
            <p>Error: {error.message}</p>
          </div>
        )}

        {!loading && !error && venues.length === 0 && <p>No venues found.</p>}

        {!loading && !error && venues.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
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