import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocationsPage = () => {
  return (
    <>
      <Helmet>
        <title>สถานที่และจุดหมาย - Bwn X</title>
        <meta name="description" content="รวมสถานที่ท่องเที่ยวที่น่าสนใจ จุดหมายที่ซ่อนเร้น และธุรกิจท้องถิ่นที่น่าไป" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">สถานที่และจุดหมาย</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องไป</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมสถานที่ท่องเที่ยวที่น่าสนใจ จุดหมายที่ซ่อนเร้น และธุรกิจท้องถิ่นที่น่าไป
          </p>
        </div>
      </div>
    </>
  );
};

export default LocationsPage;