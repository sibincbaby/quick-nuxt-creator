import { Artwork } from '../types/sanity';

// Format WhatsApp message for artwork inquiry
export const formatArtworkInquiryMessage = (artwork: Artwork): string => {
  return `Hi! I'm interested in the artwork "${artwork.title}" priced at $${artwork.price}. Could you please provide more details?`;
};

// Format WhatsApp message for artwork purchase
export const formatArtworkPurchaseMessage = (artwork: Artwork): string => {
  return `Hello! I would like to purchase the artwork "${artwork.title}" priced at $${artwork.price}. Please let me know the next steps.`;
};

// Format general contact message
export const formatGeneralContactMessage = (): string => {
  return `Hello! I'm interested in your artwork. Could we discuss your available pieces?`;
};

// Generate WhatsApp URL with pre-filled message
export const generateWhatsAppUrl = (phoneNumber: string, message: string): string => {
  // Remove any non-numeric characters from phone number
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Return WhatsApp URL
  return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
};

// Open WhatsApp with pre-filled message
export const openWhatsApp = (phoneNumber: string, message: string): void => {
  const url = generateWhatsAppUrl(phoneNumber, message);
  window.open(url, '_blank');
};

// Hook for WhatsApp functionality
export const useWhatsApp = () => {
  const contactViaWhatsApp = (phoneNumber: string, message: string) => {
    openWhatsApp(phoneNumber, message);
  };

  const inquireAboutArtwork = (phoneNumber: string, artwork: Artwork) => {
    const message = formatArtworkInquiryMessage(artwork);
    openWhatsApp(phoneNumber, message);
  };

  const purchaseArtwork = (phoneNumber: string, artwork: Artwork) => {
    const message = formatArtworkPurchaseMessage(artwork);
    openWhatsApp(phoneNumber, message);
  };

  const generalContact = (phoneNumber: string) => {
    const message = formatGeneralContactMessage();
    openWhatsApp(phoneNumber, message);
  };

  return {
    contactViaWhatsApp,
    inquireAboutArtwork,
    purchaseArtwork,
    generalContact,
  };
};