import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Coffee, ShoppingBag, ArrowRight } from 'lucide-react';
import { services } from '../data/coffeeData';
import { fadeUp, staggerContainer, viewport } from '../utils/animations';

// Map icon name strings from data to actual Lucide components.
// Adding a new service icon only requires updating coffeeData — no JSX changes.
const iconMap = { UtensilsCrossed, Coffee, ShoppingBag };

// Child variant for the stagger container — each card fades up in turn.
const cardVariant = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="
        group relative flex flex-col gap-5 p-7 sm:p-8
        bg-[#181818] border border-[#2A2A2A]
        cursor-default
        hover:border-[#C5A880]/60
        hover:shadow-[0_8px_40px_rgba(197,168,128,0.07)]
        transition-all duration-300
      "
    >
      {/* Gold corner accent — grows to full width on hover */}
      <div
        className="
          absolute top-0 left-0 h-0.5 w-0 bg-[#C5A880]
          transition-all duration-500 group-hover:w-full
        "
        aria-hidden="true"
      />

      {/* Icon — nudges right on hover to hint at interactivity */}
      <div
        className="
          w-12 h-12 flex items-center justify-center
          border border-[#2A2A2A] text-[#C5A880]
          transition-all duration-300
          group-hover:border-[#C5A880]/50 group-hover:bg-[#C5A880]/5
          group-hover:translate-x-1
        "
      >
        {Icon && <Icon size={22} strokeWidth={1.5} aria-hidden="true" />}
      </div>

      <div className="flex-1">
        <h3 className="font-playfair font-semibold text-[#F5F1E8] text-xl mb-3 leading-snug">
          {service.title}
        </h3>
        <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Arrow action — slides right on hover */}
      <div
        className="
          flex items-center gap-2
          text-[#C5A880]/60 text-[10px] font-jakarta font-semibold tracking-[0.15em] uppercase
          transition-all duration-300
          group-hover:text-[#C5A880] group-hover:gap-3
        "
        aria-hidden="true"
      >
        EXPLORE
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};

const Services = () => (
  <section
    id="services"
    className="bg-[#121212] py-20 lg:py-28"
    aria-labelledby="services-heading"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section header */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="text-center mb-14"
      >
        <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">
          <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
          WHAT WE OFFER
          <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
        </p>
        <h2
          id="services-heading"
          className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl"
        >
          Our Services
        </h2>
      </motion.div>

      {/* Cards grid — stagger children */}
      <motion.div
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default Services;
