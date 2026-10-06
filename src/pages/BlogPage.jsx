import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ArrowRight, Maximize2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import BlogModal from '../components/BlogModal';
import { blogPosts } from '../data/coffeeData';
import { staggerContainer } from '../utils/animations';

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const BlogCard = ({ post, onMaximize }) => (
  <motion.article
    variants={cardVariant}
    className="group relative flex flex-col bg-[#181818] border border-[#2A2A2A] overflow-hidden hover:border-[#C5A880]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
    aria-labelledby={`blog-title-${post.id}`}
  >
    {/* Thumbnail Container — relative and overflow-hidden ensures overlays never bleed outside */}
    <div
      onClick={() => onMaximize(post)}
      className="relative overflow-hidden h-52 sm:h-60 flex-shrink-0 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onMaximize(post);
        }
      }}
      aria-label={`Maximize article: ${post.title}`}
    >
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-[#121212]/35 group-hover:bg-[#121212]/15 transition-colors duration-300" />

      {/* Maximize hover badge indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#121212]/80 backdrop-blur-sm border border-[#C5A880]/60 text-[#C5A880] text-[10px] font-jakarta font-semibold tracking-widest uppercase">
          <Maximize2 size={12} aria-hidden="true" /> Click to Maximize
        </span>
      </div>

      {/* Category badge */}
      <span className="absolute top-4 left-4 z-10 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[9px] tracking-[0.18em] uppercase px-3 py-1 shadow-md">
        {post.category}
      </span>
    </div>

    {/* Content Area */}
    <div className="relative flex flex-col flex-1 p-6">
      {/* Date & Comments Row */}
      <div className="flex items-center gap-4 mb-3.5">
        <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
          <Calendar size={12} className="text-[#C5A880]" aria-hidden="true" />
          {post.date}
        </span>
        <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
          <MessageCircle size={12} aria-hidden="true" />
          {post.comments} Comments
        </span>
      </div>

      {/* Title */}
      <h2
        id={`blog-title-${post.id}`}
        onClick={() => onMaximize(post)}
        className="font-playfair font-semibold text-[#F5F1E8] text-lg sm:text-xl leading-snug mb-3 cursor-pointer group-hover:text-[#C5A880] transition-colors duration-300"
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-6 flex-1">
        {post.excerpt}
      </p>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]/70">
        <button
          type="button"
          onClick={() => onMaximize(post)}
          className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase transition-all duration-300 group-hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          aria-label={`Learn more and maximize ${post.title}`}
        >
          <span>LEARN MORE</span>
          <ArrowRight size={13} aria-hidden="true" />
        </button>

        <Link
          to={`/blog/${post.slug}`}
          className="text-[#A5A5A5]/60 hover:text-[#C5A880] text-[10px] font-jakarta tracking-wider transition-colors duration-200"
          title="Direct page URL"
        >
          Direct Link
        </Link>
      </div>
    </div>
  </motion.article>
);

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <PageHero
        label="FROM OUR JOURNAL"
        heading="Coffee Stories & Inspiration"
        breadcrumb={[{ label: 'Blog', to: null }]}
      />

      <section className="relative bg-[#121212] py-20 lg:py-28" aria-label="Blog posts list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} onMaximize={setSelectedPost} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Maximize Article Modal with spring animations */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onSelectPost={setSelectedPost}
      />
    </>
  );
};

export default BlogPage;
