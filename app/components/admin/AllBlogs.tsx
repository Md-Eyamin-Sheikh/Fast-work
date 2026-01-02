'use client';

import { useState } from 'react';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import Link from 'next/link';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { blogs as staticBlogs } from '@/app/data/blogs';

export function AllBlogs() {
  const [blogs, setBlogs] = useState(staticBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '', title: '' });

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string, title: string) => {
    setDeleteModal({ open: true, id, title });
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter(b => b.id !== deleteModal.id));
    console.log('Deleted blog:', deleteModal.id);
    // TODO: Add API call to delete from database
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-gray-600">Manage your blog posts in card view</p>
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
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
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
                  href={`/admin/blogs/edit/${blog.id}`}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
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

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{blog.category}</span>
                <span className="text-gray-500">{blog.createdAt}</span>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {blog.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            {searchQuery
              ? `No blogs found matching "${searchQuery}"`
              : `No ${filterStatus === 'all' ? '' : filterStatus} blogs found`
            }
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: '', title: '' })}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post?"
        itemName={deleteModal.title}
      />
    </div>
  );
}
