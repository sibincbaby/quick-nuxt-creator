
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { usePosts } from '../hooks/useSanityData';
import { urlFor } from '../lib/sanity';

const Blog = () => {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading blog posts: {error}</p>
          <p className="text-gray-600">Please check your Sanity configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
      </header>

      {/* Blog Posts */}
      <section className="px-6">
        <div className="space-y-6">
          {posts.map((post) => (
            <Link 
              key={post._id} 
              to={`/blog/${post.slug.current}`}
              className="block group"
            >
              <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                {post.coverImage && (
                  <div 
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${urlFor(post.coverImage).width(600).url()})` }}
                  ></div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {post.tags && post.tags[0] && (
                      <span className="text-teal-600 text-sm font-medium">{post.tags[0]}</span>
                    )}
                    {post.readTime && (
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{post.excerpt}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Blog;
