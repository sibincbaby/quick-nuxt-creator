
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Search } from 'lucide-react';
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      featured: false
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
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
      featured: true
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
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop",
      featured: false
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
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop",
      featured: true
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
      {/* Header - More compact for mobile */}
      <header className="flex items-center p-4 bg-white border-b border-gray-100 sticky top-0 z-40">
        <Link to="/" className="mr-3 p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Shop</h1>
      </header>

      {/* Search and Filters - Sticky */}
      <div className="sticky top-16 z-30 bg-white">
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
      </div>

      {/* Artworks Grid - Instagram-like layout */}
      <section className="p-3">
        {isLoading ? (
          <ArtworkGridSkeleton count={6} columns={2} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-1">
              {filteredAndSortedArtworks.map((artwork) => (
                <div key={artwork.id} className="group relative aspect-square">
                  <div className="bg-white rounded-none shadow-none group-hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                    <Link to={`/artwork/${artwork.id}`} className="block h-full">
                      <div className="w-full h-full relative overflow-hidden">
                        <LazyImage
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Instagram-like overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
                            <div className="flex items-center gap-1">
                              <Heart className="w-5 h-5" />
                              <span className="text-sm font-medium">12</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-5 h-5" />
                              <span className="text-sm font-medium">3</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons - floating */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleHeartClick(artwork.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 active:scale-95 ${
                              likedItems.has(artwork.id) 
                                ? 'bg-red-500 text-white shadow-lg' 
                                : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(artwork.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleShare(artwork);
                            }}
                            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 active:scale-95"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price tag */}
                        <div className="absolute bottom-2 left-2">
                          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                            {artwork.price}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced empty state */}
            {filteredAndSortedArtworks.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="max-w-sm mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No artworks found</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Try adjusting your search terms or browse different categories to discover amazing artworks.
                  </p>
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
