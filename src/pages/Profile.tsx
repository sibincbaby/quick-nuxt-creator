import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import BottomNavigation from '../components/BottomNavigation';
import { useEffect, useState } from 'react';
import { fetchArtistProfile, fetchSiteSettings } from '../utils/sanityQueries';
import { useWhatsApp } from '../utils/whatsapp';
import { ArtistProfile, SiteSettings } from '../types/sanity';
import { getImageUrl } from '../lib/sanity';

const Profile = () => {
  const [artistProfile, setArtistProfile] = useState<ArtistProfile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { generalContact } = useWhatsApp();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, settings] = await Promise.all([
          fetchArtistProfile(),
          fetchSiteSettings()
        ]);
        setArtistProfile(profile);
        setSiteSettings(settings);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleWhatsAppContact = () => {
    if (siteSettings?.whatsappNumber) {
      generalContact(siteSettings.whatsappNumber);
    }
  };

  const handleEmailContact = () => {
    if (artistProfile?.email) {
      window.location.href = `mailto:${artistProfile.email}`;
    }
  };

  const handlePhoneContact = () => {
    if (artistProfile?.phone) {
      window.location.href = `tel:${artistProfile.phone}`;
    }
  };

  // Fallback data for when Sanity is not yet configured
  const fallbackData = {
    name: "Sophia Carter",
    bio: "Passionate artist creating contemporary pieces that blend traditional techniques with modern aesthetics. Specializing in oil paintings and mixed media artworks.",
    email: "sophia@artisancanvas.com",
    phone: "+1 (555) 123-4567",
    address: "123 Art District, Creative City, CA 90210",
    socialMedia: {
      instagram: "https://instagram.com/sophiacarter_art",
      facebook: "https://facebook.com/sophiacarterart",
      twitter: "https://twitter.com/sophiacarter_art"
    },
    workingHours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    whatsappNumber: "+1234567890"
  };

  const profile = artistProfile || fallbackData;
  const whatsappNumber = siteSettings?.whatsappNumber || fallbackData.whatsappNumber;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Contact</h1>
      </header>

      {/* Artist Profile Section */}
      <div className="px-6 mb-8">
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {artistProfile?.profileImage ? (
              <img 
                src={getImageUrl(artistProfile.profileImage, 128, 128)} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
          <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Artist Statement */}
        {(artistProfile?.artistStatement || profile.workingHours) && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Studio Hours</h3>
            <p className="text-gray-600 text-sm whitespace-pre-line">
              {artistProfile?.workingHours || profile.workingHours}
            </p>
          </div>
        )}
      </div>

      {/* Contact Methods */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
        <div className="space-y-3">
          {/* WhatsApp Contact */}
          <Button
            onClick={handleWhatsAppContact}
            className="w-full flex items-center justify-start bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">WhatsApp</div>
              <div className="text-sm opacity-90">Quick response guaranteed</div>
            </div>
          </Button>

          {/* Email Contact */}
          <Button
            onClick={handleEmailContact}
            variant="outline"
            className="w-full flex items-center justify-start"
          >
            <Mail className="w-5 h-5 mr-3 text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">{profile.email}</div>
              <div className="text-sm text-gray-500">Send an email</div>
            </div>
          </Button>

          {/* Phone Contact */}
          <Button
            onClick={handlePhoneContact}
            variant="outline"
            className="w-full flex items-center justify-start"
          >
            <Phone className="w-5 h-5 mr-3 text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">{profile.phone}</div>
              <div className="text-sm text-gray-500">Call directly</div>
            </div>
          </Button>

          {/* Address */}
          <div className="flex items-start p-3 border border-gray-200 rounded-lg">
            <MapPin className="w-5 h-5 mr-3 text-gray-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Studio Address</div>
              <div className="text-sm text-gray-600">{profile.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow My Work</h3>
        <div className="flex space-x-4">
          {profile.socialMedia.instagram && (
            <a
              href={profile.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white hover:scale-105 transition-transform"
            >
              <Instagram className="w-6 h-6" />
            </a>
          )}
          {profile.socialMedia.facebook && (
            <a
              href={profile.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white hover:scale-105 transition-transform"
            >
              <Facebook className="w-6 h-6" />
            </a>
          )}
          {profile.socialMedia.twitter && (
            <a
              href={profile.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-full text-white hover:scale-105 transition-transform"
            >
              <Twitter className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;