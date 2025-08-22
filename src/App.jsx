import { useState } from 'react';
import './index.css';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="background-container">
        <img 
          src="/background.jpeg" 
          alt="Flowing Liquid Background" 
          className="background-image"
        />
      </div>

      <div className="container">
        <header className="header">
          <div className="logo-container">
            <div className="logo">
              <img 
                src="/logo.png" 
                alt="BwnX Tech Logo" 
                className="logo-image"
                width="40" 
                height="40"
              />
            </div>
            <div>
              <div className="logo-text">BwnX Platform</div>
              <div className="logo-subtitle">Deep Ocean Recommendations</div>
            </div>
          </div>
          
          <nav className="nav">
            <div className="nav-item">Categories</div>
            <div className="nav-item">Trending</div>
            <div className="nav-item">About</div>
            <div className="nav-item">🇹🇭 ไทย</div>
          </nav>

          <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
            ☰
          </button>
        </header>

        <main className="main">
          <section className="hero">
            <h1 className="hero-title">BwnX Platform</h1>
            <p className="hero-subtitle">Deep Ocean Recommendations for Life, Money & Lifestyle</p>
            <p className="hero-description">
              AI-powered recommendation system that provides personalized suggestions for apps, tools,<br/>
              finance, lifestyle, and more. Discover what you need with deep personalization.
            </p>
            
            <div className="search-container">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for apps, tools, finance..."
              />
              <button className="search-button">🔍</button>
            </div>

            <div className="hero-buttons">
              <button className="button button-primary">⚡ Get Started</button>
              <button className="button button-secondary">Learn More</button>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Total Recommendations</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-number">10</div>
                <div className="stat-label">Languages Supported</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-number">8</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-number">24/7</div>
                <div className="stat-label">Daily Updates</div>
              </div>
            </div>

            <div className="value-text">
              ความคุ้มค่ารายเซอร์
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">📱 Apps & Websites</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">✈️</div>
                  <div className="category-count">200+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Smart Travel & Booking</h3>
                <p className="category-description">
                  แอปท่องเที่ยว & จองที่พัก - แอปพลิเคชันสำหรับการเดินทางและการจองที่พักอัจฉริยะ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Travel Apps</div>
                  <div className="category-tag">Booking</div>
                  <div className="category-tag">Hotels</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💼</div>
                  <div className="category-count">150+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Career & Freelance Hub</h3>
                <p className="category-description">
                  แอปหางาน & ฟรีแลนซ์ - แพลตฟอร์มสำหรับการหางานและงานฟรีแลนซ์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Job Search</div>
                  <div className="category-tag">Freelance</div>
                  <div className="category-tag">Career</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🤖</div>
                  <div className="category-count">180+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">AI Tools & Finance Apps</h3>
                <p className="category-description">
                  เครื่องมือ AI & แอปการเงิน - เครื่องมือปัญญาประดิษฐ์และแอปพลิเคชันการเงิน
                </p>
                <div className="category-tags">
                  <div className="category-tag">AI Tools</div>
                  <div className="category-tag">Finance</div>
                  <div className="category-tag">Automation</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">📱</div>
                  <div className="category-count">120+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Social & Lifestyle Connect</h3>
                <p className="category-description">
                  แอปโซเชียล & ไลฟ์สไตล์ - แอปพลิเคชันสำหรับการเชื่อมต่อสังคมและไลฟ์สไตล์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Social Media</div>
                  <div className="category-tag">Lifestyle</div>
                  <div className="category-tag">Communication</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🛒</div>
                  <div className="category-count">160+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">E-commerce & Shopping Apps</h3>
                <p className="category-description">
                  แอปช้อปปิ้ง & อีคอมเมิร์ซ - แอปพลิเคชันสำหรับการช้อปปิ้งและการค้าออนไลน์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Shopping</div>
                  <div className="category-tag">E-commerce</div>
                  <div className="category-tag">Deals</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🔒</div>
                  <div className="category-count">90+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Safe Web & VPN Solutions</h3>
                <p className="category-description">
                  เว็บปลอดภัย & VPN - เครื่องมือสำหรับการรักษาความปลอดภัยออนไลน์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Security</div>
                  <div className="category-tag">VPN</div>
                  <div className="category-tag">Privacy</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💵</div>
                  <div className="category-count">140+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Affiliate & Money-Making Apps</h3>
                <p className="category-description">
                  แอปหาเงิน & แอฟฟิลิเอต - แอปพลิเคชันสำหรับการหาเงินและการตลาดแบบแอฟฟิลิเอต
                </p>
                <div className="category-tags">
                  <div className="category-tag">Money Making</div>
                  <div className="category-tag">Affiliate</div>
                  <div className="category-tag">Passive Income</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">🎥 Channels</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">📊</div>
                  <div className="category-count">150+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Investment & Trading Channels</h3>
                <p className="category-description">
                  ช่องลงทุน & เทรดดิ้ง - ช่องที่สอนการลงทุนและการเทรดดิ้งอย่างมืออาชีพ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Investment</div>
                  <div className="category-tag">Trading</div>
                  <div className="category-tag">Finance</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">📚</div>
                  <div className="category-count">120+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Knowledge & Deep-Dive Learning</h3>
                <p className="category-description">
                  ช่องความรู้ & การเรียนรู้เชิงลึก - ช่องที่ให้ความรู้และการเรียนรู้อย่างลึกซึ้ง
                </p>
                <div className="category-tags">
                  <div className="category-tag">Education</div>
                  <div className="category-tag">Learning</div>
                  <div className="category-tag">Knowledge</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🎙️</div>
                  <div className="category-count">110+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Podcasts & Expert Talks</h3>
                <p className="category-description">
                  พอดแคสต์ & การสนทนาผู้เชี่ยวชาญ - ช่องพอดแคสต์และการสนทนากับผู้เชี่ยวชาญ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Podcasts</div>
                  <div className="category-tag">Expert Talks</div>
                  <div className="category-tag">Interviews</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🎬</div>
                  <div className="category-count">130+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Entertainment & Lifestyle Media</h3>
                <p className="category-description">
                  ช่องบันเทิง & ไลฟ์สไตล์ - ช่องที่ให้ความบันเทิงและเนื้อหาไลฟ์สไตล์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Entertainment</div>
                  <div className="category-tag">Lifestyle</div>
                  <div className="category-tag">Media</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🛍️</div>
                  <div className="category-count">100+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">E-commerce & Product Review</h3>
                <p className="category-description">
                  ช่องอีคอมเมิร์ซ & รีวิวสินค้า - ช่องที่รีวิวสินค้าและสอนการขายออนไลน์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Product Review</div>
                  <div className="category-tag">E-commerce</div>
                  <div className="category-tag">Shopping Guide</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🎮</div>
                  <div className="category-count">95+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Gaming Deals & Tutorials</h3>
                <p className="category-description">
                  ช่องเกม & ดีลเกม - ช่องที่แนะนำเกมและดีลเกมที่คุ้มค่า
                </p>
                <div className="category-tags">
                  <div className="category-tag">Gaming</div>
                  <div className="category-tag">Game Deals</div>
                  <div className="category-tag">Tutorials</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🔗</div>
                  <div className="category-count">85+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Affiliate & Passive Income Channels</h3>
                <p className="category-description">
                  ช่องแอฟฟิลิเอต & รายได้แบบพาสซีฟ - ช่องที่สอนการสร้างรายได้แบบพาสซีฟ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Affiliate Marketing</div>
                  <div className="category-tag">Passive Income</div>
                  <div className="category-tag">Online Business</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">📘 Fanpages</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🎮</div>
                  <div className="category-count">80+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Best Game Top-up Deals</h3>
                <p className="category-description">
                  เพจเติมเกมราคาถูก & คุ้มค่า - เพจที่รวมดีลเติมเกมและโปรโมชั่นพิเศษ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Game Top-up</div>
                  <div className="category-tag">Gaming Deals</div>
                  <div className="category-tag">Discounts</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💎</div>
                  <div className="category-count">60+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Robux & Game Currency Guides</h3>
                <p className="category-description">
                  แหล่งโรบัค + สอนวิธีซื้อ/ฝากซื้อ - คู่มือและแหล่งซื้อสกุลเงินในเกม
                </p>
                <div className="category-tags">
                  <div className="category-tag">Robux</div>
                  <div className="category-tag">Game Currency</div>
                  <div className="category-tag">Guides</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🛍️</div>
                  <div className="category-count">90+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Product Recommendation Pages</h3>
                <p className="category-description">
                  เพจแนะนำสินค้า & ดีล - เพจที่รวบรวมสินค้าดีและโปรโมชั่นพิเศษ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Product Reviews</div>
                  <div className="category-tag">Deals</div>
                  <div className="category-tag">Recommendations</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💵</div>
                  <div className="category-count">70+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Affiliate & Earning Fanpages</h3>
                <p className="category-description">
                  เพจหาเงินจาก Affiliate & ออนไลน์ - เพจที่สอนวิธีหาเงินออนไลน์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Affiliate Marketing</div>
                  <div className="category-tag">Online Earning</div>
                  <div className="category-tag">Side Hustle</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">🛍️ Products</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💄</div>
                  <div className="category-count">200+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Influencer Picks & Beauty</h3>
                <p className="category-description">
                  สินค้าคนดัง & ครีมบำรุง - สินค้าความงามและครีมบำรุงที่คนดังแนะนำ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Beauty Products</div>
                  <div className="category-tag">Skincare</div>
                  <div className="category-tag">Influencer Picks</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🍀</div>
                  <div className="category-count">150+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Health & Wellness Products</h3>
                <p className="category-description">
                  สุขภาพ & อาหารเสริม - ผลิตภัณฑ์เสริมอาหารและสินค้าเพื่อสุขภาพ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Health Products</div>
                  <div className="category-tag">Supplements</div>
                  <div className="category-tag">Wellness</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">⚡</div>
                  <div className="category-count">180+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Smart Living & Gadgets</h3>
                <p className="category-description">
                  ของใช้ทั่วไป & เครื่องอำนวยความสะดวก - สินค้าเทคโนโลยีและของใช้ในบ้าน
                </p>
                <div className="category-tags">
                  <div className="category-tag">Smart Home</div>
                  <div className="category-tag">Gadgets</div>
                  <div className="category-tag">Tech Products</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">👕</div>
                  <div className="category-count">160+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Fashion & Outfit Ideas</h3>
                <p className="category-description">
                  เสื้อผ้า & Outfit - แฟชั่นและไอเดียการแต่งตัวสำหรับทุกโอกาส
                </p>
                <div className="category-tags">
                  <div className="category-tag">Fashion</div>
                  <div className="category-tag">Clothing</div>
                  <div className="category-tag">Style Guide</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💍</div>
                  <div className="category-count">120+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Jewelry & Luxury Items</h3>
                <p className="category-description">
                  สร้อยคอ & เครื่องประดับ - เครื่องประดับและสินค้าหรูหราคุณภาพสูง
                </p>
                <div className="category-tags">
                  <div className="category-tag">Jewelry</div>
                  <div className="category-tag">Luxury</div>
                  <div className="category-tag">Accessories</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🎁</div>
                  <div className="category-count">100+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Lucky Draw & Deals</h3>
                <p className="category-description">
                  สินค้าเสี่ยงโชค & ดีลพิเศษ - สินค้าลอตเตอรี่และโปรโมชั่นพิเศษ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Lucky Draw</div>
                  <div className="category-tag">Special Deals</div>
                  <div className="category-tag">Promotions</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🛒</div>
                  <div className="category-count">250+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Affiliate Products Marketplace</h3>
                <p className="category-description">
                  สินค้า Affiliate จาก Shopee, Amazon, Lazada ฯลฯ - ตลาดกลางสินค้าแอฟฟิลิเอต
                </p>
                <div className="category-tags">
                  <div className="category-tag">Affiliate Products</div>
                  <div className="category-tag">Marketplace</div>
                  <div className="category-tag">E-commerce</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">📰 News</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🌍</div>
                  <div className="category-count">300+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">World & Global News</h3>
                <p className="category-description">
                  ข่าวโลก & ข่าวต่างประเทศ - ข่าวสารจากทั่วโลกและเหตุการณ์สำคัญ
                </p>
                <div className="category-tags">
                  <div className="category-tag">World News</div>
                  <div className="category-tag">International</div>
                  <div className="category-tag">Global Events</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🏞️</div>
                  <div className="category-count">200+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Thai & Local News</h3>
                <p className="category-description">
                  ข่าวไทย - ข่าวสารในประเทศและเหตุการณ์สำคัญในท้องถิ่น
                </p>
                <div className="category-tags">
                  <div className="category-tag">Thai News</div>
                  <div className="category-tag">Local News</div>
                  <div className="category-tag">Thailand</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💹</div>
                  <div className="category-count">180+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Finance & Market Insights</h3>
                <p className="category-description">
                  ข่าวการเงิน & เศรษฐกิจ - ข่าวตลาดการเงินและการลงทุน
                </p>
                <div className="category-tags">
                  <div className="category-tag">Finance News</div>
                  <div className="category-tag">Market Analysis</div>
                  <div className="category-tag">Economy</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">⚽</div>
                  <div className="category-count">150+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Sports & Football Updates</h3>
                <p className="category-description">
                  ข่าวกีฬา & ฟุตบอล - ข่าวกีฬาและผลการแข่งขันล่าสุด
                </p>
                <div className="category-tags">
                  <div className="category-tag">Sports News</div>
                  <div className="category-tag">Football</div>
                  <div className="category-tag">Match Results</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🩺</div>
                  <div className="category-count">120+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Health & Wellness News</h3>
                <p className="category-description">
                  ข่าวสุขภาพ & โรค - ข่าวสารด้านสุขภาพและการดูแลตนเอง
                </p>
                <div className="category-tags">
                  <div className="category-tag">Health News</div>
                  <div className="category-tag">Medical</div>
                  <div className="category-tag">Wellness</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">₿</div>
                  <div className="category-count">100+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Crypto & Tech News</h3>
                <p className="category-description">
                  ข่าวคริปโต & เทคโนโลยี - ข่าวสารด้านเทคโนโลยีและสกุลเงินดิจิทัล
                </p>
                <div className="category-tags">
                  <div className="category-tag">Crypto News</div>
                  <div className="category-tag">Technology</div>
                  <div className="category-tag">Blockchain</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">💡 Advice</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💰</div>
                  <div className="category-count">120+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Money & Tax Insights</h3>
                <p className="category-description">
                  การจัดการการเงิน & ภาษี - คำแนะนำการวางแผนการเงินและภาษี
                </p>
                <div className="category-tags">
                  <div className="category-tag">Financial Planning</div>
                  <div className="category-tag">Tax Tips</div>
                  <div className="category-tag">Money Management</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🏡</div>
                  <div className="category-count">100+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Smart Living & Home Design</h3>
                <p className="category-description">
                  การแต่งบ้าน & ห้อง - ไอเดียการตกแต่งและจัดพื้นที่อยู่อาศัย
                </p>
                <div className="category-tags">
                  <div className="category-tag">Home Design</div>
                  <div className="category-tag">Interior</div>
                  <div className="category-tag">Smart Living</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🚗</div>
                  <div className="category-count">80+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Auto & Lifestyle Tips</h3>
                <p className="category-description">
                  แต่งรถ & ไลฟ์สไตล์ - คำแนะนำการดูแลรถยนต์และไลฟ์สไตล์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Car Care</div>
                  <div className="category-tag">Auto Tips</div>
                  <div className="category-tag">Lifestyle</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">📈</div>
                  <div className="category-count">90+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Career Growth & Skill Building</h3>
                <p className="category-description">
                  คำแนะนำพัฒนาทักษะ & งาน - แนวทางการพัฒนาอาชีพและทักษะ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Career Development</div>
                  <div className="category-tag">Skill Building</div>
                  <div className="category-tag">Professional Growth</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🔗</div>
                  <div className="category-count">70+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Affiliate & Online Business Tips</h3>
                <p className="category-description">
                  คำแนะนำทำ Affiliate & ออนไลน์ - เทคนิคการทำธุรกิจออนไลน์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Affiliate Marketing</div>
                  <div className="category-tag">Online Business</div>
                  <div className="category-tag">Digital Marketing</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">📍 Location</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">☕</div>
                  <div className="category-count">150+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Cafes & Hot Spots</h3>
                <p className="category-description">
                  คาเฟ่ & สถานที่น่าไป - คาเฟ่และสถานที่ยอดนิยมที่น่าเยี่ยมชม
                </p>
                <div className="category-tags">
                  <div className="category-tag">Cafes</div>
                  <div className="category-tag">Hot Spots</div>
                  <div className="category-tag">Hangout Places</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🛒</div>
                  <div className="category-count">100+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Local Goods & OTOP Guide</h3>
                <p className="category-description">
                  สินค้า OTOP & ของดีจังหวัด - สินค้าท้องถิ่นและของฝากจากทุกจังหวัด
                </p>
                <div className="category-tags">
                  <div className="category-tag">OTOP Products</div>
                  <div className="category-tag">Local Goods</div>
                  <div className="category-tag">Souvenirs</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🏞️</div>
                  <div className="category-count">200+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Travel Destinations & Hidden Gems</h3>
                <p className="category-description">
                  สถานที่ท่องเที่ยว & จุดลับ - สถานที่ท่องเที่ยวและจุดลับที่น่าสำรวจ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Travel Destinations</div>
                  <div className="category-tag">Hidden Gems</div>
                  <div className="category-tag">Tourism</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="categories-section">
            <h2 className="section-title">💸 How to Make Money</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🛍️</div>
                  <div className="category-count">120+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Online Business & E-commerce</h3>
                <p className="category-description">
                  ช่องทางธุรกิจออนไลน์ & E-commerce - วิธีการสร้างธุรกิจออนไลน์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Online Business</div>
                  <div className="category-tag">E-commerce</div>
                  <div className="category-tag">Digital Store</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🔗</div>
                  <div className="category-count">100+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Affiliate Marketing & Partnerships</h3>
                <p className="category-description">
                  การทำ Affiliate & พาร์ทเนอร์ - วิธีการหาเงินจากการตลาดแบบแอฟฟิลิเอต
                </p>
                <div className="category-tags">
                  <div className="category-tag">Affiliate Marketing</div>
                  <div className="category-tag">Partnerships</div>
                  <div className="category-tag">Commission</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">₿</div>
                  <div className="category-count">80+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Crypto, Stock & Trading Income</h3>
                <p className="category-description">
                  หุ้น, คริปโต & การเทรด - วิธีการลงทุนและเทรดดิ้งเพื่อสร้างรายได้
                </p>
                <div className="category-tags">
                  <div className="category-tag">Crypto Trading</div>
                  <div className="category-tag">Stock Investment</div>
                  <div className="category-tag">Trading</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">💼</div>
                  <div className="category-count">90+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Side Hustles & Freelance Work</h3>
                <p className="category-description">
                  งานเสริม & ฟรีแลนซ์ - โอกาสงานเสริมและการทำงานฟรีแลนซ์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Side Hustles</div>
                  <div className="category-tag">Freelance</div>
                  <div className="category-tag">Part-time Work</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🌱</div>
                  <div className="category-count">70+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Passive Income & Automation</h3>
                <p className="category-description">
                  รายได้เสริม & การทำเงินอัตโนมัติ - วิธีสร้างรายได้แบบพาสซีฟ
                </p>
                <div className="category-tags">
                  <div className="category-tag">Passive Income</div>
                  <div className="category-tag">Automation</div>
                  <div className="category-tag">Investment</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-header">
                  <div className="category-icon">🎥</div>
                  <div className="category-count">60+ <span className="category-count-dot"></span></div>
                </div>
                <h3 className="category-title">Content Creation & Monetization</h3>
                <p className="category-description">
                  ทำคอนเทนต์ & สร้างรายได้ - วิธีการสร้างคอนเทนต์และหาเงินจากคอนเทนต์
                </p>
                <div className="category-tags">
                  <div className="category-tag">Content Creation</div>
                  <div className="category-tag">Monetization</div>
                  <div className="category-tag">Creator Economy</div>
                </div>
                <div className="category-link">
                  สำรวจ <span className="category-link-icon">→</span>
                </div>
              </div>
            </div>
          </section>

          <section className="newsletter-section">
            <div className="newsletter-container">
              <h2 className="newsletter-title">รับข้อมูลล่าสุด</h2>
              <p className="newsletter-description">สมัครรับข่าวสารและคำแนะนำใหม่ๆ ส่งตรงถึงอีเมลของคุณ</p>
              
              <div className="newsletter-form">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="อีเมลของคุณ" 
                />
                <button className="newsletter-button">สมัคร</button>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-copyright">
              © 2024 BwnX Platform. สร้างด้วย ❤️ ในประเทศไทย
            </div>
            
            <div className="footer-links">
              <a href="#" className="footer-link">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="footer-link">เงื่อนไขการใช้งาน</a>
              <a href="#" className="footer-link">กลับขึ้นบน</a>
            </div>
          </div>
          
          <div className="made-with">
            Made with Manus
          </div>
        </footer>
      </div>
      
      {showMenu && (
        <div className="side-menu">
          <div className="side-menu-header">
            <div className="logo-container">
              <div className="logo">🌊</div>
              <div className="logo-text">BwnX</div>
            </div>
            <button className="close-menu" onClick={() => setShowMenu(false)}>×</button>
          </div>
          
          <div className="side-menu-content">
            <div className="side-menu-item">📱 Apps</div>
            <div className="side-menu-item">🎥 Channel</div>
            <div className="side-menu-item">📘 Fanpage</div>
            <div className="side-menu-item">🛍️ Product</div>
            <div className="side-menu-item">📰 News</div>
            <div className="side-menu-item">💡 Advice</div>
            <div className="side-menu-item">📍 Location</div>
            <div className="side-menu-item">💸 Money</div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

