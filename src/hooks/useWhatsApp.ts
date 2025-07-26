import { useState, useEffect } from 'react';
import { fetchSiteSettings } from '../utils/sanityQueries';
import { 
  formatArtworkInquiryMessage, 
  formatArtworkPurchaseMessage, 
  formatGeneralContactMessage,
  openWhatsApp 
} from '../utils/whatsapp';
import { Artwork } from '../types/sanity';

export const useWhatsApp = () => {
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');

  useEffect(() => {
    const loadWhatsAppNumber = async () => {
      try {
        const settings = await fetchSiteSettings();
        if (settings?.whatsappNumber) {
          setWhatsappNumber(settings.whatsappNumber);
        }
      } catch (error) {
        console.error('Error loading WhatsApp number:', error);
      }
    };

    loadWhatsAppNumber();
  }, []);

  const contactViaWhatsApp = (phoneNumber: string, message: string) => {
    openWhatsApp(phoneNumber, message);
  };

  const inquireAboutArtwork = (artwork: Artwork, customPhoneNumber?: string) => {
    const phoneNumber = customPhoneNumber || whatsappNumber;
    if (!phoneNumber) {
      console.error('WhatsApp number not available');
      return;
    }
    const message = formatArtworkInquiryMessage(artwork);
    openWhatsApp(phoneNumber, message);
  };

  const purchaseArtwork = (artwork: Artwork, customPhoneNumber?: string) => {
    const phoneNumber = customPhoneNumber || whatsappNumber;
    if (!phoneNumber) {
      console.error('WhatsApp number not available');
      return;
    }
    const message = formatArtworkPurchaseMessage(artwork);
    openWhatsApp(phoneNumber, message);
  };

  const generalContact = (customPhoneNumber?: string) => {
    const phoneNumber = customPhoneNumber || whatsappNumber;
    if (!phoneNumber) {
      console.error('WhatsApp number not available');
      return;
    }
    const message = formatGeneralContactMessage();
    openWhatsApp(phoneNumber, message);
  };

  return {
    whatsappNumber,
    contactViaWhatsApp,
    inquireAboutArtwork,
    purchaseArtwork,
    generalContact,
  };
};