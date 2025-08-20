import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Waves, Globe, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bwn-ocean-bg bwn-fluid-particles overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Morphing Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bwn-morph-shape bg-gradient-to-br from-teal-500/10 to-cyan-500/10 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bwn-morph-shape bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-160 h-160 bwn-morph-shape bg-gradient-to-br from-cyan-500/3 to-teal-500/3 blur-3xl"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-bounce delay-1000">
          <div className="w-12 h-12 rounded-full bwn-surface-glass flex items-center justify-center">
            <Sparkles size={20} className="text-teal-400" />
          </div>
        </div>
        <div className="absolute top-32 right-32 animate-bounce delay-2000">
          <div className="w-10 h-10 rounded-full bwn-surface-glass flex items-center justify-center">
            <Star size={16} className="text-cyan-400" />
          </div>
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-3000">
          <div className="w-14 h-14 rounded-full bwn-surface-glass flex items-center justify-center">
            <Globe size={24} className="text-blue-400" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce delay-500">
          <div className="w-8 h-8 rounded-full bwn-surface-glass flex items-center justify-center">
            <Waves size={14} className="text-purple-400" />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="mb-8 bwn-scroll-reveal">
          <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 rounded-full bwn-surface-glass border border-white/20 backdrop-blur-xl bwn-deep-glow">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <Sparkles size={18} className="text-teal-400" />
            <span className="text-sm font-medium text-gray-300">ศูนย์กลางแนะนำหลายภาษา</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        {/* Main Heading */}
        <div className="mb-12 bwn-scroll-reveal">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
            <div className="relative inline-block">
              <span className="bwn-gradient-text">Bwn</span>
              <div className="absolute -inset-4 bwn-morph-shape bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-xl -z-10"></div>
            </div>
            <span className="text-gray-500 ml-2">X</span>
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed">
              ค้นพบ <span className="bwn-gradient-text font-semibold">แอป เครื่องมือ ช่องทาง</span> และ
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed">
              <span className="bwn-gradient-text font-semibold">โอกาสหาเงินออนไลน์</span> ที่ดีที่สุด
            </p>
            <p className="text-lg md:text-xl text-gray-400 mt-6">
              พร้อมคำแนะนำเชิงลึกและข้อมูลล่าสุดจากผู้เชี่ยวชาญ
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16 bwn-scroll-reveal">
          <Button 
            size="lg" 
            className="group px-10 py-6 text-xl font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:from-teal-400 hover:to-cyan-400 bwn-deep-glow bwn-smooth-transition rounded-2xl shadow-2xl"
          >
            <Zap size={24} className="mr-3 group-hover:rotate-12 transition-transform" />
            เริ่มสำรวจ
            <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-10 py-6 text-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 bwn-surface-glass bwn-smooth-transition rounded-2xl backdrop-blur-xl"
          >
            <Globe size={24} className="mr-3" />
            หมวดยอดนิยม
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto bwn-scroll-reveal">
          {[
            { number: '1000+', label: 'แอปและเครื่องมือ', icon: Sparkles },
            { number: '10', label: 'ภาษาที่รองรับ', icon: Globe },
            { number: '8', label: 'หมวดหมู่หลัก', icon: Star },
            { number: '24/7', label: 'อัปเดตข้อมูล', icon: Zap }
          ].map((stat, index) => (
            <div key={index} className="text-center group bwn-hover-lift">
              <div className="bwn-surface-glass rounded-2xl p-6 border border-white/10 bwn-smooth-transition">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                    <stat.icon size={24} className="text-teal-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold bwn-gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center bwn-surface-glass backdrop-blur-xl">
          <div className="w-1 h-4 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;

