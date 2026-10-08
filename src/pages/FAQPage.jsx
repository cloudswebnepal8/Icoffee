import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import { faqItems } from '../data/coffeeData';
import { fadeUp, viewport } from '../utils/animations';

const FAQPage = () => {
  const [openId, setOpenId] = useState(1); // Default open the first question

  const toggleQuestion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageHero
        label="HAVE ANY QUESTIONS?"
        heading="Frequently Asked Questions"
        breadcrumb={[{ label: 'FAQ', to: null }]}
      />

      <section className="bg-[#121212] py-20 lg:py-28" aria-label="Frequently asked questions section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header intro */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-3">
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
              CLEAR ANSWERS FOR OUR GUESTS
              <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
            </p>
            <h2 className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl">
              Everything You Need to Know
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" aria-hidden="true" />
          </motion.div>

          {/* Accordion Questions List */}
          <div className="space-y-4">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border transition-colors duration-200 ${
                    isOpen
                      ? 'bg-[#181818] border-[#C5A880]/60'
                      : 'bg-[#161616] border-[#2A2A2A] hover:border-[#C5A880]/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleQuestion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle
                        size={18}
                        className={`shrink-0 transition-colors ${
                          isOpen ? 'text-[#C5A880]' : 'text-[#A5A5A5]'
                        }`}
                      />
                      <span className="font-playfair font-semibold text-[#F5F1E8] text-base sm:text-lg">
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`w-7 h-7 flex items-center justify-center border shrink-0 transition-colors ${
                        isOpen
                          ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10'
                          : 'border-[#2A2A2A] text-[#A5A5A5]'
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm font-jakarta font-light text-[#A5A5A5] leading-relaxed border-t border-[#2A2A2A]/60 pt-4 ml-7 sm:ml-8">
                          <p>{item.answer}</p>
                          <span className="inline-block mt-3 text-[10px] text-[#C5A880] font-semibold uppercase tracking-wider">
                            Category: {item.category}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Need More Assistance Banner */}
          <div className="mt-16 p-8 bg-[#181818] border border-[#2A2A2A] text-center flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <span className="text-[#C5A880] font-jakarta text-[10px] tracking-widest uppercase font-semibold">
                CAN'T FIND WHAT YOU ARE LOOKING FOR?
              </span>
              <h3 className="font-playfair font-bold text-[#F5F1E8] text-xl mt-1">
                Speak Directly with Our Team
              </h3>
              <p className="font-jakarta text-[#A5A5A5] text-xs mt-1">
                Our baristas and guest relations managers are available daily from 08:00 AM.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[10px] tracking-widest uppercase hover:bg-[#D4A373] transition-colors"
              >
                <MessageSquare size={13} />
                <span>CONTACT US</span>
              </Link>
              <a
                href="tel:+12125550199"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#2A2A2A] text-[#F5F1E8] font-jakarta font-semibold text-[10px] tracking-widest uppercase hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
              >
                <Phone size={13} />
                <span>+1 (212) 555-0199</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Booking Banner */}
      <BookingCTA />
    </>
  );
};

export default FAQPage;
