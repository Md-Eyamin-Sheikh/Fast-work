'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

export function AllBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blogs?status=all');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (slug: string, title: string) => {
    // Use SweetAlert if available
    if (typeof window !== 'undefined' && (window as any).Swal) {
      const result = await (window as any).Swal.fire({
        title: 'Delete Blog?',
        text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/blogs?slug=${slug}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            (window as any).Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
            fetchBlogs(); // Refresh the list
          } else {
            throw new Error('Failed to delete');
          }
        } catch (error) {
          (window as any).Swal.fire('Error!', 'Failed to delete blog.', 'error');
        }
      }
    } else {
      // Fallback to confirm
      if (confirm(`Are you sure you want to delete "${title}"?`)) {
        try {
          const response = await fetch(`/api/blogs?slug=${slug}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            alert('Blog deleted successfully!');
            fetchBlogs();
          } else {
            alert('Failed to delete blog');
          }
        } catch (error) {
          alert('Error deleting blog');
        }
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-gray-600">
            {blogs.length} blog{blogs.length !== 1 ? 's' : ''} in total
          </p>
        </div>
        <Link
          href="/admin/blogs/write"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Write Blog
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading blogs...</span>
        </div>
      )}

      {/* Blog Cards Grid */}
      {!loading && (
        <>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Featured Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image';
                      }}
                    />

                    {/* Action Icons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                        title="View Blog"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.slug, blog.title)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        blog.status === 'published'
                          ? 'bg-green-600 text-white'
                          : 'bg-orange-500 text-white'
                      }`}>
                        {blog.status === 'published' ? '✓ Published' : '📝 Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Blog Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-600 font-medium">{blog.category}</span>
                      <span className="text-gray-500">{formatDate(blog.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 border-t pt-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {blog.views} views
                      </span>
                      <span>•</span>
                      <span className="truncate">{blog.slug}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
              <p className="text-gray-500 text-lg mb-4">
                {searchQuery
                  ? `No blogs found matching "${searchQuery}"`
                  : `No ${filterStatus === 'all' ? '' : filterStatus} blogs found`
                }
              </p>
              {(searchQuery || filterStatus !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
              {blogs.length === 0 && (
                <Link
                  href="/admin/blogs/write"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Write Your First Blog
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
