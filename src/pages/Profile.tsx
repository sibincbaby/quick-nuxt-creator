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
  const { generalContact } = useWhatsApp();

  useEffect(() => {
    // Load data in background without blocking UI
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

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header - Match Shop page style */}
      <header className="flex items-center p-4 bg-white border-b border-gray-100">
        <Link to="/" className="mr-3 p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Contact</h1>
      </header>

      {/* Artist Profile Section */}
      <div className="px-6 mb-8 mt-6">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-400 via-orange-300 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden shadow-sm">
            {artistProfile?.profileImage ? (
              <img 
                src={getImageUrl(artistProfile.profileImage, 128, 128)} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{profile.name}</h2>
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto">{profile.bio}</p>
        </div>

        {/* Studio Hours Card */}
        {(artistProfile?.artistStatement || profile.workingHours) && (
          <div className="bg-white rounded-lg p-5 mb-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Studio Hours</h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {artistProfile?.workingHours || profile.workingHours}
            </p>
          </div>
        )}
      </div>

      {/* Contact Methods */}
      <div className="px-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
        <div className="space-y-4">
          {/* WhatsApp Contact - Primary CTA */}
          <button
            onClick={handleWhatsAppContact}
            className="w-full flex items-center p-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <MessageCircle className="w-6 h-6 mr-4" />
            <div className="text-left flex-1">
              <div className="font-semibold text-lg">WhatsApp</div>
              <div className="text-sm opacity-90">Quick response guaranteed</div>
            </div>
          </button>

          {/* Contact Cards */}
          <div className="grid gap-4">
            {/* Email Contact */}
            <button
              onClick={handleEmailContact}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group"
            >
              <Mail className="w-5 h-5 mr-4 text-teal-600" />
              <div className="text-left flex-1">
                <div className="font-medium text-gray-900 group-hover:text-teal-700">{profile.email}</div>
                <div className="text-sm text-gray-500">Send an email</div>
              </div>
            </button>

            {/* Phone Contact */}
            <button
              onClick={handlePhoneContact}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group"
            >
              <Phone className="w-5 h-5 mr-4 text-teal-600" />
              <div className="text-left flex-1">
                <div className="font-medium text-gray-900 group-hover:text-teal-700">{profile.phone}</div>
                <div className="text-sm text-gray-500">Call directly</div>
              </div>
            </button>

            {/* Address */}
            <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg">
              <MapPin className="w-5 h-5 mr-4 text-teal-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Studio Address</div>
                <div className="text-sm text-gray-600 leading-relaxed">{profile.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="px-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Follow My Work</h3>
        <div className="flex justify-center space-x-6">
          {profile.socialMedia.instagram && (
            <a
              href={profile.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Instagram className="w-7 h-7" />
            </a>
          )}
          {profile.socialMedia.facebook && (
            <a
              href={profile.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Facebook className="w-7 h-7" />
            </a>
          )}
          {profile.socialMedia.twitter && (
            <a
              href={profile.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Twitter className="w-7 h-7" />
            </a>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;