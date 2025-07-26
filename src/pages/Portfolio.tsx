import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Palette, Heart, Share2 } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Lightbox from '../components/Lightbox';
import LazyImage from '../components/LazyImage';
import SearchAndFilters from '../components/SearchAndFilters';
import { FeaturedWorksSkeleton, ArtworkGridSkeleton } from '../components/SkeletonLoader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fuzzySearch, getFilterCounts } from '../utils/searchUtils';
import { shareArtwork, getShareableData } from '../utils/socialShare';
import { fetchArtworks } from '../utils/sanityQueries';
import { Artwork } from '../types/sanity';
import { getImageUrl } from '../lib/sanity';
import { useFavorites } from '../hooks/useFavorites';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState<Artwork[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Load portfolio items from Sanity (only items marked as 'portfolio')
  useEffect(() => {
    const loadPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const artworksData = await fetchArtworks();
        // Filter to show only portfolio items (not for sale)
        const portfolioArtworks = artworksData.filter(artwork => 
          artwork.availability === 'portfolio'
        );
        setPortfolioItems(portfolioArtworks);
      } catch (error) {
        console.error('Error loading portfolio items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolioItems();
  }, []);

  // Transform items for filtering (map Sanity data to expected format)
  const transformedItems = useMemo(() => {
    return portfolioItems.map(item => ({
      ...item,
      id: item._id, // Add id for search compatibility
      category: item.medium?.toLowerCase().replace(/\s+/g, '-') || 'other',
      image: item.mainImage ? getImageUrl(item.mainImage, 600, 600) : item.images?.[0] ? getImageUrl(item.images[0], 600, 600) : '',
      year: item.year?.toString() || new Date().getFullYear().toString()
    }));
  }, [portfolioItems]);

  // Get filter counts
  const categoryCounts = useMemo(() => getFilterCounts(transformedItems, 'category'), [transformedItems]);
  const yearCounts = useMemo(() => getFilterCounts(transformedItems, 'year'), [transformedItems]);

  const filteredItems = useMemo(() => {
    // Cast transformedItems to SearchableItem[] for fuzzy search, then cast back
    let filtered = fuzzySearch(transformedItems as any, searchTerm) as typeof transformedItems;
    
    if (selectedFilter === 'featured') {
      filtered = filtered.filter(item => item.featured);
    } else if (selectedFilter !== 'all') {
      filtered = filtered.filter(item => item.category === selectedFilter);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return parseInt(a.year || '0') - parseInt(b.year || '0');
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'latest':
        default:
          return parseInt(b.year || '0') - parseInt(a.year || '0');
      }
    });
  }, [transformedItems, searchTerm, selectedFilter, sortBy]);

  const featuredWorks = transformedItems.filter(item => item.featured);

  const openLightbox = (item: typeof transformedItems[0]) => {
    setSelectedImage({
      src: item.image,
      alt: item.title || 'Artwork',
      title: item.title || 'Artwork'
    });
    setLightboxOpen(true);
  };

  const handleHeartClick = (item: any) => {
    toggleFavorite(item._id, item.title);
  };

  const handleShare = async (item: any) => {
    const shareData = getShareableData(item);
    await shareArtwork(shareData);
  };

  const filters = [
    {
      label: 'Medium',
      key: 'category',
      value: selectedFilter === 'featured' ? 'all' : selectedFilter,
      onChange: (value: string) => setSelectedFilter(value),
      options: [
        { value: 'all', label: 'All Mediums', count: transformedItems.length },
        { value: 'oil-on-canvas', label: 'Oil on Canvas', count: categoryCounts['oil-on-canvas'] || 0 },
        { value: 'acrylic', label: 'Acrylic', count: categoryCounts.acrylic || 0 },
        { value: 'watercolor', label: 'Watercolor', count: categoryCounts.watercolor || 0 },
        { value: 'mixed-media', label: 'Mixed Media', count: categoryCounts['mixed-media'] || 0 },
        { value: 'digital-art', label: 'Digital Art', count: categoryCounts['digital-art'] || 0 },
        { value: 'sculpture', label: 'Sculpture', count: categoryCounts.sculpture || 0 },
        { value: 'photography', label: 'Photography', count: categoryCounts.photography || 0 },
      ]
    },
    {
      label: 'Year',
      key: 'year',
      value: 'all',
      onChange: () => {},
      options: [
        { value: 'all', label: 'All Years', count: transformedItems.length },
        ...Object.entries(yearCounts).map(([year, count]) => ({
          value: year,
          label: year,
          count: count || 0
        }))
      ]
    }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white border-b border-gray-100">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-sm text-gray-600 mt-1">A journey through artistic expression</p>
        </div>
      </header>

      {/* Artist Statement */}
      <section className="px-6 py-8 bg-gradient-to-r from-orange-50 to-teal-50">
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">About This Collection</h2>
          <p className="text-gray-700 leading-relaxed">
            Each piece in this portfolio represents a moment of inspiration, a story waiting to be told. 
            Through various mediums and techniques, I explore themes of nature, emotion, and the human experience, 
            seeking to capture the ephemeral beauty that surrounds us.
          </p>
        </div>
      </section>

      {/* Featured Works Carousel */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Works</h2>
        {isLoading ? (
          <FeaturedWorksSkeleton />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {featuredWorks.map((work) => (
              <div key={work._id} className="group flex-shrink-0">
                <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                  <div className="w-full h-48 cursor-pointer relative" onClick={() => openLightbox(work)}>
                    <LazyImage
                      src={work.image}
                      alt={work.title || 'Artwork'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHeartClick(work);
                        }}
                        className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
                          isFavorite(work._id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                        title={isFavorite(work._id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-3 h-3 ${isFavorite(work._id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(work);
                        }}
                        className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/artwork/${work._id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                        {work.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{work.medium}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{work.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultsCount={filteredItems.length}
        showSocial={false}
      />

      {/* Portfolio Grid */}
      <section className="px-6 py-6">
        <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all" className="text-xs">All Works</TabsTrigger>
            <TabsTrigger value="featured" className="text-xs">Featured</TabsTrigger>
            <TabsTrigger value="oil" className="text-xs">Oil</TabsTrigger>
            <TabsTrigger value="acrylic" className="text-xs">Acrylic</TabsTrigger>
            <TabsTrigger value="watercolor" className="text-xs">Other</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedFilter} className="mt-0">
            {isLoading ? (
              <ArtworkGridSkeleton count={6} columns={2} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div key={item._id} className="group">
                    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all duration-300">
                      <div className="w-full h-64 cursor-pointer group-hover:scale-102 transition-transform duration-300 overflow-hidden relative"
                           onClick={() => openLightbox(item)}>
                        <LazyImage
                          src={item.image}
                          alt={item.title || 'Artwork'}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHeartClick(item);
                            }}
                            className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
                              isFavorite(item._id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                            }`}
                            title={isFavorite(item._id) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Heart className={`w-3 h-3 ${isFavorite(item._id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(item);
                            }}
                            className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <Share2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Link to={`/artwork/${item._id}`}>
                              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-teal-600 font-medium">{item.category}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {item.year}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.medium}</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        title={selectedImage?.title}
      />

      <BottomNavigation />
    </div>
  );
};

export default Portfolio;
