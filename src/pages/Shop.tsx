import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const originals = [
    {
      id: 1,
      title: "Original 1",
      price: "₹12,000",
      type: "acrylic",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Original 2", 
      price: "₹16,000",
      type: "oil",
      date: "2024-02-10",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop"
    }
  ];

  const prints = [
    {
      id: 3,
      title: "Print 1",
      price: "₹4,000",
      type: "watercolor",
      date: "2024-01-20",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      title: "Print 2",
      price: "₹4,800",
      type: "mural",
      date: "2024-03-05",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop"
    }
  ];

  const allArtworks = [...originals, ...prints];

  // Filter and sort logic
  const filteredAndSortedArtworks = allArtworks
    .filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || artwork.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', ''));
        case 'price-high':
          return parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', ''));
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'latest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center p-6 bg-white">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
      </header>

      {/* Search and Filters */}
      <div className="px-6 mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search artworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter and Sort Row */}
        <div className="flex gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="acrylic">Acrylic</SelectItem>
              <SelectItem value="oil">Oil</SelectItem>
              <SelectItem value="watercolor">Watercolor</SelectItem>
              <SelectItem value="mural">Mural</SelectItem>
              <SelectItem value="charcoal">Charcoal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Listing</SelectItem>
              <SelectItem value="oldest">Oldest Listing</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 mb-4">
        <p className="text-sm text-gray-600">
          {filteredAndSortedArtworks.length} artwork{filteredAndSortedArtworks.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Artworks Grid */}
      <section className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredAndSortedArtworks.map((artwork) => (
            <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="group">
              <div className="bg-orange-50 rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div 
                  className="w-full h-48 rounded-lg bg-cover bg-center mb-3"
                  style={{ backgroundImage: `url(${artwork.image})` }}
                ></div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{artwork.title}</h3>
                <p className="text-teal-600 font-semibold text-sm mb-1">{artwork.price}</p>
                <p className="text-xs text-gray-500 capitalize">{artwork.type}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredAndSortedArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No artworks found matching your criteria.</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Shop;
