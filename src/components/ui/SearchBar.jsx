import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, TrendingUp, Clock, Star } from 'lucide-react';

const SearchBar = ({ 
  onSearch, 
  placeholder = "ค้นหาสิ่งที่คุณต้องการ...",
  showFilters = true,
  showTrending = true,
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const searchRef = useRef(null);

  // Mock data for trending searches
  useEffect(() => {
    setTrendingSearches([
      { id: 1, text: 'แอปท่องเที่ยว', category: 'apps', icon: '✈️' },
      { id: 2, text: 'การลงทุนคริปโต', category: 'channels', icon: '₿' },
      { id: 3, text: 'เกมเติมเงิน', category: 'fanpages', icon: '🎮' },
      { id: 4, text: 'สินค้าความงาม', category: 'products', icon: '💄' },
      { id: 5, text: 'ข่าวเทคโนโลยี', category: 'news', icon: '📱' }
    ]);

    // Load recent searches from localStorage
    const saved = localStorage.getItem('bwn-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'ทั้งหมด', icon: '🔍' },
    { value: 'apps', label: 'แอป', icon: '📱' },
    { value: 'channels', label: 'ช่องทาง', icon: '📺' },
    { value: 'fanpages', label: 'เพจแนะนำ', icon: '📘' },
    { value: 'products', label: 'สินค้า', icon: '🛍️' },
    { value: 'news', label: 'ข่าวสาร', icon: '📰' },
    { value: 'advice', label: 'คำแนะนำ', icon: '💡' },
    { value: 'locations', label: 'สถานที่', icon: '📍' },
    { value: 'money', label: 'หาเงิน', icon: '💸' }
  ];

  // Handle search submission
  const handleSearch = (searchQuery = query, filter = selectedFilter) => {
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const newSearch = {
      text: searchQuery,
      filter: filter,
      timestamp: Date.now()
    };

    const updated = [newSearch, ...recentSearches.filter(s => s.text !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('bwn-recent-searches', JSON.stringify(updated));

    // Call parent search function
    onSearch(searchQuery, filter);
    
    // Close suggestions
    setShowSuggestions(false);
    setIsFocused(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setSelectedFilter(suggestion.category || 'all');
    handleSearch(suggestion.text, suggestion.category || 'all');
  };

  // Handle recent search click
  const handleRecentClick = (search) => {
    setQuery(search.text);
    setSelectedFilter(search.filter);
    handleSearch(search.text, search.filter);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('bwn-recent-searches');
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bwn-white/50">
          <Search className="w-5 h-5" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 bg-bwn-medium-gray border border-bwn-light-gray rounded-xl text-bwn-white placeholder-bwn-white/50 focus:outline-none focus:border-bwn-accent focus:ring-2 focus:ring-bwn-accent/20 transition-all duration-200"
        />

        {/* Filter Button */}
        {showFilters && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-1 bg-bwn-accent text-bwn-deep-black rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-bwn-accent/50"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-bwn-accent text-bwn-deep-black rounded-lg text-sm font-medium hover:bg-bwn-accent-light transition-colors duration-200"
        >
          ค้นหา
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {/* Trending Searches */}
          {showTrending && trendingSearches.length > 0 && (
            <div className="p-4 border-b border-bwn-medium-gray">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-bwn-accent" />
                <span className="text-sm font-medium text-bwn-white">ค้นหายอดนิยม</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {trendingSearches.map((trend) => (
                  <button
                    key={trend.id}
                    onClick={() => handleSuggestionClick(trend)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200 text-left"
                  >
                    <span className="text-lg">{trend.icon}</span>
                    <span className="text-sm text-bwn-white/80">{trend.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-bwn-medium-gray">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-bwn-accent" />
                  <span className="text-sm font-medium text-bwn-white">ค้นหาล่าสุด</span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-bwn-white/50 hover:text-bwn-accent transition-colors duration-200"
                >
                  ล้างทั้งหมด
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(search)}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200 text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-bwn-white/80">{search.text}</span>
                      <span className="text-xs text-bwn-white/50 bg-bwn-medium-gray px-2 py-1 rounded">
                        {filterOptions.find(f => f.value === search.filter)?.label}
                      </span>
                    </div>
                    <X className="w-3 h-3 text-bwn-white/30" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-bwn-accent" />
              <span className="text-sm font-medium text-bwn-white">การค้นหาเร็ว</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSearch('แอปท่องเที่ยว', 'apps')}
                className="p-2 rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200 text-left"
              >
                <div className="text-sm text-bwn-white/80">✈️ แอปท่องเที่ยว</div>
              </button>
              <button
                onClick={() => handleSearch('การลงทุน', 'channels')}
                className="p-2 rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200 text-left"
              >
                <div className="text-sm text-bwn-white/80">📈 การลงทุน</div>
              </button>
              <button
                onClick={() => handleSearch('เกมเติมเงิน', 'fanpages')}
                className="p-2 rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200 text-left"
              >
                <div className="text-sm text-bwn-white/80">🎮 เกมเติมเงิน</div>
              </button>
              <button
                onClick={() => handleSearch('สินค้าความงาม', 'products')}
                className="p-2 rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200 text-left"
              >
                <div className="text-sm text-bwn-white/80">💄 สินค้าความงาม</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;