
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import SearchAndFilters from '../components/SearchAndFilters';
import { ArtworkGridSkeleton } from '../components/SkeletonLoader';
import LazyImage from '../components/LazyImage';
import { fuzzySearch, getFilterCounts } from '../utils/searchUtils';
import { shareArtwork, getShareableData } from '../utils/socialShare';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const artworks = [
    {
      id: 1,
      title: "Whispers of Dawn",
      price: "₹12,000",
      type: "acrylic",
      category: "acrylic",
      date: "2024-01-15",
      medium: "Acrylic on Canvas",
      description: "Capturing the ethereal beauty of early morning light",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Urban Reflections", 
      price: "₹16,000",
      type: "oil",
      category: "oil",
      date: "2024-02-10",
      medium: "Oil on Canvas",
      description: "The interplay of light and shadow in metropolitan spaces",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop"
    },
    {
      id: 3,
      title: "Emotional Currents",
      price: "₹4,000",
      type: "watercolor",
      category: "watercolor",
      date: "2024-01-20",
      medium: "Watercolor on Paper",
      description: "An exploration of human emotion through abstract form",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      title: "Serenity's Edge",
      price: "₹4,800",
      type: "mixed",
      category: "mixed",
      date: "2024-03-05",
      medium: "Mixed Media",
      description: "The delicate balance between motion and stillness",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop"
    }
  ];

  // Get filter counts
  const typeCounts = useMemo(() => getFilterCounts(artworks, 'type'), [artworks]);

  // Filter and sort logic
  const filteredAndSortedArtworks = useMemo(() => {
    let filtered = fuzzySearch(artworks, searchTerm);
    
    if (filterType !== 'all') {
      filtered = filtered.filter(artwork => artwork.type === filterType);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', ''));
        case 'price-high':
          return parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', ''));
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'latest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [searchTerm, filterType, sortBy]);

  const handleHeartClick = (artworkId: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artworkId)) {
        newSet.delete(artworkId);
      } else {
        newSet.add(artworkId);
      }
      return newSet;
    });
  };

  const handleShare = async (artwork: any) => {
    const shareData = getShareableData(artwork);
    await shareArtwork(shareData);
  };

  const filters = [
    {
      label: 'Type',
      key: 'type',
      value: filterType,
      onChange: setFilterType,
      options: [
        { value: 'all', label: 'All Types', count: artworks.length },
        { value: 'acrylic', label: 'Acrylic', count: typeCounts.acrylic || 0 },
        { value: 'oil', label: 'Oil', count: typeCounts.oil || 0 },
        { value: 'watercolor', label: 'Watercolor', count: typeCounts.watercolor || 0 },
        { value: 'mixed', label: 'Mixed Media', count: typeCounts.mixed || 0 },
      ]
    }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest Listing' },
    { value: 'oldest', label: 'Oldest Listing' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white border-b border-gray-100">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
      </header>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultsCount={filteredAndSortedArtworks.length}
        showSocial={false}
      />

      {/* Artworks Grid */}
      <section className="px-6 py-6">
        {isLoading ? (
          <ArtworkGridSkeleton count={6} columns={2} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {filteredAndSortedArtworks.map((artwork) => (
                <div key={artwork.id} className="group relative">
                  <div className="bg-orange-50 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden">
                    <Link to={`/artwork/${artwork.id}`} className="block">
                      <div className="w-full h-48 overflow-hidden">
                        <LazyImage
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/artwork/${artwork.id}`}>
                          <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-teal-700 transition-colors">
                            {artwork.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => handleHeartClick(artwork.id)}
                          className={`p-1 rounded-full transition-colors ${
                            likedItems.has(artwork.id) 
                              ? 'text-red-500' 
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedItems.has(artwork.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <p className="text-teal-600 font-semibold text-sm mb-1">{artwork.price}</p>
                      <p className="text-xs text-gray-500 capitalize mb-2">{artwork.type}</p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 truncate flex-1">
                          {artwork.description}
                        </p>
                        <button
                          onClick={() => handleShare(artwork)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedArtworks.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No artworks found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Shop;
