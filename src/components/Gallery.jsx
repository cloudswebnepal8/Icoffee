import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryItems } from '../data/coffeeData';
import { viewport } from '../utils/animations';

// Lightbox modal — shows the clicked image at full size
const Lightbox = ({ item, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-label={`Lightbox: ${item.category}`}
      aria-modal="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#121212]/92 backdrop-blur-sm" aria-hidden="true" />

      {/* Image container — click inside stops propagation so only the backdrop closes */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image.replace('w=800', 'w=1400')}
          alt={item.category}
          className="w-full max-h-[80vh] object-contain"
          loading="eager"
        />

        {/* Category label */}
        <div className="flex items-center gap-2 mt-4">
          <span className="w-4 h-px bg-[#C5A880]" aria-hidden="true" />
          <p className="font-jakarta font-semibold text-[#F5F1E8]/70 text-[10px] tracking-[0.15em] uppercase">
            {item.category}
          </p>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 -translate-y-full mb-2 w-10 h-10 flex items-center justify-center
                     border border-[#2A2A2A] text-[#A5A5A5] hover:border-[#C5A880] hover:text-[#C5A880]
                     transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          aria-label="Close lightbox"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
};

const GalleryTile = ({ item, index, onOpen }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewport}
    transition={{ duration: 0.65, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    onClick={() => onOpen(item)}
    aria-label={`Open ${item.category} image`}
    className="group relative overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
    style={{ gridRow: `span ${item.span}` }}
  >
    <img
      src={item.image}
      alt={item.category}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-[#121212]/50 transition-opacity duration-300 group-hover:bg-[#121212]/25" aria-hidden="true" />

    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: index * 0.07 + 0.2 }}
        className="flex items-center gap-2"
      >
        <span className="w-3 h-0.5 bg-[#C5A880]" aria-hidden="true" />
        <span className="font-jakarta font-semibold text-[#F5F1E8] text-[10px] sm:text-xs tracking-[0.15em] uppercase">
          {item.category}
        </span>
      </motion.div>
    </div>
  </motion.button>
);

import { AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <>
      <section id="gallery" className="bg-[#181818] py-20 lg:py-28" aria-labelledby="gallery-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />OUR GALLERY<span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
            </motion.p>
            <motion.h2 id="gallery-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl">
              Captured Moments
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
            {galleryItems.map((item, i) => (
              <GalleryTile key={item.id} item={item} index={i} onOpen={setLightboxItem} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
