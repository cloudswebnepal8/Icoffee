import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { blogPosts } from '../data/coffeeData';
import { staggerContainer, viewport } from '../utils/animations';

const cardVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const BlogCard = ({ post }) => (
  <motion.article
    variants={cardVariant}
    className="group flex flex-col bg-[#181818] border border-[#2A2A2A] overflow-hidden hover:border-[#C5A880]/40 transition-colors duration-300"
    aria-labelledby={`blog-title-${post.id}`}
  >
    <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-52 sm:h-60 flex-shrink-0" tabIndex={-1} aria-hidden="true">
      <img src={post.image} alt={post.title} loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-[#121212]/30 group-hover:bg-[#121212]/10 transition-colors duration-300" />
    </Link>

    <div className="relative flex flex-col flex-1 p-6">
      <span className="absolute top-0 left-6 -translate-y-1/2 bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[9px] tracking-[0.18em] uppercase px-3 py-1">
        {post.category}
      </span>

      <div className="flex items-center gap-4 mt-3 mb-4">
        <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
          <Calendar size={12} aria-hidden="true" />{post.date}
        </span>
        <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-[11px]">
          <MessageCircle size={12} aria-hidden="true" />{post.comments} Comments
        </span>
      </div>

      <h2 id={`blog-title-${post.id}`}
        className="font-playfair font-semibold text-[#F5F1E8] text-lg leading-snug mb-3 group-hover:text-[#C5A880] transition-colors duration-300">
        <Link to={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:underline">
          {post.title}
        </Link>
      </h2>

      <p className="font-jakarta font-light text-[#A5A5A5] text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>

      <Link to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase
                   transition-all duration-300 group-hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
        aria-label={`Read more about ${post.title}`}>
        READ MORE <ArrowRight size={13} aria-hidden="true" />
      </Link>
    </div>
  </motion.article>
);

const BlogPage = () => (
  <>
    <PageHero
      label="FROM OUR JOURNAL"
      heading="Coffee Stories & Inspiration"
      breadcrumb={[{ label: 'Blog', to: null }]}
    />

    <section className="bg-[#121212] py-20 lg:py-28" aria-label="Blog posts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map(post => <BlogCard key={post.id} post={post} />)}
        </motion.div>
      </div>
    </section>
  </>
);

export default BlogPage;
