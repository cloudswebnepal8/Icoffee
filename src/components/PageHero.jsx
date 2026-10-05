import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewport } from '../utils/animations';

// Reusable inner-page header banner.
// All route-based pages (except Home) use this to display their title
// with a consistent dark background and optional breadcrumb trail.
const PageHero = ({ label, heading, breadcrumb }) => (
  <section className="relative bg-[#181818] border-b border-[#2A2A2A] pt-32 pb-14 lg:pt-40 lg:pb-20">
    {/* Subtle dot texture — same technique as the About section */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #C5A880 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
      aria-hidden="true"
    />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4"
      >
        <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
        {label}
        <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1]"
      >
        {heading}
      </motion.h1>

      {/* Breadcrumb navigation */}
      {breadcrumb && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mt-5 text-[#A5A5A5] text-xs font-jakarta"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#C5A880] transition-colors duration-200 focus-visible:text-[#C5A880]">
            Home
          </Link>
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              <span aria-hidden="true">/</span>
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-[#C5A880] transition-colors duration-200 focus-visible:text-[#C5A880]">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#F5F1E8]/70">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </motion.nav>
      )}
    </div>
  </section>
);

export default PageHero;
