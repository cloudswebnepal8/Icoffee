import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../data/coffeeData';
import { staggerContainer, viewport } from '../utils/animations';

const itemVariant = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const MenuItem = ({ item }) => (
  <motion.div variants={itemVariant}
    className="group flex items-center gap-4 sm:gap-5 py-4 border-b border-[#2A2A2A] last:border-b-0 hover:border-[#C5A880]/30 transition-all duration-300">
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden">
      <img src={item.image} alt={item.name} width={64} height={64} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base sm:text-lg leading-snug mb-0.5 group-hover:text-[#C5A880] transition-colors duration-300">
        {item.name}
      </h3>
      <p className="font-jakarta font-light text-[#A5A5A5] text-xs sm:text-sm leading-relaxed truncate">{item.composition}</p>
    </div>
    <div className="hidden sm:block flex-1 border-b border-dotted border-[#2A2A2A] mx-2" aria-hidden="true" />
    <div className="flex-shrink-0 font-playfair font-bold text-[#C5A880] text-base sm:text-lg transition-all duration-300 group-hover:text-[#D4A373]">
      ${item.price.toFixed(2)}
    </div>
  </motion.div>
);

const PopularMenu = () => {
  const half = Math.ceil(menuItems.length / 2);
  const leftCol  = menuItems.slice(0, half);
  const rightCol = menuItems.slice(half);

  return (
    <section id="menu" className="bg-[#181818] py-20 lg:py-28" aria-labelledby="menu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">
            <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />POPULAR MENU<span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
          </motion.p>
          <motion.h2 id="menu-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.65, delay: 0.1 }}
            className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl mb-4">
            Explore Our Signature Selection
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ duration: 0.7, delay: 0.2 }}
            className="w-16 h-0.5 bg-[#C5A880] mx-auto" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-20">
          <motion.div variants={staggerContainer(0.08, 0)} initial="hidden" whileInView="visible" viewport={viewport}>
            {leftCol.map(item => <MenuItem key={item.id} item={item} />)}
          </motion.div>
          <motion.div variants={staggerContainer(0.08, 0.15)} initial="hidden" whileInView="visible" viewport={viewport}>
            {rightCol.map(item => <MenuItem key={item.id} item={item} />)}
          </motion.div>
        </div>

        {/* VIEW FULL MENU → /menu */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center">
          <Link to="/menu"
            className="inline-flex items-center px-8 py-3.5 border border-[#C5A880] text-[#C5A880]
                       text-[10px] font-jakarta font-bold tracking-[0.18em] uppercase
                       transition-all duration-300 hover:bg-[#C5A880] hover:text-[#121212]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
            VIEW FULL MENU
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularMenu;
