import React from 'react';
import { Link } from 'react-router-dom';
import FuturisticButton from './FuturisticButton';
import { ArrowRight, Play, Star, Zap, Globe, Shield } from 'lucide-react';

const FuturisticHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-waves" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent-aqua rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent-primary rounded-full animate-pulse opacity-80" />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-accent-ice rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent-aqua rounded-full animate-pulse opacity-70" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent-primary/10 border border-accent-primary/25 rounded-full px-4 py-2 text-accent-primary text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>ศูนย์กลางแนะนำหลายภาษา</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-text-primary">Explore.</span>
              <br />
              <span className="text-gradient">Build.</span>
              <br />
              <span className="text-text-primary">Accelerate.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Dark tech aesthetic with mint neon accents, animated waves, and crisp line animations. 
              Discover the future of digital experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <FuturisticButton 
                size="lg" 
                className="group"
                icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />}
              >
                Get Started
              </FuturisticButton>
              
              <FuturisticButton 
                variant="ghost" 
                size="lg"
                icon={<Play className="w-5 h-5" />}
              >
                Watch Demo
              </FuturisticButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-primary">500+</div>
                <div className="text-sm text-text-muted">แอปแนะนำ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-aqua">10K+</div>
                <div className="text-sm text-text-muted">ผู้ใช้งาน</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-primary">99%</div>
                <div className="text-sm text-text-muted">ความพึงพอใจ</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-accent-aqua/10 to-accent-primary/20 rounded-3xl blur-3xl animate-pulse" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-surface-1/90 to-bg-base/90 backdrop-blur-xl border border-stroke-soft/50 rounded-3xl p-8 shadow-2xl">
                {/* Animated Lines */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00FFC6" />
                        <stop offset="100%" stopColor="#66FFF5" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated Circuit Lines */}
                    <path
                      d="M50,100 Q200,50 350,100 M50,200 Q200,150 350,200 M50,300 Q200,250 350,300"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                      className="animate-dash-draw"
                    />
                    
                    {/* Floating Dots */}
                    <circle cx="100" cy="100" r="3" fill="#00FFC6" className="animate-pulse" />
                    <circle cx="300" cy="100" r="3" fill="#66FFF5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle cx="200" cy="200" r="3" fill="#00FFC6" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <circle cx="100" cy="300" r="3" fill="#66FFF5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                    <circle cx="300" cy="300" r="3" fill="#00FFC6" className="animate-pulse" style={{ animationDelay: '2s' }} />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-primary to-accent-aqua rounded-2xl flex items-center justify-center">
                    <Zap className="w-10 h-10 text-bg-deep" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-text-primary">
                    Futuristic UI
                  </h3>
                  
                  {/* Description */}
                  <p className="text-text-secondary">
                    Experience the next generation of web design with our cutting-edge components and animations.
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-accent-primary">
                      <Globe className="w-4 h-4" />
                      <span>Global</span>
                    </div>
                    <div className="flex items-center space-x-2 text-accent-aqua">
                      <Shield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-primary/20 rounded-2xl animate-float-up" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-aqua/20 rounded-2xl animate-float-up" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text-muted rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default FuturisticHero;