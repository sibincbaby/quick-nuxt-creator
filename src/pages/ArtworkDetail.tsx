import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share, ZoomIn, MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import BottomNavigation from '../components/BottomNavigation';
import { useEffect, useState } from 'react';
import { shareArtwork, getShareableData } from '../utils/socialShare';
import { useWhatsApp } from '../hooks/useWhatsApp';
import Lightbox from '../components/Lightbox';
import { useFavorites } from '../hooks/useFavorites';
import { fetchArtworkById } from '../utils/sanityQueries';
import { getImageUrl } from '../lib/sanity';
import { Artwork } from '../types/sanity';


const ArtworkDetail = () => {
  const { id } = useParams();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { inquireAboutArtwork, purchaseArtwork } = useWhatsApp();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Fetch artwork data
  useEffect(() => {
    const loadArtwork = async () => {
      if (!id) {
        setError('No artwork ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const artworkData = await fetchArtworkById(id);
        if (artworkData) {
          setArtwork(artworkData);
        } else {
          setError('Artwork not found');
        }
      } catch (err) {
        setError('Failed to load artwork');
        console.error('Error loading artwork:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    if (!artwork) return;
    const shareData = getShareableData(artwork);
    await shareArtwork(shareData);
  };

  const handleLove = () => {
    if (id && artwork) {
      toggleFavorite(id, artwork.title);
    }
  };

  const handleImageClick = () => {
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleInquire = () => {
    if (!artwork) return;
    inquireAboutArtwork(artwork);
  };

  const handlePurchase = () => {
    if (!artwork) return;
    purchaseArtwork(artwork);
  };

  // Get optimized image URL
  const getArtworkImageUrl = (width = 800, height = 600) => {
    if (!artwork?.mainImage) return '';
    return getImageUrl(artwork.mainImage, width, height);
  };

  // Format dimensions
  const formatDimensions = () => {
    if (!artwork?.dimensions) return '';
    const { width, height, unit } = artwork.dimensions;
    return `${width} x ${height} ${unit}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading artwork...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !artwork) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artwork Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The artwork you\'re looking for doesn\'t exist.'}</p>
          <Link to="/shop">
            <Button className="bg-teal-700 hover:bg-teal-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              backgroundImage: `url(${getArtworkImageUrl(800, 600)})`,
              viewTransitionName: `artwork-image-${artwork._id}`
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
          <div className="text-2xl font-bold text-gray-900">₹{artwork.price.toLocaleString()}</div>
          <div className="flex gap-2">
            <button 
              onClick={handleLove}
              className={`p-2 rounded-full border transition-colors ${
                isFavorite(id || '') 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
              title={isFavorite(id || '') ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={18} fill={isFavorite(id || '') ? 'currentColor' : 'none'} />
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
            <span>{formatDimensions()}</span>
            <span className="text-gray-400">•</span>
            <span>Year: {artwork.year}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">Medium:</span>
            <span>{artwork.medium}</span>
            <span className="text-gray-400">•</span>
            <span className="font-medium">Category:</span>
            <span className="capitalize">{artwork.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Availability:</span>
            <span className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${
              artwork.availability === 'available' 
                ? 'bg-green-100 text-green-800' 
                : artwork.availability === 'sold'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {artwork.availability}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {artwork.longDescription || artwork.description}
          </p>
        </div>

        {/* Additional space for content */}
        <div className="h-20"></div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white px-4 pt-3 pb-4">
        <div className="flex gap-3 max-w-md mx-auto">
          {artwork.availability === 'available' ? (
            <Button 
              onClick={handlePurchase}
              className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy via WhatsApp
            </Button>
          ) : (
            <Button 
              disabled
              className="flex-1 bg-gray-400 text-white font-medium py-3 rounded-lg cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {artwork.availability === 'sold' ? 'Sold' : 'Reserved'}
            </Button>
          )}
          <Button 
            onClick={handleInquire}
            variant="outline" 
            className="flex-1 border-teal-600 text-teal-600 font-medium py-3 rounded-lg hover:bg-teal-50"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Inquire
          </Button>
        </div>
      </div>

      <BottomNavigation />

      {/* Lightbox for fullscreen image viewing */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        imageSrc={getArtworkImageUrl(1200, 900)}
        imageAlt={artwork.mainImage?.alt || artwork.title}
        title={artwork.title}
      />
    </div>
  );
};

export default ArtworkDetail;
