'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight, Loader2 } from 'lucide-react';

interface Blog {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// Inline SVG placeholder for broken images
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect fill='%23f3f4f6' width='800' height='400'/%3E%3Ctext fill='%239ca3af' font-family='system-ui, sans-serif' font-size='32' font-weight='600' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EBlog Image%3C/text%3E%3C/svg%3E";

export function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs?status=published');
        const data = await response.json();
        // Ensure data is an array
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(true);
        setBlogs([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Parse tags from string to array - with safety check
  const parseBlogs = Array.isArray(blogs) ? blogs.map(blog => ({
    ...blog,
    tagsArray: blog.tags ? blog.tags.split(',').map(t => t.trim()).filter(Boolean) : []
  })) : [];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-6 md:py-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 md:mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
              Insights, tutorials, and guides to help you make the most of digital tools and grow your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mr-4" />
            <span className="text-gray-600 text-lg">Loading blogs...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg mb-4">Failed to load blogs. Please try again later.</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {parseBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Featured Image */}
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="relative h-32 sm:h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-3 sm:p-5">
                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mb-2 sm:mb-4 line-clamp-2 text-xs sm:text-sm">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate max-w-[60px] sm:max-w-none">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Tags - Hide on mobile */}
                    {blog.tagsArray && blog.tagsArray.length > 0 && (
                      <div className="hidden sm:flex flex-wrap gap-2 mb-4">
                        {blog.tagsArray.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 sm:gap-2 text-blue-600 font-semibold hover:gap-2 sm:hover:gap-3 transition-all text-xs sm:text-base"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Empty State */}
            {parseBlogs.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No blog posts available at the moment.</p>
                <p className="text-gray-400 text-sm">Check back soon for new content!</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
