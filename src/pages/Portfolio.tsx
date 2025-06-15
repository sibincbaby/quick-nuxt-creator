import { useState, useMemo } from 'react';
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
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const portfolioItems = [
    {
      id: 1,
      title: "Whispers of Dawn",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",
      medium: "Oil on Canvas",
      year: "2024",
      series: "Nature's Symphony",
      description: "Capturing the ethereal beauty of early morning light filtering through ancient trees.",
      category: "oil",
      featured: true
    },
    {
      id: 2,
      title: "Urban Reflections",
      image: "https://images.unsplash.com/photo-1544967919-2f8e5e1b6c6e?w=600&h=600&fit=crop",
      medium: "Acrylic on Canvas",
      year: "2024",
      series: "City Life",
      description: "The interplay of light and shadow in metropolitan spaces.",
      category: "acrylic",
      featured: false
    },
    {
      id: 3,
      title: "Emotional Currents",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
      medium: "Mixed Media",
      year: "2023",
      series: "Inner Landscapes",
      description: "An exploration of human emotion through abstract form and vibrant color.",
      category: "mixed",
      featured: true
    },
    {
      id: 4,
      title: "Serenity's Edge",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop",
      medium: "Watercolor",
      year: "2023",
      series: "Water Studies",
      description: "The delicate balance between motion and stillness in aquatic environments.",
      category: "watercolor",
      featured: false
    },
    {
      id: 5,
      title: "Golden Hour Dreams",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
      medium: "Oil on Canvas",
      year: "2024",
      series: "Nature's Symphony",
      description: "The warm embrace of evening light on pastoral landscapes.",
      category: "oil",
      featured: true
    },
    {
      id: 6,
      title: "Metamorphosis",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
      medium: "Acrylic on Canvas",
      year: "2023",
      series: "Transformation",
      description: "The beauty of change and growth captured in flowing forms.",
      category: "acrylic",
      featured: false
    }
  ];

  // Get filter counts
  const categoryCounts = useMemo(() => getFilterCounts(portfolioItems, 'category'), []);
  const yearCounts = useMemo(() => getFilterCounts(portfolioItems, 'year'), []);

  const filteredItems = useMemo(() => {
    // Cast portfolioItems to SearchableItem[] for fuzzy search, then cast back
    let filtered = fuzzySearch(portfolioItems as any, searchTerm) as typeof portfolioItems;
    
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
  }, [searchTerm, selectedFilter, sortBy]);

  const featuredWorks = portfolioItems.filter(item => item.featured);

  const openLightbox = (item: typeof portfolioItems[0]) => {
    setSelectedImage({
      src: item.image,
      alt: item.title,
      title: item.title
    });
    setLightboxOpen(true);
  };

  const handleHeartClick = (itemId: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleShare = async (item: any) => {
    const shareData = getShareableData(item);
    await shareArtwork(shareData);
  };

  const filters = [
    {
      label: 'Category',
      key: 'category',
      value: selectedFilter === 'featured' ? 'all' : selectedFilter,
      onChange: (value: string) => setSelectedFilter(value),
      options: [
        { value: 'all', label: 'All Categories', count: portfolioItems.length },
        { value: 'oil', label: 'Oil Paintings', count: categoryCounts.oil || 0 },
        { value: 'acrylic', label: 'Acrylic Paintings', count: categoryCounts.acrylic || 0 },
        { value: 'watercolor', label: 'Watercolor', count: categoryCounts.watercolor || 0 },
        { value: 'mixed', label: 'Mixed Media', count: categoryCounts.mixed || 0 },
      ]
    },
    {
      label: 'Year',
      key: 'year',
      value: 'all',
      onChange: () => {},
      options: [
        { value: 'all', label: 'All Years', count: portfolioItems.length },
        { value: '2024', label: '2024', count: yearCounts['2024'] || 0 },
        { value: '2023', label: '2023', count: yearCounts['2023'] || 0 },
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
              <div key={work.id} className="group flex-shrink-0">
                <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                  <div className="w-full h-48 cursor-pointer relative" onClick={() => openLightbox(work)}>
                    <LazyImage
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHeartClick(work.id);
                        }}
                        className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
                          likedItems.has(work.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${likedItems.has(work.id) ? 'fill-current' : ''}`} />
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
                    <Link to={`/artwork/${work.id}`}>
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
                  <div key={item.id} className="group">
                    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all duration-300">
                      <div className="w-full h-64 cursor-pointer group-hover:scale-102 transition-transform duration-300 overflow-hidden relative"
                           onClick={() => openLightbox(item)}>
                        <LazyImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHeartClick(item.id);
                            }}
                            className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
                              likedItems.has(item.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-3 h-3 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
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
                            <Link to={`/artwork/${item.id}`}>
                              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                                {item.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-teal-600 font-medium">{item.series}</p>
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
