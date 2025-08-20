import React from 'react';
import { Helmet } from 'react-helmet-async';

const AdvicePage = () => {
  return (
    <>
      <Helmet>
        <title>คำแนะนำและเทคนิค - Bwn X</title>
        <meta name="description" content="รวมคำแนะนำจากผู้เชี่ยวชาญ เทคนิคที่ใช้งานได้จริง และเคล็ดลับการพัฒนาตัวเอง" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">คำแนะนำและเทคนิค</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องรู้</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมคำแนะนำจากผู้เชี่ยวชาญ เทคนิคที่ใช้งานได้จริง และเคล็ดลับการพัฒนาตัวเอง
          </p>
        </div>
      </div>
    </>
  );
};

export default AdvicePage;