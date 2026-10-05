import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MessageSquare, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import { fadeUp, viewport } from '../utils/animations';

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const INITIAL = {
  name: '', email: '', phone: '',
  date: '', time: '', guests: '',
  request: '',
};

// Generate time slot options in 30-minute intervals
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i / 2) + 8; // 08:00 – 19:30
  if (h >= 20) return null;
  const m = i % 2 === 0 ? '00' : '30';
  const label = `${String(h).padStart(2, '0')}:${m}`;
  return <option key={label} value={label}>{label}</option>;
}).filter(Boolean);

// Today's date in YYYY-MM-DD for the min attribute on the date picker
const today = new Date().toISOString().split('T')[0];

const BookingPage = () => {
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name    = 'Your name is required.';
    if (!form.email.trim())              e.email   = 'Your email is required.';
    else if (!isValidEmail(form.email))  e.email   = 'Please enter a valid email address.';
    if (!form.date)                      e.date    = 'Please choose a date.';
    if (!form.time)                      e.time    = 'Please choose a time.';
    if (!form.guests || Number(form.guests) < 1) e.guests = 'At least 1 guest required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSuccess(true);
    setForm(INITIAL);
  };

  const inputClass = (field) => `
    w-full bg-[#202020] border px-4 py-3 text-[#F5F1E8] font-jakarta text-sm
    placeholder:text-[#A5A5A5]/50 outline-none transition-colors duration-200
    focus:border-[#C5A880]
    ${errors[field] ? 'border-red-500/60' : 'border-[#2A2A2A]'}
  `;

  const labelClass = 'block font-jakarta font-medium text-[#F5F1E8]/80 text-xs tracking-[0.1em] uppercase mb-2';

  return (
    <>
      <PageHero
        label="RESERVE YOUR TABLE"
        heading="Book a Table"
        breadcrumb={[{ label: 'Book a Table', to: null }]}
      />

      <section className="bg-[#121212] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 text-center border border-[#2A2A2A] bg-[#181818] px-8"
            >
              <div className="w-16 h-16 flex items-center justify-center border border-[#C5A880] text-[#C5A880] mb-6">
                <Check size={28} aria-hidden="true" />
              </div>
              <h2 className="font-playfair font-bold text-[#F5F1E8] text-2xl sm:text-3xl mb-4">Reservation Received!</h2>
              <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed max-w-md">
                Your table request has been received. We'll confirm your reservation shortly via email or phone.
              </p>
              <button onClick={() => setSuccess(false)}
                className="mt-8 text-[#C5A880] font-jakarta text-[10px] tracking-[0.15em] uppercase border border-[#C5A880] px-7 py-3
                           hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
                MAKE ANOTHER BOOKING
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Table booking form"
              className="bg-[#181818] border border-[#2A2A2A] p-8 sm:p-10 space-y-6"
            >
              <div className="mb-8">
                <p className="font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-2">Complete the form</p>
                <h2 className="font-playfair font-semibold text-[#F5F1E8] text-2xl">Reserve Your Seat</h2>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name</label>
                  <input id="name" name="name" type="text" autoComplete="name"
                    value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass('name')} />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email"
                    value={form.email} onChange={handleChange} placeholder="jane@email.com" className={inputClass('email')} />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number <span className="text-[#A5A5A5] normal-case">(optional)</span></label>
                <input id="phone" name="phone" type="tel" autoComplete="tel"
                  value={form.phone} onChange={handleChange} placeholder="+1 (212) 555-0000" className={inputClass('phone')} />
              </div>

              {/* Date + Time + Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="date" className={`${labelClass} flex items-center gap-1.5`}>
                    <Calendar size={12} aria-hidden="true" /> Date
                  </label>
                  <input id="date" name="date" type="date" min={today}
                    value={form.date} onChange={handleChange} className={inputClass('date')}
                    style={{ colorScheme: 'dark' }} />
                  {errors.date && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.date}</p>}
                </div>
                <div>
                  <label htmlFor="time" className={`${labelClass} flex items-center gap-1.5`}>
                    <Clock size={12} aria-hidden="true" /> Time
                  </label>
                  <select id="time" name="time" value={form.time} onChange={handleChange}
                    className={`${inputClass('time')} cursor-pointer`}>
                    <option value="">Select time</option>
                    {timeSlots}
                  </select>
                  {errors.time && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.time}</p>}
                </div>
                <div>
                  <label htmlFor="guests" className={`${labelClass} flex items-center gap-1.5`}>
                    <Users size={12} aria-hidden="true" /> Guests
                  </label>
                  <input id="guests" name="guests" type="number" min={1} max={20}
                    value={form.guests} onChange={handleChange} placeholder="2" className={inputClass('guests')} />
                  {errors.guests && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.guests}</p>}
                </div>
              </div>

              {/* Special requests */}
              <div>
                <label htmlFor="request" className={`${labelClass} flex items-center gap-1.5`}>
                  <MessageSquare size={12} aria-hidden="true" /> Special Request <span className="text-[#A5A5A5] normal-case">(optional)</span>
                </label>
                <textarea id="request" name="request" rows={4}
                  value={form.request} onChange={handleChange}
                  placeholder="Dietary requirements, occasion, seating preference…"
                  className={`${inputClass('request')} resize-none`} />
              </div>

              <button type="submit"
                className="w-full py-4 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[10px] tracking-[0.2em] uppercase
                           transition-all duration-300 hover:bg-[#D4A373]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
                RESERVE TABLE
              </button>

              <p className="font-jakarta text-[#A5A5A5] text-[11px] text-center">
                This is a reservation request. We'll confirm your booking within 24 hours.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </>
  );
};

export default BookingPage;
