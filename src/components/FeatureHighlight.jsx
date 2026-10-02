import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BadgeCheck } from 'lucide-react';
import { features } from '../data/coffeeData';
import { fadeUp, scaleIn, staggerContainer, viewport } from '../utils/animations';

// Maps icon strings from data to Lucide components — same pattern as Services.
const iconMap = { Leaf, BadgeCheck };

const FeatureItem = ({ feature, index }) => {
  const Icon = iconMap[feature.icon];
  const isLast = index === features.length - 1;

  return (
    <motion.div
      variants={fadeUp(index * 0.12)}
      className={`flex gap-5 ${!isLast ? 'pb-7 border-b border-[#2A2A2A] mb-7' : ''}`}
    >
      {/* Icon circle */}
      <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center border border-[#C5A880]/40 text-[#C5A880]">
        {Icon && <Icon size={18} strokeWidth={1.5} aria-hidden="true" />}
      </div>

      <div>
        <h3 className="font-playfair font-semibold text-[#F5F1E8] text-lg mb-2 leading-snug">
          {feature.title}
        </h3>
        <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const FeatureHighlight = () => (
  <section
    id="why-us"
    className="bg-[#121212] py-20 lg:py-28 overflow-hidden"
    aria-labelledby="feature-heading"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: large coffee preparation image */}
        <motion.div
          variants={scaleIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative overflow-hidden order-1 lg:order-none"
        >
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80&auto=format&fit=crop"
            alt="Barista preparing latte art — steaming milk being poured over espresso"
            width={900}
            height={1000}
            loading="lazy"
            decoding="async"
            className="
              w-full h-[400px] sm:h-[500px] lg:h-[600px]
              object-cover object-center
              transition-transform duration-700 hover:scale-[1.02]
            "
          />
          {/* Gradient prevents the image from fighting with the dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/30 via-transparent to-transparent pointer-events-none" />

          {/* Fine corner detail */}
          <div className="absolute bottom-5 right-5 w-14 h-14 border border-[#C5A880]/30 pointer-events-none" aria-hidden="true" />
        </motion.div>

        {/* Right: heading + feature list */}
        <div>
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-5"
          >
            <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
            WHY CHOOSE US
          </motion.p>

          <motion.h2
            id="feature-heading"
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-10"
          >
            Crafted With Passion,<br />Served With Purpose
          </motion.h2>

          {/* Feature list — staggered */}
          <motion.div
            variants={staggerContainer(0.14, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {features.map((feature, i) => (
              <FeatureItem key={feature.id} feature={feature} index={i} />
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

export default FeatureHighlight;
