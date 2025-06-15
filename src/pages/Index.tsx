
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { useArtworks, usePosts } from '../hooks/useSanityData';
import { urlFor } from '../lib/sanity';

const Index = () => {
  const { artworks: featuredArtworks, loading: artworksLoading } = useArtworks(true);
  const { posts: featuredPosts, loading: postsLoading } = usePosts(true);

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

        {artworksLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading artworks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {featuredArtworks.slice(0, 2).map((artwork) => (
              <Link 
                key={artwork._id} 
                to={`/artwork/${artwork.slug.current}`}
                className="group"
              >
                <div className="bg-orange-50 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                  {artwork.images && artwork.images[0] && (
                    <div 
                      className="w-full h-48 rounded-lg bg-cover bg-center mb-3"
                      style={{ backgroundImage: `url(${urlFor(artwork.images[0]).width(400).url()})` }}
                    ></div>
                  )}
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{artwork.title}</h3>
                  {artwork.price && (
                    <p className="text-teal-600 font-semibold text-sm mb-1">₹{artwork.price}</p>
                  )}
                  <p className="text-xs text-gray-500 capitalize">{artwork.medium}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent Blog Posts */}
      <section className="px-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Blog Posts</h2>

        {postsLoading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading posts...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <Link 
                key={post._id} 
                to={`/blog/${post.slug.current}`}
                className="flex gap-4 group"
              >
                {post.coverImage && (
                  <div 
                    className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${urlFor(post.coverImage).width(100).url()})` }}
                  ></div>
                )}
                <div className="flex-1">
                  {post.tags && post.tags[0] && (
                    <p className="text-teal-600 text-sm font-medium mb-1">{post.tags[0]}</p>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Index;
