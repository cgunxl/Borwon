'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Globe, Target, TrendingUp, Clock, ChevronRight, Menu, X } from 'lucide-react'

// Categories data
const categories = [
  { id: 'apps', name: 'Apps', icon: '📱', description: 'Smart Travel & Booking, Career & Freelance, AI Tools & Finance' },
  { id: 'channels', name: 'Channels', icon: '🎥', description: 'Investment & Trading, Knowledge & Learning, Podcasts & Expert Talks' },
  { id: 'products', name: 'Products', icon: '🛍️', description: 'Influencer Picks & Beauty, Health & Wellness, Smart Living & Gadgets' },
  { id: 'news', name: 'News', icon: '📰', description: 'World & Global News, Finance & Market Insights, Crypto & Tech News' },
  { id: 'advice', name: 'Advice', icon: '💡', description: 'Money & Tax Insights, Smart Living & Home Design, Career Growth' },
  { id: 'location', name: 'Location', icon: '📍', description: 'Cafes & Hot Spots, Local Goods & OTOP, Travel Destinations' },
  { id: 'money', name: 'Money Making', icon: '💸', description: 'Online Business, Affiliate Marketing, Crypto & Trading Income' },
  { id: 'ai', name: 'AI Tools', icon: '🤖', description: 'AI-powered tools for productivity, creativity, and automation' }
]

// Stats data
const stats = [
  { icon: Target, value: '10,000+', label: 'Total Recommendations' },
  { icon: Globe, value: '10', label: 'Languages Supported' },
  { icon: TrendingUp, value: '8', label: 'Categories' },
  { icon: Clock, value: '24/7', label: 'Daily Updates' }
]

// Languages data
const languages = ['ไทย', 'English', '中文', '日本語', 'Español', 'Français', 'Deutsch', 'Русский', 'العربية', 'हिन्दी']

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('ไทย')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // TODO: Implement search functionality
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background with wave effect */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/50 to-slate-900/90"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float-delay-1"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-float-delay-2"></div>
          <div className="absolute top-60 left-1/2 w-1 h-1 bg-cyan-300 rounded-full opacity-30 animate-float-delay-3"></div>
          <div className="absolute bottom-40 right-20 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-float-delay-4"></div>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">B</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">BwnX Platform</h1>
                <p className="text-xs text-gray-400">Deep Ocean Recommendations</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#categories" className="text-sm text-gray-300 hover:text-white transition-colors">Categories</Link>
              <Link href="#trending" className="text-sm text-gray-300 hover:text-white transition-colors">Trending</Link>
              <Link href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">About</Link>
              
              {/* Language Selector */}
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang} className="bg-slate-800">{lang}</option>
                ))}
              </select>
              
              {/* Theme Toggle */}
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700">
                🌙
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link href="#categories" className="text-sm text-gray-300 hover:text-white transition-colors py-2">Categories</Link>
              <Link href="#trending" className="text-sm text-gray-300 hover:text-white transition-colors py-2">Trending</Link>
              <Link href="#about" className="text-sm text-gray-300 hover:text-white transition-colors py-2">About</Link>
              
              <div className="flex items-center justify-between">
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} className="bg-slate-800">{lang}</option>
                  ))}
                </select>
                
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700">
                  🌙
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
              BwnX Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Deep Ocean Recommendations for Life, Money & Lifestyle
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              AI-powered recommendation system that provides personalized suggestions for apps, tools, finance, lifestyle, and more. Discover what you need with deep personalization.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for apps, tools, finance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 py-6 bg-slate-800/50 border border-slate-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-full shadow-lg"
                />
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-full">
                ⚡ Get Started
              </button>
              <button className="border border-gray-600 text-gray-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-full">
                Learn More
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800/40 border border-slate-700 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/60 transition-all duration-300 group"
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section id="categories" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover personalized recommendations across various categories tailored to your needs and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-slate-800/40 border border-slate-700 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{category.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{category.description}</p>
                  <div className="flex items-center text-cyan-400 text-sm font-medium">
                    <span>Explore</span>
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Thai Text */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-cyan-400">
              ความคุ้มมูลรายเซอร์
            </h3>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">B</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold">BwnX Platform</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Deep Ocean Recommendations for Life, Money & Lifestyle
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Apps</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Channels</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">News</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Subscribe</h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest updates and recommendations.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-slate-800 border border-slate-700 text-white placeholder-gray-400 rounded-l-md px-4 py-2 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BwnX Platform. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
