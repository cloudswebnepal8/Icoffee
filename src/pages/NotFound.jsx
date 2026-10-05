import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] px-4 text-center pt-16">
    {/* Decorative icon */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-20 h-20 flex items-center justify-center border border-[#2A2A2A] text-[#C5A880]/40 mb-8"
    >
      <Coffee size={36} strokeWidth={1} aria-hidden="true" />
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4"
    >
      PAGE NOT FOUND
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.15 }}
      className="font-playfair font-bold text-[#F5F1E8] text-7xl sm:text-8xl lg:text-9xl leading-none mb-6"
    >
      404
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="font-jakarta font-light text-[#A5A5A5] text-base sm:text-lg max-w-sm mb-10 leading-relaxed"
    >
      Looks like this coffee route doesn't exist.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35 }}
    >
      <Link
        to="/"
        className="inline-flex items-center px-8 py-3.5 bg-[#C5A880] text-[#121212]
                   font-jakarta font-bold text-[10px] tracking-[0.2em] uppercase
                   transition-all duration-300 hover:bg-[#D4A373]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
      >
        BACK TO HOME
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
