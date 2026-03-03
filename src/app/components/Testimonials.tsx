'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    image: '/testimonials/sarah.jpg',
    rating: 5,
    text: 'Working with this designer was an absolute pleasure. The video quality exceeded our expectations and the turnaround time was impressive. Highly recommend!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Content Creator',
    company: 'Creative Studio',
    image: '/testimonials/michael.jpg',
    rating: 5,
    text: 'The attention to detail and creative vision brought to our project was outstanding. Every frame was crafted with precision and artistry.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Event Manager',
    company: 'EventPro',
    image: '/testimonials/emily.jpg',
    rating: 5,
    text: 'Captured our corporate event beautifully. The photos and highlight reel were exactly what we needed. Professional and creative work!',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what my clients have to say about working together.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="glassmorphism rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-700">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {/* <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={128}
                  height={128}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                /> */}
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <Quote className="w-10 h-10 text-purple-400 mb-4 mx-auto md:mx-0" />
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>
                
                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-bold text-gray-800 text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full glassmorphism hover:bg-white/30 transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-purple-600 w-8'
                      : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full glassmorphism hover:bg-white/30 transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Add Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Have you worked with me? Share your experience!</p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
            Add Your Review
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
