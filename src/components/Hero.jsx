import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/coffeeData';

const AUTOPLAY_MS = 5500;

// Ken Burns scale runs in CSS so it works even when Framer Motion is reduced
const contentVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } }),
  exit:    { opacity: 0, transition: { duration: 0.4 } },
};

const SlideBackground = React.memo(({ slide, isActive }) => (
  <div
    className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    aria-hidden="true"
  >
    <img
      src={slide.image}
      alt=""
      role="presentation"
      width={1920}
      height={1080}
      fetchPriority={isActive ? 'high' : 'low'}
      loading={isActive ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-full h-full object-cover ${isActive ? 'ken-burns' : ''}`}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/85 via-[#121212]/50 to-transparent" />
    <div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
    />
  </div>
));

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const total = heroSlides.length;

  const goNext = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const goPrev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  const handleManual = useCallback((fn) => {
    setPaused(true);
    fn();
  }, []);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), AUTOPLAY_MS * 1.5);
      return () => clearTimeout(t);
    }
    const t = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, goNext]);

  // Arrow key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') handleManual(goNext);
      if (e.key === 'ArrowLeft')  handleManual(goPrev);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleManual, goNext, goPrev]);

  const slide = heroSlides[current];

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[560px] overflow-hidden"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
    >
      {/* All backgrounds render simultaneously — only active one is visible.
          This pre-loads the next image so the crossfade is instant. */}
      {heroSlides.map((s, i) => (
        <SlideBackground key={s.id} slide={s} isActive={i === current} />
      ))}

      {/* Slide content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={current} className="flex flex-col gap-4 sm:gap-5">
                <motion.p custom={0} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                  className="font-playfair italic text-[#C5A880] text-[10px] sm:text-xs tracking-[0.25em] uppercase">
                  {slide.label}
                </motion.p>

                <motion.h1 custom={0.12} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                  className="font-playfair font-bold text-[#F5F1E8] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] whitespace-pre-line">
                  {slide.heading}
                </motion.h1>

                <motion.p custom={0.24} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                  className="font-jakarta font-light text-[#F5F1E8]/70 text-sm sm:text-base leading-relaxed max-w-lg">
                  {slide.subheading}
                </motion.p>

                <motion.div custom={0.36} variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                  className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                  {/* EXPLORE MORE → /about */}
                  <Link
                    to="/about"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 bg-[#C5A880] text-[#121212]
                               font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase
                               transition-all duration-300 hover:bg-[#D4A373]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    EXPLORE MORE
                  </Link>
                  {/* GET DELIVERY → /menu */}
                  <Link
                    to="/menu"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 border border-[#F5F1E8]/40 text-[#F5F1E8]
                               font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase
                               transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    GET DELIVERY
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-10 flex items-center gap-3">
        <button type="button" onClick={() => handleManual(goPrev)} aria-label="Previous slide"
          className="w-10 h-10 flex items-center justify-center border border-[#F5F1E8]/30 text-[#F5F1E8]/70
                     hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-200
                     focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => handleManual(goNext)} aria-label="Next slide"
          className="w-10 h-10 flex items-center justify-center border border-[#F5F1E8]/30 text-[#F5F1E8]/70
                     hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-200
                     focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-4 sm:left-8 z-10 flex items-center gap-2"
        role="tablist" aria-label="Slide indicators">
        {heroSlides.map((_, i) => (
          <button key={i} type="button" role="tab" aria-selected={i === current} aria-label={`Go to slide ${i + 1}`}
            onClick={() => handleManual(() => setCurrent(i))}
            className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
              ${i === current ? 'w-5 h-1.5 bg-[#C5A880]' : 'w-1.5 h-1.5 bg-[#F5F1E8]/40 hover:bg-[#F5F1E8]/70'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
