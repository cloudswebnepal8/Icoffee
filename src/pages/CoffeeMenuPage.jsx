import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import { menuItems } from '../data/coffeeData';
import { staggerContainer, viewport } from '../utils/animations';

const itemVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const MenuItem = ({ item }) => (
  <motion.div
    variants={itemVariant}
    className="group flex items-center gap-4 py-4 border-b border-[#2A2A2A] last:border-b-0 hover:border-[#C5A880]/30 transition-colors duration-300"
  >
    <div className="flex-shrink-0 w-14 h-14 overflow-hidden">
      <img src={item.image} alt={item.name} width={56} height={56} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base leading-snug mb-0.5 group-hover:text-[#C5A880] transition-colors duration-300">
        {item.name}
      </h3>
      <p className="font-jakarta font-light text-[#A5A5A5] text-xs leading-relaxed truncate">{item.composition}</p>
    </div>
    <div className="hidden sm:block flex-1 border-b border-dotted border-[#2A2A2A] mx-2" aria-hidden="true" />
    <div className="flex-shrink-0 font-playfair font-bold text-[#C5A880] text-base group-hover:text-[#D4A373] transition-colors duration-300">
      ${item.price.toFixed(2)}
    </div>
  </motion.div>
);

const CoffeeMenuPage = () => {
  const half = Math.ceil(menuItems.length / 2);
  return (
    <>
      <PageHero
        label="HANDCRAFTED DRINKS"
        heading="Coffee Menu"
        breadcrumb={[{ label: 'Menu', to: '/menu' }, { label: 'Coffee', to: null }]}
      />
      <section className="bg-[#121212] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-20">
            <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={viewport}>
              {menuItems.slice(0, half).map(item => <MenuItem key={item.id} item={item} />)}
            </motion.div>
            <motion.div variants={staggerContainer(0.08, 0.14)} initial="hidden" whileInView="visible" viewport={viewport}>
              {menuItems.slice(half).map(item => <MenuItem key={item.id} item={item} />)}
            </motion.div>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
};

export default CoffeeMenuPage;
