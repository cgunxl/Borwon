import React from 'react';
import { Helmet } from 'react-helmet-async';

const FanpagesPage = () => {
  return (
    <>
      <Helmet>
        <title>เพจแนะนำ - Bwn X</title>
        <meta name="description" content="รวมเพจแนะนำที่ให้ข้อมูลที่เป็นประโยชน์ มีความน่าเชื่อถือ และอัปเดตสม่ำเสมอ" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">เพจแนะนำ</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องติดตาม</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมเพจแนะนำที่ให้ข้อมูลที่เป็นประโยชน์ มีความน่าเชื่อถือ และอัปเดตสม่ำเสมอ
          </p>
        </div>
      </div>
    </>
  );
};

export default FanpagesPage;