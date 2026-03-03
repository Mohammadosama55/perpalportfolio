'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Upload, CreditCard, Calculator } from 'lucide-react';

const services = [
  { id: 'video-editing', name: 'Video Editing', basePrice: 50 },
  { id: 'photo-editing', name: 'Photo Editing', basePrice: 30 },
  { id: 'graphic-design', name: 'Graphic Design', basePrice: 40 },
  { id: 'motion-graphics', name: 'Motion Graphics', basePrice: 80 },
];

const Booking: React.FC = () => {
  const [service, setService] = useState('');
  const [duration, setDuration] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    const selectedService = services.find(s => s.id === service);
    if (selectedService) {
      // Price calculation: base price per minute with volume discount
      let price = selectedService.basePrice * duration;
      if (duration > 3) price *= 0.9; // 10% discount for 3+ minutes
      if (duration > 5) price *= 0.85; // 15% discount for 5+ minutes
      setCalculatedPrice(Math.round(price));
    }
  }, [service, duration]);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Book Your Project
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to bring your vision to life? Book your project now and get a personalized quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glassmorphism rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                >
                  <option value="">Choose a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video Duration (minutes): {duration}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5 min</span>
                  <span>10 min</span>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all appearance-none"
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column - Price Calculator & Upload */}
            <div className="space-y-6">
              {/* Price Calculator */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5" />
                  <h3 className="font-semibold">Price Estimate</h3>
                </div>
                <div className="text-4xl font-bold mb-2">
                  ${calculatedPrice > 0 ? calculatedPrice : '--'}
                </div>
                <p className="text-purple-200 text-sm">
                  {service ? 'Estimated price for your project' : 'Select a service to see pricing'}
                </p>
                {duration > 3 && (
                  <p className="text-green-300 text-sm mt-2">
                    Volume discount applied!
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Reference Files (Optional)
                </label>
                <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center hover:bg-purple-50/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop files here</p>
                  <p className="text-xs text-gray-400">or click to browse</p>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-purple-200/50">
            <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Secure payment via Stripe. You&apos;ll receive a confirmation email after booking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
