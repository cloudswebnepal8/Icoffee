import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import { fullGalleryItems } from '../data/coffeeData';

const categories = [
  'All',
  'Latte Art',
  'Espresso',
  'Coffee Beans',
  'Barista',
  'Interior',
  'Pastries',
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter gallery items based on active tab
  const filteredItems =
    activeCategory === 'All'
      ? fullGalleryItems
      : fullGalleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, showNext, showPrev]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <>
      <PageHero
        label="OUR VISUAL ARCHIVE"
        heading="Captured Coffee Moments"
        breadcrumb={[{ label: 'Gallery', to: null }]}
      />

      <section className="bg-[#121212] py-20 lg:py-28" aria-label="Photo gallery collection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-5 py-2.5 font-jakarta text-xs uppercase tracking-wider transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-[#C5A880] text-[#121212] border-[#C5A880] font-bold shadow-lg shadow-[#C5A880]/20'
                    : 'bg-[#181818] text-[#A5A5A5] border-[#2A2A2A] hover:border-[#C5A880]/50 hover:text-[#F5F1E8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Asymmetric Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[250px]"
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => openLightbox(idx)}
                  className="group relative overflow-hidden bg-[#181818] border border-[#2A2A2A] cursor-pointer"
                  style={{ gridRow: `span ${item.span || 1}` }}
                >
                  <img
                    src={item.image}
                    alt={item.title || item.category}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#121212]/40 group-hover:bg-[#121212]/15 transition-colors duration-300" />

                  {/* Hover Caption */}
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <span className="w-8 h-8 flex items-center justify-center bg-[#181818]/90 text-[#C5A880] border border-[#C5A880]/40">
                        <Maximize2 size={14} />
                      </span>
                    </div>
                    <div>
                      <span className="inline-block bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[8px] tracking-[0.16em] uppercase px-2 py-0.5 mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-playfair text-[#F5F1E8] text-sm sm:text-base font-semibold">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center border border-[#2A2A2A] text-[#A5A5A5] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Prev Image */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 hidden sm:flex items-center justify-center bg-[#181818]/80 border border-[#2A2A2A] text-[#F5F1E8] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Image */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 hidden sm:flex items-center justify-center bg-[#181818]/80 border border-[#2A2A2A] text-[#F5F1E8] hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Main Lightbox Image & Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col bg-[#181818] border border-[#2A2A2A] shadow-2xl overflow-hidden"
            >
              <div className="relative flex-1 max-h-[72vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={currentItem.image}
                  alt={currentItem.title || currentItem.category}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Bottom Caption Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-t border-[#2A2A2A] bg-[#181818]">
                <div>
                  <span className="text-[#C5A880] font-jakarta text-[10px] tracking-widest uppercase font-semibold">
                    {currentItem.category}
                  </span>
                  <h3 className="font-playfair text-[#F5F1E8] text-base sm:text-lg font-bold">
                    {currentItem.title}
                  </h3>
                </div>
                <div className="text-xs font-jakarta text-[#A5A5A5]">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pre-footer Booking Banner */}
      <BookingCTA />
    </>
  );
};

export default GalleryPage;
