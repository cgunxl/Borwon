import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FuturisticCard from '../components/ui/FuturisticCard';
import FuturisticButton from '../components/ui/FuturisticButton';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Clock, 
  ExternalLink,
  TrendingUp,
  Sparkles,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

const CategoryPage = ({ category = 'apps' }) => {
  const { category: urlCategory } = useParams();
  const currentCategory = urlCategory || category;

  // Category data mapping
  const categoryData = {
    apps: {
      title: 'แอปและเครื่องมือ',
      description: 'รวมแอปและเครื่องมือที่ใช้งานง่าย มีประโยชน์ และช่วยให้ชีวิตดีขึ้น',
      icon: '📱',
      color: 'from-accent-primary to-accent-aqua',
      items: [
        {
          name: 'Agoda - จองโรงแรม',
          description: 'แอปจองโรงแรมที่ดีที่สุดในเอเชีย ราคาถูก โรงแรมคุณภาพ',
          rating: 4.8,
          users: '50M+',
          category: 'แอปท่องเที่ยว',
          link: 'https://agoda.com',
          features: ['จองโรงแรม', 'ราคาถูก', 'รีวิวจริง']
        },
        {
          name: 'Booking.com',
          description: 'จองโรงแรมทั่วโลก ราคาพิเศษ และโปรโมชั่นมากมาย',
          rating: 4.7,
          users: '100M+',
          category: 'แอปท่องเที่ยว',
          link: 'https://booking.com',
          features: ['โรงแรมทั่วโลก', 'โปรโมชั่น', 'การยกเลิกฟรี']
        },
        {
          name: 'Airbnb',
          description: 'จองที่พักแบบท้องถิ่น โรงแรม และประสบการณ์พิเศษ',
          rating: 4.6,
          users: '150M+',
          category: 'แอปท่องเที่ยว',
          link: 'https://airbnb.com',
          features: ['ที่พักท้องถิ่น', 'ประสบการณ์พิเศษ', 'ราคาเป็นมิตร']
        }
      ]
    },
    channels: {
      title: 'ช่องทางการลงทุน',
      description: 'ช่องทางการลงทุนที่ปลอดภัย มีความน่าเชื่อถือ และให้ผลตอบแทนที่ดี',
      icon: '📺',
      color: 'from-accent-aqua to-accent-primary',
      items: [
        {
          name: 'Binance',
          description: 'แพลตฟอร์มซื้อขายคริปโตที่ใหญ่ที่สุดในโลก',
          rating: 4.9,
          users: '200M+',
          category: 'การลงทุนคริปโต',
          link: 'https://binance.com',
          features: ['คริปโต', 'Staking', 'NFT']
        },
        {
          name: 'Coinbase',
          description: 'แพลตฟอร์มซื้อขายคริปโตที่ปลอดภัยและใช้งานง่าย',
          rating: 4.8,
          users: '100M+',
          category: 'การลงทุนคริปโต',
          link: 'https://coinbase.com',
          features: ['ปลอดภัย', 'ใช้งานง่าย', 'การสนับสนุนดี']
        }
      ]
    },
    fanpages: {
      title: 'เพจแนะนำ',
      description: 'เพจแนะนำที่ให้ข้อมูลที่เป็นประโยชน์ มีความน่าเชื่อถือ และอัปเดตสม่ำเสมอ',
      icon: '📘',
      color: 'from-accent-primary to-accent-aqua',
      items: [
        {
          name: 'Game Top-up Fanpage',
          description: 'เพจแนะนำเกมเติมเงินที่ดีที่สุด ราคาถูก และโปรโมชั่นมากมาย',
          rating: 4.7,
          users: '15K+',
          category: 'เกมเติมเงิน',
          link: '#',
          features: ['เกมเติมเงิน', 'ราคาถูก', 'โปรโมชั่น']
        }
      ]
    }
  };

  const data = categoryData[currentCategory] || categoryData.apps;

  return (
    <>
      <Helmet>
        <title>{data.title} - Bwn X</title>
        <meta name="description" content={data.description} />
      </Helmet>

      <AnimatedBackground 
        showWaves={true}
        showScanLines={true}
        showParticles={true}
        className="min-h-screen pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-accent-primary/10 border border-accent-primary/25 rounded-full px-4 py-2 text-accent-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>หมวดหมู่</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
              <span className="text-gradient">{data.title}</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              {data.description}
            </p>

            {/* Category Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-primary">{data.items.length}+</div>
                <div className="text-sm text-text-muted">รายการ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-aqua">4.8</div>
                <div className="text-sm text-text-muted">คะแนนเฉลี่ย</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-primary">100K+</div>
                <div className="text-sm text-text-muted">ผู้ใช้งาน</div>
              </div>
            </div>
          </section>

          {/* Items Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.items.map((item, index) => (
                <FuturisticCard 
                  key={index}
                  className="group hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Item Header */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${data.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-4xl">{data.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {item.features.map((feature, idx) => (
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
                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                      <div className="text-lg font-bold text-accent-primary">{item.rating}</div>
                      <div className="text-xs text-text-muted">คะแนน</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent-aqua">{item.users}</div>
                      <div className="text-xs text-text-muted">ผู้ใช้</div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-6 text-center">
                    <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs rounded-full border border-accent-primary/25">
                      {item.category}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <FuturisticButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-accent-primary group-hover:text-bg-deep group-hover:border-accent-primary transition-all duration-300"
                      icon={<ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      ไปยังเว็บไซต์
                    </FuturisticButton>
                  </div>
                </FuturisticCard>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="text-center mb-20">
            <FuturisticCard className="p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                พร้อมเริ่มต้นการใช้งานแล้วหรือยัง?
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                ค้นพบเครื่องมือและบริการที่ดีที่สุดที่เราได้คัดสรรมาให้คุณ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FuturisticButton size="lg" icon={<Zap className="w-6 h-6" />}>
                  เริ่มต้นตอนนี้
                </FuturisticButton>
                <FuturisticButton variant="ghost" size="lg" icon={<Globe className="w-6 h-6" />}>
                  ดูหมวดหมู่อื่นๆ
                </FuturisticButton>
              </div>
            </FuturisticCard>
          </section>
        </div>
      </AnimatedBackground>
    </>
  );
};

export default CategoryPage;