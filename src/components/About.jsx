import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { aboutData } from '../data/coffeeData';

// Reusable fade-up preset — delay lets us stagger child elements
// without copy-pasting the full transition object everywhere.
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay } },
});

// Slight scale-up on the image so it feels like it's "arriving" into view.
const scaleUp = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

// Floats over the bottom-left corner of the main image.
// Positioned with negative offsets to break out of the image boundary —
// that slight "spill" gives it a layered, editorial look.
const QuoteCard = ({ quote }) => (
  <motion.div
    variants={scaleUp(0.25)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    className="
      absolute -bottom-10 -left-6 sm:-bottom-12 sm:-left-10
      w-64 sm:w-72 p-5
      bg-[#181818] border border-[#2A2A2A]
      shadow-2xl
    "
    role="blockquote"
    aria-label="Customer testimonial"
  >
    <div className="w-6 h-0.5 bg-[#C5A880] mb-4" aria-hidden="true" />

    <p className="font-playfair italic text-[#F5F1E8]/85 text-[13px] leading-relaxed mb-4">
      {quote.text}
    </p>

    <div className="flex items-center gap-3">
      <img
        src={quote.avatar}
        alt={`Portrait of ${quote.author}`}
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="w-10 h-10 rounded-full object-cover object-center border border-[#2A2A2A] flex-shrink-0"
      />
      <div>
        <p className="font-jakarta font-semibold text-[#F5F1E8] text-[11px] tracking-wide">
          {quote.author}
        </p>
        <p className="font-jakarta text-[#A5A5A5] text-[10px] mt-0.5">
          {quote.role}
        </p>
      </div>
    </div>
  </motion.div>
);

// Tiny decorative leaf used in a couple of spots.
// aria-hidden so screen readers don't waste time on it.
const CoffeeLeaf = ({ className }) => (
  <Leaf size={14} className={`text-[#C5A880]/30 ${className}`} aria-hidden="true" />
);

const About = () => {
  const { label, heading, description, secondary, cta, quote, image } = aboutData;

  return (
    <section
      id="about"
      className="relative bg-[#121212] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Very subtle dot pattern in the background — opacity is low enough
          that it reads as texture rather than a competing element. */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C5A880 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, #C5A880 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left column: all the text */}
          <div className="lg:pr-8">

            {/* Small italic eyebrow label */}
            <motion.p
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="
                inline-flex items-center gap-2 mb-5
                font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase
              "
            >
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
              {label}
            </motion.p>

            <motion.h2
              id="about-heading"
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="
                font-playfair font-bold text-[#F5F1E8]
                text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-7
              "
            >
              {heading}
            </motion.h2>

            {/* Gold-line divider with a tiny leaf — breaks up the heading
                and body text without heavy visual weight. */}
            <motion.div
              variants={fadeIn(0.18)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-7"
              aria-hidden="true"
            >
              <div className="w-8 h-0.5 bg-[#C5A880]" />
              <CoffeeLeaf />
              <div className="w-16 h-px bg-[#2A2A2A]" />
            </motion.div>

            <motion.p
              variants={fadeUp(0.22)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-jakarta font-light text-[#A5A5A5] text-sm sm:text-[15px] leading-relaxed mb-5"
            >
              {description}
            </motion.p>

            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-jakarta font-light text-[#A5A5A5] text-sm sm:text-[15px] leading-relaxed mb-10"
            >
              {secondary}
            </motion.p>

            {/* Quick-glance stats — these animate in together as a row */}
            <motion.div
              variants={fadeUp(0.36)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 pb-10 border-b border-[#2A2A2A]"
            >
              {[
                { value: '10+', label: 'Years\nof Craft' },
                { value: '48',  label: 'Bean\nOrigins'  },
                { value: '99%', label: 'Happy\nGuests'  },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="font-playfair font-bold text-[#C5A880] text-2xl sm:text-3xl leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="font-jakarta text-[#A5A5A5] text-[10px] tracking-[0.08em] uppercase leading-snug whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Arrow CTA — the gap increases on hover for a subtle "reach out" feel */}
            <motion.div
              variants={fadeUp(0.42)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                to="/about"
                className="
                  inline-flex items-center gap-3
                  text-[#C5A880] font-jakarta font-semibold text-[10px] tracking-[0.2em] uppercase
                  group transition-all duration-300 hover:gap-4
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                  focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]
                "
              >
                {cta}
                <span
                  className="
                    w-8 h-8 flex items-center justify-center
                    border border-[#C5A880]/50
                    transition-all duration-300
                    group-hover:bg-[#C5A880] group-hover:text-[#121212]
                  "
                  aria-hidden="true"
                >
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right column: main image with the quote card overlapping it */}
          <div className="relative">

            {/* Dot grid behind the image — only shows on large screens
                so it doesn't compete with the mobile layout. */}
            <div
              className="absolute -top-4 -right-4 w-28 h-28 opacity-20 hidden lg:block"
              style={{
                backgroundImage: 'radial-gradient(circle, #C5A880 1.5px, transparent 1.5px)',
                backgroundSize: '10px 10px',
              }}
              aria-hidden="true"
            />

            <motion.div
              variants={scaleUp(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="relative overflow-hidden"
            >
              <img
                src={image}
                alt="L'Coffee premium coffee packaging and product display"
                width={900}
                height={1050}
                loading="lazy"
                decoding="async"
                className="
                  w-full h-[420px] sm:h-[520px] lg:h-[620px]
                  object-cover object-center
                  transition-transform duration-700 hover:scale-[1.02]
                "
              />
              {/* Bottom gradient hides the hard edge of the image against the section background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Fine corner detail — adds a quiet luxury touch */}
            <div
              className="absolute top-4 right-4 w-16 h-16 border border-[#C5A880]/30 pointer-events-none"
              aria-hidden="true"
            />

            <QuoteCard quote={quote} />

            <CoffeeLeaf className="absolute top-10 -left-3 rotate-45 hidden sm:block" />
            <CoffeeLeaf className="absolute bottom-24 right-4 -rotate-30 hidden sm:block" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
