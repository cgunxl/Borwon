import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Heart,
  Zap,
  Globe,
  Shield,
  Sparkles
} from 'lucide-react';
import FuturisticButton from '../ui/FuturisticButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer sections
  const footerSections = [
    {
      title: 'หมวดหมู่หลัก',
      links: [
        { name: 'แอปและเครื่องมือ', path: '/apps' },
        { name: 'ช่องทางการลงทุน', path: '/channels' },
        { name: 'เพจแนะนำ', path: '/fanpages' },
        { name: 'สินค้า', path: '/products' },
        { name: 'ข่าวสาร', path: '/news' },
        { name: 'คำแนะนำ', path: '/advice' },
        { name: 'สถานที่', path: '/locations' },
        { name: 'หาเงิน', path: '/money' }
      ]
    },
    {
      title: 'หมวดหมู่ยอดนิยม',
      links: [
        { name: 'แอปท่องเที่ยว', path: '/apps/travel-booking' },
        { name: 'การลงทุนคริปโต', path: '/channels/investment-trading' },
        { name: 'เกมเติมเงิน', path: '/fanpages/game-topup' },
        { name: 'สินค้าความงาม', path: '/products/beauty-influencer' },
        { name: 'ข่าวเทคโนโลยี', path: '/news/crypto-tech' },
        { name: 'Affiliate Marketing', path: '/advice/affiliate-business' }
      ]
    },
    {
      title: 'ข้อมูลเพิ่มเติม',
      links: [
        { name: 'เกี่ยวกับเรา', path: '/about' },
        { name: 'นโยบายความเป็นส่วนตัว', path: '/privacy' },
        { name: 'ข้อกำหนดการใช้งาน', path: '/terms' },
        { name: 'ติดต่อเรา', path: '/contact' },
        { name: 'ช่วยเหลือ', path: '/help' },
        { name: 'แผนผังเว็บไซต์', path: '/sitemap' }
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bouaonpanat_?igsh=OHVrcHd3YWoycGlx&utm_source=qr',
      icon: Instagram,
      color: 'hover:text-pink-400'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: Facebook,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: Twitter,
      color: 'hover:text-sky-400'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: Youtube,
      color: 'hover:text-red-500'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-bg-base to-bg-deep border-t border-stroke-soft/50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-accent-primary/10 opacity-30" />
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-aqua rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-bg-deep">BX</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Bwn X</h3>
                <p className="text-sm text-accent-primary">ศูนย์กลางแนะนำหลายภาษา</p>
              </div>
            </div>
            
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              เราคือศูนย์กลางที่รวบรวมทุกอย่างที่คุณต้องการสำหรับการใช้งานดิจิทัลในยุคใหม่ 
              ให้คุณได้สัมผัสกับโอกาสและนวัตกรรมล่าสุด
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text-primary mb-3">รับข่าวสารล่าสุด</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  className="flex-1 px-3 py-2 bg-surface-1/50 border border-stroke-soft/50 rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20"
                />
                <FuturisticButton size="sm" className="px-4">
                  <Mail className="w-4 h-4" />
                </FuturisticButton>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-surface-1/50 border border-stroke-soft/50 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-semibold text-text-primary border-b border-stroke-soft/50 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-text-secondary hover:text-accent-primary transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-stroke-soft/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-text-muted text-sm">
              <span>© {currentYear} Bwn X. All rights reserved.</span>
              <span className="text-accent-primary">•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>in Thailand</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-text-muted hover:text-accent-primary transition-colors duration-200 flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </Link>
              <Link to="/terms" className="text-text-muted hover:text-accent-primary transition-colors duration-200 flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Terms</span>
              </Link>
              <Link to="/demo" className="text-accent-primary hover:text-accent-aqua transition-colors duration-200 flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>Demo</span>
              </Link>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-surface-1/50 border border-stroke-soft/50 rounded-lg text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all duration-200 group"
            >
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>กลับขึ้นด้านบน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-30" />
    </footer>
  );
};

export default Footer;

