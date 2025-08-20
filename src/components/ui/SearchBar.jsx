import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Clock, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "ค้นหาทุกอย่างใน Bwn X...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches] = useState([
    'แอปท่องเที่ยว', 'การลงทุนคริปโต', 'เกมเติมเงิน', 'สินค้าความงาม',
    'ข่าวเทคโนโลยี', 'วิธีหาเงินออนไลน์', 'affiliate marketing', 'passive income'
  ]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('bwn-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('bwn-recent-searches', JSON.stringify(newRecent));
      
      // Perform search
      onSearch(searchQuery);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, trendingSearches.length + recentSearches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        const allSuggestions = [...recentSearches, ...trendingSearches];
        handleSearch(allSuggestions[activeIndex]);
      } else {
        handleSearch(query);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('bwn-recent-searches');
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  ค้นหาล่าสุด
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                  ลบทั้งหมด
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={`recent-${index}`}
                    onClick={() => handleSearch(search)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeIndex === index
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="p-3">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              ค้นหายอดนิยม
            </div>
            <div className="space-y-1">
              {trendingSearches.map((search, index) => (
                <button
                  key={`trending-${index}`}
                  onClick={() => handleSearch(search)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeIndex === index + recentSearches.length
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Search Filters */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Filter className="w-4 h-4 mr-2" />
              ตัวกรองการค้นหา
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['แอป', 'ช่องทาง', 'เพจ', 'สินค้า', 'ข่าว', 'คำแนะนำ', 'สถานที่', 'การเงิน'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleSearch(`${query} ${filter}`)}
                  className="px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;