import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Star, 
  Zap,
  Play,
  Download,
  Globe
} from 'lucide-react';

const HeroSection = () => {
  // Statistics data
  const stats = [
    { icon: Users, value: '50K+', label: 'ผู้ใช้งาน', color: 'text-bwn-accent' },
    { icon: TrendingUp, value: '95%', label: 'ความพึงพอใจ', color: 'text-bwn-ocean-blue' },
    { icon: Star, value: '4.9', label: 'คะแนนรีวิว', color: 'text-bwn-accent-light' },
    { icon: Globe, value: '8', label: 'หมวดหมู่หลัก', color: 'text-bwn-ocean-light' }
  ];

  // Featured categories for quick access
  const featuredCategories = [
    {
      name: 'แอปท่องเที่ยว',
      path: '/apps/travel-booking',
      icon: '✈️',
      description: 'Agoda, Booking.com, Airbnb',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'การลงทุนคริปโต',
      path: '/channels/investment-trading',
      icon: '₿',
      description: 'Bitcoin, Ethereum, Trading',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'เกมเติมเงิน',
      path: '/fanpages/game-topup',
      icon: '🎮',
      description: 'Robux, Free Fire, PUBG',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bwn-deep-black via-bwn-dark-gray to-bwn-deep-black" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-bwn-accent/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Morphing Shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-bwn-accent/10 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-bwn-ocean-blue/10 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-bwn-accent-light/5 rounded-full blur-3xl animate-fluid" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 bwn-container text-center">
        <div className="max-w-6xl mx-auto">
          {/* Hero Title */}
          <div className="mb-8 bwn-scroll-reveal">
            <h1 className="bwn-hero-title mb-6">
              <span className="bwn-text-gradient">Bwn X</span>
              <br />
              <span className="text-bwn-white">ศูนย์กลางแนะนำหลายภาษา</span>
            </h1>
            
            <p className="bwn-hero-subtitle mb-8 max-w-3xl mx-auto leading-relaxed">
              ค้นพบแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด 
              ที่เราได้คัดสรรมาให้คุณแล้ว พร้อมคำแนะนำและรีวิวที่เชื่อถือได้
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/apps"
                className="bwn-button-primary group"
              >
                <span>เริ่มต้นตอนนี้</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/advice"
                className="bwn-button-secondary group"
              >
                <Play className="w-5 h-5 mr-2" />
                <span>ดูคำแนะนำ</span>
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 bwn-scroll-reveal">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-bwn-medium-gray rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-bwn-white/70 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Categories */}
          <div className="bwn-scroll-reveal">
            <h3 className="text-2xl font-bold text-bwn-white mb-8">
              หมวดหมู่ยอดนิยม
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {featuredCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.path}
                  className="group relative overflow-hidden rounded-2xl bg-bwn-dark-gray border border-bwn-medium-gray hover:border-bwn-accent transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h4 className="text-lg font-semibold text-bwn-white mb-2 group-hover:text-bwn-accent transition-colors duration-200">
                      {category.name}
                    </h4>
                    <p className="text-sm text-bwn-white/70 mb-4">
                      {category.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="flex items-center justify-center text-bwn-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-sm font-medium mr-2">ดูเพิ่มเติม</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 bwn-scroll-reveal">
            <div className="bg-bwn-dark-gray/50 backdrop-blur-sm rounded-2xl p-6 border border-bwn-medium-gray">
              <h4 className="text-lg font-semibold text-bwn-white mb-4">
                ทำไมต้องเชื่อถือเรา?
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-bwn-white/70">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-bwn-accent" />
                  <span>อัปเดตข้อมูลล่าสุดเสมอ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-bwn-ocean-blue" />
                  <span>รีวิวจากผู้ใช้จริง</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-bwn-accent-light" />
                  <span>คัดสรรเฉพาะของดี</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bwn-scroll-reveal">
        <div className="flex flex-col items-center text-bwn-white/60">
          <span className="text-sm mb-2">เลื่อนลง</span>
          <div className="w-6 h-10 border-2 border-bwn-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-bwn-accent rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

