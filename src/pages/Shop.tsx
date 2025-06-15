
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const Shop = () => {
  const originals = [
    {
      id: 1,
      title: "Original 1",
      price: "$150",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Original 2", 
      price: "$200",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop"
    }
  ];

  const prints = [
    {
      id: 3,
      title: "Print 1",
      price: "$50",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      title: "Print 2",
      price: "$60", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
      </header>

      {/* Originals Section */}
      <section className="px-6 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Originals</h2>
        <div className="grid grid-cols-2 gap-4">
          {originals.map((artwork) => (
            <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="group">
              <div className="bg-orange-50 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div 
                  className="w-full h-48 rounded-lg bg-cover bg-center mb-3"
                  style={{ backgroundImage: `url(${artwork.image})` }}
                ></div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{artwork.title}</h3>
                <p className="text-teal-600 font-semibold text-sm">{artwork.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Prints Section */}
      <section className="px-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Prints</h2>
        <div className="grid grid-cols-2 gap-4">
          {prints.map((artwork) => (
            <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="group">
              <div className="bg-orange-50 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div 
                  className="w-full h-48 rounded-lg bg-cover bg-center mb-3"
                  style={{ backgroundImage: `url(${artwork.image})` }}
                ></div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{artwork.title}</h3>
                <p className="text-teal-600 font-semibold text-sm">{artwork.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Shop;
