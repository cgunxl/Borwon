import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock,
  Settings,
  Filter,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const NotificationSystem = ({ 
  notifications = [], 
  onNotificationAction = () => {},
  onMarkAllRead = () => {},
  onClearAll = () => {},
  className = "",
  showSettings = true,
  maxNotifications = 5
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRead, setShowRead] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    email: true,
    push: true,
    sound: false,
    categories: ['important', 'updates', 'promotions']
  });
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationRef = useRef(null);

  // Mock notifications - ในระบบจริงจะมาจาก API
  const mockNotifications = [
    {
      id: 1,
      title: 'อัปเดตระบบใหม่',
      message: 'ระบบค้นหาและตัวกรองได้รับการปรับปรุงแล้ว',
      type: 'info',
      category: 'updates',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 นาทีที่แล้ว
      isRead: false,
      priority: 'medium'
    },
    {
      id: 2,
      title: 'โปรโมชั่นพิเศษ',
      message: 'ลดราคา 50% สำหรับสมาชิกใหม่',
      type: 'promotion',
      category: 'promotions',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 ชั่วโมงที่แล้ว
      isRead: false,
      priority: 'high'
    },
    {
      id: 3,
      title: 'การบำรุงรักษาระบบ',
      message: 'ระบบจะหยุดให้บริการในวันที่ 15 มกราคม 2025 เวลา 02:00-04:00',
      type: 'warning',
      category: 'important',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 วันที่แล้ว
      isRead: true,
      priority: 'high'
    },
    {
      id: 4,
      title: 'ยินดีต้อนรับ',
      message: 'ขอบคุณที่สมัครสมาชิกกับเรา',
      type: 'success',
      category: 'welcome',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 วันที่แล้ว
      isRead: true,
      priority: 'low'
    },
    {
      id: 5,
      title: 'การอัปเดตความปลอดภัย',
      message: 'ระบบความปลอดภัยได้รับการปรับปรุงแล้ว',
      type: 'info',
      category: 'security',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 วันที่แล้ว
      isRead: true,
      priority: 'medium'
    }
  ];

  // Merge with real notifications
  const allNotifications = [...mockNotifications, ...notifications];

  // Calculate unread count
  useEffect(() => {
    const count = allNotifications.filter(n => !n.isRead).length;
    setUnreadCount(count);
  }, [allNotifications]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowSettingsPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter notifications
  const filteredNotifications = allNotifications.filter(notification => {
    if (selectedCategory !== 'all' && notification.category !== selectedCategory) {
      return false;
    }
    if (!showRead && notification.isRead) {
      return false;
    }
    return true;
  });

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'promotion':
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  // Get notification priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} นาทีที่แล้ว`;
    } else if (hours < 24) {
      return `${hours} ชั่วโมงที่แล้ว`;
    } else {
      return `${days} วันที่แล้ว`;
    }
  };

  // Handle notification action
  const handleNotificationAction = (action, notification) => {
    onNotificationAction(action, notification);
    
    if (action === 'markRead' && !notification.isRead) {
      // Mark as read locally
      notification.isRead = true;
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  // Handle mark all as read
  const handleMarkAllRead = () => {
    allNotifications.forEach(n => n.isRead = true);
    setUnreadCount(0);
    onMarkAllRead();
  };

  // Handle clear all
  const handleClearAll = () => {
    onClearAll();
  };

  // Handle preference change
  const handlePreferenceChange = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle category preference change
  const handleCategoryPreferenceChange = (category, enabled) => {
    setUserPreferences(prev => ({
      ...prev,
      categories: enabled 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  // Notification categories
  const categories = [
    { value: 'all', label: 'ทั้งหมด', icon: Bell },
    { value: 'important', label: 'สำคัญ', icon: AlertCircle },
    { value: 'updates', label: 'อัปเดต', icon: Info },
    { value: 'promotions', label: 'โปรโมชั่น', icon: CheckCircle },
    { value: 'security', label: 'ความปลอดภัย', icon: AlertCircle },
    { value: 'welcome', label: 'ต้อนรับ', icon: CheckCircle }
  ];

  return (
    <div className={`relative ${className}`} ref={notificationRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">การแจ้งเตือน</h3>
              {unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount} ใหม่
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {showSettings && (
                <button
                  onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettingsPanel && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">การตั้งค่าการแจ้งเตือน</h4>
              
              {/* Notification Methods */}
              <div className="space-y-3 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={userPreferences.email}
                    onChange={(e) => handlePreferenceChange('email', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">อีเมล</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={userPreferences.push}
                    onChange={(e) => handlePreferenceChange('push', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Push Notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={userPreferences.sound}
                    onChange={(e) => handlePreferenceChange('sound', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">เสียง</span>
                </label>
              </div>

              {/* Category Preferences */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">หมวดหมู่ที่ต้องการ</h5>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(1).map(category => (
                    <label key={category.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={userPreferences.categories.includes(category.value)}
                        onChange={(e) => handleCategoryPreferenceChange(category.value, e.target.checked)}
                        className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ตัวกรอง</span>
              </div>
              <button
                onClick={() => setShowRead(!showRead)}
                className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {showRead ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{showRead ? 'ซ่อนที่อ่านแล้ว' : 'แสดงทั้งหมด'}</span>
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <category.icon className="w-3 h-3" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
            </button>
            <button
              onClick={handleClearAll}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              ล้างทั้งหมด
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredNotifications.slice(0, maxNotifications).map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            notification.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
                          }`}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm mt-1 ${
                          notification.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => handleNotificationAction('markRead', notification)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                              >
                                ทำเครื่องหมายว่าอ่านแล้ว
                              </button>
                            )}
                            <button
                              onClick={() => handleNotificationAction('delete', notification)}
                              className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                              ลบ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">ไม่มีการแจ้งเตือน</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > maxNotifications && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                ดูการแจ้งเตือนทั้งหมด ({filteredNotifications.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;