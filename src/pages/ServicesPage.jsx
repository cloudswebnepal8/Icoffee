import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
  Sparkles,
  Cake,
  Pizza,
  Wine,
  ShieldCheck,
  ArrowRight,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import { allServices } from '../data/coffeeData';
import { fadeUp, staggerContainer, viewport } from '../utils/animations';

const iconMap = {
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
  Cake,
  Pizza,
  Wine,
};

const serviceFeatures = [
  {
    icon: Sparkles,
    title: 'Artisanal Preparation',
    description: 'Every drink and dish is crafted by certified culinary artisans using small-batch methods.',
  },
  {
    icon: ShieldCheck,
    title: 'ISO 22000 Certified',
    description: 'Our sourcing, roasting facility, and kitchens adhere to the highest global safety and quality criteria.',
  },
  {
    icon: Clock,
    title: 'Peak Freshness Guarantee',
    description: 'Beans roasted within 10 days of brew and pastries baked fresh each morning before doors open.',
  },
  {
    icon: HeartHandshake,
    title: 'Bespoke Event Hosting',
    description: 'Private mezzanine reservations with tailored menus and specialty coffee flight pairings.',
  },
];

const ServicesPage = () => {
  return (
    <>
      <PageHero
        label="SERVICES WE PROVIDE"
        heading="L'Coffee Services"
        breadcrumb={[{ label: 'Services', to: null }]}
      />

      {/* Main 6 Services Grid */}
      <section className="bg-[#121212] py-20 lg:py-28" aria-labelledby="services-catalog-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
              WHAT WE DO
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
            </p>
            <h2 id="services-catalog-heading" className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl">
              Signature Hospitality &amp; Dining
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-5" aria-hidden="true" />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {allServices.map((service) => {
              const Icon = iconMap[service.icon] || Coffee;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp(0)}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group relative flex flex-col bg-[#181818] border border-[#2A2A2A] overflow-hidden hover:border-[#C5A880]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
                >
                  {/* Top gold accent line */}
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-[#C5A880] transition-all duration-500 group-hover:w-full z-10" />

                  {/* Service Image Banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />

                    {/* Floating Icon Badge */}
                    <div className="absolute bottom-4 left-6 w-12 h-12 flex items-center justify-center bg-[#181818] border border-[#C5A880]/50 text-[#C5A880] shadow-lg">
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <span className="text-[#C5A880] font-jakarta text-[10px] tracking-[0.16em] uppercase font-semibold mb-2">
                      {service.subtitle}
                    </span>
                    <h3 className="font-playfair font-semibold text-[#F5F1E8] text-xl mb-3 group-hover:text-[#C5A880] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    <Link
                      to="/reservation"
                      className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase transition-all duration-300 group-hover:gap-3"
                    >
                      <span>BOOK THIS SERVICE</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Feature Ribbon */}
      <section className="bg-[#161616] py-20 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-3">
              THE L'COFFEE PROMISE
            </p>
            <h2 className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl">
              Why Guests Choose Our Service
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceFeatures.map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 bg-[#181818] border border-[#2A2A2A] hover:border-[#C5A880]/40 transition-colors duration-300"
                >
                  <div className="w-11 h-11 flex items-center justify-center border border-[#2A2A2A] text-[#C5A880] mb-5">
                    <FeatIcon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair font-semibold text-[#F5F1E8] text-lg mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-jakarta font-light text-[#A5A5A5] text-xs leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pre-footer Booking Banner */}
      <BookingCTA />
    </>
  );
};

export default ServicesPage;
