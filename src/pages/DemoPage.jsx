import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FuturisticButton from '../components/ui/FuturisticButton';
import FuturisticCard from '../components/ui/FuturisticCard';
import FuturisticInput from '../components/ui/FuturisticInput';
import { 
  Star, 
  Zap, 
  Globe, 
  Shield, 
  ArrowRight, 
  Play, 
  Mail, 
  Lock,
  User,
  Search,
  Settings,
  Bell
} from 'lucide-react';

const DemoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Futuristic Theme Demo - Bwn X</title>
        <meta name="description" content="Demo page showcasing the new futuristic dark theme with mint/teal accents and animated backgrounds" />
      </Helmet>

      <AnimatedBackground 
        showWaves={true}
        showScanLines={true}
        showParticles={true}
        className="min-h-screen pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Futuristic Theme
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Experience the next generation of web design with our cutting-edge dark theme, 
              mint/teal accents, and elegant micro-interactions.
            </p>
          </div>

          {/* Buttons Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Button Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FuturisticButton size="lg" className="w-full">
                Primary Button
              </FuturisticButton>
              
              <FuturisticButton variant="ghost" size="lg" className="w-full">
                Ghost Button
              </FuturisticButton>
              
              <FuturisticButton variant="outline" size="lg" className="w-full">
                Outline Button
              </FuturisticButton>
              
              <FuturisticButton variant="icon" size="lg" className="w-full">
                <Settings className="w-5 h-5" />
              </FuturisticButton>
            </div>
          </section>

          {/* Cards Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Card Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FuturisticCard>
                <FuturisticCard.Header>
                  <FuturisticCard.Title>Feature Card</FuturisticCard.Title>
                  <FuturisticCard.Subtitle>Amazing features</FuturisticCard.Subtitle>
                </FuturisticCard.Header>
                <FuturisticCard.Body>
                  <FuturisticCard.Description>
                    This card showcases the beautiful glass effect with neon edge glows and hover animations.
                  </FuturisticCard.Description>
                </FuturisticCard.Body>
                <FuturisticCard.Footer>
                  <FuturisticButton variant="ghost" size="sm">
                    Learn More
                  </FuturisticButton>
                </FuturisticCard.Footer>
              </FuturisticCard>

              <FuturisticCard>
                <FuturisticCard.Header>
                  <FuturisticCard.Title>Interactive Card</FuturisticCard.Title>
                  <FuturisticCard.Subtitle>Hover effects</FuturisticCard.Subtitle>
                </FuturisticCard.Header>
                <FuturisticCard.Body>
                  <FuturisticCard.Description>
                    Hover over this card to see the beautiful scale and glow effects in action.
                  </FuturisticCard.Description>
                </FuturisticCard.Body>
                <FuturisticCard.Footer>
                  <FuturisticButton variant="outline" size="sm">
                    Explore
                  </FuturisticButton>
                </FuturisticCard.Footer>
              </FuturisticCard>

              <FuturisticCard>
                <FuturisticCard.Header>
                  <FuturisticCard.Title>Icon Card</FuturisticCard.Title>
                  <FuturisticCard.Subtitle>With icons</FuturisticCard.Subtitle>
                </FuturisticCard.Header>
                <FuturisticCard.Body>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-accent-primary/20 rounded-2xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-accent-primary" />
                    </div>
                  </div>
                  <FuturisticCard.Description>
                    Cards can include beautiful icons and visual elements to enhance the user experience.
                  </FuturisticCard.Description>
                </FuturisticCard.Body>
              </FuturisticCard>
            </div>
          </section>

          {/* Form Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Form Components</h2>
            <div className="max-w-2xl mx-auto">
              <FuturisticCard>
                <FuturisticCard.Header>
                  <FuturisticCard.Title>Contact Form</FuturisticCard.Title>
                  <FuturisticCard.Subtitle>Beautiful form inputs</FuturisticCard.Subtitle>
                </FuturisticCard.Header>
                <FuturisticCard.Body>
                  <div className="space-y-6">
                    <FuturisticInput
                      label="Full Name"
                      name="name"
                      placeholder="Enter your full name"
                      icon={<User className="w-5 h-5" />}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    
                    <FuturisticInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      icon={<Mail className="w-5 h-5" />}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    
                    <FuturisticInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      icon={<Lock className="w-5 h-5" />}
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </FuturisticCard.Body>
                <FuturisticCard.Footer>
                  <div className="flex gap-4">
                    <FuturisticButton>
                      Submit Form
                    </FuturisticButton>
                    <FuturisticButton variant="ghost">
                      Reset
                    </FuturisticButton>
                  </div>
                </FuturisticCard.Footer>
              </FuturisticCard>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-bg-deep rounded-xl mx-auto mb-2 border border-stroke-soft"></div>
                <p className="text-sm text-text-muted">bg-deep</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-bg-base rounded-xl mx-auto mb-2 border border-stroke-soft"></div>
                <p className="text-sm text-text-muted">bg-base</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-surface-1 rounded-xl mx-auto mb-2 border border-stroke-soft"></div>
                <p className="text-sm text-text-muted">surface-1</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-primary rounded-xl mx-auto mb-2 border border-stroke-soft"></div>
                <p className="text-sm text-text-muted">accent-primary</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-aqua rounded-xl mx-auto mb-2 border border-stroke-soft"></div>
                <p className="text-sm text-text-muted">accent-aqua</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-text-primary rounded-xl mx-auto mb-2 border border-stroke-soft"></div>
                <p className="text-sm text-text-muted">text-primary</p>
              </div>
            </div>
          </section>

          {/* Animation Showcase */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Animation Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-accent-primary/20 rounded-2xl mx-auto mb-4 animate-float-up flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <p className="text-text-secondary">Float Up Animation</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-accent-aqua/20 rounded-2xl mx-auto mb-4 animate-pulse-glow flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                <p className="text-text-secondary">Pulse Glow Animation</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-accent-primary/20 rounded-2xl mx-auto mb-4 animate-wave-shift flex items-center justify-center">
                  <span className="text-4xl">🌊</span>
                </div>
                <p className="text-text-secondary">Wave Shift Animation</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-20">
            <FuturisticCard className="p-12">
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Join us in creating the next generation of digital experiences with our futuristic theme.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FuturisticButton size="lg" icon={<ArrowRight className="w-6 h-6" />}>
                  Get Started
                </FuturisticButton>
                <FuturisticButton variant="ghost" size="lg" icon={<Play className="w-6 h-6" />}>
                  Watch Demo
                </FuturisticButton>
              </div>
            </FuturisticCard>
          </section>
        </div>
      </AnimatedBackground>
    </>
  );
};

export default DemoPage;