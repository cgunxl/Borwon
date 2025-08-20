import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Globe, 
  Mail, 
  MessageCircle, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ArrowUp,
  Sparkles,
  Facebook
} from 'lucide-react';

const Footer = () => {
  const categories = [
    { name: 'Apps', href: '#apps' },
    { name: 'Channel', href: '#channel' },
    { name: 'Fanpage', href: '#fanpage' },
    { name: 'Product', href: '#product' },
    { name: 'News', href: '#news' },
    { name: 'Advice', href: '#advice' },
    { name: 'Location', href: '#location' },
    { name: 'Money', href: '#money' }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/bouaonpanat_?igsh=OHVrcHd3YWoycGlx&utm_source=qr', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bwn-ocean-bg border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bwn-fluid-particles opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bwn-morph-shape bg-gradient-to-br from-teal-500/5 to-cyan-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-128 h-128 bwn-morph-shape bg-gradient-to-br from-blue-500/3 to-purple-500/3 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bwn-morph-shape bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
                  <Zap size={24} className="text-black" />
                </div>
                <div className="absolute inset-0 bwn-morph-shape bg-gradient-to-br from-teal-400/30 to-cyan-400/30 blur-md"></div>
              </div>
              <div className="text-3xl font-bold">
                <span className="bwn-gradient-text">Bwn</span>
                <span className="text-gray-400">X</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-md">
              ศูนย์กลางแนะนำหลายภาษาที่รวบรวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:from-teal-400 hover:to-cyan-400 bwn-deep-glow rounded-xl font-medium"
              >
                <Mail size={16} className="mr-2" />
                ติดต่อเรา
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 bwn-surface-glass rounded-xl font-medium"
              >
                <Globe size={16} className="mr-2" />
                เปลี่ยนภาษา
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Sparkles size={20} className="mr-2 text-teal-400" />
              หมวดหมู่
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href}
                    className="text-gray-300 hover:text-white bwn-smooth-transition hover:translate-x-1 inline-block"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <MessageCircle size={20} className="mr-2 text-cyan-400" />
              ติดตาม
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 rounded-xl bwn-surface-glass border border-white/10 hover:border-white/30 bwn-smooth-transition group"
                >
                  <social.icon size={16} className="text-gray-400 group-hover:text-white" />
                  <span className="text-sm text-gray-400 group-hover:text-white">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="bwn-surface-glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-2">อัปเดตล่าสุด</p>
              <p className="text-white font-medium">ทุกวัน 24/7</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bwn-surface-glass rounded-2xl p-8 border border-white/10 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              รับข้อมูลล่าสุด
            </h3>
            <p className="text-gray-300 mb-6">
              สมัครรับข่าวสารและคำแนะนำใหม่ๆ ส่งตรงถึงอีเมลของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 bwn-smooth-transition"
              />
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:from-teal-400 hover:to-cyan-400 bwn-deep-glow rounded-xl font-medium">
                สมัคร
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>© 2024 Bwn X. สร้างด้วย</span>
            <Heart size={16} className="text-red-400" />
            <span>ในประเทศไทย</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white bwn-smooth-transition text-sm">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#" className="text-gray-400 hover:text-white bwn-smooth-transition text-sm">
              เงื่อนไขการใช้งาน
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white bwn-deep-glow rounded-xl"
            >
              <ArrowUp size={16} className="mr-1" />
              กลับขึ้นบน
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

