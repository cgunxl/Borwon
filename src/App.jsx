import React from 'react';

function App() {
  return (
    <>
      <div className="background-container">
        <img src="/background.jpeg" alt="Background" className="background-image" />
      </div>
      
      <div className="container">
        <header className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="BwnX Logo" className="logo" />
            <div>
              <div className="logo-text">BwnX Platform</div>
              <div className="logo-subtitle">Deep Ocean Recommendations</div>
            </div>
          </div>
          
          <div className="nav">
            <div className="nav-item">Categories</div>
            <div className="nav-item">Trending</div>
            <div className="nav-item">About</div>
          </div>
          
          <div className="language-selector">
            <span>🇹🇭</span>
            <span>ไทย</span>
          </div>
        </header>
        
        <main>
          <section className="hero">
            <h1 className="hero-title">BwnX Platform</h1>
            <h2 className="hero-subtitle">Deep Ocean Recommendations for Life, Money & Lifestyle</h2>
            <p className="hero-description">
              AI-powered recommendation system that provides personalized suggestions for apps, tools, finance, lifestyle, and more. Discover what you need with deep personalization.
            </p>
            
            <div className="search-container">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for apps, tools, finance..." 
              />
            </div>
            
            <div className="button-container">
              <button className="button button-primary">⚡ Get Started</button>
              <button className="button button-secondary">Learn More</button>
            </div>
            
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Total Recommendations</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🌐</div>
                <div className="stat-number">10</div>
                <div className="stat-label">Languages Supported</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-number">8</div>
                <div className="stat-label">Categories</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-number">24/7</div>
                <div className="stat-label">Daily Updates</div>
              </div>
            </div>
            
            <button className="browser-button">
              ความคุ้มมูลรายเซอร์
            </button>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;

