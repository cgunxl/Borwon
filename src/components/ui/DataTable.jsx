import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Filter, Download, Eye, Edit, Trash2, Star, TrendingUp, Clock, Heart } from 'lucide-react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';

const DataTable = ({
  data = [],
  columns = [],
  searchable = true,
  filterable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  className = "",
  onRowClick,
  onEdit,
  onDelete,
  onExport,
  showActions = true,
  showStats = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSizeState);
  const startIndex = (currentPage - 1) * pageSizeState;
  const endIndex = startIndex + pageSizeState;

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            result = result.filter(item => value.includes(item[key]));
          }
        } else {
          result = result.filter(item => item[key] === value);
        }
      }
    });

    return result;
  }, [data, searchQuery, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      // Handle different data types
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortBy, sortOrder]);

  // Get current page data
  const currentData = pagination ? sortedData.slice(startIndex, endIndex) : sortedData;

  // Handle search
  const handleSearch = (query, filter) => {
    setSearchQuery(query);
    if (filter && filter !== 'all') {
      setFilters(prev => ({ ...prev, category: filter }));
    }
    setCurrentPage(1);
  };

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Handle column sort
  const handleColumnSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('asc');
    }
  };

  // Handle row selection
  const handleRowSelect = (rowId) => {
    setSelectedRows(prev => {
      if (prev.includes(rowId)) {
        return prev.filter(id => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map(row => row.id));
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSizeState(size);
    setCurrentPage(1);
  };

  // Export data
  const handleExport = () => {
    if (onExport) {
      onExport(currentData);
    } else {
      // Default export to CSV
      const csvContent = [
        columns.map(col => col.label).join(','),
        ...currentData.map(row => 
          columns.map(col => `"${row[col.key] || ''}"`).join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bwn-data-export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) {
      return <div className="w-4 h-4 text-bwn-white/30" />;
    }
    
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-bwn-accent" />
    ) : (
      <ChevronDown className="w-4 h-4 text-bwn-accent" />
    );
  };

  // Get cell value with formatting
  const getCellValue = (item, column) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }

    if (column.type === 'rating') {
      return (
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>{value}</span>
        </div>
      );
    }

    if (column.type === 'status') {
      const statusColors = {
        active: 'bg-green-500/20 text-green-400 border-green-500/30',
        inactive: 'bg-red-500/20 text-red-400 border-red-500/30',
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      };
      
      return (
        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${statusColors[value] || statusColors.inactive}`}>
          {value}
        </span>
      );
    }

    if (column.type === 'price') {
      return value === 'free' ? (
        <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-medium">
          ฟรี
        </span>
      ) : (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-medium">
          {value}
        </span>
      );
    }

    return value;
  };

  return (
    <div className={`bg-bwn-dark-gray rounded-2xl border border-bwn-medium-gray overflow-hidden ${className}`}>
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-bwn-medium-gray">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-bwn-white mb-2">ข้อมูลและรายการ</h2>
            {showStats && (
              <div className="flex items-center space-x-6 text-sm text-bwn-white/70">
                <span>ทั้งหมด: {data.length} รายการ</span>
                <span>แสดง: {filteredData.length} รายการ</span>
                {pagination && (
                  <span>หน้า {currentPage} จาก {totalPages}</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {onExport && (
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-bwn-accent text-bwn-deep-black rounded-lg hover:bg-bwn-accent-light transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>ส่งออก</span>
              </button>
            )}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="ค้นหาในตาราง..."
                showFilters={false}
                showTrending={false}
              />
            </div>
          )}
          
          {filterable && (
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bwn-medium-gray/20">
            <tr>
              {showActions && (
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === currentData.length && currentData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-bwn-accent bg-bwn-medium-gray border-bwn-light-gray rounded focus:ring-bwn-accent focus:ring-2"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-medium text-bwn-white cursor-pointer hover:bg-bwn-medium-gray/30 transition-colors duration-200 ${
                    sortable && column.sortable !== false ? 'hover:text-bwn-accent' : ''
                  }`}
                  onClick={() => sortable && column.sortable !== false && handleColumnSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              
              {showActions && (
                <th className="px-6 py-4 text-left text-sm font-medium text-bwn-white">
                  การดำเนินการ
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-bwn-medium-gray/20">
            {currentData.map((item, index) => (
              <tr
                key={item.id || index}
                className={`hover:bg-bwn-medium-gray/10 transition-colors duration-200 ${
                  onRowClick ? 'cursor-pointer' : ''
                } ${selectedRows.includes(item.id) ? 'bg-bwn-accent/10' : ''}`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {showActions && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleRowSelect(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 text-bwn-accent bg-bwn-medium-gray border-bwn-light-gray rounded focus:ring-bwn-accent focus:ring-2"
                    />
                  </td>
                )}
                
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-bwn-white/80">
                    {getCellValue(item, column)}
                  </td>
                ))}
                
                {showActions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(item);
                        }}
                        className="p-2 text-bwn-accent hover:bg-bwn-accent/10 rounded-lg transition-colors duration-200"
                        title="แก้ไข"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(item);
                        }}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-bwn-medium-gray bg-bwn-medium-gray/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-bwn-white/70">
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredData.length)} จาก {filteredData.length} รายการ
              </span>
              
              <select
                value={pageSizeState}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="px-3 py-1 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white text-sm focus:outline-none focus:border-bwn-accent"
              >
                <option value={10}>10 รายการ</option>
                <option value={25}>25 รายการ</option>
                <option value={50}>50 รายการ</option>
                <option value={100}>100 รายการ</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-2 text-bwn-white/70 hover:text-bwn-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-bwn-white/70 hover:text-bwn-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-bwn-accent text-bwn-deep-black'
                          : 'text-bwn-white/70 hover:text-bwn-white hover:bg-bwn-medium-gray'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-bwn-white/70 hover:text-bwn-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 text-bwn-white/70 hover:text-bwn-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {currentData.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-16 h-16 bg-bwn-medium-gray rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-bwn-white/50" />
          </div>
          <h3 className="text-lg font-semibold text-bwn-white mb-2">ไม่พบข้อมูล</h3>
          <p className="text-bwn-white/70 mb-4">
            {searchQuery || Object.values(filters).some(f => f && f !== 'all')
              ? 'ลองเปลี่ยนคำค้นหาหรือตัวกรองดูครับ'
              : 'ยังไม่มีข้อมูลในระบบ'
            }
          </p>
          {(searchQuery || Object.values(filters).some(f => f && f !== 'all')) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({});
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-bwn-accent text-bwn-deep-black rounded-lg hover:bg-bwn-accent-light transition-colors duration-200"
            >
              ล้างการค้นหา
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;