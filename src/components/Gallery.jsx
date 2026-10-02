import React from 'react';
import { motion } from 'framer-motion';
import { galleryItems } from '../data/coffeeData';
import { viewport } from '../utils/animations';

// Each tile fades up as it enters the viewport.
// Stagger is driven by the index so tiles further down the grid wait longer.
const GalleryTile = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewport}
    transition={{ duration: 0.65, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    // span-2 tiles take twice the row height via the custom style below
    className="group relative overflow-hidden"
    style={{ gridRow: `span ${item.span}` }}
  >
    <img
      src={item.image}
      alt={item.category}
      loading="lazy"
      decoding="async"
      className="
        w-full h-full object-cover object-center
        transition-transform duration-700 ease-out
        group-hover:scale-110
      "
    />

    {/* Dark overlay — lightens to reveal the category tag on hover */}
    <div
      className="
        absolute inset-0 bg-[#121212]/50
        transition-opacity duration-300
        group-hover:bg-[#121212]/25
      "
      aria-hidden="true"
    />

    {/* Gold left accent line + category label */}
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
  </motion.div>
);

const Gallery = () => (
  <section
    id="gallery"
    className="bg-[#181818] py-20 lg:py-28"
    aria-labelledby="gallery-heading"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4"
        >
          <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
          OUR GALLERY
          <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
        </motion.p>

        <motion.h2
          id="gallery-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl"
        >
          Captured Moments
        </motion.h2>
      </div>

      {/* Editorial asymmetric grid.
          On desktop we use a 3-column grid with variable row heights so
          tiles with span=2 become portrait-oriented "hero" tiles.
          On mobile we collapse to 2 equal columns, then 1 on very small screens. */}
      <div
        className="
          grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4
          auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[220px]
        "
      >
        {galleryItems.map((item, i) => (
          <GalleryTile key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
