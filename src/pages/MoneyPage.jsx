import React from 'react';
import { Helmet } from 'react-helmet-async';

const MoneyPage = () => {
  return (
    <>
      <Helmet>
        <title>หาเงินและรายได้ - Bwn X</title>
        <meta name="description" content="รวมวิธีหาเงินออนไลน์ กลยุทธ์การลงทุน และโอกาสสร้างรายได้ที่ยั่งยืน" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">หาเงินและรายได้</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องรู้</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมวิธีหาเงินออนไลน์ กลยุทธ์การลงทุน และโอกาสสร้างรายได้ที่ยั่งยืน
          </p>
        </div>
      </div>
    </>
  );
};

export default MoneyPage;