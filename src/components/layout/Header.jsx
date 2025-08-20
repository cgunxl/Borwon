import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, Globe, Zap } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('TH');

  const categories = [
    { name: 'Apps', icon: '📱', href: '#apps', color: 'from-blue-500/20 to-purple-500/20' },
    { name: 'Channel', icon: '🎥', href: '#channel', color: 'from-red-500/20 to-orange-500/20' },
    { name: 'Fanpage', icon: '📘', href: '#fanpage', color: 'from-green-500/20 to-teal-500/20' },
    { name: 'Product', icon: '🛍️', href: '#product', color: 'from-pink-500/20 to-rose-500/20' },
    { name: 'News', icon: '📰', href: '#news', color: 'from-yellow-500/20 to-amber-500/20' },
    { name: 'Advice', icon: '💡', href: '#advice', color: 'from-indigo-500/20 to-blue-500/20' },
    { name: 'Location', icon: '📍', href: '#location', color: 'from-emerald-500/20 to-green-500/20' },
    { name: 'Money', icon: '💸', href: '#money', color: 'from-violet-500/20 to-purple-500/20' }
  ];

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'TH' ? 'EN' : 'TH');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bwn-surface-glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bwn-morph-shape bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
                <Zap size={20} className="text-black" />
              </div>
              <div className="absolute inset-0 bwn-morph-shape bg-gradient-to-br from-teal-400/30 to-cyan-400/30 blur-md"></div>
            </div>
            <div className="text-2xl font-bold">
              <span className="bwn-gradient-text">Bwn</span>
              <span className="text-gray-400">X</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white bwn-smooth-transition relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                <span className="relative z-10 text-lg">{category.icon}</span>
                <span className="relative z-10 font-medium">{category.name}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white bwn-deep-glow hover:bg-white/10 rounded-xl"
            >
              <Search size={16} />
              <span>ค้นหา</span>
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-300 hover:text-white bwn-deep-glow hover:bg-white/10 rounded-xl"
            >
              <Globe size={16} />
              <span className="font-medium">{currentLang}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white bwn-deep-glow hover:bg-white/10 rounded-xl"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 bwn-surface-glass">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className={`group bwn-interactive-card flex items-center space-x-3 px-4 py-4 rounded-xl text-gray-300 hover:text-white bwn-smooth-transition bg-gradient-to-r ${category.color} border border-white/10`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Mobile Search */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white bwn-deep-glow hover:bg-white/10 rounded-xl"
              >
                <Search size={16} className="mr-3" />
                ค้นหาเนื้อหาที่สนใจ
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

