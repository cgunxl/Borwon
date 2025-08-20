import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, AlertTriangle, Info, Settings, Volume2, VolumeX, Clock, Star, Heart, Share2, Download, TrendingUp } from 'lucide-react';

const NotificationSystem = ({
  notifications = [],
  onNotificationClick,
  onNotificationDismiss,
  onNotificationAction,
  showSettings = true,
  className = "",
  position = 'top-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    sound: true,
    desktop: true,
    categories: {
      system: true,
      updates: true,
      recommendations: true,
      promotions: true,
      social: true
    },
    frequency: 'immediate' // immediate, hourly, daily
  });

  // Mock notifications for demonstration
  const mockNotifications = [
    {
      id: 1,
      type: 'info',
      title: 'อัปเดตระบบใหม่',
      message: 'ระบบได้รับการอัปเดตเพื่อประสิทธิภาพที่ดีขึ้น',
      category: 'system',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      actions: [
        { label: 'ดูรายละเอียด', action: 'view_details' },
        { label: 'ไม่สนใจ', action: 'dismiss' }
      ]
    },
    {
      id: 2,
      type: 'success',
      title: 'แนะนำแอปใหม่',
      message: 'แอปท่องเที่ยวใหม่ที่คุณอาจสนใจ',
      category: 'recommendations',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      actions: [
        { label: 'ดูแอป', action: 'view_app' },
        { label: 'ไม่สนใจ', action: 'dismiss' }
      ]
    },
    {
      id: 3,
      type: 'warning',
      title: 'การบำรุงรักษา',
      message: 'ระบบจะปิดให้บริการในวันที่ 15 มกราคม เวลา 02:00-04:00',
      category: 'system',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      actions: [
        { label: 'ตั้งการแจ้งเตือน', action: 'set_reminder' }
      ]
    },
    {
      id: 4,
      type: 'promotion',
      title: 'โปรโมชั่นพิเศษ',
      message: 'ส่วนลด 20% สำหรับสมาชิกใหม่',
      category: 'promotions',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
      actions: [
        { label: 'ดูโปรโมชั่น', action: 'view_promotion' },
        { label: 'ไม่สนใจ', action: 'dismiss' }
      ]
    }
  ];

  const currentNotifications = notifications.length > 0 ? notifications : mockNotifications;

  // Calculate unread count
  useEffect(() => {
    const count = currentNotifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [currentNotifications]);

  // Notification types configuration
  const notificationTypes = {
    info: {
      icon: Info,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    success: {
      icon: Check,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
    error: {
      icon: X,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/20'
    },
    promotion: {
      icon: Star,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20'
    }
  };

  // Category icons
  const categoryIcons = {
    system: Settings,
    updates: TrendingUp,
    recommendations: Heart,
    promotions: Star,
    social: Share2
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    setIsOpen(false);
  };

  // Handle notification dismiss
  const handleNotificationDismiss = (notificationId, e) => {
    e.stopPropagation();
    if (onNotificationDismiss) {
      onNotificationDismiss(notificationId);
    }
  };

  // Handle notification action
  const handleNotificationAction = (notification, action, e) => {
    e.stopPropagation();
    if (onNotificationAction) {
      onNotificationAction(notification, action);
    }
  };

  // Toggle notification settings
  const toggleNotificationSettings = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Toggle category setting
  const toggleCategorySetting = (category) => {
    setNotificationSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    if (days < 7) return `${days} วันที่แล้ว`;
    
    return timestamp.toLocaleDateString('th-TH');
  };

  // Get notification type config
  const getNotificationTypeConfig = (type) => {
    return notificationTypes[type] || notificationTypes.info;
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-bwn-white hover:text-bwn-accent hover:bg-bwn-accent/10 rounded-xl transition-all duration-200"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className={`absolute ${getPositionClasses()} w-96 bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-bwn-medium-gray">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-bwn-accent" />
              <h3 className="text-lg font-semibold text-bwn-white">การแจ้งเตือน</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-bwn-accent text-bwn-deep-black text-xs rounded-full font-medium">
                  {unreadCount} ใหม่
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {showSettings && (
                <button
                  onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                  className="p-1 text-bwn-white/50 hover:text-bwn-accent transition-colors duration-200"
                  title="ตั้งค่าการแจ้งเตือน"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-bwn-white/50 hover:text-bwn-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettingsPanel && (
            <div className="p-4 border-b border-bwn-medium-gray bg-bwn-medium-gray/20">
              <h4 className="text-sm font-medium text-bwn-white mb-3">ตั้งค่าการแจ้งเตือน</h4>
              
              <div className="space-y-3">
                {/* General Settings */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-bwn-white/80">เปิดใช้งาน</span>
                  <button
                    onClick={() => toggleNotificationSettings('enabled', !notificationSettings.enabled)}
                    className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      notificationSettings.enabled ? 'bg-bwn-accent' : 'bg-bwn-medium-gray'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      notificationSettings.enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-bwn-white/80">เสียง</span>
                  <button
                    onClick={() => toggleNotificationSettings('sound', !notificationSettings.sound)}
                    className="p-1 text-bwn-white/50 hover:text-bwn-accent transition-colors duration-200"
                  >
                    {notificationSettings.sound ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Category Settings */}
                <div className="space-y-2">
                  <span className="text-xs text-bwn-white/60">หมวดหมู่</span>
                  {Object.entries(notificationSettings.categories).map(([category, enabled]) => {
                    const Icon = categoryIcons[category];
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-bwn-white/50" />
                          <span className="text-sm text-bwn-white/80 capitalize">{category}</span>
                        </div>
                        <button
                          onClick={() => toggleCategorySetting(category)}
                          className={`w-8 h-4 rounded-full transition-colors duration-200 ${
                            enabled ? 'bg-bwn-accent' : 'bg-bwn-medium-gray'
                          }`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                            enabled ? 'translate-x-4' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {currentNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-bwn-white/30 mx-auto mb-3" />
                <p className="text-bwn-white/70">ไม่มีการแจ้งเตือน</p>
              </div>
            ) : (
              <div className="divide-y divide-bwn-medium-gray/20">
                {currentNotifications.map((notification) => {
                  const typeConfig = getNotificationTypeConfig(notification.type);
                  const Icon = typeConfig.icon;
                  const CategoryIcon = categoryIcons[notification.category];
                  
                  return (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-bwn-medium-gray/20 transition-colors duration-200 cursor-pointer ${
                        !notification.read ? 'bg-bwn-accent/5 border-l-4 border-l-bwn-accent' : ''
                      }`}
                    >
                      {/* Notification Header */}
                      <div className="flex items-start space-x-3 mb-2">
                        <div className={`w-10 h-10 ${typeConfig.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${typeConfig.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-bwn-white truncate">
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => handleNotificationDismiss(notification.id, e)}
                              className="p-1 text-bwn-white/30 hover:text-red-400 transition-colors duration-200 flex-shrink-0"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="text-sm text-bwn-white/70 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          {/* Category and Time */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CategoryIcon className="w-3 h-3 text-bwn-white/50" />
                              <span className="text-xs text-bwn-white/50 capitalize">
                                {notification.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-bwn-white/50">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="flex items-center space-x-2 mt-3">
                          {notification.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={(e) => handleNotificationAction(notification, action.action, e)}
                              className="px-3 py-1 bg-bwn-medium-gray text-bwn-white text-xs rounded-lg hover:bg-bwn-accent hover:text-bwn-deep-black transition-colors duration-200"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-bwn-medium-gray bg-bwn-medium-gray/20">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  // Mark all as read
                  currentNotifications.forEach(n => {
                    if (onNotificationClick) onNotificationClick({ ...n, read: true });
                  });
                }}
                className="text-xs text-bwn-accent hover:text-bwn-accent-light transition-colors duration-200"
              >
                อ่านทั้งหมดแล้ว
              </button>
              
              <button
                onClick={() => {
                  // Clear all notifications
                  currentNotifications.forEach(n => {
                    if (onNotificationDismiss) onNotificationDismiss(n.id);
                  });
                }}
                className="text-xs text-bwn-white/50 hover:text-red-400 transition-colors duration-200"
              >
                ล้างทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;