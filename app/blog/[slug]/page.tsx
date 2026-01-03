'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Loader2 } from 'lucide-react';
import { MegaMenu } from '@/app/components/MegaMenu';
import { useEffect, useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string;
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs?slug=${slug}`);
        const data = await response.json();
        
        if (data.length > 0 && data[0].status === 'published') {
          setBlog(data[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <MegaMenu cartCount={0} isAuthenticated={false} />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <MegaMenu cartCount={0} isAuthenticated={false} />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Parse tags (it's stored as a comma-separated string)
  const tagsArray = blog.tags ? blog.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={false} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Featured Image */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-gray-900">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Blog+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4">
                  {blog.category}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-white/80 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate max-w-[120px] sm:max-w-none">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="sm:hidden">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 lg:p-12"
          >
            {/* Excerpt */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Blog Content */}
            <div 
              className="
                prose prose-sm sm:prose-base md:prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl
                prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl
                prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4
                prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4
                prose-li:text-gray-700 prose-li:mb-2
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 
                prose-code:rounded prose-code:text-sm prose-code:text-blue-600
                break-words
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {tagsArray.length > 0 && (
              <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm hover:bg-blue-100 transition-colors"
                    >
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Back to Blog Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to All Posts
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
