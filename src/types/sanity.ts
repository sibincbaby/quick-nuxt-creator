// Sanity Image type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

// Artist Profile type
export interface ArtistProfile {
  _id: string;
  _type: 'artistProfile';
  name: string;
  bio: string;
  profileImage: SanityImage;
  coverImage?: SanityImage;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  artistStatement?: string;
  workingHours?: string;
}

// Artwork type
export interface Artwork {
  _id: string;
  _type: 'artwork';
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  images: SanityImage[];
  mainImage: SanityImage;
  dimensions: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  medium: string;
  year: number;
  category: string;
  availability: 'available' | 'sold' | 'reserved' | 'portfolio';
  featured: boolean;
  tags?: string[];
}

// Site Settings type
export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  whatsappNumber: string;
  businessHours: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}