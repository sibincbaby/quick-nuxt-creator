
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Palette } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useArtworks } from '../hooks/useSanityData';
import { urlFor } from '../lib/sanity';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { artworks, loading, error } = useArtworks();

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading portfolio: {error}</p>
          <p className="text-gray-600">Please check your Sanity configuration.</p>
        </div>
      </div>
    );
  }

  // Filter artworks based on selected filter
  const filteredItems = selectedFilter === 'all' 
    ? artworks 
    : selectedFilter === 'featured'
    ? artworks.filter(item => item.featured)
    : artworks.filter(item => item.medium?.toLowerCase().includes(selectedFilter));

  const featuredWorks = artworks.filter(item => item.featured);

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
      {featuredWorks.length > 0 && (
        <section className="px-6 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Works</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {featuredWorks.map((work) => (
              <Link key={work._id} to={`/artwork/${work.slug.current}`} className="group flex-shrink-0">
                <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                  {work.images && work.images[0] && (
                    <div 
                      className="w-full h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${urlFor(work.images[0]).width(400).url()})` }}
                    ></div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{work.medium}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{work.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="px-6">
        <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all" className="text-xs">All Works</TabsTrigger>
            <TabsTrigger value="featured" className="text-xs">Featured</TabsTrigger>
            <TabsTrigger value="oil" className="text-xs">Oil</TabsTrigger>
            <TabsTrigger value="acrylic" className="text-xs">Acrylic</TabsTrigger>
            <TabsTrigger value="watercolor" className="text-xs">Other</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedFilter} className="mt-0">
            {/* Results Count */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Palette className="w-4 h-4" />
              <span>{filteredItems.length} artwork{filteredItems.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Link key={item._id} to={`/artwork/${item.slug.current}`} className="group">
                  <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all duration-300">
                    {item.images && item.images[0] && (
                      <div 
                        className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${urlFor(item.images[0]).width(600).url()})` }}
                      ></div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                            {item.title}
                          </h3>
                          {item.series && (
                            <p className="text-sm text-teal-600 font-medium">{item.series}</p>
                          )}
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
                </Link>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No artworks found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Portfolio;
