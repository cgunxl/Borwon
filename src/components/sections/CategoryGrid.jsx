import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Star,
  Users,
  Clock,
  Zap,
  Globe,
  Shield,
  Rocket,
  Sparkles
} from 'lucide-react';
import FuturisticCard from '../ui/FuturisticCard';
import FuturisticButton from '../ui/FuturisticButton';

const CategoryGrid = () => {
  // Main categories data with detailed information
  const categories = [
    {
      id: 'apps',
      name: 'แอปและเครื่องมือ',
      icon: '📱',
      description: 'รวมแอปและเครื่องมือที่ใช้งานง่าย มีประโยชน์ และช่วยให้ชีวิตดีขึ้น',
      path: '/apps',
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
      description: 'คำแนะนำที่เป็นประโยชน์ เทคนิคที่ใช้งานได้จริง และประสบการณ์จากผู้เชี่ยวชาญ',
      path: '/advice',
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
      description: 'สถานที่ที่น่าสนใจ จุดหมายที่สวยงาม และประสบการณ์การเดินทางที่ unforgettable',
      path: '/locations',
      features: ['จุดท่องเที่ยวลับ', 'ธุรกิจท้องถิ่น', 'จุดซ่อนเร้น'],
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
      description: 'วิธีหาเงินออนไลน์ รายได้เสริม และกลยุทธ์การลงทุนที่ปลอดภัย',
      path: '/money',
      features: ['รายได้เสริม', 'กลยุทธ์การลงทุน', 'งานเสริม'],
      stats: { count: '200+', rating: '4.8', users: '22K+' },
      subCategories: [
        { name: 'รายได้เสริม', path: '/money/passive-income', description: 'Crypto Staking, NFT' },
        { name: 'กลยุทธ์การลงทุน', path: '/money/investment-strategies', description: 'วิธีลงทุนที่ปลอดภัย' },
        { name: 'งานเสริม', path: '/money/side-hustles', description: 'งานออนไลน์รายได้ดี' }
      ]
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/20 to-bg-deep/40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent-primary/10 border border-accent-primary/25 rounded-full px-4 py-2 text-accent-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>หมวดหมู่ทั้งหมด</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            ค้นพบ
            <span className="text-gradient ml-3">โอกาสใหม่ๆ</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            รวบรวมทุกอย่างที่คุณต้องการในที่เดียว เพื่อให้คุณได้ประโยชน์สูงสุดจากโลกออนไลน์
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <FuturisticCard 
              key={category.id}
              className="group cursor-pointer hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-primary/20 to-accent-aqua/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{category.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-surface-2/50 text-text-secondary text-xs rounded-lg border border-stroke-soft/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                  <div className="text-lg font-bold text-accent-primary">{category.stats.count}</div>
                  <div className="text-xs text-text-muted">รายการ</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent-aqua">{category.stats.rating}</div>
                  <div className="text-xs text-text-muted">คะแนน</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent-primary">{category.stats.users}</div>
                  <div className="text-xs text-text-muted">ผู้ใช้</div>
                </div>
              </div>

              {/* Sub Categories */}
              <div className="mb-6 space-y-2">
                {category.subCategories.slice(0, 2).map((subCat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-surface-2/30 rounded-lg hover:bg-surface-2/50 transition-colors duration-200">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">{subCat.name}</div>
                      <div className="text-xs text-text-muted">{subCat.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors duration-200" />
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link to={`/category/${category.id}`}>
                  <FuturisticButton 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-accent-primary group-hover:text-bg-deep group-hover:border-accent-primary transition-all duration-300"
                    icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
                  >
                    ดูทั้งหมด
                  </FuturisticButton>
                </Link>
              </div>
            </FuturisticCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <FuturisticCard className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              พร้อมเริ่มต้นการเดินทางแล้วหรือยัง?
            </h3>
            <p className="text-text-secondary mb-6">
              ค้นพบโอกาสใหม่ๆ และพัฒนาตัวเองไปพร้อมกับเรา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FuturisticButton size="lg" icon={<Rocket className="w-5 h-5" />}>
                เริ่มต้นตอนนี้
              </FuturisticButton>
              <FuturisticButton variant="ghost" size="lg" icon={<Globe className="w-5 h-5" />}>
                เรียนรู้เพิ่มเติม
              </FuturisticButton>
            </div>
          </FuturisticCard>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

