import { client } from '../lib/sanity';
import { Artwork, ArtistProfile, SiteSettings } from '../types/sanity';

// Fetch all artworks with filtering and sorting options
export const fetchArtworks = async (
  category?: string,
  sortBy?: 'latest' | 'oldest' | 'price-low' | 'price-high'
): Promise<Artwork[]> => {
  let query = `*[_type == "artwork"`;
  
  if (category && category !== 'all') {
    query += ` && category == "${category}"`;
  }
  
  query += `] {
    _id,
    _type,
    title,
    description,
    longDescription,
    price,
    images,
    mainImage,
    dimensions,
    medium,
    year,
    category,
    availability,
    featured,
    tags
  }`;

  // Add sorting
  switch (sortBy) {
    case 'latest':
      query += ` | order(_createdAt desc)`;
      break;
    case 'oldest':
      query += ` | order(_createdAt asc)`;
      break;
    case 'price-low':
      query += ` | order(price asc)`;
      break;
    case 'price-high':
      query += ` | order(price desc)`;
      break;
    default:
      query += ` | order(_createdAt desc)`;
  }

  try {
    const artworks = await client.fetch<Artwork[]>(query);
    return artworks;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return [];
  }
};

// Fetch featured artworks for homepage
export const fetchFeaturedArtworks = async (limit: number = 6): Promise<Artwork[]> => {
  const query = `*[_type == "artwork" && featured == true] {
    _id,
    _type,
    title,
    description,
    price,
    images,
    mainImage,
    dimensions,
    medium,
    year,
    category,
    availability
  } | order(_createdAt desc) [0...${limit}]`;

  try {
    const artworks = await client.fetch<Artwork[]>(query);
    return artworks;
  } catch (error) {
    console.error('Error fetching featured artworks:', error);
    return [];
  }
};

// Fetch single artwork by ID
export const fetchArtworkById = async (id: string): Promise<Artwork | null> => {
  const query = `*[_type == "artwork" && _id == "${id}"][0] {
    _id,
    _type,
    title,
    description,
    longDescription,
    price,
    images,
    mainImage,
    dimensions,
    medium,
    year,
    category,
    availability,
    featured,
    tags
  }`;

  try {
    const artwork = await client.fetch<Artwork>(query);
    return artwork;
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return null;
  }
};

// Fetch artist profile
export const fetchArtistProfile = async (): Promise<ArtistProfile | null> => {
  const query = `*[_type == "artistProfile"][0] {
    _id,
    _type,
    name,
    bio,
    profileImage,
    coverImage,
    email,
    phone,
    address,
    socialMedia,
    artistStatement,
    workingHours
  }`;

  try {
    const profile = await client.fetch<ArtistProfile>(query);
    return profile;
  } catch (error) {
    console.error('Error fetching artist profile:', error);
    return null;
  }
};

// Fetch site settings (including WhatsApp number)
export const fetchSiteSettings = async (): Promise<SiteSettings | null> => {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    _type,
    whatsappNumber,
    businessHours,
    location,
    socialMedia
  }`;

  try {
    const settings = await client.fetch<SiteSettings>(query);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

// Search artworks by title or description
export const searchArtworks = async (searchTerm: string): Promise<Artwork[]> => {
  const query = `*[_type == "artwork" && (
    title match "${searchTerm}*" ||
    description match "${searchTerm}*" ||
    category match "${searchTerm}*" ||
    medium match "${searchTerm}*"
  )] {
    _id,
    _type,
    title,
    description,
    price,
    images,
    mainImage,
    dimensions,
    medium,
    year,
    category,
    availability
  } | order(_createdAt desc)`;

  try {
    const artworks = await client.fetch<Artwork[]>(query);
    return artworks;
  } catch (error) {
    console.error('Error searching artworks:', error);
    return [];
  }
};

// Get artwork categories for filtering
export const fetchArtworkCategories = async (): Promise<string[]> => {
  const query = `*[_type == "artwork"] | order(category asc) {
    "category": category
  }`;

  try {
    const result = await client.fetch<{ category: string }[]>(query);
    const categories = [...new Set(result.map(item => item.category))];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};