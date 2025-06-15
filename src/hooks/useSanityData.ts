
import { useState, useEffect } from 'react'
import { sanityClient, queries, Artwork, Post } from '../lib/sanity'

export const useArtworks = (featured = false) => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const query = featured ? queries.featuredArtworks : queries.artworks
    sanityClient
      .fetch(query)
      .then(setArtworks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [featured])

  return { artworks, loading, error }
}

export const usePosts = (featured = false) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const query = featured ? queries.featuredPosts : queries.posts
    sanityClient
      .fetch(query)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [featured])

  return { posts, loading, error }
}

export const useArtwork = (slug: string) => {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    sanityClient
      .fetch(queries.singleArtwork, { slug })
      .then(setArtwork)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  return { artwork, loading, error }
}

export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    sanityClient
      .fetch(queries.singlePost, { slug })
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  return { post, loading, error }
}
