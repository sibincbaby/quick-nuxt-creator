
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      category: "Artistic Process",
      title: "The Journey of Creation",
      summary: "Explore the artist's creative process, from initial inspiration to the final masterpiece.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      date: "March 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      category: "Behind the Canvas",
      title: "Stories Behind the Art",
      summary: "Discover the stories and emotions that fuel the artist's work, adding depth and meaning to each piece.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=200&fit=crop",
      date: "March 10, 2024",
      readTime: "7 min read"
    },
    {
      id: 3,
      category: "Art Techniques",
      title: "Mastering Color Theory",
      summary: "Understanding how colors work together to create emotional depth and visual harmony in artwork.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop",
      date: "March 5, 2024",
      readTime: "4 min read"
    },
    {
      id: 4,
      category: "Artist Life",
      title: "Finding Inspiration Everywhere",
      summary: "How everyday moments and experiences can spark creative ideas for new artworks.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      date: "February 28, 2024",
      readTime: "6 min read"
    }
  ];

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
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="block group"
            >
              <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
                <div 
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-teal-600 text-sm font-medium">{post.category}</span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{post.summary}</p>
                  <p className="text-gray-500 text-xs">{post.date}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Blog;
