import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Share2, Download, Star, Clock, Target, BarChart3, PieChart, Activity, Zap } from 'lucide-react';

const AnalyticsDashboard = ({
  data = {},
  timeRange = '7d',
  className = "",
  onTimeRangeChange,
  onMetricClick
}) => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(null);

  // Mock data for demonstration
  const mockData = {
    overview: {
      totalUsers: 15420,
      totalViews: 89250,
      totalLikes: 45680,
      totalShares: 12340,
      growthRate: 12.5,
      conversionRate: 3.2
    },
    trends: {
      '7d': [
        { date: '2024-01-01', users: 1200, views: 8500, likes: 4200, shares: 1100 },
        { date: '2024-01-02', users: 1350, views: 9200, likes: 4800, shares: 1250 },
        { date: '2024-01-03', users: 1100, views: 7800, likes: 3900, shares: 980 },
        { date: '2024-01-04', users: 1600, views: 10500, likes: 5200, shares: 1400 },
        { date: '2024-01-05', users: 1800, views: 11800, likes: 5800, shares: 1550 },
        { date: '2024-01-06', users: 2000, views: 13200, likes: 6500, shares: 1700 },
        { date: '2024-01-07', users: 2200, views: 14500, likes: 7200, shares: 1850 }
      ],
      '30d': Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
        users: 1000 + Math.random() * 2000,
        views: 7000 + Math.random() * 8000,
        likes: 3500 + Math.random() * 4000,
        shares: 900 + Math.random() * 1000
      })),
      '90d': Array.from({ length: 90 }, (_, i) => ({
        date: new Date(2023, 9, i + 1).toISOString().split('T')[0],
        users: 800 + Math.random() * 2500,
        views: 6000 + Math.random() * 10000,
        likes: 3000 + Math.random() * 5000,
        shares: 700 + Math.random() * 1500
      }))
    },
    categories: [
      { name: 'แอปและเครื่องมือ', value: 35, color: '#3B82F6', growth: 15.2 },
      { name: 'ช่องทางการลงทุน', value: 28, color: '#10B981', growth: 8.7 },
      { name: 'เพจแนะนำ', value: 22, color: '#8B5CF6', growth: 12.4 },
      { name: 'สินค้าและบริการ', value: 15, color: '#F59E0B', growth: 5.9 }
    ],
    topContent: [
      { title: 'แอปท่องเที่ยว Agoda', views: 12500, likes: 6800, shares: 1200, category: 'apps' },
      { title: 'การลงทุนคริปโต Bitcoin', views: 9800, likes: 5200, shares: 890, category: 'channels' },
      { title: 'เกมเติมเงิน Robux', views: 8700, likes: 4600, shares: 750, category: 'fanpages' },
      { title: 'สินค้าความงาม SK-II', views: 7200, likes: 3800, shares: 620, category: 'products' }
    ],
    userBehavior: {
      pageViews: { mobile: 65, desktop: 35 },
      timeOnSite: { '0-30s': 25, '30s-2m': 35, '2m-5m': 25, '5m+': 15 },
      bounceRate: 42.3,
      returnRate: 28.7
    }
  };

  const currentData = data.overview || mockData.overview;
  const currentTrends = data.trends?.[timeRange] || mockData.trends[timeRange];
  const currentCategories = data.categories || mockData.categories;
  const currentTopContent = data.topContent || mockData.topContent;
  const currentUserBehavior = data.userBehavior || mockData.userBehavior;

  // Time range options
  const timeRangeOptions = [
    { value: '7d', label: '7 วัน', icon: Clock },
    { value: '30d', label: '30 วัน', icon: Calendar },
    { value: '90d', label: '90 วัน', icon: BarChart3 }
  ];

  // Metric cards
  const metricCards = [
    {
      key: 'totalUsers',
      label: 'ผู้ใช้งานทั้งหมด',
      value: currentData.totalUsers?.toLocaleString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      growth: currentData.growthRate,
      trend: 'up'
    },
    {
      key: 'totalViews',
      label: 'การดูทั้งหมด',
      value: currentData.totalViews?.toLocaleString(),
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      growth: 8.7,
      trend: 'up'
    },
    {
      key: 'totalLikes',
      label: 'ไลค์ทั้งหมด',
      value: currentData.totalLikes?.toLocaleString(),
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      growth: 15.3,
      trend: 'up'
    },
    {
      key: 'totalShares',
      label: 'แชร์ทั้งหมด',
      value: currentData.totalShares?.toLocaleString(),
      icon: Share2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      growth: 22.1,
      trend: 'up'
    }
  ];

  // Handle metric click
  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    onMetricClick && onMetricClick(metric);
  };

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    onTimeRangeChange && onTimeRangeChange(range);
  };

  // Format number with K/M suffix
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Calculate chart data
  const chartData = currentTrends?.map(item => ({
    date: new Date(item.date).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
    users: item.users,
    views: item.views,
    likes: item.likes,
    shares: item.shares
  })) || [];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-bwn-white mb-2">แดชบอร์ดวิเคราะห์</h2>
          <p className="text-bwn-white/70">ติดตามประสิทธิภาพและพฤติกรรมผู้ใช้แบบเรียลไทม์</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeRangeChange(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeRange === option.value
                  ? 'bg-bwn-accent text-bwn-deep-black'
                  : 'bg-bwn-medium-gray text-bwn-white hover:bg-bwn-accent/10 hover:text-bwn-accent'
              }`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric) => (
          <div
            key={metric.key}
            onClick={() => handleMetricClick(metric)}
            className={`bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6 cursor-pointer hover:border-bwn-accent hover:bg-bwn-accent/5 transition-all duration-300 ${
              selectedMetric?.key === metric.key ? 'border-bwn-accent bg-bwn-accent/10' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="flex items-center space-x-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  +{metric.growth}%
                </span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-2xl font-bold text-bwn-white">{metric.value}</div>
              <div className="text-sm text-bwn-white/70">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-bwn-white">แนวโน้มการใช้งาน</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-bwn-white/50">ผู้ใช้งาน</span>
              <span className="text-xs text-bwn-white/50">การดู</span>
              <span className="text-xs text-bwn-white/50">ไลค์</span>
            </div>
          </div>
          
          <div className="h-64 relative">
            {/* Simple line chart representation */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="text-xs text-bwn-white/50">{item.date}</div>
                  <div className="w-8 bg-gradient-to-t from-bwn-accent to-bwn-accent/50 rounded-t-sm" 
                       style={{ height: `${(item.users / 2500) * 200}px` }}></div>
                  <div className="w-6 bg-gradient-to-t from-green-400 to-green-400/50 rounded-t-sm" 
                       style={{ height: `${(item.views / 15000) * 200}px` }}></div>
                  <div className="w-4 bg-gradient-to-t from-pink-400 to-pink-400/50 rounded-t-sm" 
                       style={{ height: `${(item.likes / 8000) * 200}px` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-bwn-white mb-6">การใช้งานตามหมวดหมู่</h3>
          
          <div className="space-y-4">
            {currentCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-bwn-white/80">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-bwn-white">{category.value}%</span>
                  <div className="flex items-center space-x-1 text-xs text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{category.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content & User Behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Content */}
        <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-bwn-white mb-6">เนื้อหายอดนิยม</h3>
          
          <div className="space-y-4">
            {currentTopContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-bwn-medium-gray/20 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-bwn-white mb-1">{content.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-bwn-white/60">
                    <span>👁️ {formatNumber(content.views)}</span>
                    <span>❤️ {formatNumber(content.likes)}</span>
                    <span>📤 {formatNumber(content.shares)}</span>
                  </div>
                </div>
                <div className="text-xs text-bwn-accent bg-bwn-accent/10 px-2 py-1 rounded">
                  {content.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Behavior */}
        <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-bwn-white mb-6">พฤติกรรมผู้ใช้</h3>
          
          <div className="space-y-6">
            {/* Page Views */}
            <div>
              <h4 className="text-sm font-medium text-bwn-white mb-3">การดูหน้าเว็บ</h4>
              <div className="flex h-8 bg-bwn-medium-gray rounded-lg overflow-hidden">
                <div 
                  className="bg-blue-400 h-full flex items-center justify-center text-xs text-bwn-deep-black font-medium"
                  style={{ width: `${currentUserBehavior.pageViews.mobile}%` }}
                >
                  {currentUserBehavior.pageViews.mobile}%
                </div>
                <div 
                  className="bg-green-400 h-full flex items-center justify-center text-xs text-bwn-deep-black font-medium"
                  style={{ width: `${currentUserBehavior.pageViews.desktop}%` }}
                >
                  {currentUserBehavior.pageViews.desktop}%
                </div>
              </div>
              <div className="flex justify-between text-xs text-bwn-white/60 mt-2">
                <span>📱 มือถือ</span>
                <span>💻 เดสก์ท็อป</span>
              </div>
            </div>

            {/* Time on Site */}
            <div>
              <h4 className="text-sm font-medium text-bwn-white mb-3">เวลาอยู่ในเว็บไซต์</h4>
              <div className="space-y-2">
                {Object.entries(currentUserBehavior.timeOnSite).map(([time, percentage]) => (
                  <div key={time} className="flex items-center justify-between">
                    <span className="text-xs text-bwn-white/60">{time}</span>
                    <div className="flex-1 mx-3">
                      <div className="h-2 bg-bwn-medium-gray rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-bwn-accent rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-bwn-white/60 w-12 text-right">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-bwn-medium-gray/20 rounded-lg">
                <div className="text-lg font-bold text-bwn-white">{currentUserBehavior.bounceRate}%</div>
                <div className="text-xs text-bwn-white/60">Bounce Rate</div>
              </div>
              <div className="text-center p-3 bg-bwn-medium-gray/20 rounded-lg">
                <div className="text-lg font-bold text-bwn-white">{currentUserBehavior.returnRate}%</div>
                <div className="text-xs text-bwn-white/60">Return Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-bwn-accent to-bwn-ocean-blue rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-bwn-deep-black mb-2">ต้องการข้อมูลเพิ่มเติม?</h3>
            <p className="text-bwn-deep-black/80">ดาวน์โหลดรายงานละเอียดหรือตั้งค่าการแจ้งเตือน</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-3 bg-bwn-deep-black text-bwn-accent rounded-lg hover:bg-bwn-dark-gray transition-colors duration-200 flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดรายงาน</span>
            </button>
            <button className="px-6 py-3 border-2 border-bwn-deep-black text-bwn-deep-black rounded-lg hover:bg-bwn-deep-black hover:text-bwn-accent transition-colors duration-200 flex items-center justify-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>ตั้งค่าการแจ้งเตือน</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;