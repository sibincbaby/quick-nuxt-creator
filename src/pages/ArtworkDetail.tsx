import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share, ZoomIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import BottomNavigation from '../components/BottomNavigation';
import { useEffect, useState } from 'react';
import { shareArtwork, getShareableData } from '../utils/socialShare';
import Lightbox from '../components/Lightbox';

// Simple artwork data matching the shop page format
const artworkData = {
  1: {
    id: 1,
    title: "Whispers of Dawn",
    price: "₹12,000",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Capturing the ethereal beauty of early morning light filtering through ancient trees.",
    longDescription: "This acrylic painting explores the gentle transition from night to day, capturing the soft, ethereal light that filters through morning mist. The artist's use of layered acrylics creates depth and movement, inviting viewers to feel the peaceful serenity of dawn.",
    size: "20 x 24 inches",
    medium: "Acrylic on Canvas",
    year: "2024"
  },
  2: {
    id: 2,
    title: "Urban Reflections",
    price: "₹16,000",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    description: "The interplay of light and shadow in metropolitan spaces, captured through bold artistic expression.",
    longDescription: "This oil painting represents the artist's exploration of urban life and the complex interplay of light and shadow in metropolitan environments. The careful balance of warm and cool tones creates a sense of movement and energy that speaks to the viewer's experience of city life.",
    size: "30 x 40 inches",
    medium: "Oil on Canvas",
    year: "2024"
  },
  3: {
    id: 3,
    title: "Emotional Currents",
    price: "₹4,000",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    description: "An exploration of human emotion through abstract form and vibrant color.",
    longDescription: "This watercolor artwork delves into the complexity of human emotions, using flowing forms and vibrant colors to represent the different layers of feeling we experience. The fluid nature of watercolor perfectly captures the ever-changing nature of our emotional landscape.",
    size: "18 x 24 inches",
    medium: "Watercolor on Paper",
    year: "2024"
  },
  4: {
    id: 4,
    title: "Serenity's Edge",
    price: "₹4,800",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    description: "The delicate balance between motion and stillness in natural environments.",
    longDescription: "This mixed media artwork explores the peaceful moments found in nature's constant movement. Through a combination of different materials and techniques, the artist creates a sense of calm that exists at the edge of motion, capturing those fleeting moments of perfect balance.",
    size: "24 x 30 inches",
    medium: "Mixed Media",
    year: "2024"
  }
};

const ArtworkDetail = () => {
  const { id } = useParams();
  const [isLoved, setIsLoved] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Scroll to top when component mounts to focus on image
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Get artwork data based on ID, fallback to first artwork if ID not found
  const artworkId = parseInt(id || '1');
  const artwork = artworkData[artworkId as keyof typeof artworkData] || artworkData[1];

  const handleShare = async () => {
    const shareData = getShareableData(artwork);
    await shareArtwork(shareData);
  };

  const handleLove = () => {
    setIsLoved(!isLoved);
  };

  const handleImageClick = () => {
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header with title overlay */}
      <header className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
          <Link to="/shop" className="p-2 bg-black/20 backdrop-blur-sm rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <button 
            onClick={handleImageClick}
            className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
            title="View fullscreen"
          >
            <ZoomIn className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Artwork Image with title overlay and smooth transition */}
        <div className="relative h-96 overflow-hidden cursor-pointer" onClick={handleImageClick}>
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-700 ease-out" 
            style={{
              backgroundImage: `url(${artwork.image})`,
              viewTransitionName: `artwork-image-${artwork.id}`
            }}
          ></div>
          
          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
            <h1 className="text-2xl font-bold text-white mb-1">{artwork.title}</h1>
            <p className="text-white/90 text-sm">{artwork.description}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 animate-fade-in">
        {/* Price and Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-gray-900">{artwork.price}</div>
          <div className="flex gap-2">
            <button 
              onClick={handleLove}
              className={`p-2 rounded-full border transition-colors ${
                isLoved 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart size={18} fill={isLoved ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Share size={18} />
            </button>
          </div>
        </div>

        {/* Compact Details - Fixed Layout */}
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span>{artwork.size}</span>
            <span className="text-gray-400">•</span>
            <span>Year: {artwork.year}</span>
          </div>
          <div>
            <span className="font-medium">Medium: </span>
            <span>{artwork.medium}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">{artwork.longDescription}</p>
        </div>

        {/* Additional space for content */}
        <div className="h-20"></div>
      </div>

      {/* Sticky Action Buttons - No border, just padding */}
      <div className="fixed bottom-16 left-0 right-0 bg-white px-4 pt-3 pb-4">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-lg">
            Buy Now
          </Button>
          <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50">
            Inquire
          </Button>
        </div>
      </div>

      <BottomNavigation />

      {/* Lightbox for fullscreen image viewing */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        imageSrc={artwork.image}
        imageAlt={artwork.title}
        title={artwork.title}
      />
    </div>
  );
};

export default ArtworkDetail;
