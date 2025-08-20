import React, { useState, useEffect } from 'react';
import { User, Settings, Edit, Camera, Save, X, Eye, EyeOff, Bell, Shield, Palette, Globe, Download, LogOut, Crown, Star, Heart, Bookmark, Clock, TrendingUp } from 'lucide-react';

const UserProfile = ({
  user = {},
  onProfileUpdate,
  onSettingsChange,
  onLogout,
  className = "",
  editable = true
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [localUser, setLocalUser] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock user data for demonstration
  const mockUser = {
    id: 1,
    username: 'bwn_user',
    email: 'user@bwnx.com',
    firstName: 'บวร',
    lastName: 'ผู้ใช้',
    avatar: 'https://via.placeholder.com/120x120/3B82F6/ffffff?text=BU',
    bio: 'ผู้ใช้ที่หลงใหลในเทคโนโลยีและการพัฒนาตัวเอง',
    phone: '+66 81-234-5678',
    location: 'กรุงเทพมหานคร, ประเทศไทย',
    website: 'https://bwnx.com',
    joinDate: new Date('2024-01-01'),
    lastLogin: new Date(),
    preferences: {
      theme: 'dark',
      language: 'th',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profilePublic: true,
        showEmail: false,
        showPhone: false
      }
    },
    stats: {
      totalPosts: 45,
      totalLikes: 1280,
      totalViews: 15600,
      followers: 234,
      following: 189
    },
    badges: [
      { id: 1, name: 'Early Adopter', icon: '🌟', description: 'ผู้ใช้รุ่นแรก', color: 'text-yellow-400' },
      { id: 2, name: 'Content Creator', icon: '✍️', description: 'สร้างเนื้อหาคุณภาพ', color: 'text-blue-400' },
      { id: 3, name: 'Community Helper', icon: '🤝', description: 'ช่วยเหลือชุมชน', color: 'text-green-400' }
    ],
    recentActivity: [
      { id: 1, type: 'post', title: 'แนะนำแอปท่องเที่ยวใหม่', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { id: 2, type: 'like', title: 'ถูกใจโพสต์ "การลงทุนคริปโต"', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { id: 3, type: 'comment', title: 'แสดงความคิดเห็นใน "เกมเติมเงิน"', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) }
    ]
  };

  const currentUser = user.id ? user : mockUser;

  // Initialize local user data
  useEffect(() => {
    setLocalUser({ ...currentUser });
  }, [currentUser]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setLocalUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle preference change
  const handlePreferenceChange = (category, key, value) => {
    setLocalUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category],
          [key]: value
        }
      }
    }));
  };

  // Handle password change
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = () => {
    if (onProfileUpdate) {
      onProfileUpdate(localUser);
    }
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setLocalUser({ ...currentUser });
    setIsEditing(false);
  };

  // Change password
  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    
    // Here you would typically make an API call to change the password
    console.log('Changing password...', passwordData);
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case 'post': return <Edit className="w-4 h-4 text-blue-400" />;
      case 'like': return <Heart className="w-4 h-4 text-red-400" />;
      case 'comment': return <Bookmark className="w-4 h-4 text-green-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'profile', label: 'โปรไฟล์', icon: User },
    { id: 'settings', label: 'การตั้งค่า', icon: Settings },
    { id: 'activity', label: 'กิจกรรม', icon: Clock },
    { id: 'badges', label: 'เหรียญตรา', icon: Crown }
  ];

  return (
    <div className={`bg-bwn-dark-gray rounded-2xl border border-bwn-medium-gray overflow-hidden ${className}`}>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-bwn-accent to-bwn-ocean-blue p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-bwn-deep-black">โปรไฟล์ผู้ใช้</h2>
          {editable && (
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-bwn-deep-black text-bwn-accent rounded-lg hover:bg-bwn-dark-gray transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>บันทึก</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-bwn-deep-black text-bwn-deep-black rounded-lg hover:bg-bwn-deep-black hover:text-bwn-accent transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>ยกเลิก</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-bwn-deep-black text-bwn-accent rounded-lg hover:bg-bwn-dark-gray transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>แก้ไข</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Overview */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={localUser.avatar}
              alt={`${localUser.firstName} ${localUser.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-bwn-deep-black text-bwn-accent rounded-full flex items-center justify-center hover:bg-bwn-dark-gray transition-colors duration-200">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-bwn-deep-black mb-2">
              {localUser.firstName} {localUser.lastName}
            </h1>
            <p className="text-bwn-deep-black/80 mb-2">@{localUser.username}</p>
            <p className="text-bwn-deep-black/70">{localUser.bio}</p>
            
            {/* Stats */}
            <div className="flex items-center space-x-6 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-bwn-deep-black">{localUser.stats?.totalPosts}</div>
                <div className="text-sm text-bwn-deep-black/70">โพสต์</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-bwn-deep-black">{localUser.stats?.followers}</div>
                <div className="text-sm text-bwn-deep-black/70">ผู้ติดตาม</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-bwn-deep-black">{localUser.stats?.totalLikes}</div>
                <div className="text-sm text-bwn-deep-black/70">ไลค์</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-bwn-medium-gray">
        <div className="flex space-x-1 p-4">
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
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-bwn-white mb-4">ข้อมูลส่วนตัว</h3>
                
                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">ชื่อ</label>
                  <input
                    type="text"
                    value={localUser.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">นามสกุล</label>
                  <input
                    type="text"
                    value={localUser.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">อีเมล</label>
                  <input
                    type="email"
                    value={localUser.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">เบอร์โทรศัพท์</label>
                  <input
                    type="tel"
                    value={localUser.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-bwn-white mb-4">ข้อมูลเพิ่มเติม</h3>
                
                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">ที่อยู่</label>
                  <input
                    type="text"
                    value={localUser.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">เว็บไซต์</label>
                  <input
                    type="url"
                    value={localUser.website || ''}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">คำอธิบาย</label>
                  <textarea
                    value={localUser.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white disabled:opacity-50 focus:outline-none focus:border-bwn-accent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-bwn-medium-gray/20 rounded-xl p-4">
              <h4 className="text-sm font-medium text-bwn-white mb-3">ข้อมูลบัญชี</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-bwn-white/60">ชื่อผู้ใช้:</span>
                  <span className="text-bwn-white ml-2">@{localUser.username}</span>
                </div>
                <div>
                  <span className="text-bwn-white/60">เข้าร่วมเมื่อ:</span>
                  <span className="text-bwn-white ml-2">{formatDate(localUser.joinDate)}</span>
                </div>
                <div>
                  <span className="text-bwn-white/60">เข้าสู่ระบบล่าสุด:</span>
                  <span className="text-bwn-white ml-2">{formatDate(localUser.lastLogin)}</span>
                </div>
              </div>
            </div>

            {/* Password Change */}
            {isEditing && (
              <div className="bg-bwn-medium-gray/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-bwn-white">เปลี่ยนรหัสผ่าน</h4>
                  <button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="text-bwn-accent hover:text-bwn-accent-light transition-colors duration-200"
                  >
                    {showPasswordChange ? 'ซ่อน' : 'แสดง'}
                  </button>
                </div>
                
                {showPasswordChange && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bwn-white/80 mb-2">รหัสผ่านปัจจุบัน</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white focus:outline-none focus:border-bwn-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bwn-white/80 mb-2">รหัสผ่านใหม่</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white focus:outline-none focus:border-bwn-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bwn-white/80 mb-2">ยืนยันรหัสผ่านใหม่</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white focus:outline-none focus:border-bwn-accent"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Theme Settings */}
            <div className="bg-bwn-medium-gray/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-bwn-white mb-4">การตั้งค่าการแสดงผล</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">ธีม</label>
                  <select
                    value={localUser.preferences?.theme || 'dark'}
                    onChange={(e) => handlePreferenceChange('theme', 'theme', e.target.value)}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white focus:outline-none focus:border-bwn-accent"
                  >
                    <option value="dark">โหมดมืด</option>
                    <option value="light">โหมดสว่าง</option>
                    <option value="auto">อัตโนมัติ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bwn-white/80 mb-2">ภาษา</label>
                  <select
                    value={localUser.preferences?.language || 'th'}
                    onChange={(e) => handlePreferenceChange('language', 'language', e.target.value)}
                    className="w-full px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-lg text-bwn-white focus:outline-none focus:border-bwn-accent"
                  >
                    <option value="th">ไทย</option>
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-bwn-medium-gray/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-bwn-white mb-4">การตั้งค่าการแจ้งเตือน</h3>
              
              <div className="space-y-3">
                {Object.entries(localUser.preferences?.notifications || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-bwn-white/80 capitalize">{key}</span>
                    <button
                      onClick={() => handlePreferenceChange('notifications', key, !value)}
                      className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                        value ? 'bg-bwn-accent' : 'bg-bwn-medium-gray'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        value ? 'translate-x-4' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-bwn-medium-gray/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-bwn-white mb-4">การตั้งค่าความเป็นส่วนตัว</h3>
              
              <div className="space-y-3">
                {Object.entries(localUser.preferences?.privacy || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-bwn-white/80 capitalize">{key}</span>
                    <button
                      onClick={() => handlePreferenceChange('privacy', key, !value)}
                      className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                        value ? 'bg-bwn-accent' : 'bg-bwn-medium-gray'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        value ? 'translate-x-4' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bwn-white mb-4">กิจกรรมล่าสุด</h3>
            
            {localUser.recentActivity?.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-bwn-medium-gray/20 rounded-lg">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm text-bwn-white">{activity.title}</p>
                  <p className="text-xs text-bwn-white/60">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-bwn-white mb-4">เหรียญตราและความสำเร็จ</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localUser.badges?.map((badge) => (
                <div key={badge.id} className="bg-bwn-medium-gray/20 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className={`font-semibold mb-1 ${badge.color}`}>{badge.name}</h4>
                  <p className="text-sm text-bwn-white/70">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-bwn-medium-gray p-4 bg-bwn-medium-gray/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-bwn-accent text-bwn-deep-black rounded-lg hover:bg-bwn-accent-light transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span>ส่งออกข้อมูล</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-bwn-medium-gray text-bwn-white rounded-lg hover:bg-bwn-medium-gray transition-colors duration-200">
              <Shield className="w-4 h-4" />
              <span>ความปลอดภัย</span>
            </button>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;