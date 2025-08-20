import React from 'react';
import { Helmet } from 'react-helmet-async';

const NewsPage = () => {
  return (
    <>
      <Helmet>
        <title>ข่าวสารและข้อมูล - Bwn X</title>
        <meta name="description" content="รวมข่าวสารที่ทันสมัย ข้อมูลที่ถูกต้อง และการวิเคราะห์ที่ลึกซึ้ง" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">ข่าวสารและข้อมูล</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องรู้</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมข่าวสารที่ทันสมัย ข้อมูลที่ถูกต้อง และการวิเคราะห์ที่ลึกซึ้ง
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsPage;