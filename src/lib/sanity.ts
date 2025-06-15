
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: '90ptohp5',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)

// Pre-built GROQ queries for all content types
export const queries = {
  artworks: `*[_type == "artwork"] | order(year desc) {
    _id,
    title,
    slug,
    description,
    medium,
    year,
    dimensions,
    price,
    images,
    available,
    featured,
    tags,
    series
  }`,
  featuredArtworks: `*[_type == "artwork" && featured == true] {
    _id,
    title,
    slug,
    description,
    medium,
    year,
    dimensions,
    price,
    images,
    available,
    featured,
    tags,
    series
  }`,
  posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    featured,
    tags,
    readTime
  }`,
  featuredPosts: `*[_type == "post" && featured == true] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    featured,
    tags,
    readTime
  }`,
  singleArtwork: `*[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    medium,
    year,
    dimensions,
    price,
    images,
    available,
    featured,
    tags,
    series
  }`,
  singlePost: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    featured,
    tags,
    readTime,
    body
  }`
}

// Types for TypeScript
export interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  description: string
  longDescription?: string
  medium: string
  year: string
  dimensions?: string
  price?: number
  images: any[]
  available: boolean
  featured: boolean
  tags?: string[]
  series?: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: any
  publishedAt: string
  featured: boolean
  tags?: string[]
  readTime?: string
  body?: any[]
}
