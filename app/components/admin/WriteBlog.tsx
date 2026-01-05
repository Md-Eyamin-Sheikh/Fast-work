'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ImagePreview } from './ImagePreview';
import { AutoSlugInput } from './AutoSlugInput';
import { Save, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showSuccess, showError } from '@/app/lib/sweetalert';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import React Quill to avoid SSR issues - using react-quill-new for React 19 compatibility
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export function WriteBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'AI Tools',
    tags: '',
    status: 'draft' as 'draft' | 'published'
  });
  const [saving, setSaving] = useState(false);

  // Custom toolbar with only necessary buttons
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic',
    'list',
    'link'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    
    try {
      let response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data = await response.json();

      // If slug already exists (Conflict), try updating instead
      if (response.status === 409) {
        console.log('Slug exists, attempting update...');
        response = await fetch('/api/blogs', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save blog');
      }


      // Show success message
      const result = await showSuccess(
        `Your blog has been ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`,
        formData.status === 'published' ? 'Blog Published!' : 'Draft Saved!'
      );
      
      // Always navigate to blogs page after success
      router.push('/admin/blogs');
      
      
    } catch (error) {
      console.error('Error saving blog:', error);
      
      // Show error message
      showError(
        error instanceof Error ? error.message : 'Failed to save blog',
        'Oops...'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">Write New Blog</h1>
        <p className="text-gray-600 text-sm md:text-base">Create engaging content with our clean editor</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md md:p-8 p-4 border border-gray-100 mb-6">
          
          {/* Blog Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-xl font-semibold text-gray-900"
              placeholder="e.g., Best AI Tools for 2024"
            />
          </div>

          {/* Auto Slug */}
          <div className="mb-6">
            <AutoSlugInput
              title={formData.title}
              value={formData.slug}
              onChange={(slug) => setFormData({ ...formData, slug })}
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt (Short Description) *
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              maxLength={200}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none text-gray-900"
              placeholder="A brief summary of your blog post (max 200 characters)"
            />
            <p className="text-sm text-gray-500 mt-1 text-right">{formData.excerpt.length}/200</p>
          </div>

          {/* Featured Image with Live Preview */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image URL *
              <span className="text-blue-600 ml-2">✨ Live Preview Below</span>
            </label>
            <input
              type="url"
              required
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              placeholder="https://images.unsplash.com/photo-..."
            />
            <ImagePreview url={formData.featuredImage} alt={formData.title} />
          </div>

          {/* Blog Content - Clean Editor */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Content * 
              <span className="text-gray-900 text-xs ml-2">(Write your blog like a clean sheet of paper)</span>
            </label>
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                formats={formats}
                placeholder="Start writing your blog content..."
                className="bg-white text-gray-800"
                style={{ minHeight: '400px' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Use the toolbar to format text. Keep it simple and clean!
            </p>
          </div>

          {/* Category & Tags */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              >
                <option value="AI Tools">AI Tools</option>
                <option value="Software">Software</option>
                <option value="Creative Assets">Creative Assets</option>
                <option value="Tutorials">Tutorials</option>
                <option value="News">News</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                placeholder="AI, Productivity, Technology"
              />
            </div>
          </div>

          {/* Draft/Publish Toggle */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">Publication Status</p>
                <p className="text-sm text-gray-600">
                  {formData.status === 'draft' ? 'Save as draft (not visible on website)' : 'Publish (visible on website)'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: formData.status === 'draft' ? 'published' : 'draft' })}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  formData.status === 'published' ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    formData.status === 'published' ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 md:px-6 px-4 md:py-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all text-sm md:text-base"
          >
            <Save className="w-5 h-5" />
            {formData.status === 'published' ? 'Publish Blog' : 'Save as Draft'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/blogs')}
            className="md:px-6 px-4 md:py-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm md:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
