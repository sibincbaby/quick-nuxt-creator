
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share } from 'lucide-react';
import { Button } from '../components/ui/button';
import BottomNavigation from '../components/BottomNavigation';

const ArtworkDetail = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from an API
  const artwork = {
    id: 1,
    title: "Golden Hour",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "This piece captures the tranquil beauty of a sunset over the rolling hills of Tuscany. The warm hues of the setting sun cast long shadows, creating a sense of peace and serenity.",
    longDescription: "This painting is a testament to the beauty of the natural world. The artist's skillful use of color and light brings the scene to life, inviting the viewer to step into the landscape and experience the magic of the golden hour.",
    details: {
      size: "24 x 36 inches",
      medium: "Oil on canvas",
      year: "2023"
    }
  };

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
