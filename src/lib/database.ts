import Dexie, { type EntityTable } from 'dexie';

// Define the favorite item interface
export interface FavoriteItem {
  id: string; // artwork ID
  artworkTitle?: string; // optional title for better UX
  dateAdded: Date; // when it was favorited
}

// Define the database schema
export class ArtisanCanvasDB extends Dexie {
  favorites!: EntityTable<FavoriteItem, 'id'>;

  constructor() {
    super('ArtisanCanvasDB');
    
    // Define the schema
    this.version(1).stores({
      favorites: 'id, artworkTitle, dateAdded' // id is primary key
    });
  }
}

// Create a single instance of the database
export const db = new ArtisanCanvasDB();

// Database utility functions
export const favoritesDB = {
  // Add an artwork to favorites
  async addFavorite(artworkId: string, artworkTitle?: string): Promise<void> {
    await db.favorites.put({
      id: artworkId,
      artworkTitle,
      dateAdded: new Date()
    });
  },

  // Remove an artwork from favorites
  async removeFavorite(artworkId: string): Promise<void> {
    await db.favorites.delete(artworkId);
  },

  // Check if an artwork is favorited
  async isFavorite(artworkId: string): Promise<boolean> {
    const item = await db.favorites.get(artworkId);
    return !!item;
  },

  // Get all favorited artworks
  async getAllFavorites(): Promise<FavoriteItem[]> {
    return await db.favorites.orderBy('dateAdded').reverse().toArray();
  },

  // Get just the IDs of favorited artworks
  async getFavoriteIds(): Promise<string[]> {
    const favorites = await db.favorites.toArray();
    return favorites.map(fav => fav.id);
  },

  // Clear all favorites
  async clearAllFavorites(): Promise<void> {
    await db.favorites.clear();
  },

  // Get favorites count
  async getFavoritesCount(): Promise<number> {
    return await db.favorites.count();
  },

  // Migrate from localStorage if needed
  async migrateFromLocalStorage(): Promise<void> {
    try {
      const localStorageKey = 'artisan-canvas-favorites';
      const existingFavorites = localStorage.getItem(localStorageKey);
      
      if (existingFavorites) {
        const favoritesArray = JSON.parse(existingFavorites) as string[];
        
        // Check if we already have data in Dexie
        const existingCount = await this.getFavoritesCount();
        
        if (existingCount === 0 && favoritesArray.length > 0) {
          // Migrate data from localStorage to Dexie
          for (const artworkId of favoritesArray) {
            await this.addFavorite(artworkId);
          }
          
          // Optionally remove from localStorage after successful migration
          localStorage.removeItem(localStorageKey);
          console.log(`Migrated ${favoritesArray.length} favorites from localStorage to Dexie`);
        }
      }
    } catch (error) {
      console.error('Error migrating favorites from localStorage:', error);
    }
  }
};