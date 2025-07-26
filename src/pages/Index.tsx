import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import LazyImage from '../components/LazyImage';

const Index = () => {
  const featuredArtworks = [
    {
      id: 1,
      title: "Whispers of the Wind",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
      price: "₹12,000",
      type: "acrylic"
    },
    {
      id: 2,
      title: "Serenity's Embrace",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      price: "₹16,000",
      type: "oil"
    }
  ];


  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Artisan's Canvas</h1>
      </header>

      {/* Hero Image */}
      <div className="px-6 mb-8">
        <div className="w-full h-64 bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 rounded-lg shadow-sm"></div>
      </div>

      {/* Featured Artworks */}
      <section className="px-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Artworks</h2>
          <Link 
            to="/portfolio" 
            className="flex items-center text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredArtworks.map((artwork) => (
            <Link 
              key={artwork.id} 
              to={`/artwork/${artwork.id}`}
              className="group"
            >
              <div className="bg-orange-50 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="w-full h-48 rounded-lg mb-3 overflow-hidden">
                  <LazyImage
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{artwork.title}</h3>
                <p className="text-teal-600 font-semibold text-sm mb-1">{artwork.price}</p>
                <p className="text-xs text-gray-500 capitalize">{artwork.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      <BottomNavigation />
    </div>
  );
};

export default Index;
