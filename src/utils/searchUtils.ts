
interface SearchableItem {
  id: number;
  title: string;
  description?: string;
  medium: string;
  category?: string;
  series?: string;
  year?: string;
  image: string;
  featured: boolean;
  price?: string;
  type?: string;
  date?: string;
  [key: string]: any;
}

export const fuzzySearch = (items: SearchableItem[], searchTerm: string): SearchableItem[] => {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase().trim();
  
  return items.filter(item => {
    // Search in multiple fields
    const searchFields = [
      item.title,
      item.description,
      item.medium,
      item.category,
      item.series,
      item.year
    ].filter(Boolean).join(' ').toLowerCase();

    // Simple fuzzy matching - checks if all words in search term exist
    const searchWords = term.split(/\s+/);
    return searchWords.every(word => searchFields.includes(word));
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    
    if (aTitle.includes(term) && !bTitle.includes(term)) return -1;
    if (!aTitle.includes(term) && bTitle.includes(term)) return 1;
    
    return 0;
  });
};

export const getFilterCounts = (items: SearchableItem[], filterKey: string): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  items.forEach(item => {
    const value = item[filterKey];
    if (value) {
      counts[value] = (counts[value] || 0) + 1;
    }
  });
  
  return counts;
};
