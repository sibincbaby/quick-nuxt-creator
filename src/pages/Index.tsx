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

  const blogPosts = [
    {
      id: 1,
      category: "Artistic Process",
      title: "The Journey of Creation",
      summary: "Explore the artist's creative process, from initial inspiration to the final masterpiece.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      category: "Behind the Canvas",
      title: "Stories Behind the Art",
      summary: "Discover the stories and emotions that fuel the artist's work, adding depth and meaning to each piece.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=100&h=100&fit=crop"
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

      {/* Recent Blog Posts */}
      <section className="px-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Blog Posts</h2>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="flex gap-4 group"
            >
              <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-teal-600 text-sm font-medium mb-1">{post.category}</p>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{post.summary}</p>
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
