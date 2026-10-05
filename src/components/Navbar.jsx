import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '../data/coffeeData';

// Mobile drawer slides in from the right
const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 28, stiffness: 300 } },
  exit:   { x: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' } }),
};

// Active link styling for NavLink — gold color + underline indicator
const navLinkClass = ({ isActive }) =>
  `relative font-jakarta font-medium text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 py-1
   ${isActive
     ? 'text-[#C5A880] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#C5A880]'
     : 'text-[#F5F1E8]/75 hover:text-[#C5A880]'
   }`;

const Navbar = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [dropdown,  setDropdown]  = useState(false);   // desktop Pages dropdown
  const [mobilePages, setMobilePages] = useState(false); // mobile Pages submenu

  const dropdownRef = useRef(null);
  const navigate    = useNavigate();
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobilePages(false);
  }, [pathname]);

  // Scroll-blur effect — rAF throttled to stay off the main thread
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Escape key closes mobile menu and dropdown
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setIsOpen(false); setDropdown(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const pagesLink = navLinks.find(l => l.hasDropdown);

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-300
        ${scrolled
          ? 'bg-[#181818]/95 backdrop-blur-md border-b border-[#2A2A2A]'
          : 'bg-transparent'}
      `}
      style={{ top: 36 }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <Link
            to="/"
            className="font-playfair text-xl lg:text-2xl font-bold text-[#F5F1E8] tracking-wide shrink-0
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            aria-label="L'Coffee — go to homepage"
          >
            L'<span className="text-[#C5A880]">Coffee</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef} role="listitem">
                    <button
                      type="button"
                      onClick={() => setDropdown(d => !d)}
                      aria-expanded={dropdown}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 font-jakarta font-medium text-[11px] tracking-[0.12em] uppercase
                        transition-colors duration-200 py-1
                        ${dropdown ? 'text-[#C5A880]' : 'text-[#F5F1E8]/75 hover:text-[#C5A880]'}
                        focus-visible:outline-none focus-visible:text-[#C5A880]`}
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${dropdown ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[190px] bg-[#181818] border border-[#2A2A2A] py-2 z-50"
                          role="menu"
                        >
                          {link.children.map(child => (
                            <Link
                              key={child.label}
                              to={child.to}
                              onClick={() => setDropdown(false)}
                              role="menuitem"
                              className="flex items-center px-4 py-2.5 font-jakarta text-[11px] tracking-[0.1em] uppercase
                                         text-[#F5F1E8]/70 hover:text-[#C5A880] hover:bg-[#202020]
                                         transition-all duration-150 focus-visible:outline-none focus-visible:text-[#C5A880]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div key={link.label} role="listitem">
                  <NavLink to={link.to} className={navLinkClass} end={link.to === '/'}>
                    {link.label}
                  </NavLink>
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/book-table"
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-[#C5A880] text-[#121212]
                       font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase shrink-0
                       transition-all duration-300 hover:bg-[#D4A373]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            BOOK A TABLE
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F5F1E8]
                       border border-[#2A2A2A] transition-colors hover:border-[#C5A880] hover:text-[#C5A880]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen
                ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.2 }}><X    size={20} aria-hidden="true" /></motion.span>
                : <motion.span key="ham" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} aria-hidden="true" /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#121212]/70 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#181818] border-l border-[#2A2A2A] z-50 flex flex-col"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-[#2A2A2A]">
                <span className="font-playfair font-bold text-[#F5F1E8] text-lg">
                  L'<span className="text-[#C5A880]">Coffee</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-[#A5A5A5] hover:text-[#C5A880]
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  aria-label="Close menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col px-6 py-6 gap-1 flex-1 overflow-y-auto" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.label}>
                        <motion.button
                          type="button"
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => setMobilePages(p => !p)}
                          aria-expanded={mobilePages}
                          className="w-full flex items-center justify-between py-3 border-b border-[#2A2A2A] text-[#F5F1E8]/75 hover:text-[#C5A880]
                                     font-jakarta text-[11px] tracking-[0.12em] uppercase transition-colors duration-200
                                     focus-visible:outline-none focus-visible:text-[#C5A880]"
                        >
                          {link.label}
                          <ChevronDown size={12} className={`transition-transform duration-200 ${mobilePages ? 'rotate-180 text-[#C5A880]' : ''}`} aria-hidden="true" />
                        </motion.button>
                        <AnimatePresence>
                          {mobilePages && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pl-4"
                            >
                              {link.children.map(child => (
                                <Link
                                  key={child.label}
                                  to={child.to}
                                  className="flex py-2.5 border-b border-[#2A2A2A] last:border-b-0 text-[#A5A5A5] hover:text-[#C5A880]
                                             font-jakarta text-[10px] tracking-[0.12em] uppercase transition-colors duration-200
                                             focus-visible:outline-none focus-visible:text-[#C5A880]"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div key={link.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          `flex py-3 border-b border-[#2A2A2A] font-jakarta text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 focus-visible:outline-none
                           ${isActive ? 'text-[#C5A880]' : 'text-[#F5F1E8]/75 hover:text-[#C5A880]'}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Book CTA inside drawer */}
              <div className="px-6 py-6 border-t border-[#2A2A2A]">
                <Link
                  to="/book-table"
                  className="flex items-center justify-center w-full py-3.5 bg-[#C5A880] text-[#121212]
                             font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase
                             hover:bg-[#D4A373] transition-colors duration-300
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  BOOK A TABLE
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
