import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Sparkles, Star, Zap } from 'lucide-react';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'apps',
      name: 'Apps',
      icon: '📱',
      title: 'Smart Travel & Booking ✈️',
      subtitle: 'แอปท่องเที่ยวและการจอง',
      description: 'Agoda, Booking.com, Airbnb, Grab, Bolt และแอปท่องเที่ยวชั้นนำ',
      count: '200+',
      popular: ['Agoda', 'Booking.com', 'Airbnb'],
      gradient: 'from-gray-500/20 to-gray-600/20',
      glowColor: 'shadow-white/10'
    },
    {
      id: 'channel',
      name: 'Channel',
      icon: '🎥',
      title: 'Investment & Trading Channels 📊',
      subtitle: 'ช่องการลงทุนและเทรด',
      description: 'ช่องสอนลงทุน หุ้น คริปโต Forex และการเงินส่วนบุคคล',
      count: '150+',
      popular: ['Stock Trading', 'Crypto', 'Forex'],
      gradient: 'from-gray-400/20 to-gray-500/20',
      glowColor: 'shadow-gray-400/10'
    },
    {
      id: 'fanpage',
      name: 'Fanpage',
      icon: '📘',
      title: 'Best Game Top-up Deals 🎮',
      subtitle: 'เพจเติมเกมราคาถูก',
      description: 'เติม Robux, Free Fire, PUBG, Mobile Legends ราคาดีที่สุด',
      count: '80+',
      popular: ['Robux', 'Free Fire', 'PUBG'],
      gradient: 'from-gray-600/20 to-gray-700/20',
      glowColor: 'shadow-gray-300/10'
    },
    {
      id: 'product',
      name: 'Product',
      icon: '🛍️',
      title: 'Influencer Picks & Beauty 💄',
      subtitle: 'สินค้าคนดังและความงาม',
      description: 'สินค้าจาก Amazon, Shopee, Lazada ที่อินฟลูเอนเซอร์แนะนำ',
      count: '300+',
      popular: ['Amazon', 'Shopee', 'Lazada'],
      gradient: 'from-gray-300/20 to-gray-400/20',
      glowColor: 'shadow-white/15'
    },
    {
      id: 'news',
      name: 'News',
      icon: '📰',
      title: 'Crypto & Tech News ₿',
      subtitle: 'ข่าวคริปโตและเทคโนโลยี',
      description: 'ข่าวล่าสุดเกี่ยวกับ Bitcoin, Ethereum, AI และเทคโนโลยี',
      count: '500+',
      popular: ['Bitcoin', 'AI News', 'Tech'],
      gradient: 'from-gray-500/20 to-gray-600/20',
      glowColor: 'shadow-gray-200/10'
    },
    {
      id: 'advice',
      name: 'Advice',
      icon: '💡',
      title: 'Affiliate & Online Business Tips 🔗',
      subtitle: 'คำแนะนำทำ Affiliate',
      description: 'สอนทำ Affiliate Marketing, Dropshipping และธุรกิจออนไลน์',
      count: '120+',
      popular: ['Affiliate', 'Dropshipping', 'E-commerce'],
      gradient: 'from-gray-400/20 to-gray-500/20',
      glowColor: 'shadow-gray-100/10'
    },
    {
      id: 'location',
      name: 'Location',
      icon: '📍',
      title: 'Travel Destinations & Hidden Gems 🏞️',
      subtitle: 'สถานที่ท่องเที่ยวและจุดลับ',
      description: 'คาเฟ่ สถานที่ท่องเที่ยว และของดีจังหวัดทั่วไทย',
      count: '250+',
      popular: ['Hidden Cafes', 'Travel Spots', 'OTOP'],
      gradient: 'from-gray-600/20 to-gray-700/20',
      glowColor: 'shadow-white/12'
    },
    {
      id: 'money',
      name: 'Money',
      icon: '💸',
      title: 'Passive Income & Automation 🌱',
      subtitle: 'รายได้เสริมและการทำเงินอัตโนมัติ',
      description: 'สอนสร้างรายได้เสริม Crypto Staking, NFT และการลงทุนอัตโนมัติ',
      count: '100+',
      popular: ['Crypto Staking', 'NFT', 'Auto Trading'],
      gradient: 'from-gray-300/20 to-gray-400/20',
      glowColor: 'shadow-gray-50/10'
    }
  ];

  return (
    <section className="py-24 px-4 bwn-ocean-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bwn-fluid-particles opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bwn-morph-shape bg-gradient-to-br from-teal-500/5 to-cyan-500/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bwn-morph-shape bg-gradient-to-br from-blue-500/3 to-purple-500/3 blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 bwn-scroll-reveal">
          <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 rounded-full bwn-surface-glass border border-white/20 backdrop-blur-xl">
            <TrendingUp size={20} className="text-teal-400" />
            <span className="text-sm font-medium text-gray-300">หมวดหมู่ยอดนิยม</span>
            <Sparkles size={16} className="text-cyan-400" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="bwn-gradient-text">สำรวจ</span>
            <br />
            <span className="text-white">ทุกหมวดหมู่</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            ค้นพบเนื้อหาคุณภาพสูงในทุกหมวดหมู่ที่คุณสนใจ
            <br />
            <span className="text-gray-400">พร้อมข้อมูลล่าสุดและคำแนะนำจากผู้เชี่ยวชาญ</span>
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative bwn-interactive-card bwn-hover-lift cursor-pointer bwn-scroll-reveal`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Main Card */}
              <div className={`relative p-8 rounded-3xl bwn-surface-glass border border-white/10 backdrop-blur-xl bwn-smooth-transition overflow-hidden h-full`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${category.glowColor} shadow-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full font-medium">
                        {category.count}
                      </div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:bwn-text-glow transition-all duration-300">
                    {category.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-gray-400 mb-4 font-medium">
                    {category.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Popular Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.popular.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 bg-white/10 text-gray-300 rounded-full border border-white/10 backdrop-blur-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-white hover:bg-white/20 group-hover:bwn-deep-glow rounded-xl font-medium"
                  >
                    <span>สำรวจ {category.name}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star size={16} className="text-teal-400 animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <Zap size={12} className="text-cyan-400 animate-bounce" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bwn-scroll-reveal">
          <Button
            size="lg"
            className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:from-teal-400 hover:to-cyan-400 bwn-deep-glow bwn-smooth-transition rounded-2xl shadow-2xl"
          >
            <Sparkles size={24} className="mr-3" />
            ดูทุกหมวดหมู่
            <ArrowRight size={24} className="ml-3" />
          </Button>
          
          <p className="text-gray-400 mt-4 text-sm">
            อัปเดตเนื้อหาใหม่ทุกวัน • รวบรวมโดยผู้เชี่ยวชาญ
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

