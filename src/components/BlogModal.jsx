import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle, Clock, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { blogPosts } from '../data/coffeeData';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 28, stiffness: 320, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 20,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.05, duration: 0.45, ease: 'easeOut' },
  }),
};

const BlogModal = ({ post, onClose, onSelectPost }) => {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (!post) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [post]);

  // Handle Escape key to close
  useEffect(() => {
    if (!post) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  if (!post) return null;

  // Previous and next post navigation
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : blogPosts[blogPosts.length - 1];
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : blogPosts[0];

  return (
    <AnimatePresence>
      <motion.div
        key="blog-modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#121212]/85 backdrop-blur-md overflow-hidden"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${post.id}`}
      >
        {/* Modal Window Container */}
        <motion.div
          key={`blog-modal-content-${post.id}`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#181818] border border-[#2A2A2A] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#181818]/95 backdrop-blur-md border-b border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <span className="bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[9px] tracking-[0.18em] uppercase px-2.5 py-1">
                {post.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
                <Clock size={12} className="text-[#C5A880]" aria-hidden="true" /> 4 min read
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to={`/blog/${post.slug}`}
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-jakarta font-semibold tracking-[0.14em] uppercase text-[#A5A5A5] hover:text-[#C5A880] transition-colors duration-200 px-2.5 py-1.5 border border-[#2A2A2A] hover:border-[#C5A880]/40"
                title="Open in dedicated page"
              >
                <span>Full Page</span>
                <ExternalLink size={11} aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close article modal"
                className="w-8 h-8 flex items-center justify-center text-[#A5A5A5] hover:text-[#C5A880] hover:bg-[#222222] border border-[#2A2A2A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Header Hero Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-[#141414]">
              <img
                src={post.image}
                alt={post.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/50 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8">
                <div className="flex items-center gap-4 text-[#C5A880] text-[11px] font-jakarta tracking-wider uppercase mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} aria-hidden="true" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#A5A5A5]">
                    <MessageCircle size={12} aria-hidden="true" /> {post.comments} Comments
                  </span>
                </div>
                <h1
                  id={`modal-title-${post.id}`}
                  className="font-playfair font-bold text-[#F5F1E8] text-2xl sm:text-3xl lg:text-4xl leading-[1.2]"
                >
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 lg:p-10 max-w-3xl mx-auto">
              {/* Excerpt Lead */}
              <p className="font-playfair italic text-[#C5A880] text-base sm:text-lg leading-relaxed mb-8 pb-6 border-b border-[#2A2A2A]">
                "{post.excerpt}"
              </p>

              {/* Body Paragraphs */}
              <div className="space-y-6">
                {post.content && post.content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    custom={index}
                    variants={paragraphVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-jakarta font-light text-[#E5E0D8]/85 text-sm sm:text-base leading-[1.85]"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Key Takeaway Callout */}
              <div className="my-10 p-5 sm:p-6 bg-[#202020] border-l-2 border-[#C5A880]">
                <p className="font-playfair italic text-[#F5F1E8] text-sm sm:text-base mb-2">
                  "Great coffee is not a matter of luck — it is the deliberate pursuit of craft, precision, and passion."
                </p>
                <p className="font-jakarta text-[#A5A5A5] text-xs uppercase tracking-widest">
                  — L'Coffee Head Roaster
                </p>
              </div>

              {/* Article Footer & Story Switcher */}
              <div className="mt-10 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onSelectPost(prevPost)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#2A2A2A] text-[#A5A5A5] hover:text-[#C5A880] hover:border-[#C5A880]/50 font-jakarta text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  <ChevronLeft size={14} aria-hidden="true" /> Previous Story
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[10px] tracking-[0.18em] uppercase hover:bg-[#D4A373] transition-colors duration-200 text-center"
                >
                  Close Article
                </button>

                <button
                  type="button"
                  onClick={() => onSelectPost(nextPost)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#2A2A2A] text-[#A5A5A5] hover:text-[#C5A880] hover:border-[#C5A880]/50 font-jakarta text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  Next Story <ChevronRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogModal;
