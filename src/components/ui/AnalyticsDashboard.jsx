import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  Share2, 
  DollarSign,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Zap
} from 'lucide-react';

const AnalyticsDashboard = ({ 
  data = {}, 
  className = "",
  showCharts = true,
  showInsights = true
}) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock data - ในระบบจริงจะมาจาก API
  const mockData = {
    overview: {
      totalUsers: 15420,
      totalViews: 89250,
      totalLikes: 12450,
      totalShares: 5670,
      userGrowth: 12.5,
      viewGrowth: 8.3,
      likeGrowth: 15.7,
      shareGrowth: 22.1
    },
    categories: [
      { name: 'แอป', value: 35, color: '#3B82F6' },
      { name: 'ช่องทาง', value: 25, color: '#10B981' },
      { name: 'เพจ', value: 20, color: '#F59E0B' },
      { name: 'สินค้า', value: 15, color: '#EF4444' },
      { name: 'อื่นๆ', value: 5, color: '#8B5CF6' }
    ],
    trends: [
      { date: '2024-01-01', users: 1200, views: 8500, likes: 950, shares: 420 },
      { date: '2024-01-02', users: 1350, views: 9200, likes: 1100, shares: 480 },
      { date: '2024-01-03', users: 1280, views: 8800, likes: 980, shares: 450 },
      { date: '2024-01-04', users: 1420, views: 9500, likes: 1150, shares: 520 },
      { date: '2024-01-05', users: 1380, views: 9100, likes: 1080, shares: 490 },
      { date: '2024-01-06', users: 1550, views: 10200, likes: 1250, shares: 580 },
      { date: '2024-01-07', users: 1620, views: 10800, likes: 1320, shares: 620 }
    ],
    topContent: [
      { title: 'แอปท่องเที่ยวที่ดีที่สุด 2024', views: 8500, likes: 1250, shares: 320, category: 'แอป' },
      { title: 'วิธีลงทุนคริปโตสำหรับมือใหม่', views: 7200, likes: 980, shares: 280, category: 'ช่องทาง' },
      { title: 'เพจเติมเกมราคาถูกที่สุด', views: 6800, likes: 890, shares: 250, category: 'เพจ' },
      { title: 'สินค้าความงามที่คนดังใช้', views: 6200, likes: 750, shares: 200, category: 'สินค้า' },
      { title: 'ข่าวเทคโนโลยีล่าสุด', views: 5800, likes: 680, shares: 180, category: 'ข่าว' }
    ]
  };

  // Merge with real data
  const analyticsData = { ...mockData, ...data };

  // Time range options
  const timeRanges = [
    { value: '1d', label: 'วันนี้' },
    { value: '7d', label: '7 วัน' },
    { value: '30d', label: '30 วัน' },
    { value: '90d', label: '90 วัน' },
    { value: '1y', label: '1 ปี' }
  ];

  // Metric options
  const metricOptions = [
    { value: 'overview', label: 'ภาพรวม', icon: BarChart3 },
    { value: 'users', label: 'ผู้ใช้', icon: Users },
    { value: 'content', label: 'เนื้อหา', icon: Target },
    { value: 'engagement', label: 'การมีส่วนร่วม', icon: Heart }
  ];

  // Calculate growth percentage
  const getGrowthPercentage = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  // Get growth icon and color
  const getGrowthDisplay = (growth) => {
    const isPositive = growth > 0;
    return {
      icon: isPositive ? TrendingUp : TrendingDown,
      color: isPositive ? 'text-green-500' : 'text-red-500',
      bgColor: isPositive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
    };
  };

  // Format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Simple chart component
  const SimpleChart = ({ data, height = 100 }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="flex items-end space-x-1 h-20">
        {data.map((item, index) => (
          <div key={index} className="flex-1">
            <div
              className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
              style={{
                height: `${(item.value / maxValue) * height}px`,
                backgroundColor: item.color
              }}
              title={`${item.name}: ${item.value}%`}
            />
          </div>
        ))}
      </div>
    );
  };

  // Simple line chart
  const LineChart = ({ data, height = 100 }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.users, d.views, d.likes, d.shares)));
    
    return (
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox={`0 0 ${data.length * 50} ${height}`}>
          {/* Users line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={data.map((d, i) => `${i * 50},${height - (d.users / maxValue) * height}`).join(' ')}
          />
          {/* Views line */}
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            points={data.map((d, i) => `${i * 50},${height - (d.views / maxValue) * height}`).join(' ')}
          />
          {/* Likes line */}
          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            points={data.map((d, i) => `${i * 50},${height - (d.likes / maxValue) * height}`).join(' ')}
          />
        </svg>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            แดชบอร์ดวิเคราะห์ข้อมูล
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            ติดตามประสิทธิภาพและแนวโน้มของเว็บไซต์
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>

          {/* Metric Selector */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {metricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ผู้ใช้ทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalUsers)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getGrowthDisplay(analyticsData.overview.userGrowth).bgColor}`}>
              <Users className={`w-6 h-6 ${getGrowthDisplay(analyticsData.overview.userGrowth).color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {React.createElement(getGrowthDisplay(analyticsData.overview.userGrowth).icon, {
              className: `w-4 h-4 ${getGrowthDisplay(analyticsData.overview.userGrowth).color}`
            })}
            <span className={`text-sm font-medium ${getGrowthDisplay(analyticsData.overview.userGrowth).color}`}>
              {analyticsData.overview.userGrowth}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">จากช่วงก่อน</span>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">การดูทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalViews)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getGrowthDisplay(analyticsData.overview.viewGrowth).bgColor}`}>
              <Eye className={`w-6 h-6 ${getGrowthDisplay(analyticsData.overview.viewGrowth).color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {React.createElement(getGrowthDisplay(analyticsData.overview.viewGrowth).icon, {
              className: `w-4 h-4 ${getGrowthDisplay(analyticsData.overview.viewGrowth).color}`
            })}
            <span className={`text-sm font-medium ${getGrowthDisplay(analyticsData.overview.viewGrowth).color}`}>
              {analyticsData.overview.viewGrowth}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">จากช่วงก่อน</span>
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ไลค์ทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalLikes)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getGrowthDisplay(analyticsData.overview.likeGrowth).bgColor}`}>
              <Heart className={`w-6 h-6 ${getGrowthDisplay(analyticsData.overview.likeGrowth).color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {React.createElement(getGrowthDisplay(analyticsData.overview.likeGrowth).icon, {
              className: `w-4 h-4 ${getGrowthDisplay(analyticsData.overview.likeGrowth).color}`
            })}
            <span className={`text-sm font-medium ${getGrowthDisplay(analyticsData.overview.likeGrowth).color}`}>
              {analyticsData.overview.likeGrowth}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">จากช่วงก่อน</span>
          </div>
        </div>

        {/* Total Shares */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">แชร์ทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalShares)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getGrowthDisplay(analyticsData.overview.shareGrowth).bgColor}`}>
              <Share2 className={`w-6 h-6 ${getGrowthDisplay(analyticsData.overview.shareGrowth).color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {React.createElement(getGrowthDisplay(analyticsData.overview.shareGrowth).icon, {
              className: `w-4 h-4 ${getGrowthDisplay(analyticsData.overview.shareGrowth).color}`
            })}
            <span className={`text-sm font-medium ${getGrowthDisplay(analyticsData.overview.shareGrowth).color}`}>
              {analyticsData.overview.shareGrowth}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">จากช่วงก่อน</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                การกระจายหมวดหมู่
              </h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <SimpleChart data={analyticsData.categories} />
              <div className="space-y-2">
                {analyticsData.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                แนวโน้ม 7 วัน
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <LineChart data={analyticsData.trends} />
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="text-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1" />
                  <span className="text-gray-600 dark:text-gray-400">ผู้ใช้</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1" />
                  <span className="text-gray-600 dark:text-gray-400">การดู</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1" />
                  <span className="text-gray-600 dark:text-gray-400">ไลค์</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1" />
                  <span className="text-gray-600 dark:text-gray-400">แชร์</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            เนื้อหายอดนิยม
          </h3>
          <Target className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.topContent.map((content, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {content.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(content.views)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(content.likes)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{formatNumber(content.shares)}</span>
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                  {content.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      {showInsights && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ข้อมูลเชิงลึก
            </h3>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    การเติบโตของผู้ใช้เพิ่มขึ้น {analyticsData.overview.userGrowth}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    จากการปรับปรุง SEO และการตลาดออนไลน์
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    หมวดหมู่แอปได้รับความนิยมสูงสุด
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    คิดเป็น {analyticsData.categories[0].value}% ของการเข้าชมทั้งหมด
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    อัตราการมีส่วนร่วมเพิ่มขึ้น
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ไลค์และแชร์เพิ่มขึ้นเฉลี่ย {Math.round((analyticsData.overview.likeGrowth + analyticsData.overview.shareGrowth) / 2)}%
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    แนะนำเพิ่มเนื้อหาเกี่ยวกับการลงทุน
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    หมวดหมู่ช่องทางมีศักยภาพการเติบโตสูง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;