import { useState, useEffect, useCallback } from 'react';
import { favoritesDB } from '../lib/database';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from Dexie on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        
        // First, try to migrate from localStorage if needed
        await favoritesDB.migrateFromLocalStorage();
        
        // Then load all favorites from Dexie
        const favoriteIds = await favoritesDB.getFavoriteIds();
        setFavorites(new Set(favoriteIds));
      } catch (error) {
        console.error('Error loading favorites from Dexie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Add item to favorites
  const addToFavorites = useCallback(async (id: string, artworkTitle?: string) => {
    try {
      await favoritesDB.addFavorite(id, artworkTitle);
      setFavorites(prev => new Set([...prev, id]));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }, []);

  // Remove item from favorites
  const removeFromFavorites = useCallback(async (id: string) => {
    try {
      await favoritesDB.removeFavorite(id);
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (id: string, artworkTitle?: string) => {
    if (favorites.has(id)) {
      await removeFromFavorites(id);
    } else {
      await addToFavorites(id, artworkTitle);
    }
  }, [favorites, addToFavorites, removeFromFavorites]);

  // Check if item is favorited (synchronous for UI)
  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  // Get all favorites as array
  const getFavoritesList = useCallback(() => Array.from(favorites), [favorites]);

  // Get detailed favorites with metadata
  const getDetailedFavorites = useCallback(async () => {
    try {
      return await favoritesDB.getAllFavorites();
    } catch (error) {
      console.error('Error getting detailed favorites:', error);
      return [];
    }
  }, []);

  // Clear all favorites
  const clearFavorites = useCallback(async () => {
    try {
      await favoritesDB.clearAllFavorites();
      setFavorites(new Set());
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }, []);

  // Get favorites count
  const getFavoritesCount = useCallback(async () => {
    try {
      return await favoritesDB.getFavoritesCount();
    } catch (error) {
      console.error('Error getting favorites count:', error);
      return 0;
    }
  }, []);

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesList,
    getDetailedFavorites,
    clearFavorites,
    getFavoritesCount,
    favoritesCount: favorites.size
  };
};