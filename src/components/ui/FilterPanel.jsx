import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Sliders, SortAsc, SortDesc, Star, TrendingUp, Clock, Heart } from 'lucide-react';

const FilterPanel = ({
  filters = {},
  onFiltersChange,
  onSortChange,
  sortBy = 'popular',
  sortOrder = 'desc',
  showAdvanced = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Filter options
  const filterOptions = {
    category: {
      label: 'หมวดหมู่',
      icon: '📂',
      options: [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'apps', label: 'แอปและเครื่องมือ' },
        { value: 'channels', label: 'ช่องทางการลงทุน' },
        { value: 'fanpages', label: 'เพจแนะนำ' },
        { value: 'products', label: 'สินค้าและบริการ' },
        { value: 'news', label: 'ข่าวสารและข้อมูล' },
        { value: 'advice', label: 'คำแนะนำและเทคนิค' },
        { value: 'locations', label: 'สถานที่และจุดหมาย' },
        { value: 'money', label: 'หาเงินและรายได้' }
      ]
    },
    rating: {
      label: 'คะแนนรีวิว',
      icon: '⭐',
      options: [
        { value: 'all', label: 'ทั้งหมด' },
        { value: '4.5+', label: '4.5+ ดาว' },
        { value: '4.0+', label: '4.0+ ดาว' },
        { value: '3.5+', label: '3.5+ ดาว' },
        { value: '3.0+', label: '3.0+ ดาว' }
      ]
    },
    price: {
      label: 'ราคา',
      icon: '💰',
      options: [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'free', label: 'ฟรี' },
        { value: 'paid', label: 'เสียเงิน' },
        { value: 'freemium', label: 'ฟรี + Premium' }
      ]
    },
    popularity: {
      label: 'ความนิยม',
      icon: '🔥',
      options: [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'trending', label: 'กำลังเป็นที่นิยม' },
        { value: 'popular', label: 'ยอดนิยม' },
        { value: 'new', label: 'ใหม่ล่าสุด' }
      ]
    },
    language: {
      label: 'ภาษา',
      icon: '🌐',
      options: [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'thai', label: 'ไทย' },
        { value: 'english', label: 'อังกฤษ' },
        { value: 'chinese', label: 'จีน' },
        { value: 'japanese', label: 'ญี่ปุ่น' }
      ]
    }
  };

  // Sort options
  const sortOptions = [
    { value: 'popular', label: 'ความนิยม', icon: TrendingUp },
    { value: 'rating', label: 'คะแนนรีวิว', icon: Star },
    { value: 'newest', label: 'ใหม่ล่าสุด', icon: Clock },
    { value: 'name', label: 'ชื่อ A-Z', icon: SortAsc },
    { value: 'price', label: 'ราคา', icon: SortDesc }
  ];

  // Update active filters count
  useEffect(() => {
    const count = Object.values(localFilters).filter(value => 
      value && value !== 'all' && (Array.isArray(value) ? value.length > 0 : true)
    ).length;
    setActiveFiltersCount(count);
  }, [localFilters]);

  // Handle filter change
  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...localFilters, [filterKey]: value };
    setLocalFilters(newFilters);
  };

  // Handle multiple selection for array filters
  const handleMultiFilterChange = (filterKey, value, checked) => {
    const currentValues = localFilters[filterKey] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    handleFilterChange(filterKey, newValues);
  };

  // Apply filters
  const applyFilters = () => {
    onFiltersChange(localFilters);
    onSortChange(localSortBy, localSortOrder);
    setIsOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilters = {};
    Object.keys(filterOptions).forEach(key => {
      resetFilters[key] = 'all';
    });
    setLocalFilters(resetFilters);
    setLocalSortBy('popular');
    setLocalSortOrder('desc');
  };

  // Clear specific filter
  const clearFilter = (filterKey) => {
    handleFilterChange(filterKey, 'all');
  };

  // Get filter display value
  const getFilterDisplayValue = (filterKey) => {
    const value = localFilters[filterKey];
    if (!value || value === 'all') return 'ทั้งหมด';
    
    if (Array.isArray(value)) {
      if (value.length === 0) return 'ทั้งหมด';
      return `${value.length} รายการ`;
    }
    
    const option = filterOptions[filterKey]?.options.find(opt => opt.value === value);
    return option ? option.label : 'ทั้งหมด';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-xl text-bwn-white hover:bg-bwn-accent/10 hover:border-bwn-accent transition-all duration-200"
      >
        <Filter className="w-4 h-4" />
        <span>ตัวกรอง</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-1 bg-bwn-accent text-bwn-deep-black text-xs rounded-full font-medium">
            {activeFiltersCount}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl shadow-2xl z-50 min-w-80">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-bwn-accent" />
                <h3 className="text-lg font-semibold text-bwn-white">ตัวกรองและเรียงลำดับ</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-bwn-white/50 hover:text-bwn-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 p-4 bg-bwn-medium-gray/20 rounded-xl border border-bwn-medium-gray">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-bwn-white">ตัวกรองที่ใช้งาน:</span>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-bwn-accent hover:text-bwn-accent-light transition-colors duration-200"
                  >
                    ล้างทั้งหมด
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(localFilters).map(([key, value]) => {
                    if (!value || value === 'all' || (Array.isArray(value) && value.length === 0)) return null;
                    
                    return (
                      <div
                        key={key}
                        className="flex items-center space-x-2 px-3 py-1 bg-bwn-accent/20 text-bwn-accent rounded-lg border border-bwn-accent/30"
                      >
                        <span className="text-xs">
                          {filterOptions[key]?.icon} {filterOptions[key]?.label}: {getFilterDisplayValue(key)}
                        </span>
                        <button
                          onClick={() => clearFilter(key)}
                          className="text-bwn-accent hover:text-bwn-accent-light transition-colors duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filter Options */}
            <div className="space-y-6">
              {Object.entries(filterOptions).map(([key, filter]) => (
                <div key={key} className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-bwn-white">
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </label>
                  
                  {filter.multiSelect ? (
                    // Multi-select checkboxes
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localFilters[key]?.includes(option.value) || false}
                            onChange={(e) => handleMultiFilterChange(key, option.value, e.target.checked)}
                            className="w-4 h-4 text-bwn-accent bg-bwn-medium-gray border-bwn-light-gray rounded focus:ring-bwn-accent focus:ring-2"
                          />
                          <span className="text-sm text-bwn-white/80">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    // Single-select dropdown
                    <select
                      value={localFilters[key] || 'all'}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="w-full px-3 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white focus:outline-none focus:border-bwn-accent focus:ring-1 focus:ring-bwn-accent"
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            {/* Sort Options */}
            <div className="mt-8 p-4 bg-bwn-medium-gray/20 rounded-xl border border-bwn-medium-gray">
              <h4 className="text-sm font-medium text-bwn-white mb-3">เรียงลำดับตาม:</h4>
              <div className="grid grid-cols-2 gap-3">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLocalSortBy(option.value)}
                    className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-all duration-200 ${
                      localSortBy === option.value
                        ? 'bg-bwn-accent text-bwn-deep-black'
                        : 'bg-bwn-medium-gray text-bwn-white hover:bg-bwn-accent/10'
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Sort Order */}
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-xs text-bwn-white/70">ลำดับ:</span>
                <button
                  onClick={() => setLocalSortOrder('asc')}
                  className={`p-1 rounded ${
                    localSortOrder === 'asc'
                      ? 'bg-bwn-accent text-bwn-deep-black'
                      : 'bg-bwn-medium-gray text-bwn-white hover:bg-bwn-accent/10'
                  }`}
                >
                  <SortAsc className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLocalSortOrder('desc')}
                  className={`p-1 rounded ${
                    localSortOrder === 'desc'
                      ? 'bg-bwn-accent text-bwn-deep-black'
                      : 'bg-bwn-medium-gray text-bwn-white hover:bg-bwn-accent/10'
                  }`}
                >
                  <SortDesc className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 bg-bwn-accent text-bwn-deep-black font-medium rounded-lg hover:bg-bwn-accent-light transition-colors duration-200"
              >
                ใช้ตัวกรอง
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-bwn-medium-gray text-bwn-white rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200"
              >
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;