import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you need fresh data
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export const urlFor = (source: any) => builder.image(source);

// Helper function to get optimized image URL with dimensions
export const getImageUrl = (source: any, width?: number, height?: number) => {
  let imageBuilder = urlFor(source);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url();
};