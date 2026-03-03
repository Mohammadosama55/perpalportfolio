'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Video, Palette, Camera, ArrowRight } from 'lucide-react';

const pricingPlans = [
  {
    duration: '0-1 minutes',
    price: '$50',
    description: 'Short video clips, social media content',
    features: ['Basic editing', 'Color correction', '1 revision'],
    icon: Clock,
    popular: false,
  },
  {
    duration: '1-3 minutes',
    price: '$120',
    description: 'Medium-length content, promotional videos',
    features: ['Advanced editing', 'Motion graphics', 'Color grading', '2 revisions'],
    icon: Video,
    popular: true,
  },
  {
    duration: '3-5 minutes',
    price: '$200',
    description: 'Long-form content, detailed storytelling',
    features: ['Premium editing', 'Advanced graphics', 'Sound design', '3 revisions', 'Priority delivery'],
    icon: Palette,
    popular: false,
  },
  {
    duration: '5+ minutes',
    price: 'Custom',
    description: 'Full productions, documentaries, events',
    features: ['Full production', 'Custom graphics', 'Professional sound', 'Unlimited revisions', 'Dedicated support'],
    icon: Camera,
    popular: false,
  },
];

const Services: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Video Reel Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional video editing services tailored to your needs. 
            Choose the perfect package for your project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.duration}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative glassmorphism rounded-2xl p-6 transition-all duration-300 ${
                hoveredCard === index ? 'scale-105 shadow-2xl' : ''
              } ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{plan.duration}</h3>
                  <p className="text-2xl font-bold gradient-text">{plan.price}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600/10 hover:bg-purple-600 text-purple-700 hover:text-white font-semibold rounded-xl transition-all duration-300 group">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Need something else? I also offer photo editing, graphic design, and custom packages.
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white text-gray-800 font-semibold rounded-full mx-auto transition-all duration-300 border border-purple-200 hover:border-purple-400">
            Contact for Custom Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
