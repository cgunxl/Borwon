import React, { useState, useEffect } from 'react';
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Activity,
  Edit,
  Save,
  X,
  Camera,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Star,
  Heart,
  Share2,
  Download,
  LogOut,
  Crown,
  Award,
  TrendingUp
} from 'lucide-react';

const UserProfile = ({
  user = {},
  onProfileUpdate = () => {},
  onSettingsChange = () => {},
  onThemeChange = () => {},
  onLogout = () => {},
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowMessages: true
    },
    theme: 'system' // light, dark, system
  });

  // Mock user data - ในระบบจริงจะมาจาก API
  const mockUser = {
    id: 1,
    username: 'bwn_user',
    email: 'user@bwnx.com',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    phone: '+66-81-234-5678',
    avatar: '/mascot_ai_master.png',
    bio: 'ผู้ใช้ที่หลงใหลในเทคโนโลยีและการลงทุน กำลังเรียนรู้เกี่ยวกับคริปโตและ AI',
    location: 'กรุงเทพมหานคร, ประเทศไทย',
    website: 'https://example.com',
    joinDate: new Date('2024-01-01'),
    lastActive: new Date(),
    status: 'active',
    role: 'premium',
    badges: [
      { name: 'Early Adopter', icon: '🚀', description: 'ผู้ใช้รุ่นแรก' },
      { name: 'Content Creator', icon: '✍️', description: 'สร้างเนื้อหาคุณภาพ' },
      { name: 'Community Helper', icon: '🤝', description: 'ช่วยเหลือชุมชน' }
    ],
    stats: {
      posts: 45,
      followers: 1234,
      following: 567,
      likes: 8901,
      views: 45678
    },
    preferences: {
      language: 'th',
      timezone: 'Asia/Bangkok',
      currency: 'THB'
    }
  };

  // Merge with real user data
  const currentUser = { ...mockUser, ...user };

  useEffect(() => {
    setFormData({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      bio: currentUser.bio || '',
      location: currentUser.location || '',
      website: currentUser.website || ''
    });
  }, [currentUser]);

  // Handle form input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle settings change
  const handleSettingChange = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  // Handle theme change
  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
    onThemeChange(theme);
  };

  // Handle profile save
  const handleSave = () => {
    onProfileUpdate(formData);
    setIsEditing(false);
  };

  // Handle profile cancel
  const handleCancel = () => {
    setFormData({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      bio: currentUser.bio || '',
      location: currentUser.location || '',
      website: currentUser.website || ''
    });
    setIsEditing(false);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get role display
  const getRoleDisplay = (role) => {
    switch (role) {
      case 'admin':
        return { label: 'ผู้ดูแลระบบ', icon: Crown, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' };
      case 'premium':
        return { label: 'Premium', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
      case 'moderator':
        return { label: 'ผู้ดูแล', icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
      default:
        return { label: 'ผู้ใช้', icon: User, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/20' };
    }
  };

  // Get status display
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'active':
        return { label: 'ออนไลน์', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20' };
      case 'away':
        return { label: 'ไม่อยู่', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
      case 'offline':
        return { label: 'ออฟไลน์', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/20' };
      default:
        return { label: 'ไม่ทราบ', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/20' };
    }
  };

  const roleDisplay = getRoleDisplay(currentUser.role);
  const statusDisplay = getStatusDisplay(currentUser.status);

  // Tab options
  const tabs = [
    { id: 'profile', label: 'โปรไฟล์', icon: User },
    { id: 'settings', label: 'การตั้งค่า', icon: Settings },
    { id: 'activity', label: 'กิจกรรม', icon: Activity },
    { id: 'badges', label: 'เหรียญตรา', icon: Award }
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${roleDisplay.bgColor} ${roleDisplay.color}`}>
                <div className="flex items-center space-x-1">
                  <roleDisplay.icon className="w-3 h-3" />
                  <span>{roleDisplay.label}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusDisplay.bgColor} ${statusDisplay.color}`}>
                {statusDisplay.label}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-2">
              @{currentUser.username}
            </p>

            {currentUser.bio && (
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {currentUser.bio}
              </p>
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <span>📍 {currentUser.location}</span>
              <span>📅 เข้าร่วมเมื่อ {formatDate(currentUser.joinDate)}</span>
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  🌐 เว็บไซต์
                </a>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>แก้ไข</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.posts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">โพสต์</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.followers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">ผู้ติดตาม</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.following}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">กำลังติดตาม</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.likes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">ไลค์</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.stats.views}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">การดู</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เกี่ยวกับฉัน
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ที่อยู่
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      เว็บไซต์
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">ชื่อ</label>
                    <p className="text-gray-900 dark:text-white">{currentUser.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">นามสกุล</label>
                    <p className="text-gray-900 dark:text-white">{currentUser.lastName}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">อีเมล</label>
                  <p className="text-gray-900 dark:text-white">{currentUser.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">เบอร์โทรศัพท์</label>
                  <p className="text-gray-900 dark:text-white">{currentUser.phone}</p>
                </div>

                {currentUser.bio && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">เกี่ยวกับฉัน</label>
                    <p className="text-gray-900 dark:text-white">{currentUser.bio}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">ที่อยู่</label>
                    <p className="text-gray-900 dark:text-white">{currentUser.location}</p>
                  </div>
                  {currentUser.website && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">เว็บไซต์</label>
                      <a
                        href={currentUser.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {currentUser.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Notification Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>การตั้งค่าการแจ้งเตือน</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {key === 'email' ? 'อีเมล' : key === 'push' ? 'Push Notifications' : key === 'sms' ? 'SMS' : 'การตลาด'}
                    </span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>การตั้งค่าความเป็นส่วนตัว</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(settings.privacy).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {key === 'profileVisible' ? 'โปรไฟล์ที่มองเห็นได้' :
                       key === 'showEmail' ? 'แสดงอีเมล' :
                       key === 'showPhone' ? 'แสดงเบอร์โทรศัพท์' : 'อนุญาตให้ส่งข้อความ'}
                    </span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Theme Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>ธีม</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'สว่าง', icon: '☀️' },
                  { value: 'dark', label: 'มืด', icon: '🌙' },
                  { value: 'system', label: 'ระบบ', icon: '💻' }
                ].map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.theme === theme.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{theme.icon}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{theme.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">กิจกรรมล่าสุด</h3>

            {/* Mock Activity Items */}
            {[
              { type: 'post', icon: Edit, text: 'สร้างโพสต์ใหม่ "วิธีลงทุนคริปโตสำหรับมือใหม่"', time: '2 ชั่วโมงที่แล้ว' },
              { type: 'like', icon: Heart, text: 'ไลค์โพสต์ "แอปท่องเที่ยวที่ดีที่สุด 2024"', time: '4 ชั่วโมงที่แล้ว' },
              { type: 'share', icon: Share2, text: 'แชร์โพสต์ "เพจเติมเกมราคาถูกที่สุด"', time: '1 วันที่แล้ว' },
              { type: 'download', icon: Download, text: 'ดาวน์โหลดคู่มือ "Affiliate Marketing"', time: '2 วันที่แล้ว' },
              { type: 'achievement', icon: Award, text: 'ได้รับเหรียญตรา "Content Creator"', time: '3 วันที่แล้ว' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <activity.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">เหรียญตราและความสำเร็จ</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentUser.badges.map((badge, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{badge.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress towards next badge */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">ความคืบหน้าสู่เหรียญตราถัดไป</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expert Trader</span>
                  <span className="text-gray-900 dark:text-white">75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  อีก 5 โพสต์เพื่อรับเหรียญตรา
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;