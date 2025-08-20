import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Star,
  Users,
  Clock,
  Zap
} from 'lucide-react';

const CategoryGrid = () => {
  // Main categories data with detailed information
  const categories = [
    {
      id: 'apps',
      name: 'แอปและเครื่องมือ',
      icon: '📱',
      description: 'รวมแอปและเครื่องมือที่ใช้งานง่าย มีประโยชน์ และช่วยให้ชีวิตดีขึ้น',
      path: '/apps',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      features: ['แอปท่องเที่ยว', 'เครื่องมือทำงาน', 'แอปบันเทิง'],
      stats: { count: '100+', rating: '4.8', users: '10K+' },
      subCategories: [
        { name: 'แอปท่องเที่ยว', path: '/apps/travel-booking', description: 'Agoda, Booking.com, Airbnb' },
        { name: 'แอปผลิตภาพ', path: '/apps/productivity', description: 'เครื่องมือทำงานและเรียน' },
        { name: 'แอปบันเทิง', path: '/apps/entertainment', description: 'เกม หนัง เพลง' }
      ]
    },
    {
      id: 'channels',
      name: 'ช่องทางการลงทุน',
      icon: '📺',
      description: 'ช่องทางการลงทุนที่ปลอดภัย มีความน่าเชื่อถือ และให้ผลตอบแทนที่ดี',
      path: '/channels',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      features: ['หุ้น', 'คริปโต', 'Forex'],
      stats: { count: '50+', rating: '4.9', users: '25K+' },
      subCategories: [
        { name: 'การลงทุนและเทรด', path: '/channels/investment-trading', description: 'หุ้น คริปโต Forex' },
        { name: 'การศึกษา', path: '/channels/education', description: 'คอร์สเรียนออนไลน์' },
        { name: 'เทคโนโลยี', path: '/channels/technology', description: 'ข่าวและเทรนด์ใหม่' }
      ]
    },
    {
      id: 'fanpages',
      name: 'เพจแนะนำ',
      icon: '📘',
      description: 'เพจแนะนำที่ให้ข้อมูลที่เป็นประโยชน์ มีความน่าเชื่อถือ และอัปเดตสม่ำเสมอ',
      path: '/fanpages',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      features: ['เกมเติมเงิน', 'บันเทิง', 'ไลฟ์สไตล์'],
      stats: { count: '200+', rating: '4.7', users: '15K+' },
      subCategories: [
        { name: 'เกมเติมเงิน', path: '/fanpages/game-topup', description: 'Robux, Free Fire, PUBG' },
        { name: 'บันเทิง', path: '/fanpages/entertainment', description: 'เพจแนะนำหนัง เพลง' },
        { name: 'ไลฟ์สไตล์', path: '/fanpages/lifestyle', description: 'แฟชั่น อาหาร การเดินทาง' }
      ]
    },
    {
      id: 'products',
      name: 'สินค้าและบริการ',
      icon: '🛍️',
      description: 'สินค้าคุณภาพสูง ราคาเป็นมิตร และบริการหลังการขายที่ดี',
      path: '/products',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      features: ['ความงาม', 'เทคโนโลยี', 'บ้านและการใช้ชีวิต'],
      stats: { count: '500+', rating: '4.6', users: '20K+' },
      subCategories: [
        { name: 'ความงามและอินฟลูเอนเซอร์', path: '/products/beauty-influencer', description: 'เครื่องสำอาง สกินแคร์' },
        { name: 'อุปกรณ์เทคโนโลยี', path: '/products/tech-gadgets', description: 'มือถือ คอมพิวเตอร์' },
        { name: 'บ้านและการใช้ชีวิต', path: '/products/home-living', description: 'เฟอร์นิเจอร์ ของตกแต่ง' }
      ]
    },
    {
      id: 'news',
      name: 'ข่าวสารและข้อมูล',
      icon: '📰',
      description: 'ข่าวสารที่ทันสมัย ข้อมูลที่ถูกต้อง และการวิเคราะห์ที่ลึกซึ้ง',
      path: '/news',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      features: ['คริปโต', 'เทคโนโลยี', 'ธุรกิจ'],
      stats: { count: '1000+', rating: '4.8', users: '30K+' },
      subCategories: [
        { name: 'คริปโตและเทคโนโลยี', path: '/news/crypto-tech', description: 'Bitcoin, AI, Blockchain' },
        { name: 'ธุรกิจ', path: '/news/business', description: 'ข่าวเศรษฐกิจ การลงทุน' },
        { name: 'เทคโนโลยี', path: '/news/technology', description: 'นวัตกรรมใหม่ๆ' }
      ]
    },
    {
      id: 'advice',
      name: 'คำแนะนำและเทคนิค',
      icon: '💡',
      description: 'คำแนะนำจากผู้เชี่ยวชาญ เทคนิคที่ใช้งานได้จริง และเคล็ดลับการพัฒนาตัวเอง',
      path: '/advice',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      features: ['Affiliate Marketing', 'ธุรกิจออนไลน์', 'การพัฒนาตัวเอง'],
      stats: { count: '300+', rating: '4.9', users: '18K+' },
      subCategories: [
        { name: 'Affiliate Marketing', path: '/advice/affiliate-business', description: 'วิธีทำ Affiliate' },
        { name: 'ธุรกิจออนไลน์', path: '/advice/online-business', description: 'Dropshipping, E-commerce' },
        { name: 'การพัฒนาตัวเอง', path: '/advice/personal-development', description: 'ทักษะและความรู้' }
      ]
    },
    {
      id: 'locations',
      name: 'สถานที่และจุดหมาย',
      icon: '📍',
      description: 'สถานที่ท่องเที่ยวที่น่าสนใจ จุดหมายที่ซ่อนเร้น และธุรกิจท้องถิ่นที่น่าไป',
      path: '/locations',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      features: ['ท่องเที่ยว', 'ธุรกิจท้องถิ่น', 'จุดซ่อนเร้น'],
      stats: { count: '150+', rating: '4.7', users: '12K+' },
      subCategories: [
        { name: 'จุดท่องเที่ยวลับ', path: '/locations/travel-gems', description: 'คาเฟ่ สถานที่สวย' },
        { name: 'ธุรกิจท้องถิ่น', path: '/locations/local-businesses', description: 'ร้านค้า OTOP' },
        { name: 'จุดซ่อนเร้น', path: '/locations/hidden-spots', description: 'สถานที่ที่ไม่ค่อยมีคนรู้' }
      ]
    },
    {
      id: 'money',
      name: 'หาเงินและรายได้',
      icon: '💸',
      description: 'วิธีหาเงินออนไลน์ กลยุทธ์การลงทุน และโอกาสสร้างรายได้ที่ยั่งยืน',
      path: '/money',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      features: ['รายได้เสริม', 'การลงทุน', 'งานเสริม'],
      stats: { count: '100+', rating: '4.9', users: '22K+' },
      subCategories: [
        { name: 'รายได้เสริม', path: '/money/passive-income', description: 'Crypto Staking, NFT' },
        { name: 'กลยุทธ์การลงทุน', path: '/money/investment-strategies', description: 'วิธีลงทุนที่ปลอดภัย' },
        { name: 'งานเสริม', path: '/money/side-hustles', description: 'งานออนไลน์รายได้ดี' }
      ]
    }
  ];

  return (
    <section className="bwn-section">
      <div className="bwn-container">
        {/* Section Header */}
        <div className="text-center mb-16 bwn-scroll-reveal">
          <h2 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">8 หมวดหมู่หลัก</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องรู้</span>
          </h2>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            เรารวบรวมทุกอย่างที่คุณต้องการในที่เดียว เพื่อให้คุณได้ประโยชน์สูงสุดจากโลกออนไลน์
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`bwn-category-card group ${category.bgColor} ${category.borderColor} bwn-scroll-reveal`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Icon */}
              <div className="text-center mb-4">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-bwn-white mb-2 group-hover:text-bwn-accent transition-colors duration-300">
                  {category.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-bwn-white/80 text-sm mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-bwn-medium-gray/50 text-bwn-white/70 text-xs rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-bwn-accent">{category.stats.count}</div>
                  <div className="text-xs text-bwn-white/60">รายการ</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-bwn-ocean-blue">{category.stats.rating}</div>
                  <div className="text-xs text-bwn-white/60">คะแนน</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-bwn-accent-light">{category.stats.users}</div>
                  <div className="text-xs text-bwn-white/60">ผู้ใช้</div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={category.path}
                className="w-full bwn-button bg-bwn-accent text-bwn-deep-black hover:bg-bwn-accent-light group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <span>ดูเพิ่มเติม</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          ))}
        </div>

        {/* Sub-categories Section */}
        <div className="bwn-scroll-reveal">
          <h3 className="text-2xl font-bold text-bwn-white text-center mb-8">
            หมวดหมู่ย่อยที่แนะนำ
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.flatMap(category => 
              category.subCategories.map((subCategory, subIndex) => (
                <Link
                  key={`${category.id}-${subIndex}`}
                  to={subCategory.path}
                  className="group bg-bwn-dark-gray border border-bwn-medium-gray rounded-xl p-4 hover:border-bwn-accent hover:bg-bwn-accent/5 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-bwn-white group-hover:text-bwn-accent transition-colors duration-200">
                      {subCategory.name}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-bwn-white/40 group-hover:text-bwn-accent transition-colors duration-200" />
                  </div>
                  <p className="text-sm text-bwn-white/70 mb-3">
                    {subCategory.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-bwn-white/50">
                    <span>หมวดหมู่: {category.name}</span>
                    <TrendingUp className="w-3 h-3" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bwn-scroll-reveal">
          <div className="bg-gradient-to-r from-bwn-accent to-bwn-ocean-blue rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-bwn-deep-black mb-4">
              พร้อมเริ่มต้นการเดินทางแล้วหรือยัง?
            </h3>
            <p className="text-bwn-deep-black/80 mb-6">
              ค้นพบโอกาสใหม่ๆ และพัฒนาตัวเองไปพร้อมกับเรา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apps"
                className="bwn-button bg-bwn-deep-black text-bwn-accent hover:bg-bwn-dark-gray hover:text-bwn-accent-light"
              >
                <Zap className="w-5 h-5 mr-2" />
                เริ่มต้นตอนนี้
              </Link>
              <Link
                to="/advice"
                className="bwn-button border-2 border-bwn-deep-black text-bwn-deep-black hover:bg-bwn-deep-black hover:text-bwn-accent"
              >
                <Star className="w-5 h-5 mr-2" />
                เรียนรู้เพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

