
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const Profile = () => {
  const lovedArtworks = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544967919-2f8e5e1b6c6e?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mx-auto">Profile</h1>
      </header>

      {/* Profile Info */}
      <div className="px-6 mb-8 text-center">
        <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-20 h-20 bg-orange-300 rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Sophia Carter</h2>
        <p className="text-teal-600 mb-1">@sophia.carter</p>
        <p className="text-gray-500">Joined 2021</p>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex space-x-8">
          <button className="text-gray-900 font-semibold border-b-2 border-teal-600 pb-2">
            Loved
          </button>
          <button className="text-gray-500 pb-2">
            Info
          </button>
        </div>
      </div>

      {/* Loved Artworks Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {lovedArtworks.map((artwork) => (
            <div key={artwork.id} className="aspect-square">
              <div 
                className="w-full h-full rounded-lg bg-orange-50 bg-cover bg-center"
                style={{ backgroundImage: `url(${artwork.image})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
