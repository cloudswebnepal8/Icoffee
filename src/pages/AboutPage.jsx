import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, BadgeCheck, Coffee } from 'lucide-react';
import PageHero from '../components/PageHero';
import Stats from '../components/Stats';
import BookingCTA from '../components/BookingCTA';
import { aboutData } from '../data/coffeeData';
import { fadeUp, viewport } from '../utils/animations';

const AboutPage = () => {
  const { heading, description, secondary, quote, image } = aboutData;

  return (
    <>
      <PageHero
        label="OUR STORY"
        heading="About L'Coffee"
        breadcrumb={[{ label: 'About', to: null }]}
      />

      {/* Main about content */}
      <section className="bg-[#121212] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.75 }}
              className="relative overflow-hidden order-2 lg:order-1"
            >
              <img
                src={image}
                alt="L'Coffee premium coffee environment"
                width={900}
                height={1050}
                loading="lazy"
                decoding="async"
                className="w-full h-[420px] sm:h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 w-14 h-14 border border-[#C5A880]/30 pointer-events-none" aria-hidden="true" />
            </motion.div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <motion.p
                variants={fadeUp(0)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-5"
              >
                <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
                ABOUT L'COFFEE
              </motion.p>

              <motion.h2
                variants={fadeUp(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl leading-[1.1] mb-6"
              >
                {heading}
              </motion.h2>

              <motion.p variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={viewport}
                className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-4">
                {description}
              </motion.p>

              <motion.p variants={fadeUp(0.25)} initial="hidden" whileInView="visible" viewport={viewport}
                className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-8">
                {secondary}
              </motion.p>

              {/* Values */}
              {[
                { icon: Leaf, title: 'Ethically Sourced', desc: 'Every bean is traceable back to the farm that grew it.' },
                { icon: Coffee, title: 'In-House Roasting', desc: 'Roasted fresh twice a week in our purpose-built roastery.' },
                { icon: BadgeCheck, title: 'ISO 22000 Certified', desc: 'Our entire supply chain meets international food safety standards.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp(0.1 * i + 0.3)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="flex gap-4 mb-5 last:mb-0"
                >
                  <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-[#C5A880]/40 text-[#C5A880]">
                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-jakarta font-semibold text-[#F5F1E8] text-sm mb-0.5">{title}</p>
                    <p className="font-jakarta text-[#A5A5A5] text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#181818] border-y border-[#2A2A2A] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7 }}
          >
            <p className="font-playfair italic text-[#F5F1E8]/85 text-xl sm:text-2xl leading-relaxed mb-8">
              {quote.text}
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src={quote.avatar} alt={`Portrait of ${quote.author}`} width={48} height={48} loading="lazy"
                className="w-12 h-12 rounded-full object-cover border border-[#2A2A2A]" />
              <div className="text-left">
                <p className="font-jakarta font-semibold text-[#F5F1E8] text-sm">{quote.author}</p>
                <p className="font-jakarta text-[#A5A5A5] text-xs mt-0.5">{quote.role}</p>
              </div>
            </div>
          </motion.blockquote>
        </div>
      </section>

      <Stats />
      <BookingCTA />
    </>
  );
};

export default AboutPage;
