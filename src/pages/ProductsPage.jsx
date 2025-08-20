import React from 'react';
import { Helmet } from 'react-helmet-async';

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>สินค้าและบริการ - Bwn X</title>
        <meta name="description" content="รวมสินค้าคุณภาพสูง ราคาเป็นมิตร และบริการหลังการขายที่ดี" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="bwn-container text-center">
          <h1 className="bwn-hero-title mb-6">
            <span className="bwn-text-gradient">สินค้าและบริการ</span>
            <br />
            <span className="text-bwn-white">ที่คุณต้องมี</span>
          </h1>
          <p className="bwn-hero-subtitle max-w-3xl mx-auto">
            รวมสินค้าคุณภาพสูง ราคาเป็นมิตร และบริการหลังการขายที่ดี
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;