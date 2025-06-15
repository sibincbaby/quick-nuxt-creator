
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Palette } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filteredItems = selectedFilter === 'all' 
    ? portfolioItems 
    : selectedFilter === 'featured'
    ? portfolioItems.filter(item => item.featured)
    : portfolioItems.filter(item => item.category === selectedFilter);

  const featuredWorks = portfolioItems.filter(item => item.featured);

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
        <div className="flex gap-4 overflow-x-auto pb-4">
          {featuredWorks.map((work) => (
            <Link key={work.id} to={`/artwork/${work.id}`} className="group flex-shrink-0">
              <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                <div 
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${work.image})` }}
                ></div>
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
                <Link key={item.id} to={`/artwork/${item.id}`} className="group">
                  <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all duration-300">
                    <div 
                      className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                            {item.title}
                          </h3>
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
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Portfolio;
