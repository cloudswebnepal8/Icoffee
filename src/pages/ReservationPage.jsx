import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { fadeUp, viewport } from '../utils/animations';

const personOptions = [
  '1 Person',
  '2 Persons',
  '3 Persons',
  '4 Persons',
  '5+ Persons',
];

const timeOptions = [
  '08:00 AM',
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM',
  '08:30 PM',
];

const workingHours = [
  { days: 'Sunday – Thursday', hours: '08:00 AM – 09:00 PM' },
  { days: 'Friday',           hours: '03:00 PM – 09:00 PM' },
  { days: 'Saturday',         hours: 'Closed for Roasting & Private Events' },
];

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    persons: '2 Persons',
    date: '',
    time: '06:30 PM',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) errs.phone = 'Please provide your phone number.';
    if (!formData.date) errs.date = 'Please select a reservation date.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    // Simulate swift local processing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      persons: '2 Persons',
      date: '',
      time: '06:30 PM',
      message: '',
    });
  };

  return (
    <>
      <PageHero
        label="RESERVATION"
        heading="Booking Table"
        breadcrumb={[{ label: 'Reservation', to: null }]}
      />

      <section className="bg-[#121212] py-20 lg:py-28" aria-label="Table reservation section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Reservation Form */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-7 bg-[#181818] border border-[#2A2A2A] p-7 sm:p-10 shadow-2xl relative"
            >
              <div className="mb-8">
                <p className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-2">
                  <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
                  RESERVE YOUR TABLE
                </p>
                <h2 className="font-playfair font-bold text-[#F5F1E8] text-2xl sm:text-3xl">
                  Make Your Reservation
                </h2>
                <p className="font-jakarta text-[#A5A5A5] text-xs sm:text-sm mt-2">
                  Join us for handcrafted coffee, freshly baked artisanal pastries, and unforgettable culinary moments.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center bg-[#202020] border border-[#C5A880]/50"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-playfair font-bold text-[#F5F1E8] text-2xl mb-2">
                      Reservation Confirmed!
                    </h3>
                    <p className="font-jakarta text-[#C5A880] text-sm font-semibold mb-4">
                      Thanks, your reservation is sent successfully.
                    </p>
                    <p className="font-jakarta text-[#A5A5A5] text-xs leading-relaxed max-w-md mx-auto mb-6">
                      We have reserved your table for <span className="text-[#F5F1E8] font-medium">{formData.persons}</span> on{' '}
                      <span className="text-[#F5F1E8] font-medium">{formData.date}</span> at{' '}
                      <span className="text-[#F5F1E8] font-medium">{formData.time}</span>. A confirmation has been sent to{' '}
                      <span className="text-[#F5F1E8] font-medium">{formData.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-8 py-3 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase hover:bg-[#D4A373] transition-colors"
                    >
                      Book Another Table
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="reservation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Full Name */}
                    <div>
                      <label htmlFor="res-name" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="res-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Johnathan Davis"
                        className={`w-full bg-[#121212] border ${errors.name ? 'border-red-500' : 'border-[#2A2A2A]'} text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1 font-jakarta">{errors.name}</p>}
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="res-email" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="res-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full bg-[#121212] border ${errors.email ? 'border-red-500' : 'border-[#2A2A2A]'} text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 font-jakarta">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="res-phone" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="res-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 234-5678"
                          className={`w-full bg-[#121212] border ${errors.phone ? 'border-red-500' : 'border-[#2A2A2A]'} text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors`}
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1 font-jakarta">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Persons, Date, and Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="res-persons" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                          Guests
                        </label>
                        <div className="relative">
                          <select
                            id="res-persons"
                            name="persons"
                            value={formData.persons}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-[#2A2A2A] text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors appearance-none"
                          >
                            {personOptions.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#181818] text-[#F5F1E8]">
                                {opt}
                              </option>
                            ))}
                          </select>
                          <Users size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="res-date" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                          Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="res-date"
                            name="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full bg-[#121212] border ${errors.date ? 'border-red-500' : 'border-[#2A2A2A]'} text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors`}
                          />
                        </div>
                        {errors.date && <p className="text-red-400 text-xs mt-1 font-jakarta">{errors.date}</p>}
                      </div>

                      <div>
                        <label htmlFor="res-time" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                          Time Slot
                        </label>
                        <div className="relative">
                          <select
                            id="res-time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-[#2A2A2A] text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors appearance-none"
                          >
                            {timeOptions.map((t) => (
                              <option key={t} value={t} className="bg-[#181818] text-[#F5F1E8]">
                                {t}
                              </option>
                            ))}
                          </select>
                          <Clock size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label htmlFor="res-message" className="block text-[#F5F1E8] font-jakarta text-xs font-medium uppercase tracking-wider mb-1.5">
                        Special Requests / Occasion (Optional)
                      </label>
                      <textarea
                        id="res-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Window seating, birthday celebration, dietary requirements..."
                        className="w-full bg-[#121212] border border-[#2A2A2A] text-[#F5F1E8] px-4 py-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#D4A373] disabled:opacity-50"
                    >
                      {loading ? (
                        <span>PROCESSING...</span>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>BOOKING TABLE</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column: Working Hours & Location Details */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-5 space-y-6"
            >
              {/* Working Hours Card */}
              <div className="bg-[#181818] border border-[#2A2A2A] p-7 sm:p-8">
                <div className="flex items-center gap-2 text-[#C5A880] mb-3">
                  <Clock size={16} aria-hidden="true" />
                  <span className="font-playfair italic text-xs tracking-widest uppercase">SCHEDULE</span>
                </div>
                <h3 className="font-playfair font-bold text-[#F5F1E8] text-xl mb-6 pb-3 border-b border-[#2A2A2A]">
                  Working Hours
                </h3>
                <ul className="space-y-4">
                  {workingHours.map((wh) => (
                    <li key={wh.days} className="flex flex-col gap-1">
                      <span className="font-jakarta font-semibold text-[#F5F1E8] text-xs uppercase tracking-wider">
                        {wh.days}
                      </span>
                      <span className="font-jakarta font-light text-[#A5A5A5] text-sm">
                        {wh.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Location Card */}
              <div className="bg-[#181818] border border-[#2A2A2A] p-7 sm:p-8">
                <div className="flex items-center gap-2 text-[#C5A880] mb-3">
                  <MapPin size={16} aria-hidden="true" />
                  <span className="font-playfair italic text-xs tracking-widest uppercase">LOCATION</span>
                </div>
                <h3 className="font-playfair font-bold text-[#F5F1E8] text-xl mb-6 pb-3 border-b border-[#2A2A2A]">
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <MapPin size={16} className="text-[#C5A880] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-jakarta text-[#F5F1E8] text-xs font-semibold uppercase">Location</p>
                      <p className="font-jakarta text-[#A5A5A5] text-sm font-light mt-0.5">
                        55 Main Street, New York, NY 10001
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail size={16} className="text-[#C5A880] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-jakarta text-[#F5F1E8] text-xs font-semibold uppercase">Email Address</p>
                      <a href="mailto:hello@lcoffee.com" className="font-jakarta text-[#A5A5A5] hover:text-[#C5A880] text-sm font-light mt-0.5 transition-colors">
                        hello@lcoffee.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone size={16} className="text-[#C5A880] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-jakarta text-[#F5F1E8] text-xs font-semibold uppercase">Phone Number</p>
                      <a href="tel:+12125550199" className="font-jakarta text-[#A5A5A5] hover:text-[#C5A880] text-sm font-light mt-0.5 transition-colors">
                        +1 (212) 555-0199
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReservationPage;
