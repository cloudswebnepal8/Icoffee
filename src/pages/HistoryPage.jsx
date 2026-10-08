import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import Stats from '../components/Stats';
import { historyTimeline } from '../data/coffeeData';
import { fadeUp, viewport } from '../utils/animations';

const milestones = [
  { icon: Award, label: '30+ Years', desc: 'Of Artisanal Roasting & Culinary Heritage' },
  { icon: Compass, label: '48 Origins', desc: 'Direct-Trade Micro-Lot Partner Cooperatives' },
  { icon: ShieldCheck, label: '100% ISO', desc: 'Certified Global Food Safety Standards' },
  { icon: HeartHandshake, label: '350+ Baristas', desc: 'Graduated from Our Master Academy' },
];

const HistoryPage = () => {
  return (
    <>
      <PageHero
        label="OUR HISTORY"
        heading="Something Know About Our History"
        breadcrumb={[{ label: 'History', to: null }]}
      />

      {/* Founder Story & Vision Section */}
      <section className="bg-[#121212] py-20 lg:py-28" aria-labelledby="history-story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Founder Image Portrait */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-5 relative"
            >
              <div className="relative overflow-hidden border border-[#2A2A2A]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop"
                  alt="Dante J. Castaneda — Founder & Master Roaster"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[450px] sm:h-[520px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-[#181818] border border-[#C5A880]/50 p-5 sm:p-6 max-w-xs shadow-2xl">
                <p className="font-playfair italic text-[#F5F1E8] text-xs sm:text-sm leading-relaxed mb-2">
                  "Coffee is not merely roasted; it is a living conversation between soil, fire, and community."
                </p>
                <p className="font-jakarta text-[#C5A880] text-[11px] font-bold uppercase tracking-wider">
                  Dante J. Castaneda
                </p>
                <p className="font-jakarta text-[#A5A5A5] text-[10px]">
                  Founder &amp; Head Roaster
                </p>
              </div>
            </motion.div>

            {/* Founder Narrative */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-7"
            >
              <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">
                <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
                HOW IT ALL BEGAN
              </p>
              <h2 id="history-story-heading" className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                Rooted in Craft, Defined by Heritage
              </h2>
              <div className="w-16 h-0.5 bg-[#C5A880] mb-8" aria-hidden="true" />

              <p className="font-jakarta font-light text-[#A5A5A5] text-sm sm:text-base leading-relaxed mb-5">
                In 1996, Dante Castaneda opened the first L'Coffee doors with a solitary cast-iron roaster and an unwavering conviction: that coffee deserves the same reverence, precision, and terroir-driven appreciation as fine vintage wine.
              </p>

              <p className="font-jakarta font-light text-[#A5A5A5] text-sm sm:text-base leading-relaxed mb-8">
                What began as a quiet gathering place for local artists and coffee lovers soon expanded into an international sanctuary. Over nearly three decades, we have remained devoted to small-batch roasting, fair-trade ethical agriculture, and the sacred ritual of slow conversation over a hot porcelain cup.
              </p>

              {/* Four Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2A2A2A]">
                {milestones.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="text-center sm:text-left">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded border border-[#2A2A2A] text-[#C5A880] mb-2">
                        <Icon size={14} />
                      </div>
                      <p className="font-playfair font-bold text-[#F5F1E8] text-sm">{m.label}</p>
                      <p className="font-jakarta text-[#A5A5A5] text-[10px] leading-tight mt-0.5">{m.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="bg-[#161616] py-20 lg:py-28 border-y border-[#2A2A2A]" aria-labelledby="timeline-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-3">
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
              THE TIMELINE
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
            </p>
            <h2 id="timeline-heading" className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl">
              Milestones That Shaped L'Coffee
            </h2>
          </div>

          <div className="relative">
            {/* Central Vertical Timeline Rule */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-[#2A2A2A] -translate-x-1/2" aria-hidden="true" />

            <div className="space-y-12 sm:space-y-16">
              {historyTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content Column */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                      <div className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta text-xs font-semibold tracking-wider uppercase mb-1">
                        <Calendar size={13} /> {item.date}
                      </div>
                      <h3 className="font-playfair font-bold text-[#F5F1E8] text-xl sm:text-2xl mb-2">
                        {item.title}
                      </h3>
                      <p className="font-jakarta font-light text-[#A5A5A5] text-xs sm:text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <span className="inline-block bg-[#202020] text-[#C5A880] border border-[#C5A880]/30 px-3 py-1 font-jakarta text-[10px] uppercase tracking-wider">
                        {item.highlight}
                      </span>
                    </div>

                    {/* Timeline Node Badge in Center */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#181818] border-2 border-[#C5A880] items-center justify-center text-[#C5A880] font-playfair font-bold text-xs shadow-xl z-10">
                      {item.year.slice(2)}
                    </div>

                    {/* Image Column */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                      <div className="relative h-52 sm:h-60 overflow-hidden border border-[#2A2A2A] shadow-xl group">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#121212]/30 group-hover:bg-[#121212]/10 transition-colors" />
                        <span className="absolute top-3 left-3 bg-[#181818]/90 text-[#F5F1E8] border border-[#2A2A2A] px-2.5 py-1 text-[11px] font-playfair font-bold">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <Stats />

      {/* Pre-footer Booking Banner */}
      <BookingCTA />
    </>
  );
};

export default HistoryPage;
