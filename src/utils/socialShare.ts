
interface ShareData {
  title: string;
  text?: string;
  url?: string;
  image?: string;
}

export const shareArtwork = async (data: ShareData) => {
  const shareData = {
    title: data.title,
    text: data.text || `Check out this amazing artwork: ${data.title}`,
    url: data.url || window.location.href,
  };

  // Use native Web Share API if available
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      console.log('Share cancelled or failed:', error);
      return false;
    }
  }

  // Fallback to copying to clipboard
  try {
    const textToShare = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
    await navigator.clipboard.writeText(textToShare);
    
    // Show a toast or notification that link was copied
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: 'Link copied to clipboard!', type: 'success' }
      }));
    }
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const getShareableData = (artwork: any): ShareData => {
  return {
    title: artwork.title,
    text: `Check out "${artwork.title}" - ${artwork.description}`,
    url: `${window.location.origin}/artwork/${artwork.id}`,
    image: artwork.image,
  };
};
