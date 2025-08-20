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
  Zap
} from 'lucide-react';

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
    <footer className="bg-bwn-dark-gray border-t border-bwn-medium-gray">
      {/* Main Footer Content */}
      <div className="bwn-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-bwn-accent to-bwn-ocean-blue rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-bwn-deep-black">BX</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-bwn-white">Bwn X</h3>
                <p className="text-sm text-bwn-accent">ศูนย์กลางแนะนำหลายภาษา</p>
              </div>
            </div>
            
            <p className="text-bwn-white/80 mb-6 leading-relaxed">
              เรารวบรวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด 
              เพื่อให้คุณได้ประโยชน์สูงสุดจากโลกดิจิทัล
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-bwn-white/70">
                <Mail className="w-4 h-4 text-bwn-accent" />
                <span className="text-sm">support@bwnx.com</span>
              </div>
              <div className="flex items-center space-x-3 text-bwn-white/70">
                <Phone className="w-4 h-4 text-bwn-accent" />
                <span className="text-sm">+66 81-234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-bwn-white/70">
                <MapPin className="w-4 h-4 text-bwn-accent" />
                <span className="text-sm">กรุงเทพมหานคร, ประเทศไทย</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-bwn-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-bwn-white/70 hover:text-bwn-accent transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-bwn-medium-gray">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-bwn-white/70 text-sm font-medium">ติดตามเรา:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-bwn-medium-gray rounded-full flex items-center justify-center text-bwn-white/70 transition-all duration-200 hover:bg-bwn-accent hover:text-bwn-deep-black ${social.color}`}
                    aria-label={`ติดตามเราใน ${social.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-3">
              <span className="text-bwn-white/70 text-sm font-medium">รับข่าวสารล่าสุด:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  className="px-4 py-2 bg-bwn-medium-gray border border-bwn-light-gray rounded-l-xl text-bwn-white placeholder-bwn-white/50 focus:outline-none focus:border-bwn-accent focus:ring-1 focus:ring-bwn-accent"
                />
                <button className="px-4 py-2 bg-bwn-accent text-bwn-deep-black font-medium rounded-r-xl hover:bg-bwn-accent-light transition-colors duration-200">
                  สมัคร
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-bwn-medium-gray">
        <div className="bwn-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-bwn-white/60 text-sm">
              <span>© {currentYear} Bwn X. สงวนลิขสิทธิ์.</span>
              <span>•</span>
              <span>สร้างด้วย</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>และ</span>
              <Zap className="w-4 h-4 text-yellow-500 fill-current" />
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/sitemap" className="text-bwn-white/60 hover:text-bwn-accent transition-colors duration-200">
                แผนผังเว็บไซต์
              </Link>
              <Link to="/privacy" className="text-bwn-white/60 hover:text-bwn-accent transition-colors duration-200">
                ความเป็นส่วนตัว
              </Link>
              <Link to="/terms" className="text-bwn-white/60 hover:text-bwn-accent transition-colors duration-200">
                ข้อกำหนด
              </Link>
              <Link to="/cookies" className="text-bwn-white/60 hover:text-bwn-accent transition-colors duration-200">
                คุกกี้
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-bwn-accent text-bwn-deep-black rounded-full shadow-lg hover:bg-bwn-accent-light hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center"
        aria-label="กลับขึ้นด้านบน"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;

