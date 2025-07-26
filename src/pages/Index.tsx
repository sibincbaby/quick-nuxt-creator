import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import LazyImage from '../components/LazyImage';
import { useEffect, useState } from 'react';
import { fetchFeaturedArtworks } from '../utils/sanityQueries';
import { Artwork } from '../types/sanity';
import { getImageUrl } from '../lib/sanity';

const Index = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedArtworks = async () => {
      try {
        setIsLoading(true);
        const artworks = await fetchFeaturedArtworks(4);
        setFeaturedArtworks(artworks);
      } catch (error) {
        console.error('Error loading featured artworks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedArtworks();
  }, []);


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
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-orange-50 rounded-lg p-4 shadow-sm">
                <div className="w-full h-48 rounded-lg mb-3 bg-gray-200 animate-pulse"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-3 bg-gray-200 animate-pulse rounded mb-1 w-20"></div>
                <div className="h-3 bg-gray-200 animate-pulse rounded w-16"></div>
              </div>
            ))
          ) : (
            featuredArtworks.map((artwork) => (
              <Link 
                key={artwork._id} 
                to={`/artwork/${artwork._id}`}
                className="group"
              >
                <div className="bg-orange-50 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="w-full h-48 rounded-lg mb-3 overflow-hidden">
                    <LazyImage
                      src={artwork.mainImage ? getImageUrl(artwork.mainImage, 400, 500) : artwork.images?.[0] ? getImageUrl(artwork.images[0], 400, 500) : ''}
                      alt={artwork.title || 'Artwork'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{artwork.title}</h3>
                  <p className="text-teal-600 font-semibold text-sm mb-1">₹{artwork.price?.toLocaleString('en-IN') || '0'}</p>
                  <p className="text-xs text-gray-500 capitalize">{artwork.medium}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>


      <BottomNavigation />
    </div>
  );
};

export default Index;
