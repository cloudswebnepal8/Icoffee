import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Share2, Rss, Link as LinkIcon, Play } from 'lucide-react';
import { footerGallery } from '../data/coffeeData';
import { fadeUp, staggerContainer, viewport } from '../utils/animations';

const hours = [
  { days: 'Monday – Friday', time: '08:00 AM – 08:00 PM' },
  { days: 'Saturday',        time: '09:00 AM – 09:00 PM' },
  { days: 'Sunday',          time: '09:00 AM – 06:00 PM' },
];

// Social links — open in a new tab for safety
const socialLinks = [
  { icon: Share2,   label: 'Follow us on Instagram', href: 'https://instagram.com' },
  { icon: Rss,      label: 'Follow us on Facebook',  href: 'https://facebook.com'  },
  { icon: LinkIcon, label: 'Follow us on Twitter',   href: 'https://twitter.com'   },
  { icon: Play,     label: 'Watch us on YouTube',    href: 'https://youtube.com'   },
];

// Quick links section — all internal routes via Link
const quickLinks = [
  { label: 'Home',          to: '/'            },
  { label: 'About Us',      to: '/about'        },
  { label: 'Services',      to: '/services'     },
  { label: 'Reservation',   to: '/reservation'  },
  { label: 'Our History',   to: '/history'      },
  { label: 'Photo Gallery', to: '/gallery'      },
  { label: 'FAQ',           to: '/faq'          },
  { label: 'Journal & Blog',to: '/blog'         },
  { label: 'Contact',       to: '/contact'      },
];

const SocialIcon = ({ icon: Icon, label, href }) => (
  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
    className="w-9 h-9 flex items-center justify-center border border-[#2A2A2A] text-[#A5A5A5]
               transition-all duration-200 hover:border-[#C5A880] hover:text-[#C5A880]
               focus-visible:border-[#C5A880] focus-visible:text-[#C5A880]">
    <Icon size={15} aria-hidden="true" />
  </a>
);

const Footer = () => (
  <footer id="contacts" className="bg-[#181818] border-t border-[#2A2A2A]" aria-label="Site footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <motion.div
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
      >
        {/* Column 1: Brand */}
        <motion.div variants={fadeUp(0)}>
          <Link to="/" className="inline-block mb-5 focus-visible:outline-none" aria-label="L'Coffee homepage">
            <span className="font-playfair text-2xl font-bold text-[#F5F1E8] tracking-wide">
              L'<span className="text-[#C5A880]">Coffee</span>
            </span>
          </Link>
          <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-6">
            A premium coffee house rooted in craft, community, and the belief that every cup deserves to be extraordinary.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon, label, href }) => (
              <SocialIcon key={label} icon={icon} label={label} href={href} />
            ))}
          </div>
        </motion.div>

        {/* Column 2: Contact */}
        <motion.div variants={fadeUp(0.08)}>
          <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base mb-6 pb-3 border-b border-[#2A2A2A]">
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="flex gap-3 group focus-visible:outline-none" aria-label="View our location on Google Maps">
                <MapPin size={15} className="text-[#C5A880] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-jakarta font-light text-[#A5A5A5] text-sm leading-snug group-hover:text-[#F5F1E8] transition-colors duration-200">
                  55 Main Street, New York, NY 10001
                </span>
              </a>
            </li>
            <li>
              <a href="tel:+12125550199" className="flex gap-3 group focus-visible:outline-none" aria-label="Call us">
                <Phone size={15} className="text-[#C5A880] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-jakarta font-light text-[#A5A5A5] text-sm group-hover:text-[#F5F1E8] transition-colors duration-200">
                  +1 (212) 555-0199
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:hello@lcoffee.com" className="flex gap-3 group focus-visible:outline-none" aria-label="Email us">
                <Mail size={15} className="text-[#C5A880] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-jakarta font-light text-[#A5A5A5] text-sm group-hover:text-[#F5F1E8] transition-colors duration-200">
                  hello@lcoffee.com
                </span>
              </a>
            </li>
          </ul>

          {/* Quick navigation links */}
          <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base mt-8 mb-4 pb-3 border-b border-[#2A2A2A]">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="font-jakarta font-light text-[#A5A5A5] text-sm hover:text-[#C5A880] transition-colors duration-200 focus-visible:text-[#C5A880]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Opening Hours */}
        <motion.div variants={fadeUp(0.16)}>
          <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base mb-6 pb-3 border-b border-[#2A2A2A]">
            Opening Hours
          </h3>
          <ul className="space-y-4">
            {hours.map(({ days, time }) => (
              <li key={days} className="flex flex-col gap-0.5">
                <span className="font-jakarta font-semibold text-[#F5F1E8] text-xs tracking-wide">{days}</span>
                <span className="font-jakarta font-light text-[#A5A5A5] text-sm">{time}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Mini Gallery */}
        <motion.div variants={fadeUp(0.24)}>
          <h3 className="font-playfair font-semibold text-[#F5F1E8] text-base mb-6 pb-3 border-b border-[#2A2A2A]">
            Our Gallery
          </h3>
          <div className="grid grid-cols-3 gap-1.5" role="list" aria-label="Coffee gallery preview">
            {footerGallery.map((src, i) => (
              <div key={i} role="listitem" className="aspect-square overflow-hidden group">
                <img src={src} alt={`Gallery preview ${i + 1}`} loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-jakarta text-[#A5A5A5] text-xs tracking-[0.1em]">
          © {new Date().getFullYear()} L'Coffee. All rights reserved.
        </p>
        <p className="font-jakarta text-[#A5A5A5] text-xs tracking-[0.1em]">
          Crafted with <span className="text-[#C5A880]" aria-label="love">♥</span> in Kathmandu
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
