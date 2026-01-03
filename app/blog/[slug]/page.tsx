'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Loader2, Clock, Share2, Check, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';
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

// Inline SVG placeholder for broken images
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect fill='%23f3f4f6' width='1200' height='600'/%3E%3Ctext fill='%239ca3af' font-family='system-ui, sans-serif' font-size='48' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EBlog Image%3C/text%3E%3C/svg%3E";

const PLACEHOLDER_IMAGE_SMALL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23f3f4f6' width='400' height='200'/%3E%3Ctext fill='%239ca3af' font-family='system-ui, sans-serif' font-size='24' font-weight='600' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EBlog%3C/text%3E%3C/svg%3E";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch current blog
        const response = await fetch(`/api/blogs?slug=${slug}`);
        const data = await response.json();
        
        // Debug logging
        console.log('Blog API Response:', data);
        console.log('Is Array:', Array.isArray(data));
        console.log('Length:', data?.length);
        
        // Check if data is an array and has content
        if (Array.isArray(data) && data.length > 0) {
          const foundBlog = data[0];
          console.log('Found blog:', foundBlog);
          console.log('Blog status:', foundBlog.status);
          
          // Only show published blogs on public page
          if (foundBlog.status === 'published') {
            setBlog(foundBlog);
            
            // Fetch related blogs (same category, excluding current)
            const relatedResponse = await fetch('/api/blogs?status=published');
            const allBlogs = await relatedResponse.json();
            
            if (Array.isArray(allBlogs)) {
              const related = allBlogs
                .filter((b: Blog) => b.slug !== foundBlog.slug && b.category === foundBlog.category)
                .slice(0, 3);
              setRelatedBlogs(related);
            }
          } else {
            console.log('Blog exists but is not published');
            setError(true);
          }
        } else {
          console.log('No blog found with slug:', slug);
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
      fetchData();
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
  
  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={false} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Featured Image */}
        <div className="relative h-40 sm:h-60 md:h-[10rem]   mx-auto  lg:h-[16rem] bg-gray-900">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }}
          />
          <div className="absolute inset-0  bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-3 sm:mb-4 transition-colors text-sm sm:text-base group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-full">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                </div>
                
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
        <article className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 mb-8"
          >
            {/* Excerpt */}
            <p className="text-base sm:text-lg md:text-xl text-gray-800 font-medium mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200 leading-relaxed italic">
              {blog.excerpt}
            </p>

            {/* Blog Content */}
            <div 
              className=" text-gray-800
                prose prose-sm sm:prose-base lg:prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4
                prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl
                prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl
                prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-2
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 
                prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic 
                prose-blockquote:text-gray-700 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 
                prose-code:rounded prose-code:text-sm prose-code:text-blue-600 prose-code:font-mono
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
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
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-gray-800 sm:w-4 sm:h-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-8 sm:mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                Share this article
              </h3>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                {/* Twitter */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(blog.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Twitter</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  }}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Facebook</span>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                  }}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#0A66C2] hover:bg-[#095196] text-white rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>LinkedIn</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg transform hover:scale-105 border border-gray-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-40 bg-gray-200 overflow-hidden">
                        <img
                          src={relatedBlog.featuredImage}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER_IMAGE_SMALL;
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                            {relatedBlog.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {relatedBlog.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(relatedBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to Blog Link */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
