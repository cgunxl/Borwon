import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Zap
} from 'lucide-react';

const AppsPage = ({ category = 'all' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [sortBy, setSortBy] = useState('popular');

  // Apps data
  const apps = [
    {
      id: 1,
      name: 'Agoda',
      category: 'travel',
      description: 'แอปจองโรงแรมและที่พักที่ดีที่สุด ราคาถูกกว่าใคร',
      rating: 4.8,
      downloads: '100M+',
      price: 'ฟรี',
      features: ['จองโรงแรม', 'ราคาถูก', 'ส่วนลดพิเศษ'],
      affiliate: 'https://agoda.com/ref=bwnx',
      image: 'https://via.placeholder.com/120x120/0066cc/ffffff?text=Agoda',
      tags: ['ท่องเที่ยว', 'โรงแรม', 'จองที่พัก']
    },
    {
      id: 2,
      name: 'Booking.com',
      category: 'travel',
      description: 'จองโรงแรม โรงแรม และที่พักทั่วโลก',
      rating: 4.7,
      downloads: '500M+',
      price: 'ฟรี',
      features: ['จองโรงแรม', 'รีวิวผู้ใช้', 'ราคาโปร่งใส'],
      affiliate: 'https://booking.com/ref=bwnx',
      image: 'https://via.placeholder.com/120x120/003580/ffffff?text=Booking',
      tags: ['ท่องเที่ยว', 'โรงแรม', 'จองที่พัก']
    },
    {
      id: 3,
      name: 'Airbnb',
      category: 'travel',
      description: 'จองที่พักแบบบ้านพักและห้องส่วนตัว',
      rating: 4.6,
      downloads: '50M+',
      price: 'ฟรี',
      features: ['บ้านพัก', 'ห้องส่วนตัว', 'ประสบการณ์ท้องถิ่น'],
      affiliate: 'https://airbnb.com/ref=bwnx',
      image: 'https://via.placeholder.com/120x120/FF5A5F/ffffff?text=Airbnb',
      tags: ['ท่องเที่ยว', 'บ้านพัก', 'ห้องส่วนตัว']
    },
    {
      id: 4,
      name: 'Notion',
      category: 'productivity',
      description: 'เครื่องมือจัดการงานและความรู้ที่ทรงพลัง',
      rating: 4.9,
      downloads: '10M+',
      price: 'ฟรี/เสียเงิน',
      features: ['จัดการงาน', 'จดบันทึก', 'ทำงานร่วมกัน'],
      affiliate: 'https://notion.so/ref=bwnx',
      image: 'https://via.placeholder.com/120x120/000000/ffffff?text=Notion',
      tags: ['ผลิตภาพ', 'จัดการงาน', 'จดบันทึก']
    },
    {
      id: 5,
      name: 'Trello',
      category: 'productivity',
      description: 'จัดการโปรเจกต์ด้วย Kanban board ที่ใช้งานง่าย',
      rating: 4.5,
      downloads: '25M+',
      price: 'ฟรี/เสียเงิน',
      features: ['Kanban Board', 'จัดการงาน', 'ทำงานเป็นทีม'],
      affiliate: 'https://trello.com/ref=bwnx',
      image: 'https://via.placeholder.com/120x120/0079BF/ffffff?text=Trello',
      tags: ['ผลิตภาพ', 'จัดการงาน', 'Kanban']
    },
    {
      id: 6,
      name: 'Spotify',
      category: 'entertainment',
      description: 'ฟังเพลงและพอดแคสต์มากกว่า 80 ล้านเพลง',
      rating: 4.7,
      downloads: '1B+',
      price: 'ฟรี/เสียเงิน',
      features: ['ฟังเพลง', 'พอดแคสต์', 'เพลย์ลิสต์'],
      affiliate: 'https://spotify.com/ref=bwnx',
      image: 'https://via.placeholder.com/120x120/1DB954/ffffff?text=Spotify',
      tags: ['บันเทิง', 'เพลง', 'พอดแคสต์']
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: '📱' },
    { id: 'travel', name: 'ท่องเที่ยว', icon: '✈️' },
    { id: 'productivity', name: 'ผลิตภาพ', icon: '⚡' },
    { id: 'entertainment', name: 'บันเทิง', icon: '🎮' }
  ];

  // Filter and search
  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort apps
  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return parseInt(b.downloads.replace(/[^0-9]/g, '')) - parseInt(a.downloads.replace(/[^0-9]/g, ''));
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.rating - a.rating; // popular by default
    }
  });

  // Get page title and description based on category
  const getPageMeta = () => {
    const categoryInfo = categories.find(cat => cat.id === selectedCategory);
    if (selectedCategory === 'all') {
      return {
        title: 'แอปและเครื่องมือ - รวมแอปดีๆ ที่คุณต้องมี | Bwn X',
        description: 'รวมแอปและเครื่องมือที่ใช้งานง่าย มีประโยชน์ และช่วยให้ชีวิตดีขึ้น ท่องเที่ยว ผลิตภาพ บันเทิง และอื่นๆ'
      };
    }
    return {
      title: `${categoryInfo.name} - แอปและเครื่องมือยอดนิยม | Bwn X`,
      description: `รวมแอปและเครื่องมือ${categoryInfo.name}ที่ดีที่สุด ที่เราได้คัดสรรมาให้คุณแล้ว พร้อมรีวิวและคำแนะนำ`
    };
  };

  const pageMeta = getPageMeta();

  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="keywords" content="แอป, เครื่องมือ, ท่องเที่ยว, ผลิตภาพ, บันเทิง, แอปมือถือ, แอปแนะนำ" />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cgunxl.github.io/Borwon/apps${selectedCategory !== 'all' ? `/${selectedCategory}` : ''}`} />
        <link rel="canonical" href={`https://cgunxl.github.io/Borwon/apps${selectedCategory !== 'all' ? `/${selectedCategory}` : ''}`} />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="bwn-container">
          {/* Page Header */}
          <div className="text-center mb-12 bwn-scroll-reveal">
            <h1 className="bwn-hero-title mb-6">
              <span className="bwn-text-gradient">แอปและเครื่องมือ</span>
              <br />
              <span className="text-bwn-white">ที่คุณต้องมี</span>
            </h1>
            <p className="bwn-hero-subtitle max-w-3xl mx-auto">
              รวมแอปและเครื่องมือที่ใช้งานง่าย มีประโยชน์ และช่วยให้ชีวิตดีขึ้น 
              ท่องเที่ยว ผลิตภาพ บันเทิง และอื่นๆ อีกมากมาย
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bwn-scroll-reveal">
            <div className="bg-bwn-dark-gray rounded-2xl p-6 border border-bwn-medium-gray">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bwn-white/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="ค้นหาแอปหรือเครื่องมือ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-bwn-medium-gray border border-bwn-light-gray rounded-xl text-bwn-white placeholder-bwn-white/50 focus:outline-none focus:border-bwn-accent focus:ring-1 focus:ring-bwn-accent"
                  />
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-bwn-medium-gray border border-bwn-light-gray rounded-xl text-bwn-white focus:outline-none focus:border-bwn-accent focus:ring-1 focus:ring-bwn-accent"
                >
                  <option value="popular">ยอดนิยม</option>
                  <option value="rating">คะแนนสูงสุด</option>
                  <option value="downloads">ดาวน์โหลดมากสุด</option>
                  <option value="name">ชื่อ A-Z</option>
                </select>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? 'bg-bwn-accent text-bwn-deep-black'
                        : 'bg-bwn-medium-gray text-bwn-white hover:bg-bwn-accent/10 hover:text-bwn-accent'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 bwn-scroll-reveal">
            <p className="text-bwn-white/70">
              พบ {sortedApps.length} แอปและเครื่องมือ
              {selectedCategory !== 'all' && ` ในหมวดหมู่${categories.find(cat => cat.id === selectedCategory)?.name}`}
            </p>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedApps.map((app, index) => (
              <div
                key={app.id}
                className="bwn-card group bwn-scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* App Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-bwn-white mb-1 group-hover:text-bwn-accent transition-colors duration-200">
                      {app.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-bwn-white">{app.rating}</span>
                      </div>
                      <span className="text-bwn-white/50">•</span>
                      <span className="text-sm text-bwn-white/70">{app.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        app.price === 'ฟรี' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {app.price}
                      </span>
                      <span className="text-xs text-bwn-white/50 capitalize">{app.category}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-bwn-white/80 text-sm mb-4 leading-relaxed">
                  {app.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {app.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-bwn-medium-gray/50 text-bwn-white/70 text-xs rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-bwn-accent/10 text-bwn-accent text-xs rounded-lg border border-bwn-accent/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <a
                    href={app.affiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bwn-button bg-bwn-accent text-bwn-deep-black hover:bg-bwn-accent-light flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>ดาวน์โหลด</span>
                  </a>
                  <button className="bwn-button border border-bwn-accent text-bwn-accent hover:bg-bwn-accent hover:text-bwn-deep-black">
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedApps.length === 0 && (
            <div className="text-center py-12 bwn-scroll-reveal">
              <div className="w-24 h-24 bg-bwn-medium-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-bwn-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-bwn-white mb-2">
                ไม่พบแอปที่คุณค้นหา
              </h3>
              <p className="text-bwn-white/70 mb-6">
                ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูครับ
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bwn-button bg-bwn-accent text-bwn-deep-black hover:bg-bwn-accent-light"
              >
                ล้างการค้นหา
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center bwn-scroll-reveal">
            <div className="bg-gradient-to-r from-bwn-accent to-bwn-ocean-blue rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-bwn-deep-black mb-4">
                ต้องการแอปหรือเครื่องมืออื่นๆ?
              </h3>
              <p className="text-bwn-deep-black/80 mb-6">
                เรามีแอปและเครื่องมืออีกมากมายที่รอให้คุณค้นพบ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/channels"
                  className="bwn-button bg-bwn-deep-black text-bwn-accent hover:bg-bwn-dark-gray hover:text-bwn-accent-light"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  ดูช่องทางการลงทุน
                </Link>
                <Link
                  to="/advice"
                  className="bwn-button border-2 border-bwn-deep-black text-bwn-deep-black hover:bg-bwn-deep-black hover:text-bwn-accent"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  ดูคำแนะนำ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppsPage;