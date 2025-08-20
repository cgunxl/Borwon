import React from 'react';
import { Helmet } from 'react-helmet-async';

const ChannelsPage = () => {
  return (
    <>
      <Helmet>
        <title>ช่องทางการลงทุน - Bwn X</title>
        <meta name="description" content="รวมช่องทางการลงทุนที่ปลอดภัย มีความน่าเชื่อถือ และให้ผลตอบแทนที่ดี" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">ช่องทางการลงทุน</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องรู้</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมช่องทางการลงทุนที่ปลอดภัย มีความน่าเชื่อถือ และให้ผลตอบแทนที่ดี
          </p>
        </div>
      </div>
    </>
  );
};

export default ChannelsPage;