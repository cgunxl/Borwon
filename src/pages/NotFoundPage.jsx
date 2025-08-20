import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - หน้าไม่พบ | Bwn X</title>
        <meta name="description" content="ขออภัย หน้าที่คุณค้นหาไม่พบ กรุณาตรวจสอบ URL หรือกลับไปหน้าแรก" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bwn-main-bg">
        <div className="bwn-container text-center">
          <div className="max-w-2xl mx-auto">
            {/* 404 Icon */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-bwn-accent bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-bwn-accent">404</span>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-bwn-white mb-6">
              หน้าไม่พบ
            </h1>
            
            <p className="text-lg text-bwn-white text-opacity-80 mb-8">
              ขออภัย หน้าที่คุณค้นหาไม่พบ หรืออาจถูกย้ายไปที่อื่นแล้ว
            </p>

            {/* Search Suggestion */}
            <div className="bg-bwn-dark-gray rounded-2xl p-6 mb-8 border border-bwn-medium-gray">
              <h3 className="text-xl font-semibold text-bwn-accent mb-4">
                ค้นหาสิ่งที่คุณต้องการ
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/apps" 
                  className="bwn-button bg-bwn-accent text-bwn-deep-black hover:bg-bwn-accent-light"
                >
                  <Search className="w-5 h-5 mr-2" />
                  แอปและเครื่องมือ
                </Link>
                <Link 
                  to="/channels" 
                  className="bwn-button bg-bwn-ocean-blue text-bwn-white hover:bg-bwn-ocean-light"
                >
                  <Search className="w-5 h-5 mr-2" />
                  ช่องทางการลงทุน
                </Link>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="bwn-button bg-bwn-accent text-bwn-deep-black hover:bg-bwn-accent-light"
              >
                <Home className="w-5 h-5 mr-2" />
                กลับหน้าแรก
              </Link>
              
              <button 
                onClick={() => window.history.back()} 
                className="bwn-button border-2 border-bwn-accent text-bwn-accent hover:bg-bwn-accent hover:text-bwn-deep-black"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                กลับไปหน้าก่อนหน้า
              </button>
            </div>

            {/* Popular Categories */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-bwn-white mb-4">
                หมวดหมู่ยอดนิยม
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'แอปท่องเที่ยว', path: '/apps/travel-booking', color: 'bg-bwn-accent' },
                  { name: 'การลงทุน', path: '/channels/investment-trading', color: 'bg-bwn-ocean-blue' },
                  { name: 'เกมเติมเงิน', path: '/fanpages/game-topup', color: 'bg-bwn-accent-light' },
                  { name: 'สินค้าความงาม', path: '/products/beauty-influencer', color: 'bg-bwn-ocean-light' }
                ].map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className={`${category.color} text-bwn-deep-black p-3 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 bg-bwn-dark-gray rounded-2xl p-6 border border-bwn-medium-gray">
              <h3 className="text-lg font-semibold text-bwn-accent mb-3">
                ต้องการความช่วยเหลือ?
              </h3>
              <p className="text-bwn-white text-opacity-80 mb-4">
                หากคุณยังไม่พบสิ่งที่ต้องการ หรือมีคำถามเพิ่มเติม
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="mailto:support@bwnx.com" 
                  className="bwn-button bg-bwn-medium-gray text-bwn-white hover:bg-bwn-light-gray"
                >
                  ติดต่อเรา
                </a>
                <Link 
                  to="/advice" 
                  className="bwn-button border border-bwn-medium-gray text-bwn-accent hover:bg-bwn-medium-gray"
                >
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

export default NotFoundPage;