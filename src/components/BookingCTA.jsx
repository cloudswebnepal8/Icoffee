import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewport } from '../utils/animations';

const BookingCTA = () => (
  <section id="booking" className="relative py-28 lg:py-40 overflow-hidden" aria-labelledby="booking-heading">
    <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80&auto=format&fit=crop"
      alt="" role="presentation" loading="lazy" decoding="async"
      className="absolute inset-0 w-full h-full object-cover object-center" />
    <div className="absolute inset-0 bg-[#121212]/75" aria-hidden="true" />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }}
      aria-hidden="true" />
    <div className="absolute top-8 left-8 w-14 h-14 border-t border-l border-[#C5A880]/30 pointer-events-none" aria-hidden="true" />
    <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-[#C5A880]/30 pointer-events-none" aria-hidden="true" />

    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-6">
        <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />RESERVE YOUR SPOT<span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
      </motion.p>

      <motion.h2 id="booking-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.7, delay: 0.1 }}
        className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
        Your Perfect Coffee<br />Moment Awaits
      </motion.h2>

      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.65, delay: 0.2 }}
        className="font-jakarta font-light text-[#F5F1E8]/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
        Reserve your table and enjoy handcrafted coffee in a space designed for good conversations.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, delay: 0.3 }}>
        {/* BOOK A TABLE → /book-table */}
        <Link to="/book-table"
          className="inline-flex items-center px-10 py-4 bg-[#C5A880] text-[#121212]
                     font-jakarta font-bold text-[10px] tracking-[0.2em] uppercase
                     transition-all duration-300 hover:bg-[#D4A373] hover:shadow-xl hover:shadow-[#C5A880]/20
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                     focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]">
          BOOK A TABLE
        </Link>
      </motion.div>
    </div>
  </section>
);

export default BookingCTA;
