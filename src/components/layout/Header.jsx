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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Check if current path is active
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-bwn-deep-black/95 backdrop-blur-md border-b border-bwn-accent/20' 
        : 'bg-transparent'
    }`}>
      <div className="bwn-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-bwn-accent to-bwn-ocean-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl lg:text-2xl font-bold text-bwn-deep-black">BX</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-bwn-white group-hover:text-bwn-accent transition-colors duration-300">
                Bwn X
              </h1>
              <p className="text-xs text-bwn-accent font-medium">ศูนย์กลางแนะนำหลายภาษา</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'text-bwn-accent bg-bwn-accent/10 border border-bwn-accent/20'
                      : 'text-bwn-white hover:text-bwn-accent hover:bg-bwn-accent/5'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-bwn-dark-gray border border-bwn-medium-gray rounded-2xl p-4 shadow-2xl">
                    <div className="grid gap-3">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="flex items-start space-x-3 p-3 rounded-xl hover:bg-bwn-medium-gray transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-bwn-white hover:text-bwn-accent transition-colors duration-200">
                              {subItem.name}
                            </h4>
                            <p className="text-sm text-bwn-white/60 mt-1">
                              {subItem.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <button className="hidden sm:flex items-center space-x-2 text-bwn-white hover:text-bwn-accent transition-colors duration-200">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">TH</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-bwn-white hover:text-bwn-accent hover:bg-bwn-accent/10 rounded-xl transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-bwn-medium-gray bg-bwn-dark-gray/95 backdrop-blur-md">
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.path} className="space-y-2">
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'text-bwn-accent bg-bwn-accent/10 border border-bwn-accent/20'
                        : 'text-bwn-white hover:text-bwn-accent hover:bg-bwn-accent/5'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                  
                  {/* Mobile Sub Items */}
                  <div className="ml-8 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-bwn-white/80 hover:text-bwn-accent hover:bg-bwn-accent/5 rounded-lg transition-all duration-200"
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
      </div>
    </header>
  );
};

export default Header;

