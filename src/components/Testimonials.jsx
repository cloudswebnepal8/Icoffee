import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data/coffeeData';
import { viewport } from '../utils/animations';

const AUTOPLAY_MS = 5000;

// Card slide animation — slides in from the right when going forward,
// from the left when going back.
const cardVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.35, ease: 'easeIn' } }),
};

// Five gold stars — built with an array so it's easy to make dynamic later
const StarRating = () => (
  <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className="fill-[#C5A880] text-[#C5A880]" aria-hidden="true" />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div
    className="
      flex flex-col justify-between h-full
      bg-[#181818] border border-[#2A2A2A] p-7 sm:p-8
    "
  >
    <div>
      <StarRating />
      <blockquote className="font-playfair italic text-[#F5F1E8]/85 text-base sm:text-lg leading-relaxed mb-7">
        "{testimonial.review}"
      </blockquote>
    </div>

    <div className="flex items-center gap-4 pt-5 border-t border-[#2A2A2A]">
      <img
        src={testimonial.avatar}
        alt={`Portrait of ${testimonial.name}`}
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        className="w-11 h-11 rounded-full object-cover object-center border border-[#2A2A2A] flex-shrink-0"
      />
      <div>
        <p className="font-jakarta font-semibold text-[#F5F1E8] text-sm">{testimonial.name}</p>
        <p className="font-jakarta text-[#A5A5A5] text-xs mt-0.5">
          {testimonial.role} · {testimonial.location}
        </p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [index,    setIndex]    = useState(0);
  const [dir,      setDir]      = useState(1);
  const [paused,   setPaused]   = useState(false);
  const total = testimonials.length;

  // On desktop we show 2 cards side-by-side.
  // The "page" advances by 1 so transitions look smooth.
  const goPrev = useCallback(() => {
    setDir(-1);
    setPaused(true);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setDir(1);
    setPaused(true);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Resume autoplay after a manual interaction
  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), AUTOPLAY_MS * 1.5);
      return () => clearTimeout(t);
    }
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, total]);

  // Show two consecutive testimonials on desktop, one on mobile
  const visible = [
    testimonials[index % total],
    testimonials[(index + 1) % total],
  ];

  return (
    <section
      id="testimonials"
      className="bg-[#121212] py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4"
            >
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
              TESTIMONIALS
            </motion.p>
            <motion.h2
              id="testimonials-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
            >
              What Our Guests Say
            </motion.h2>
          </div>

          {/* Prev / Next controls — shown at header level on desktop */}
          <div className="flex items-center gap-3" role="group" aria-label="Testimonial controls">
            <button
              type="button"
              onClick={goPrev}
              className="
                w-11 h-11 flex items-center justify-center
                border border-[#2A2A2A] text-[#F5F1E8]/50
                transition-all duration-200
                hover:border-[#C5A880] hover:text-[#C5A880]
                focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]
              "
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="
                w-11 h-11 flex items-center justify-center
                border border-[#2A2A2A] text-[#F5F1E8]/50
                transition-all duration-200
                hover:border-[#C5A880] hover:text-[#C5A880]
                focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]
              "
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Cards — desktop shows 2 columns, mobile shows 1 */}
        <div className="overflow-hidden" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {visible.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div
          className="flex items-center justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Testimonial indicators"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => { setPaused(true); setDir(i > index ? 1 : -1); setIndex(i); }}
              className={`
                transition-all duration-300 rounded-full
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                ${i === index
                  ? 'w-5 h-1.5 bg-[#C5A880]'
                  : 'w-1.5 h-1.5 bg-[#2A2A2A] hover:bg-[#A5A5A5]'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
