import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navLinks } from '../data/coffeeData';

// How the mobile drawer slides open and closed.
// Using height: 'auto' instead of a fixed pixel value so the drawer
// grows naturally if we ever add more links.
const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  open:   { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: 'easeOut' } },
};

// Each link staggers in slightly after the previous one.
// The `i` custom prop comes from the `custom` attribute on the motion.div.
const mobileItemVariants = {
  closed: { opacity: 0, x: -16 },
  open:   (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' },
  }),
};

// Reusable link pill for the desktop nav.
// Kept as its own component so the dropdown icon logic lives in one place.
const NavLink = ({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    className="
      flex items-center gap-1 text-[11px] font-jakarta font-semibold
      tracking-[0.12em] uppercase text-[#F5F1E8]/80
      transition-colors duration-200 hover:text-[#C5A880]
      focus-visible:text-[#C5A880]
    "
  >
    {link.label}
    {link.hasDropdown && (
      <ChevronDown size={12} className="opacity-60" aria-hidden="true" />
    )}
  </a>
);

const Navbar = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Read the OS motion preference once on mount, then keep it in sync
  // if the user toggles it while the page is open (rare but possible).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Throttle the scroll handler with rAF so we're not hammering setState
  // on every pixel of scroll — especially important on low-end devices.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Let keyboard users close the mobile menu with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Prevent background content from scrolling while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile  = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#2A2A2A] shadow-2xl'
          : 'bg-transparent'
        }
      `}
      // top: 36px pushes the navbar below the TopBar (h-9 = 36px)
      style={{ top: 36 }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <a
            href="#home"
            className="flex-shrink-0 focus-visible:outline-none"
            aria-label="L'Coffee — return to homepage"
          >
            <span className="font-playfair text-2xl font-bold text-[#F5F1E8] tracking-wide leading-none">
              L'<span className="text-[#C5A880]">Coffee</span>
            </span>
          </a>

          {/* Desktop nav links — hidden below lg breakpoint */}
          <div
            className="hidden lg:flex items-center gap-8"
            role="menubar"
            aria-label="Navigation links"
          >
            {navLinks.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </div>

          {/* Desktop CTA button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contacts"
              className="
                inline-flex items-center px-6 py-2.5
                border border-[#C5A880] text-[#C5A880]
                text-[10px] font-jakarta font-bold tracking-[0.18em] uppercase
                transition-all duration-300
                hover:bg-[#C5A880] hover:text-[#121212]
                focus-visible:bg-[#C5A880] focus-visible:text-[#121212]
              "
            >
              BOOK A TABLE
            </a>
          </div>

          {/* Hamburger — only shows below lg breakpoint */}
          <button
            type="button"
            className="
              lg:hidden p-2 text-[#F5F1E8]
              transition-colors hover:text-[#C5A880]
              focus-visible:text-[#C5A880]
            "
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {/* Swap between hamburger and X with a quick rotate */}
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: prefersReduced ? 0 : -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{   rotate: prefersReduced ? 0 :  90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'block' }}
                >
                  <X size={22} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: prefersReduced ? 0 :  90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{   rotate: prefersReduced ? 0 : -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'block' }}
                >
                  <Menu size={22} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden overflow-hidden bg-[#181818] border-t border-[#2A2A2A]"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <a
                    href={link.href}
                    onClick={closeMobile}
                    role="menuitem"
                    className="
                      flex items-center justify-between w-full
                      py-3 border-b border-[#2A2A2A]
                      text-xs font-jakarta font-semibold tracking-[0.12em] uppercase
                      text-[#F5F1E8]/80 transition-colors hover:text-[#C5A880]
                      focus-visible:text-[#C5A880]
                    "
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown size={14} className="opacity-50" aria-hidden="true" />
                    )}
                  </a>
                </motion.div>
              ))}

              {/* CTA sits at the bottom of the drawer, same as the desktop version */}
              <motion.div
                custom={navLinks.length}
                variants={mobileItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="pt-4"
              >
                <a
                  href="#contacts"
                  onClick={closeMobile}
                  className="
                    block w-full text-center py-3
                    border border-[#C5A880] text-[#C5A880]
                    text-[10px] font-jakarta font-bold tracking-[0.18em] uppercase
                    transition-all duration-300 hover:bg-[#C5A880] hover:text-[#121212]
                  "
                >
                  BOOK A TABLE
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
