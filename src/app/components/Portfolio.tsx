'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const categories = ['All', 'Photos', 'Videos', 'Graphics'];

const portfolioItems = [
  { id: 1, category: 'Photos', title: 'Portrait Photography', image: '/portfolio/photo1.jpg' },
  { id: 2, category: 'Videos', title: 'Brand Commercial', image: '/portfolio/video1.jpg' },
  { id: 3, category: 'Graphics', title: 'Logo Design', image: '/portfolio/graphic1.jpg' },
  { id: 4, category: 'Photos', title: 'Event Coverage', image: '/portfolio/photo2.jpg' },
  { id: 5, category: 'Videos', title: 'Music Video', image: '/portfolio/video2.jpg' },
  { id: 6, category: 'Graphics', title: 'Social Media Kit', image: '/portfolio/graphic2.jpg' },
];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my creative work across photos, videos, and graphics design.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/50 text-gray-700 hover:bg-white hover:text-purple-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="group relative glassmorphism rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* Placeholder image - replace with actual images */}
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                  <span className="text-purple-600 text-lg font-semibold">{item.category}</span>
                </div>
                {/* <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-purple-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-purple-200">{item.category}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 text-2xl font-bold">{selectedItem.title}</span>
              </div>
              {/* <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className="rounded-xl"
              /> */}
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-purple-300">{selectedItem.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
