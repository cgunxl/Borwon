import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Sliders } from 'lucide-react';

const FilterPanel = ({ 
  filters = {}, 
  onFilterChange, 
  className = "",
  showAdvanced = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Default filter options
  const defaultFilters = {
    category: [
      { value: 'all', label: 'ทั้งหมด', icon: '🔍' },
      { value: 'apps', label: 'แอป', icon: '📱' },
      { value: 'channels', label: 'ช่องทาง', icon: '📺' },
      { value: 'fanpages', label: 'เพจแนะนำ', icon: '📘' },
      { value: 'products', label: 'สินค้า', icon: '🛍️' },
      { value: 'news', label: 'ข่าวสาร', icon: '📰' },
      { value: 'advice', label: 'คำแนะนำ', icon: '💡' },
      { value: 'locations', label: 'สถานที่', icon: '📍' },
      { value: 'money', label: 'หาเงิน', icon: '💸' }
    ],
    price: [
      { value: 'all', label: 'ทุกราคา', icon: '💰' },
      { value: 'free', label: 'ฟรี', icon: '🆓' },
      { value: 'paid', label: 'เสียเงิน', icon: '💳' },
      { value: 'freemium', label: 'ฟรี + Premium', icon: '⭐' }
    ],
    rating: [
      { value: 'all', label: 'ทุกคะแนน', icon: '⭐' },
      { value: '5', label: '5 ดาว', icon: '⭐⭐⭐⭐⭐' },
      { value: '4', label: '4+ ดาว', icon: '⭐⭐⭐⭐' },
      { value: '3', label: '3+ ดาว', icon: '⭐⭐⭐' }
    ],
    language: [
      { value: 'all', label: 'ทุกภาษา', icon: '🌐' },
      { value: 'thai', label: 'ไทย', icon: '🇹🇭' },
      { value: 'english', label: 'อังกฤษ', icon: '🇺🇸' },
      { value: 'chinese', label: 'จีน', icon: '🇨🇳' },
      { value: 'japanese', label: 'ญี่ปุ่น', icon: '🇯🇵' }
    ],
    platform: [
      { value: 'all', label: 'ทุกแพลตฟอร์ม', icon: '💻' },
      { value: 'web', label: 'เว็บไซต์', icon: '🌐' },
      { value: 'ios', label: 'iOS', icon: '🍎' },
      { value: 'android', label: 'Android', icon: '🤖' },
      { value: 'desktop', label: 'Desktop', icon: '🖥️' }
    ]
  };

  // Merge with custom filters
  const allFilters = { ...defaultFilters, ...filters };

  useEffect(() => {
    // Initialize active filters
    const initial = {};
    Object.keys(allFilters).forEach(key => {
      initial[key] = 'all';
    });
    setActiveFilters(initial);
  }, [allFilters]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const cleared = {};
    Object.keys(allFilters).forEach(key => {
      cleared[key] = 'all';
    });
    setActiveFilters(cleared);
    
    if (onFilterChange) {
      onFilterChange(cleared);
    }
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  const hasActiveFilters = getActiveFilterCount() > 0;

  return (
    <div className={`${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
          hasActiveFilters
            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>ตัวกรอง</span>
        {hasActiveFilters && (
          <span className="bg-white text-blue-500 text-xs px-2 py-1 rounded-full font-medium">
            {getActiveFilterCount()}
          </span>
        )}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-4 min-w-80">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">ตัวกรองการค้นหา</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Basic Filters */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                หมวดหมู่
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allFilters.category.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('category', option.value)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeFilters.category === option.value
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ราคา
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allFilters.price.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('price', option.value)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeFilters.price === option.value
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            {showAdvanced && (
              <div>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  <span>ตัวกรองขั้นสูง</span>
                </button>
              </div>
            )}

            {/* Advanced Filters */}
            {showAdvanced && showAdvancedFilters && (
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    คะแนน
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {allFilters.rating.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('rating', option.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          activeFilters.rating === option.value
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ภาษา
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {allFilters.language.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('language', option.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          activeFilters.language === option.value
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platform Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    แพลตฟอร์ม
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {allFilters.platform.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('platform', option.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          activeFilters.platform === option.value
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={clearAllFilters}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ล้างทั้งหมด
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              ใช้ตัวกรอง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;