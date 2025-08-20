import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import CategoryGrid from './components/sections/CategoryGrid';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const scrollElements = document.querySelectorAll('.bwn-scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bwn-main-bg bwn-fluid-particles">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Category Grid */}
          <CategoryGrid />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
