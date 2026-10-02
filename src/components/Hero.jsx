import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/coffeeData';

const AUTOPLAY_MS = 5500;

// Content animates as a whole block (enter/exit) — AnimatePresence handles
// unmounting the old slide's content before the new one enters.
const contentVariants = {
  enter:  { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -14, transition: { duration: 0.4, ease: 'easeIn' } },
};

// Each text element starts slightly delayed so they read top-to-bottom
// instead of all fading in at exactly the same time.
const labelVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6, ease: 'easeOut' } },
  exit:   { opacity: 0 },
};

const headingVariants = {
  enter:  { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0 },
};

const bodyVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { delay: 0.36, duration: 0.6, ease: 'easeOut' } },
  exit:   { opacity: 0 },
};

const buttonGroupVariants = {
  enter:  { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { delay: 0.52, duration: 0.55, ease: 'easeOut' } },
  exit:   { opacity: 0 },
};

// Memoised so the background image doesn't re-render when unrelated state changes.
// Each background is absolutely positioned; only the active one is visible.
const SlideBackground = React.memo(({ slide, active }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        key={slide.id}
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {/* Ken Burns: the CSS animation scales the image from 1x to 1.06x
            over the slide's lifetime, giving that subtle cinematic push-in. */}
        <div className="ken-burns absolute inset-0">
          <img
            src={slide.image}
            alt=""
            role="presentation"
            className="w-full h-full object-cover object-center"
            fetchPriority={slide.id === 1 ? 'high' : 'low'}
            loading={slide.id === 1 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        {/* Left-to-right gradient so the text on the left stays readable
            without a heavy uniform overlay that kills the image. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/80 via-[#121212]/50 to-transparent" />
        {/* Top and bottom fade to black so the navbar and scroll arrow
            don't clash visually with the image edges. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-transparent to-[#121212]/30" />
      </motion.div>
    )}
  </AnimatePresence>
));
SlideBackground.displayName = 'SlideBackground';

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const timerRef              = useRef(null);
  const total                 = heroSlides.length;

  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setPaused(true); // stop autoplay when the user takes control
    goTo(current - 1);
  }, [current, goTo]);

  const goNext = useCallback(() => {
    setPaused(true);
    goTo(current + 1);
  }, [current, goTo]);

  // Autoplay logic: if the user hasn't interacted, advance every AUTOPLAY_MS.
  // After a manual interaction we pause briefly and then resume — feels
  // less jarring than immediately jumping to the next slide.
  useEffect(() => {
    if (paused) {
      const resume = setTimeout(() => setPaused(false), AUTOPLAY_MS * 1.5);
      return () => clearTimeout(resume);
    }
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  // Arrow key navigation so keyboard and screen-reader users can
  // move through slides without reaching for the mouse.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  const slide = heroSlides[current];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden vignette"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
    >
      {/* All backgrounds are rendered at once so the browser has already
          loaded the next image by the time we crossfade to it. */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((s, i) => (
          <SlideBackground key={s.id} slide={s} active={i === current} />
        ))}
      </div>

      {/* Slide content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pt-36 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="max-w-xl lg:max-w-2xl"
            initial="enter"
            animate="center"
            exit="exit"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Small italic label above the main heading */}
            <motion.p
              variants={labelVariants}
              className="
                inline-flex items-center gap-2 mb-5
                font-playfair italic text-[#C5A880] text-[11px] sm:text-xs
                tracking-[0.2em] uppercase
              "
            >
              <span className="w-6 h-px bg-[#C5A880]" aria-hidden="true" />
              {slide.label}
            </motion.p>

            {/* Main heading — whitespace-pre-line honours the \n line breaks in the data */}
            <motion.h1
              variants={headingVariants}
              className="
                font-playfair font-bold text-[#F5F1E8]
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                leading-[1.08] whitespace-pre-line mb-6
              "
            >
              {slide.heading}
            </motion.h1>

            <motion.p
              variants={bodyVariants}
              className="
                font-jakarta font-light text-[#F5F1E8]/75
                text-sm sm:text-base leading-relaxed max-w-md mb-8
              "
            >
              {slide.subheading}
            </motion.p>

            <motion.div
              variants={buttonGroupVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#about"
                className="
                  inline-flex items-center px-7 py-3.5 bg-[#C5A880] text-[#121212]
                  text-[10px] font-jakarta font-bold tracking-[0.18em] uppercase
                  transition-all duration-300
                  hover:bg-[#D4A373] hover:shadow-lg hover:shadow-[#C5A880]/20
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                "
              >
                EXPLORE MORE
              </a>
              <a
                href="#contacts"
                className="
                  inline-flex items-center px-7 py-3.5
                  border border-[#F5F1E8]/40 text-[#F5F1E8]
                  text-[10px] font-jakarta font-bold tracking-[0.18em] uppercase
                  transition-all duration-300
                  hover:border-[#C5A880] hover:text-[#C5A880]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                "
              >
                GET DELIVERY
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls: stacked vertically on the right on desktop,
          laid out horizontally at the bottom on mobile. */}
      <div
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
          sm:left-auto sm:right-6 sm:translate-x-0
          flex sm:flex-col items-center gap-3 z-20
        "
        role="group"
        aria-label="Carousel controls"
      >
        <button
          type="button"
          onClick={goPrev}
          className="
            w-10 h-10 flex items-center justify-center
            border border-[#F5F1E8]/25 text-[#F5F1E8]/60
            transition-all duration-200
            hover:border-[#C5A880] hover:text-[#C5A880]
            focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]
          "
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        {/* Dot indicators double as tab-role navigation targets */}
        <div
          className="flex sm:flex-col items-center gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              onClick={() => { setPaused(true); goTo(i); }}
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                transition-all duration-300 rounded-full
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                ${i === current
                  ? 'w-2 h-2 bg-[#C5A880]'
                  : 'w-1.5 h-1.5 bg-[#F5F1E8]/30 hover:bg-[#F5F1E8]/60'
                }
              `}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="
            w-10 h-10 flex items-center justify-center
            border border-[#F5F1E8]/25 text-[#F5F1E8]/60
            transition-all duration-200
            hover:border-[#C5A880] hover:text-[#C5A880]
            focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]
          "
          aria-label="Next slide"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* "01 / 03" counter — purely decorative, hidden from screen readers */}
      <div
        className="
          absolute bottom-8 right-6 z-20
          hidden sm:flex items-baseline gap-1
          font-jakarta text-[#F5F1E8]/40 text-xs
        "
        aria-hidden="true"
      >
        <span className="text-[#C5A880] font-semibold text-sm">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span>/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default Hero;
