import { Search, MapPin, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const featuredDestinations = [
    { name: 'Mountain Retreats', image: 'https://images.unsplash.com/photo-1579525006336-c8919e3dc770?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', count: '234 venues' },
    { name: 'Beach Houses', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', count: '186 venues' },
    { name: 'City Apartments', image: 'https://images.unsplash.com/photo-1623234478656-88cb926b72a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', count: '312 venues' },
  ]

  const trendingVenues = [
    // Your trending venues data
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-b from-black/50 to-black/20">
        <img 
          src="https://images.unsplash.com/photo-1638297184082-bd7fe6081c82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Beautiful destination" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Find your perfect stay
            </h1>
            <p className="text-xl mb-8">
              Discover unique places to stay around the world
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full shadow-lg p-2">
              <form className="flex items-center">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full px-4 py-2 focus:outline-none"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Explore destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <Link 
              key={index}
              to={`/venues?category=${destination.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Trending venues</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Add your trending venues cards here */}
          </div>
        </div>
      </div>
    </div>
  )
}