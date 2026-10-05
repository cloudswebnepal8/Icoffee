import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { blogPosts } from '../data/coffeeData';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  // Graceful not-found state for unknown slugs — no crash
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] px-4 text-center pt-28">
        <p className="font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">Post Not Found</p>
        <h1 className="font-playfair font-bold text-[#F5F1E8] text-4xl mb-6">This article doesn't exist.</h1>
        <Link to="/blog"
          className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase
                     border border-[#C5A880] px-6 py-3 hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300">
          <ArrowLeft size={14} aria-hidden="true" /> BACK TO BLOG
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Article hero */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-[#121212]/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6 pb-10 lg:pb-14">
          <span className="inline-block bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[9px] tracking-[0.18em] uppercase px-3 py-1 mb-4">
            {post.category}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-playfair font-bold text-[#F5F1E8] text-2xl sm:text-3xl lg:text-4xl leading-[1.15]"
          >
            {post.title}
          </motion.h1>
          <div className="flex items-center gap-5 mt-4">
            <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-xs">
              <Calendar size={12} aria-hidden="true" />{post.date}
            </span>
            <span className="flex items-center gap-1.5 text-[#A5A5A5] font-jakarta text-xs">
              <MessageCircle size={12} aria-hidden="true" />{post.comments} Comments
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="bg-[#121212] py-14 lg:py-20" aria-label={post.title}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Back link */}
          <Link to="/blog"
            className="inline-flex items-center gap-2 text-[#A5A5A5] font-jakarta text-xs tracking-[0.12em] uppercase mb-10
                       hover:text-[#C5A880] transition-colors duration-200 focus-visible:text-[#C5A880]">
            <ArrowLeft size={14} aria-hidden="true" /> BACK TO BLOG
          </Link>

          {/* Gold accent line */}
          <div className="w-10 h-0.5 bg-[#C5A880] mb-8" aria-hidden="true" />

          {/* Article paragraphs */}
          {post.content.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="font-jakarta font-light text-[#A5A5A5] text-[15px] leading-[1.85] mb-6 last:mb-0"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Footer divider + back link */}
          <div className="mt-12 pt-8 border-t border-[#2A2A2A] flex items-center justify-between flex-wrap gap-4">
            <Link to="/blog"
              className="inline-flex items-center gap-2 text-[#C5A880] font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase
                         hover:gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">
              <ArrowLeft size={13} aria-hidden="true" /> ALL ARTICLES
            </Link>
            <span className="font-jakarta text-[#A5A5A5] text-xs">{post.category} · {post.date}</span>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
