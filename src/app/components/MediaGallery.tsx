'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, Clock } from 'lucide-react';

interface MediaAsset {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: 'image' | 'video' | 'raw';
  format: string;
  width?: number;
  height?: number;
  duration?: number;
  category: string;
  isDisplayed: boolean;
  createdAt: string | Date;
}

interface MediaGalleryProps {
  category?: 'Photos' | 'Videos' | 'All';
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ category = 'All' }) => {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [category]);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      const data = await response.json();
      
      if (data.success) {
        let filteredMedia = data.data;
        
        if (category !== 'All') {
          filteredMedia = filteredMedia.filter(
            (m: MediaAsset) => m.category === category
          );
        }
        
        // Only show displayed media
        filteredMedia = filteredMedia.filter((m: MediaAsset) => m.isDisplayed);
        
        setMedia(filteredMedia);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openLightbox = (mediaItem: MediaAsset) => {
    setSelectedMedia(mediaItem);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-purple-600 text-lg">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item, index) => (
          <motion.div
            key={item._id || item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            onClick={() => openLightbox(item)}
          >
            {/* Media Display */}
            {item.resourceType === 'video' ? (
              <div className="relative aspect-video">
                <video
                  src={item.secureUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={`${item.secureUrl}?f=jpg`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
                {item.duration && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-square">
                <img
                  src={item.secureUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <Eye className="w-6 h-6 mb-2" />
                    <p className="font-medium">Click to view</p>
                  </div>
                </div>
              </div>
            )}

            {/* Overlay Info */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                {item.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {media.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No media available in this category</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedMedia.resourceType === 'video' ? (
              <video
                src={selectedMedia.secureUrl}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg"
              />
            ) : (
              <img
                src={selectedMedia.secureUrl}
                alt={selectedMedia.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}

            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedMedia.title}</h3>
              {selectedMedia.description && (
                <p className="text-gray-300 mb-4">{selectedMedia.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedMedia.createdAt).toLocaleDateString()}
                </span>
                {selectedMedia.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.floor(selectedMedia.duration / 60)}:{(selectedMedia.duration % 60).toString().padStart(2, '0')} min
                  </span>
                )}
                <span className="px-2 py-1 bg-purple-600 rounded text-xs">
                  {selectedMedia.format.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MediaGallery;
