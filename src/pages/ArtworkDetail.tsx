
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share } from 'lucide-react';
import { Button } from '../components/ui/button';
import BottomNavigation from '../components/BottomNavigation';

const ArtworkDetail = () => {
  const { id } = useParams();

  // Mock data for different artworks - in real app this would come from an API
  const artworkData = {
    1: {
      id: 1,
      title: "Whispers of the Wind",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      description: "This piece captures the fluid movements of wind through abstract forms and vibrant colors. The dynamic brushstrokes create a sense of motion and energy.",
      longDescription: "This painting explores the invisible forces of nature through bold, expressive marks. The artist's use of layered acrylics creates depth and movement, inviting viewers to feel the wind's presence through visual art.",
      details: {
        size: "20 x 24 inches",
        medium: "Acrylic on canvas",
        year: "2024"
      }
    },
    2: {
      id: 2,
      title: "Serenity's Embrace",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      description: "A tranquil composition that evokes feelings of peace and contemplation. Warm earth tones blend seamlessly to create a meditative visual experience.",
      longDescription: "This oil painting represents the artist's exploration of inner peace and harmony. The careful balance of warm and cool tones creates a sense of stability and calm that speaks to the viewer's soul.",
      details: {
        size: "30 x 40 inches",
        medium: "Oil on canvas",
        year: "2024"
      }
    },
    3: {
      id: 3,
      title: "Emotional Currents",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      description: "An exploration of human emotion through abstract form and vibrant color. This mixed media piece layers different textures to create visual depth.",
      longDescription: "This mixed media artwork delves into the complexity of human emotions, using various materials and techniques to represent the different layers of feeling we experience. The interplay of colors and textures creates a rich, emotionally resonant piece.",
      details: {
        size: "24 x 30 inches",
        medium: "Mixed media on canvas",
        year: "2023"
      }
    }
  };

  // Get artwork data based on ID, fallback to first artwork if ID not found
  const artwork = artworkData[parseInt(id || '1') as keyof typeof artworkData] || artworkData[1];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white">
        <Link to="/" className="p-2">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <Share className="w-6 h-6 text-gray-900" />
      </header>

      {/* Artwork Image */}
      <div className="px-0 mb-8">
        <div 
          className="w-full h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${artwork.image})` }}
        ></div>
      </div>

      {/* Content */}
      <div className="px-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{artwork.title}</h1>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-8">{artwork.description}</p>

        {/* Details */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="text-teal-600 font-medium">Size</span>
              <span className="text-gray-900">{artwork.details.size}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="text-teal-600 font-medium">Medium</span>
              <span className="text-gray-900">{artwork.details.medium}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="text-teal-600 font-medium">Year</span>
              <span className="text-gray-900">{artwork.details.year}</span>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{artwork.longDescription}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-lg">
            Buy Now
          </Button>
          <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 font-medium py-3 rounded-lg">
            Inquire
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ArtworkDetail;
