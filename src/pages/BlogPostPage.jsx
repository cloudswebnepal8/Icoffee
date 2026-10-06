import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/coffeeData';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  // Graceful not-found state for unknown slugs
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] px-4 text-center pt-36 pb-20">
        <p className="font-playfair italic text-[#C5A880] text-xs tracking-[0.2em] uppercase mb-4">
          Post Not Found
        </p>
        <h1 className="font-playfair font-bold text-[#F5F1E8] text-3xl sm:text-4xl mb-6">
          This article doesn't exist.
        </h1>
        <p className="font-jakarta text-[#A5A5A5] text-sm max-w-md mb-8">
          The story you are looking for may have moved or is no longer available.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#121212] bg-[#C5A880] hover:bg-[#D4A373] font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase px-7 py-3.5 transition-all duration-300"
        >
          <ArrowLeft size={14} aria-hidden="true" /> BACK TO BLOG
        </Link>
      </div>
    );
  }

  // Related articles (other posts)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36">
      {/* Breadcrumbs Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <nav className="flex items-center gap-2 text-xs font-jakarta text-[#A5A5A5]" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#C5A880] transition-colors duration-200">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog" className="hover:text-[#C5A880] transition-colors duration-200">
            Blog
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#F5F1E8]/70 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>
      </div>

      {/* Article Hero Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
        <div className="relative h-[42vh] sm:h-[52vh] lg:h-[60vh] overflow-hidden border border-[#2A2A2A] shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/55 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12">
            <span className="inline-block bg-[#C5A880] text-[#121212] font-jakarta font-bold text-[9px] tracking-[0.18em] uppercase px-3 py-1 mb-4 shadow">
              {post.category}
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="font-playfair font-bold text-[#F5F1E8] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-4 max-w-3xl"
            >
              {post.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-jakarta text-[#A5A5A5]">
              <span className="flex items-center gap-1.5 text-[#C5A880]">
                <Calendar size={13} aria-hidden="true" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                4 min read
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={13} aria-hidden="true" />
                {post.comments} Comments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-20" aria-label={post.title}>
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#A5A5A5] font-jakarta text-xs tracking-[0.14em] uppercase mb-10 hover:text-[#C5A880] transition-colors duration-200"
        >
          <ArrowLeft size={14} aria-hidden="true" /> BACK TO ALL STORIES
        </Link>

        {/* Lead Excerpt */}
        <p className="font-playfair italic text-[#C5A880] text-lg sm:text-xl leading-relaxed mb-10 pb-8 border-b border-[#2A2A2A]">
          "{post.excerpt}"
        </p>

        {/* Paragraphs */}
        <div className="space-y-6">
          {post.content &&
            post.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="font-jakarta font-light text-[#E5E0D8]/85 text-[15px] sm:text-base leading-[1.85]"
              >
                {paragraph}
              </motion.p>
            ))}
        </div>

        {/* Quote Block */}
        <div className="my-12 p-6 sm:p-8 bg-[#181818] border-l-2 border-[#C5A880]">
          <p className="font-playfair italic text-[#F5F1E8] text-base sm:text-lg mb-3">
            "Coffee connects people across geography, history, and craft. Every harvest is an invitation to listen to what the soil has to say."
          </p>
          <p className="font-jakarta text-[#A5A5A5] text-xs uppercase tracking-widest">
            — L'Coffee Artisanal Roasters
          </p>
        </div>

        {/* More Articles Section */}
        <div className="mt-16 pt-10 border-t border-[#2A2A2A]">
          <h2 className="font-playfair font-bold text-[#F5F1E8] text-xl mb-6">
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="group p-5 bg-[#181818] border border-[#2A2A2A] hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[#C5A880] font-jakarta text-[10px] tracking-wider uppercase font-semibold">
                    {related.category}
                  </span>
                  <h3 className="font-playfair text-[#F5F1E8] text-base font-semibold mt-1 group-hover:text-[#C5A880] transition-colors duration-200">
                    {related.title}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[#A5A5A5] text-xs font-jakarta mt-4 group-hover:text-[#C5A880]">
                  <span>Read Story</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
