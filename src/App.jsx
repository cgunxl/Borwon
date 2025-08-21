import React, { useState } from 'react'
import { Search, Globe, Target, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import newLogo from './assets/new-logo.png'
import waveBg from './assets/wave-bg.jpg'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('ไทย')

  const stats = [
    { icon: Target, value: '10,000+', label: 'Total Recommendations' },
    { icon: Globe, value: '10', label: 'Languages Supported' },
    { icon: TrendingUp, value: '8', label: 'Categories' },
    { icon: Clock, value: '24/7', label: 'Daily Updates' }
  ]

  const languages = ['ไทย', 'English', '中文', '日本語', 'Español', 'Français', 'Deutsch', 'Русский', 'العربية', 'हिन्दी']

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Wave Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${waveBg})`,
          filter: 'brightness(0.4) contrast(1.2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/70"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full opacity-60 floating-animation"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full opacity-40 floating-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 floating-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-cyan-300 rounded-full opacity-30 floating-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-blue-300 rounded-full opacity-40 floating-animation" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <img src={newLogo} alt="BwnX Platform" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-semibold text-white">BwnX Platform</h1>
            <span className="text-sm text-gray-300 hidden md:block">Deep Ocean Recommendations</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#categories" className="text-gray-300 hover:text-white transition-colors text-sm">Categories</a>
            <a href="#trending" className="text-gray-300 hover:text-white transition-colors text-sm">Trending</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">About</a>
            
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-800/50 border border-slate-600 rounded-md px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang} className="bg-slate-800 text-white">{lang}</option>
              ))}
            </select>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pt-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              BwnX Platform
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Deep Ocean Recommendations for Life, Money & Lifestyle
            </p>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              AI-powered recommendation system that provides personalized suggestions for apps, tools, finance, lifestyle, and more. Discover what you need with deep personalization.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for apps, tools, finance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-medium">
                🔥 Get Started
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-slate-800 px-6 py-3 text-base">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-800/40 border-slate-700 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
              ความคุ้มมูลรายเซอร์
            </h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

