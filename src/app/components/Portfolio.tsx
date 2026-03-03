'use client';

import React from 'react';
import MediaGallery from './MediaGallery';

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my creative work across photos, videos, and graphics design.
          </p>
        </div>

        {/* Dynamic Media Gallery with MongoDB Integration */}
        <MediaGallery category="All" />
      </div>
    </section>
  );
};

export default Portfolio;
