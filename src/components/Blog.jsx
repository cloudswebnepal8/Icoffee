import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/coffeeData';
import { staggerContainer, viewport } from '../utils/animations';

const cardVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const BlogCard = ({ post }) => (
  <motion.article
    variants={cardVariant}
    className="group flex flex-col bg-[#181818] border border-[#2A2A2A] overflow-hidden
               hover:border-[#C5A880]/40 transition-colors duration-300"
    aria-labelledby={`blog-title-${post.id}`}
  >
    {/* Thumbnail */}
    <div className="relative overflow-hidden h-52 sm:h-60 flex-shrink-0">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dark overlay so the category badge stays legible */}
      <div className="absolute inset-0 bg-[#121212]/30 group-hover:bg-[#121212]/10 transition-colors duration-300" />
      {/* Category badge */}
      <span className="absolute top-4 left-4 bg-[#C5A880] text-[#121212] font-jakarta font-bold
                       text-[9px] tracking-[0.18em] uppercase px-3 py-1">
        {post.category}
      </span>
    </div>

    {/* Card body */}
    <div className="flex flex-col flex-1 p-6">
      {/* Meta row */}
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
          <Calendar size={12} aria-hidden="true" />
          {post.date}
        </span>
        <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
          <MessageCircle size={12} aria-hidden="true" />
          {post.comments} Comments
        </span>
      </div>

      {/* Title */}
      <h3
        id={`blog-title-${post.id}`}
        className="font-playfair font-semibold text-[#F5F1E8] text-lg leading-snug mb-3
                   group-hover:text-[#C5A880] transition-colors duration-300"
      >
        {post.title}
      </h3>

      <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-6 flex-1">
        {post.excerpt}
      </p>

      {/* Read More */}
      <a
        href={`#blog-${post.id}`}
        className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta font-semibold
                   text-[10px] tracking-[0.18em] uppercase
                   transition-all duration-300 group-hover:gap-3
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
        aria-label={`Read more about ${post.title}`}
      >
        READ MORE
        <ArrowRight size={13} aria-hidden="true" />
      </a>
    </div>
  </motion.article>
);

const Blog = () => (
  <section
    id="blog"
    className="bg-[#121212] py-20 lg:py-28"
    aria-labelledby="blog-heading"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-playfair italic text-[#C5A880]
                     text-xs tracking-[0.2em] uppercase mb-4"
        >
          <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
          FROM OUR JOURNAL
          <span className="w-5 h-px bg-[#C5A880]" aria-hidden="true" />
        </motion.p>

        <motion.h2
          id="blog-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl lg:text-5xl"
        >
          Coffee Stories &amp; Inspiration
        </motion.h2>
      </div>

      {/* Cards — stagger reveal */}
      <motion.div
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default Blog;
