import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import CategoryGrid from '../components/sections/CategoryGrid';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Bwn X - ศูนย์กลางแนะนำหลายภาษา | แอป ท่องเที่ยว การลงทุน เกม ฯลฯ</title>
        <meta name="description" content="รวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด Smart Travel, Investment, Gaming, Beauty, Crypto News และอื่นๆ" />
        <meta name="keywords" content="แอปท่องเที่ยว, การลงทุน, เกมเติมเงิน, สินค้าความงาม, ข่าวคริปโต, วิธีหาเงินออนไลน์, affiliate marketing, passive income" />
        <meta property="og:title" content="Bwn X - ศูนย์กลางแนะนำหลายภาษา | แอป ท่องเที่ยว การลงทุน เกม ฯลฯ" />
        <meta property="og:description" content="รวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด Smart Travel, Investment, Gaming, Beauty, Crypto News และอื่นๆ" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cgunxl.github.io/Borwon/" />
        <meta property="og:image" content="https://cgunxl.github.io/Borwon/mascot_ai_master.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bwn X - ศูนย์กลางแนะนำหลายภาษา | แอป ท่องเที่ยว การลงทุน เกม ฯลฯ" />
        <meta name="twitter:description" content="รวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด Smart Travel, Investment, Gaming, Beauty, Crypto News และอื่นๆ" />
        <meta name="twitter:image" content="https://cgunxl.github.io/Borwon/mascot_ai_master.png" />
        <link rel="canonical" href="https://cgunxl.github.io/Borwon/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Bwn X - ศูนย์กลางแนะนำหลายภาษา",
          "description": "รวมแอป เครื่องมือ ช่องทาง และโอกาสหาเงินออนไลน์ที่ดีที่สุด Smart Travel, Investment, Gaming, Beauty, Crypto News และอื่นๆ",
          "url": "https://cgunxl.github.io/Borwon/",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Smart Travel & Booking",
                "url": "https://cgunxl.github.io/Borwon/apps/travel-booking"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Investment & Trading Channels",
                "url": "https://cgunxl.github.io/Borwon/channels/investment-trading"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Game Top-up Deals",
                "url": "https://cgunxl.github.io/Borwon/fanpages/game-topup"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Beauty & Influencer Products",
                "url": "https://cgunxl.github.io/Borwon/products/beauty-influencer"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Crypto & Tech News",
                "url": "https://cgunxl.github.io/Borwon/news/crypto-tech"
              },
              {
                "@type": "ListItem",
                "position": 6,
                "name": "Affiliate Business Tips",
                "url": "https://cgunxl.github.io/Borwon/advice/affiliate-business"
              },
              {
                "@type": "ListItem",
                "position": 7,
                "name": "Travel Destinations",
                "url": "https://cgunxl.github.io/Borwon/locations/travel-gems"
              },
              {
                "@type": "ListItem",
                "position": 8,
                "name": "Passive Income & Automation",
                "url": "https://cgunxl.github.io/Borwon/money/passive-income"
              }
            ]
          }
        })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Additional Home Content */}
      <section className="bwn-section">
        <div className="bwn-container">
          <div className="text-center bwn-scroll-reveal">
            <h2 className="bwn-hero-title bwn-text-gradient mb-6">
              ทำไมต้องเลือก Bwn X?
            </h2>
            <p className="bwn-hero-subtitle mb-12 max-w-3xl mx-auto">
              เรารวบรวมทุกอย่างที่คุณต้องการในที่เดียว เพื่อให้คุณได้ประโยชน์สูงสุดจากโลกออนไลน์
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="bwn-card text-center bwn-scroll-reveal">
              <div className="w-16 h-16 bg-bwn-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bwn-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">เร็วและแม่นยำ</h3>
              <p className="text-bwn-white text-opacity-80">
                อัปเดตข้อมูลล่าสุดเสมอ ให้คุณได้ข้อมูลที่ถูกต้องและทันสมัยที่สุด
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bwn-card text-center bwn-scroll-reveal">
              <div className="w-16 h-16 bg-bwn-ocean-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bwn-ocean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">ปลอดภัยและเชื่อถือได้</h3>
              <p className="text-bwn-white text-opacity-80">
                ทุกลิงก์และข้อมูลได้รับการตรวจสอบแล้ว ปลอดภัยสำหรับการใช้งาน
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bwn-card text-center bwn-scroll-reveal">
              <div className="w-16 h-16 bg-bwn-accent-light bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bwn-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">ชุมชนที่แข็งแกร่ง</h3>
              <p className="text-bwn-white text-opacity-80">
                เข้าร่วมชุมชนผู้ใช้ที่กำลังเติบโต แชร์ประสบการณ์และเรียนรู้ร่วมกัน
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bwn-section bg-gradient-to-r from-bwn-accent to-bwn-ocean-blue">
        <div className="bwn-container text-center">
          <div className="bwn-scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-bwn-deep-black mb-6">
              พร้อมเริ่มต้นการเดินทางแล้วหรือยัง?
            </h2>
            <p className="text-lg text-bwn-deep-black text-opacity-90 mb-8 max-w-2xl mx-auto">
              ค้นพบโอกาสใหม่ๆ และพัฒนาตัวเองไปพร้อมกับเรา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/apps" 
                className="bwn-button bg-bwn-deep-black text-bwn-accent hover:bg-bwn-dark-gray hover:text-bwn-accent-light"
              >
                เริ่มต้นตอนนี้
              </a>
              <a 
                href="/advice" 
                className="bwn-button border-2 border-bwn-deep-black text-bwn-deep-black hover:bg-bwn-deep-black hover:text-bwn-accent"
              >
                เรียนรู้เพิ่มเติม
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;