import React from 'react';
import { Helmet } from 'react-helmet-async';
import FuturisticHero from '../components/ui/FuturisticHero';
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

      {/* Futuristic Hero Section */}
      <FuturisticHero />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Additional Home Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              ทำไมต้องเลือก Bwn X?
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">
              เราคือศูนย์กลางที่รวบรวมทุกอย่างที่คุณต้องการสำหรับการใช้งานดิจิทัลในยุคใหม่
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="card-futuristic p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">เร็วและมีประสิทธิภาพ</h3>
              <p className="text-text-secondary">
                เข้าถึงข้อมูลที่ต้องการได้อย่างรวดเร็วด้วยระบบที่ออกแบบมาเพื่อประสิทธิภาพสูงสุด
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-futuristic p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-aqua/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">ปลอดภัยและน่าเชื่อถือ</h3>
              <p className="text-text-secondary">
                ข้อมูลทั้งหมดได้รับการตรวจสอบและคัดสรรอย่างเข้มงวดเพื่อความปลอดภัยของผู้ใช้
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-futuristic p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">ครอบคลุมทั่วโลก</h3>
              <p className="text-text-secondary">
                รวบรวมข้อมูลจากทั่วโลกเพื่อให้คุณได้สัมผัสกับโอกาสและนวัตกรรมล่าสุด
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;