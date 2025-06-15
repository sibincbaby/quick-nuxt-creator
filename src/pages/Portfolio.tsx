
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
      className: "bg-orange-100"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544967919-2f8e5e1b6c6e?w=400&h=400&fit=crop",
      className: "bg-orange-50"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      className: "bg-orange-100"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop",
      className: "bg-teal-700"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      className: "bg-orange-100"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      className: "bg-green-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
      </header>

      {/* Filter Tabs */}
      <div className="px-6 mb-6">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
            Collections
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Medium
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Availability
          </button>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {portfolioItems.map((item) => (
            <Link key={item.id} to={`/artwork/${item.id}`} className="group">
              <div className={`${item.className} rounded-lg p-4 aspect-square shadow-sm group-hover:shadow-md transition-shadow`}>
                <div 
                  className="w-full h-full rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Portfolio;
