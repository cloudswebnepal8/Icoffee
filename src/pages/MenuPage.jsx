import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import { menuItems, restaurantItems, foodItems } from '../data/coffeeData';
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

const TABS = [
  { key: 'coffee',     label: 'Coffee',     items: menuItems       },
  { key: 'restaurant', label: 'Restaurant', items: restaurantItems },
  { key: 'food',       label: 'Food & Bakery', items: foodItems    },
];

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('coffee');
  const tab = TABS.find(t => t.key === activeTab);
  const half = Math.ceil(tab.items.length / 2);

  return (
    <>
      <PageHero
        label="OUR MENU"
        heading="Explore Our Full Menu"
        breadcrumb={[{ label: 'Menu', to: null }]}
      />

      <section id="menu" className="bg-[#181212] py-20 lg:py-28" aria-label="Full menu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14" role="tablist" aria-label="Menu categories">
            {TABS.map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={activeTab === t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-5 py-2.5 text-[10px] font-jakarta font-bold tracking-[0.15em] uppercase
                  border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]
                  ${activeTab === t.key
                    ? 'bg-[#C5A880] text-[#121212] border-[#C5A880]'
                    : 'border-[#2A2A2A] text-[#A5A5A5] hover:border-[#C5A880]/50 hover:text-[#F5F1E8]'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Two-column menu grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-20">
            <motion.div key={activeTab + '-left'} variants={staggerContainer(0.07)} initial="hidden" whileInView="visible" viewport={viewport}>
              {tab.items.slice(0, half).map(item => <MenuItem key={item.id} item={item} />)}
            </motion.div>
            <motion.div key={activeTab + '-right'} variants={staggerContainer(0.07, 0.12)} initial="hidden" whileInView="visible" viewport={viewport}>
              {tab.items.slice(half).map(item => <MenuItem key={item.id} item={item} />)}
            </motion.div>
          </div>

          {/* Delivery note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 p-8 border border-[#2A2A2A] bg-[#181818] text-center"
          >
            <h3 className="font-playfair font-semibold text-[#F5F1E8] text-xl mb-3">Order Your Favourite Coffee</h3>
            <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed max-w-lg mx-auto mb-6">
              Our online delivery service is launching soon. In the meantime, visit us in store or call to arrange a takeaway order.
            </p>
            <a href="tel:+12125550199"
              className="inline-flex items-center px-7 py-3 border border-[#C5A880] text-[#C5A880]
                         font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase
                         transition-all duration-300 hover:bg-[#C5A880] hover:text-[#121212]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
              CALL TO ORDER
            </a>
          </motion.div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
};

export default MenuPage;
