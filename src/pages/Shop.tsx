import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Search } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import SearchAndFilters from '../components/SearchAndFilters';
import { ArtworkGridSkeleton } from '../components/SkeletonLoader';
import LazyImage from '../components/LazyImage';
import { fuzzySearch, getFilterCounts } from '../utils/searchUtils';
import { shareArtwork, getShareableData } from '../utils/socialShare';
import { fetchArtworks } from '../utils/sanityQueries';
import { Artwork } from '../types/sanity';
import { getImageUrl } from '../lib/sanity';
import { useFavorites } from '../hooks/useFavorites';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Load artworks from Sanity (exclude portfolio-only items)
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setIsLoading(true);
        const artworksData = await fetchArtworks();
        // Filter out portfolio-only items (only show items for sale)
        const saleArtworks = artworksData.filter(artwork => 
          artwork.availability !== 'portfolio'
        );
        setArtworks(saleArtworks);
      } catch (error) {
        console.error('Error loading artworks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArtworks();
  }, []);

  // Header scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsHeaderVisible(currentScrollY < lastScrollY);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Transform artworks for filtering (map Sanity data to expected format)
  const transformedArtworks = useMemo(() => {
    return artworks.map(artwork => ({
      ...artwork,
      type: artwork.medium?.toLowerCase().replace(/\s+/g, '-') || 'other',
      price: `₹${artwork.price?.toLocaleString('en-IN') || '0'}`,
      image: artwork.mainImage ? getImageUrl(artwork.mainImage, 400, 500) : artwork.images?.[0] ? getImageUrl(artwork.images[0], 400, 500) : '',
      year: artwork.year?.toString() || new Date().getFullYear().toString()
    }));
  }, [artworks]);

  const typeCounts = useMemo(() => getFilterCounts(transformedArtworks, 'type'), [transformedArtworks]);

  const filteredAndSortedArtworks = useMemo(() => {
    let filtered = fuzzySearch(transformedArtworks, searchTerm);
    
    if (filterType !== 'all') {
      filtered = filtered.filter(artwork => artwork.type === filterType);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'oldest':
          return (a.year || 0) - (b.year || 0);
        case 'latest':
        default:
          return (b.year || 0) - (a.year || 0);
      }
    });
  }, [transformedArtworks, searchTerm, filterType, sortBy]);

  const handleHeartClick = (artwork: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleFavorite(artwork._id, artwork.title);
  };

  const handleShare = async (artwork: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const shareData = getShareableData(artwork);
    await shareArtwork(shareData);
  };

  const filters = [
    {
      label: 'Medium',
      key: 'type',
      value: filterType,
      onChange: setFilterType,
      options: [
        { value: 'all', label: 'All Mediums', count: transformedArtworks.length },
        { value: 'oil-on-canvas', label: 'Oil on Canvas', count: typeCounts['oil-on-canvas'] || 0 },
        { value: 'acrylic', label: 'Acrylic', count: typeCounts.acrylic || 0 },
        { value: 'watercolor', label: 'Watercolor', count: typeCounts.watercolor || 0 },
        { value: 'mixed-media', label: 'Mixed Media', count: typeCounts['mixed-media'] || 0 },
        { value: 'digital-art', label: 'Digital Art', count: typeCounts['digital-art'] || 0 },
        { value: 'sculpture', label: 'Sculpture', count: typeCounts.sculpture || 0 },
        { value: 'photography', label: 'Photography', count: typeCounts.photography || 0 },
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
      {/* Header - Hidden on scroll */}
      <header className={`flex items-center p-4 bg-white border-b border-gray-100 sticky top-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Link to="/" className="mr-3 p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Shop</h1>
        <div className="ml-auto text-sm text-gray-600">
          {filteredAndSortedArtworks.length} artwork{filteredAndSortedArtworks.length !== 1 ? 's' : ''}
        </div>
      </header>

      {/* Search and Filters - Always sticky at top when header hides */}
      <div className={`sticky z-40 bg-white transition-all duration-300 ${
        isHeaderVisible ? 'top-16' : 'top-0'
      }`}>
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

      {/* Artworks Grid */}
      <section className="p-3">
        {isLoading ? (
          <ArtworkGridSkeleton count={6} columns={2} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {filteredAndSortedArtworks.map((artwork) => (
                <div key={artwork._id} className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Image Section with smooth transition */}
                  <div className="relative aspect-square overflow-hidden">
                    <Link 
                      to={`/artwork/${artwork._id}`} 
                      className="block h-full"
                      style={{ viewTransitionName: `artwork-image-${artwork._id}` }}
                    >
                      <LazyImage
                        src={artwork.image}
                        alt={artwork.title || 'Artwork'}
                        className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500 ease-out"
                      />
                      
                      {/* Price tag only */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                          ₹{artwork.price?.toLocaleString('en-IN') || '0'}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Details Section */}
                  <div className="p-4 pt-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Link to={`/artwork/${artwork._id}`}>
                          <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-teal-700 transition-colors line-clamp-1">
                            {artwork.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 capitalize">
                            {artwork.medium}
                          </span>
                          <span className="text-sm text-gray-600">{artwork.year}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">
                      {artwork.description}
                    </p>
                    
                    {/* Action row - Working buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => handleHeartClick(artwork, e)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            isFavorite(artwork._id) 
                              ? 'text-red-500' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                          title={isFavorite(artwork._id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite(artwork._id) ? 'fill-current' : ''}`} />
                          <span className="sr-only">
                            {isFavorite(artwork._id) ? 'Remove from favorites' : 'Add to favorites'}
                          </span>
                        </button>
                        <button 
                          onClick={(e) => handleShare(artwork, e)}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      <Link 
                        to={`/artwork/${artwork._id}`}
                        className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
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
