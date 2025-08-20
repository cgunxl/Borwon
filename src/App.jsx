import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import AppsPage from './pages/AppsPage';
import ChannelsPage from './pages/ChannelsPage';
import FanpagesPage from './pages/FanpagesPage';
import ProductsPage from './pages/ProductsPage';
import NewsPage from './pages/NewsPage';
import AdvicePage from './pages/AdvicePage';
import LocationsPage from './pages/LocationsPage';
import MoneyPage from './pages/MoneyPage';
import NotFoundPage from './pages/NotFoundPage';

// Import global styles
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
      scrollElements.forEach(el => observer.observe(el));
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bwn-main-bg bwn-fluid-particles">
        <Helmet>
          <title>Bwn X - ศูนย์กลางแนะนำหลายภาษา</title>
          <meta name="description" content="รวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด Smart Travel, Investment, Gaming, Beauty, Crypto News และอื่นๆ" />
          <meta name="keywords" content="แอปท่องเที่ยว, การลงทุน, เกมเติมเงิน, สินค้าความงาม, ข่าวคริปโต, วิธีหาเงินออนไลน์, affiliate marketing, passive income" />
          <link rel="canonical" href="https://cgunxl.github.io/Borwon/" />
        </Helmet>

        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Apps Category */}
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/apps/travel-booking" element={<AppsPage category="travel" />} />
            <Route path="/apps/productivity" element={<AppsPage category="productivity" />} />
            <Route path="/apps/entertainment" element={<AppsPage category="entertainment" />} />
            
            {/* Channels Category */}
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/channels/investment-trading" element={<ChannelsPage category="investment" />} />
            <Route path="/channels/education" element={<ChannelsPage category="education" />} />
            <Route path="/channels/technology" element={<ChannelsPage category="technology" />} />
            
            {/* Fanpages Category */}
            <Route path="/fanpages" element={<FanpagesPage />} />
            <Route path="/fanpages/game-topup" element={<FanpagesPage category="gaming" />} />
            <Route path="/fanpages/entertainment" element={<FanpagesPage category="entertainment" />} />
            <Route path="/fanpages/lifestyle" element={<FanpagesPage category="lifestyle" />} />
            
            {/* Products Category */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/beauty-influencer" element={<ProductsPage category="beauty" />} />
            <Route path="/products/tech-gadgets" element={<ProductsPage category="tech" />} />
            <Route path="/products/home-living" element={<ProductsPage category="home" />} />
            
            {/* News Category */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/crypto-tech" element={<NewsPage category="crypto" />} />
            <Route path="/news/business" element={<NewsPage category="business" />} />
            <Route path="/news/technology" element={<NewsPage category="technology" />} />
            
            {/* Advice Category */}
            <Route path="/advice" element={<AdvicePage />} />
            <Route path="/advice/affiliate-business" element={<AdvicePage category="affiliate" />} />
            <Route path="/advice/online-business" element={<AdvicePage category="business" />} />
            <Route path="/advice/personal-development" element={<AdvicePage category="development" />} />
            
            {/* Locations Category */}
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/travel-gems" element={<LocationsPage category="travel" />} />
            <Route path="/locations/local-businesses" element={<LocationsPage category="local" />} />
            <Route path="/locations/hidden-spots" element={<LocationsPage category="hidden" />} />
            
            {/* Money Category */}
            <Route path="/money" element={<MoneyPage />} />
            <Route path="/money/passive-income" element={<MoneyPage category="passive" />} />
            <Route path="/money/investment-strategies" element={<MoneyPage category="investment" />} />
            <Route path="/money/side-hustles" element={<MoneyPage category="side-hustles" />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
