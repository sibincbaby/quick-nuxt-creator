
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
      title: "Whispers of Dawn",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      description: "Capturing the ethereal beauty of early morning light filtering through ancient trees.",
      longDescription: "This acrylic painting explores the gentle transition from night to day, capturing the soft, ethereal light that filters through morning mist. The artist's use of layered acrylics creates depth and movement, inviting viewers to feel the peaceful serenity of dawn.",
      details: {
        size: "20 x 24 inches",
        medium: "Acrylic on Canvas",
        year: "2024"
      }
    },
    2: {
      id: 2,
      title: "Urban Reflections",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      description: "The interplay of light and shadow in metropolitan spaces, captured through bold artistic expression.",
      longDescription: "This oil painting represents the artist's exploration of urban life and the complex interplay of light and shadow in metropolitan environments. The careful balance of warm and cool tones creates a sense of movement and energy that speaks to the viewer's experience of city life.",
      details: {
        size: "30 x 40 inches",
        medium: "Oil on Canvas",
        year: "2024"
      }
    },
    3: {
      id: 3,
      title: "Emotional Currents",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      description: "An exploration of human emotion through abstract form and vibrant color.",
      longDescription: "This watercolor artwork delves into the complexity of human emotions, using flowing forms and vibrant colors to represent the different layers of feeling we experience. The fluid nature of watercolor perfectly captures the ever-changing nature of our emotional landscape.",
      details: {
        size: "18 x 24 inches",
        medium: "Watercolor on Paper",
        year: "2024"
      }
    },
    4: {
      id: 4,
      title: "Serenity's Edge",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
      description: "The delicate balance between motion and stillness in natural environments.",
      longDescription: "This mixed media artwork explores the peaceful moments found in nature's constant movement. Through a combination of different materials and techniques, the artist creates a sense of calm that exists at the edge of motion, capturing those fleeting moments of perfect balance.",
      details: {
        size: "24 x 30 inches",
        medium: "Mixed Media",
        year: "2024"
      }
    }
  };

  // Get artwork data based on ID, fallback to first artwork if ID not found
  const artwork = artworkData[parseInt(id || '1') as keyof typeof artworkData] || artworkData[1];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white">
        <Link to="/shop" className="p-2">
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
