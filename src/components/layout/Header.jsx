import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Navigation items with categories
  const navigationItems = [
    {
      name: 'แดชบอร์ด',
      path: '/dashboard',
      icon: '📊',
      subItems: [
        { name: 'ภาพรวม', path: '/dashboard', description: 'สถิติและข้อมูลภาพรวม' },
        { name: 'การวิเคราะห์', path: '/dashboard?tab=analytics', description: 'กราฟและข้อมูลเชิงลึก' },
        { name: 'จัดการเนื้อหา', path: '/dashboard?tab=content', description: 'จัดการแอปและเนื้อหา' }
      ]
    },
    {
      name: 'แอปและเครื่องมือ',
      path: '/apps',
      icon: '📱',
      subItems: [
        { name: 'แอปท่องเที่ยว', path: '/apps/travel-booking', description: 'Agoda, Booking.com, Airbnb' },
        { name: 'แอปผลิตภาพ', path: '/apps/productivity', description: 'เครื่องมือทำงานและเรียน' },
        { name: 'แอปบันเทิง', path: '/apps/entertainment', description: 'เกม หนัง เพลง' }
      ]
    },
    {
      name: 'ช่องทาง',
      path: '/channels',
      icon: '📺',
      subItems: [
        { name: 'การลงทุนและเทรด', path: '/channels/investment-trading', description: 'หุ้น คริปโต Forex' },
        { name: 'การศึกษา', path: '/channels/education', description: 'คอร์สเรียนออนไลน์' },
        { name: 'เทคโนโลยี', path: '/channels/technology', description: 'ข่าวและเทรนด์ใหม่' }
      ]
    },
    {
      name: 'เพจแนะนำ',
      path: '/fanpages',
      icon: '📘',
      subItems: [
        { name: 'เกมเติมเงิน', path: '/fanpages/game-topup', description: 'Robux, Free Fire, PUBG' },
        { name: 'บันเทิง', path: '/fanpages/entertainment', description: 'เพจแนะนำหนัง เพลง' },
        { name: 'ไลฟ์สไตล์', path: '/fanpages/lifestyle', description: 'แฟชั่น อาหาร การเดินทาง' }
      ]
    },
    {
      name: 'สินค้า',
      path: '/products',
      icon: '🛍️',
      subItems: [
        { name: 'ความงามและอินฟลูเอนเซอร์', path: '/products/beauty-influencer', description: 'เครื่องสำอาง สกินแคร์' },
        { name: 'อุปกรณ์เทคโนโลยี', path: '/products/tech-gadgets', description: 'มือถือ คอมพิวเตอร์' },
        { name: 'บ้านและการใช้ชีวิต', path: '/products/home-living', description: 'เฟอร์นิเจอร์ ของตกแต่ง' }
      ]
    },
    {
      name: 'ข่าวสาร',
      path: '/news',
      icon: '📰',
      subItems: [
        { name: 'คริปโตและเทคโนโลยี', path: '/news/crypto-tech', description: 'Bitcoin, AI, Blockchain' },
        { name: 'ธุรกิจ', path: '/news/business', description: 'ข่าวเศรษฐกิจ การลงทุน' },
        { name: 'เทคโนโลยี', path: '/news/technology', description: 'นวัตกรรมใหม่ๆ' }
      ]
    },
    {
      name: 'คำแนะนำ',
      path: '/advice',
      icon: '💡',
      subItems: [
        { name: 'Affiliate Marketing', path: '/advice/affiliate-business', description: 'วิธีทำ Affiliate' },
        { name: 'ธุรกิจออนไลน์', path: '/advice/online-business', description: 'Dropshipping, E-commerce' },
        { name: 'การพัฒนาตัวเอง', path: '/advice/personal-development', description: 'ทักษะและความรู้' }
      ]
    },
    {
      name: 'สถานที่',
      path: '/locations',
      icon: '📍',
      subItems: [
        { name: 'จุดท่องเที่ยวลับ', path: '/locations/travel-gems', description: 'คาเฟ่ สถานที่สวย' },
        { name: 'ธุรกิจท้องถิ่น', path: '/locations/local-businesses', description: 'ร้านค้า OTOP' },
        { name: 'จุดซ่อนเร้น', path: '/locations/hidden-spots', description: 'สถานที่ที่ไม่ค่อยมีคนรู้' }
      ]
    },
    {
      name: 'หาเงิน',
      path: '/money',
      icon: '💸',
      subItems: [
        { name: 'รายได้เสริม', path: '/money/passive-income', description: 'Crypto Staking, NFT' },
        { name: 'กลยุทธ์การลงทุน', path: '/money/investment-strategies', description: 'วิธีลงทุนที่ปลอดภัย' },
        { name: 'งานเสริม', path: '/money/side-hustles', description: 'งานออนไลน์รายได้ดี' }
      ]
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-bg-base/80 backdrop-blur-xl border-b border-stroke-soft/50 shadow-lg' 
        : 'bg-bg-base/60 backdrop-blur-lg border-b border-stroke-soft/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-aqua rounded-lg flex items-center justify-center text-bg-deep font-bold text-lg group-hover:scale-110 transition-transform duration-200">
              B
            </div>
            <span className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-200">
              Bwn X
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-1/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-surface-1/95 backdrop-blur-xl border border-stroke-soft rounded-xl shadow-2xl p-4 space-y-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block p-3 rounded-lg hover:bg-surface-2/50 transition-colors duration-200 group/sub"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-accent-primary/10 rounded-lg flex items-center justify-center text-accent-primary text-sm font-medium">
                            {subItem.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-text-primary font-medium group-hover:text-accent-primary transition-colors duration-200">
                              {subItem.name}
                            </p>
                            <p className="text-text-muted text-sm mt-1">
                              {subItem.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Demo Link */}
            <Link 
              to="/demo" 
              className="px-3 py-2 text-accent-primary hover:text-accent-aqua hover:bg-accent-primary/10 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Demo
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Selector */}
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-1/50 rounded-lg transition-all duration-200">
              <Globe className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-1/50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface-1/95 backdrop-blur-xl border-t border-stroke-soft/50">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <div key={item.path} className="space-y-2">
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                </Link>
                
                {/* Mobile Submenu */}
                <div className="ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-surface-2/50 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

