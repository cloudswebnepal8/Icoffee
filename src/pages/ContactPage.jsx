import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import { fadeUp, viewport } from '../utils/animations';

// Simple email regex — good enough for client-side hint, not a security check
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const INITIAL = { name: '', email: '', subject: '', message: '' };

const ContactPage = () => {
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name    = 'Your name is required.';
    if (!form.email.trim())         e.email   = 'Your email is required.';
    else if (!isValidEmail(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.subject.trim())       e.subject = 'Please provide a subject.';
    if (!form.message.trim())       e.message = 'A message is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Clear error on change
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
    placeholder:text-[#A5A5A5]/50 outline-none
    transition-colors duration-200
    focus:border-[#C5A880]
    ${errors[field] ? 'border-red-500/60' : 'border-[#2A2A2A]'}
  `;

  const labelClass = 'block font-jakarta font-medium text-[#F5F1E8]/80 text-xs tracking-[0.1em] uppercase mb-2';

  return (
    <>
      <PageHero
        label="GET IN TOUCH"
        heading="Contact Us"
        breadcrumb={[{ label: 'Contact', to: null }]}
      />

      <section className="bg-[#121212] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

            {/* Left: Info */}
            <div>
              <motion.p variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={viewport}
                className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-10">
                We'd love to hear from you. Whether you have a question about our menu, want to book an event, or simply want to share your experience — drop us a message.
              </motion.p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Address',  value: '55 Main Street, New York, NY 10001', href: 'https://maps.google.com', external: true },
                  { icon: Phone,  label: 'Phone',    value: '+1 (212) 555-0199', href: 'tel:+12125550199' },
                  { icon: Mail,   label: 'Email',    value: 'hello@lcoffee.com', href: 'mailto:hello@lcoffee.com' },
                ].map(({ icon: Icon, label, value, href, external }, i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp(i * 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-[#C5A880]/40 text-[#C5A880]">
                      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-jakarta font-semibold text-[#F5F1E8] text-xs tracking-wide uppercase mb-0.5">{label}</p>
                      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="font-jakarta font-light text-[#A5A5A5] text-sm hover:text-[#C5A880] transition-colors duration-200 focus-visible:text-[#C5A880]">
                        {value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hours */}
              <motion.div variants={fadeUp(0.35)} initial="hidden" whileInView="visible" viewport={viewport}
                className="mt-10 p-6 border border-[#2A2A2A] bg-[#181818]">
                <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base mb-4">Opening Hours</h3>
                {[
                  ['Monday – Friday', '08:00 AM – 08:00 PM'],
                  ['Saturday',        '09:00 AM – 09:00 PM'],
                  ['Sunday',          '09:00 AM – 06:00 PM'],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between py-2 border-b border-[#2A2A2A] last:border-b-0">
                    <span className="font-jakarta text-[#A5A5A5] text-xs">{day}</span>
                    <span className="font-jakarta font-medium text-[#F5F1E8] text-xs">{time}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={viewport}>
              {success ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center border border-[#2A2A2A] bg-[#181818] px-8">
                  <div className="w-14 h-14 flex items-center justify-center border border-[#C5A880] text-[#C5A880] mb-5">
                    <Check size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair font-semibold text-[#F5F1E8] text-xl mb-3">Message Sent!</h3>
                  <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSuccess(false)}
                    className="mt-8 text-[#C5A880] font-jakarta text-[10px] tracking-[0.15em] uppercase border border-[#C5A880] px-6 py-2.5
                               hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>Name</label>
                      <input id="name" name="name" type="text" autoComplete="name"
                        value={form.name} onChange={handleChange}
                        placeholder="Your full name" className={inputClass('name')} />
                      {errors.name && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email</label>
                      <input id="email" name="email" type="email" autoComplete="email"
                        value={form.email} onChange={handleChange}
                        placeholder="your@email.com" className={inputClass('email')} />
                      {errors.email && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>Subject</label>
                    <input id="subject" name="subject" type="text"
                      value={form.subject} onChange={handleChange}
                      placeholder="What is this about?" className={inputClass('subject')} />
                    {errors.subject && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Message</label>
                    <textarea id="message" name="message" rows={6}
                      value={form.message} onChange={handleChange}
                      placeholder="Your message…" className={`${inputClass('message')} resize-none`} />
                    {errors.message && <p className="text-red-400 text-[11px] mt-1 font-jakarta">{errors.message}</p>}
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#C5A880] text-[#121212]
                               font-jakarta font-bold text-[10px] tracking-[0.2em] uppercase
                               transition-all duration-300 hover:bg-[#D4A373]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
                    <Send size={14} aria-hidden="true" /> SEND MESSAGE
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
