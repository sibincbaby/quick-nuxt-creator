
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Heart, Share2 } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: {
    label: string;
    key: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  sortOptions: FilterOption[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  resultsCount: number;
  showSocial?: boolean;
  onHeartClick?: () => void;
  onShareClick?: () => void;
  isLiked?: boolean;
  className?: string;
}

const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  sortOptions,
  sortBy,
  onSortChange,
  resultsCount,
  showSocial = false,
  onHeartClick,
  onShareClick,
  isLiked = false,
  className = ""
}: SearchAndFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    const activeCount = filters.filter(filter => filter.value !== 'all' && filter.value !== '').length;
    setActiveFiltersCount(activeCount);
  }, [filters]);

  const clearAllFilters = () => {
    filters.forEach(filter => filter.onChange('all'));
    onSearchChange('');
    onSortChange('latest');
  };

  const hasActiveFilters = searchTerm || activeFiltersCount > 0 || sortBy !== 'latest';

  return (
    <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 ${className}`}>
      <div className="px-6 py-4 space-y-4">
        {/* Main Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 h-12 text-base border-gray-200 focus:border-teal-500 focus:ring-teal-500"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`h-12 px-4 border-gray-200 transition-colors ${
              activeFiltersCount > 0 ? 'border-teal-500 text-teal-700 bg-teal-50' : ''
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-teal-100 text-teal-700">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Social Actions */}
          {showSocial && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onHeartClick}
                className={`h-12 w-12 transition-colors ${
                  isLiked ? 'text-red-500 border-red-200 bg-red-50' : 'border-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onShareClick}
                className="h-12 w-12 border-gray-200"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Expanded Filters */}
        <div className={`space-y-4 transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {filter.label}
                </label>
                <Select value={filter.value} onValueChange={filter.onChange}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          {option.count !== undefined && (
                            <span className="text-xs text-gray-500 ml-2">({option.count})</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {resultsCount} artwork{resultsCount !== 1 ? 's' : ''} found
            {hasActiveFilters && <span className="ml-1">with current filters</span>}
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-teal-600 font-medium">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
