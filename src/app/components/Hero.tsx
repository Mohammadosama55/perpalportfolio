'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
}

const Hero: React.FC = () => {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/admin-profile');
        const data = await response.json();
        if (data.success && data.data) {
          setAdminProfile(data.data);
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchProfile();
  }, []);
  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 gradient-text font-[family-name:var(--font-poppins)]"
            >
              Photos & Video
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 tracking-wider uppercase"
            >
              Graphics Designer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              I create stunning photos and videos enhanced with eye-catching graphics. 
              Let&apos;s bring your vision to life!
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={scrollToPortfolio}
              className="group flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
            >
              View My Work
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

            {/* Hero Image/Profile Picture with Glowing Ring */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              {/* Glowing Ring Animation */}
              <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                {/* Outer glowing ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                  style={{
                    boxShadow: '0 0 60px rgba(124, 58, 237, 0.5), inset 0 0 60px rgba(124, 58, 237, 0.3)',
                  }}
                />
                {/* Inner pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-8 rounded-full border border-white/30"
                  style={{
                    boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
                  }}
                />
                {/* Sparkle effects around the ring */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.25,
                      ease: "easeInOut"
                    }}
                    className="absolute w-3 h-3 bg-white rounded-full"
                    style={{
                      top: `${50 - 48 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                      left: `${50 + 48 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    }}
                  />
                ))}
              </div>

              {/* Hero Image Placeholder - Rectangle Frame */}
              <div className="relative z-10 w-[300px] h-[400px] md:w-[380px] md:h-[480px] overflow-hidden border-4 border-white/50 shadow-2xl rounded-lg">
                {adminProfile?.profileImage ? (
                  <img
                    src={adminProfile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                    <span className="text-purple-600 text-6xl font-bold">JD</span>
                  </div>
                )}
              </div>
            </motion.div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgba(255, 255, 255, 0.1)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
