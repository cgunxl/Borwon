import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search, 
  Filter,
  Download,
  Eye,
  Heart,
  Share2,
  Star,
  Clock,
  Target,
  Zap,
  Calendar,
  Globe,
  Shield,
  Palette,
  User
} from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import FilterPanel from '../components/ui/FilterPanel';
import DataTable from '../components/ui/DataTable';
import AnalyticsDashboard from '../components/ui/AnalyticsDashboard';
import NotificationSystem from '../components/ui/NotificationSystem';
import UserProfile from '../components/ui/UserProfile';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('popular');
  const [sortOrder, setSortOrder] = useState('desc');
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // Mock data for demonstration
  const mockData = {
    apps: [
      { id: 1, name: 'Agoda', category: 'travel', rating: 4.8, downloads: '100M+', price: 'free', status: 'active', views: 12500, likes: 6800, shares: 1200 },
      { id: 2, name: 'Booking.com', category: 'travel', rating: 4.7, downloads: '500M+', price: 'free', status: 'active', views: 9800, likes: 5200, shares: 890 },
      { id: 3, name: 'Airbnb', category: 'travel', rating: 4.6, downloads: '50M+', price: 'free', status: 'active', views: 8700, likes: 4600, shares: 750 },
      { id: 4, name: 'Notion', category: 'productivity', rating: 4.9, downloads: '10M+', price: 'freemium', status: 'active', views: 7200, likes: 3800, shares: 620 },
      { id: 5, name: 'Trello', category: 'productivity', rating: 4.5, downloads: '25M+', price: 'freemium', status: 'active', views: 6500, likes: 3400, shares: 580 },
      { id: 6, name: 'Spotify', category: 'entertainment', rating: 4.7, downloads: '1B+', price: 'freemium', status: 'active', views: 5900, likes: 3100, shares: 520 }
    ],
    analytics: {
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
        ]
      }
    }
  };

  // Table columns configuration
  const tableColumns = [
    { key: 'name', label: 'ชื่อ', sortable: true },
    { key: 'category', label: 'หมวดหมู่', sortable: true },
    { key: 'rating', label: 'คะแนน', type: 'rating', sortable: true },
    { key: 'downloads', label: 'ดาวน์โหลด', sortable: true },
    { key: 'price', label: 'ราคา', type: 'price', sortable: true },
    { key: 'status', label: 'สถานะ', type: 'status', sortable: true },
    { key: 'views', label: 'การดู', sortable: true },
    { key: 'likes', label: 'ไลค์', sortable: true },
    { key: 'shares', label: 'แชร์', sortable: true }
  ];

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: BarChart3 },
    { id: 'analytics', label: 'การวิเคราะห์', icon: TrendingUp },
    { id: 'content', label: 'เนื้อหา', icon: Eye },
    { id: 'users', label: 'ผู้ใช้', icon: Users },
    { id: 'settings', label: 'การตั้งค่า', icon: Settings }
  ];

  // Handle search
  const handleSearch = (query, filter) => {
    setSearchQuery(query);
    if (filter && filter !== 'all') {
      setFilters(prev => ({ ...prev, category: filter }));
    }
  };

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle sort change
  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Handle notification actions
  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationAction = (notification, action) => {
    console.log('Notification action:', action, notification);
  };

  // Handle user profile update
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    console.log('Profile updated:', updatedUser);
  };

  // Handle logout
  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  // Handle data export
  const handleDataExport = (data) => {
    console.log('Exporting data:', data);
    // Add export logic here
  };

  // Handle row click
  const handleRowClick = (item) => {
    console.log('Row clicked:', item);
  };

  // Handle edit
  const handleEdit = (item) => {
    console.log('Edit item:', item);
  };

  // Handle delete
  const handleDelete = (item) => {
    console.log('Delete item:', item);
  };

  return (
    <>
      <Helmet>
        <title>แดชบอร์ด - Bwn X</title>
        <meta name="description" content="แดชบอร์ดการจัดการและวิเคราะห์ข้อมูล Bwn X" />
        <meta name="keywords" content="แดชบอร์ด, การวิเคราะห์, การจัดการ, Bwn X" />
      </Helmet>

      <div className="min-h-screen bg-bwn-deep-black">
        {/* Header */}
        <header className="bg-bwn-dark-gray border-b border-bwn-medium-gray">
          <div className="bwn-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-bwn-white">แดชบอร์ด Bwn X</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="ค้นหาในแดชบอร์ด..."
                  showFilters={false}
                  showTrending={false}
                  className="w-64"
                />
                
                <NotificationSystem
                  notifications={notifications}
                  onNotificationClick={handleNotificationClick}
                  onNotificationDismiss={handleNotificationDismiss}
                  onNotificationAction={handleNotificationAction}
                  position="bottom-right"
                />
                
                <button
                  onClick={() => setShowUserProfile(!showUserProfile)}
                  className="flex items-center space-x-2 px-4 py-2 bg-bwn-accent text-bwn-deep-black rounded-lg hover:bg-bwn-accent-light transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>โปรไฟล์</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bwn-container py-6">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-bwn-accent text-bwn-deep-black'
                    : 'text-bwn-white/70 hover:text-bwn-white hover:bg-bwn-medium-gray/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-bwn-white mb-1">15,420</div>
                  <div className="text-sm text-bwn-white/70">ผู้ใช้งานทั้งหมด</div>
                  <div className="text-xs text-green-400 mt-2">+12.5% จากเดือนที่แล้ว</div>
                </div>

                <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-green-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-bwn-white mb-1">89,250</div>
                  <div className="text-sm text-bwn-white/70">การดูทั้งหมด</div>
                  <div className="text-xs text-green-400 mt-2">+8.7% จากเดือนที่แล้ว</div>
                </div>

                <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-pink-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-bwn-white mb-1">45,680</div>
                  <div className="text-sm text-bwn-white/70">ไลค์ทั้งหมด</div>
                  <div className="text-xs text-green-400 mt-2">+15.3% จากเดือนที่แล้ว</div>
                </div>

                <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-bwn-white mb-1">12,340</div>
                  <div className="text-sm text-bwn-white/70">แชร์ทั้งหมด</div>
                  <div className="text-xs text-green-400 mt-2">+22.1% จากเดือนที่แล้ว</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-bwn-white mb-4">กิจกรรมล่าสุด</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-bwn-medium-gray/20 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-bwn-white">แอป Agoda ได้รับการรีวิวใหม่</p>
                      <p className="text-xs text-bwn-white/60">2 ชั่วโมงที่แล้ว</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-bwn-medium-gray/20 rounded-lg">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-bwn-white">ผู้ใช้ใหม่ 25 คนเข้าร่วมระบบ</p>
                      <p className="text-xs text-bwn-white/60">4 ชั่วโมงที่แล้ว</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-bwn-medium-gray/20 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-bwn-white">การดูหน้าเว็บเพิ่มขึ้น 15%</p>
                      <p className="text-xs text-bwn-white/60">6 ชั่วโมงที่แล้ว</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              data={mockData.analytics}
              timeRange="7d"
              onTimeRangeChange={(range) => console.log('Time range changed:', range)}
              onMetricClick={(metric) => console.log('Metric clicked:', metric)}
            />
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Content Management Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-bwn-white mb-2">จัดการเนื้อหา</h2>
                  <p className="text-bwn-white/70">จัดการแอป เครื่องมือ และเนื้อหาต่างๆ ในระบบ</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onSortChange={handleSortChange}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-bwn-accent text-bwn-deep-black rounded-lg hover:bg-bwn-accent-light transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    <span>ส่งออก</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <DataTable
                data={mockData.apps}
                columns={tableColumns}
                searchable={false}
                filterable={false}
                sortable={true}
                pagination={true}
                pageSize={10}
                onRowClick={handleRowClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onExport={handleDataExport}
                showActions={true}
                showStats={true}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-bwn-white mb-4">การจัดการผู้ใช้</h3>
                <p className="text-bwn-white/70">ฟีเจอร์การจัดการผู้ใช้จะถูกเพิ่มในอนาคต</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-bwn-white mb-4">การตั้งค่าระบบ</h3>
                <p className="text-bwn-white/70">ฟีเจอร์การตั้งค่าระบบจะถูกเพิ่มในอนาคต</p>
              </div>
            </div>
          )}
        </main>

        {/* User Profile Modal */}
        {showUserProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <UserProfile
                user={user}
                onProfileUpdate={handleProfileUpdate}
                onSettingsChange={(settings) => console.log('Settings changed:', settings)}
                onLogout={handleLogout}
                editable={true}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;