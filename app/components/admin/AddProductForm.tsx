"use client";

import React, { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Save, Eye } from 'lucide-react';
import { showSuccess, showError } from '@/app/lib/sweetalert';

interface WhatYouGetItem {
  title: string;
  description: string;
  color: string;
}

interface ProductFormData {
  productId: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  productType: string;
  deliveryType: string;
  rating: number;
  reviews: number;
  soldLast23Hours: number;
  peopleWatching: number;
  stock: number;
  duration: string;
  warranty: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  tags: string[];
  whatYouGet: WhatYouGetItem[];
}

const initialFormData: ProductFormData = {
  productId: '',
  name: '',
  category: 'creative',
  price: 0,
  originalPrice: 0,
  image: '',
  badge: 'Personal',
  productType: 'account',
  deliveryType: 'manual',
  rating: 5,
  reviews: 0,
  soldLast23Hours: 0,
  peopleWatching: 0,
  stock: 999,
  duration: '1 Month',
  warranty: 'Full Warranty',
  shortDescription: '',
  description: '',
  highlights: [''],
  tags: [''],
  whatYouGet: [{ title: '', description: '', color: 'bg-blue-100' }]
};

export function AddProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState('');
  const [currentTag, setCurrentTag] = useState('');

  // Auto-generate productId from name
  const generateProductId = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      productId: generateProductId(name)
    }));
  };

  const addHighlight = () => {
    if (currentHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights.filter(h => h), currentHighlight]
      }));
      setCurrentHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (currentTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags.filter(t => t), currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addWhatYouGetItem = () => {
    setFormData(prev => ({
      ...prev,
      whatYouGet: [...prev.whatYouGet, { title: '', description: '', color: 'bg-blue-100' }]
    }));
  };

  const updateWhatYouGetItem = (index: number, field: keyof WhatYouGetItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      whatYouGet: prev.whatYouGet.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeWhatYouGetItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      whatYouGet: prev.whatYouGet.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          highlights: formData.highlights.filter(h => h.trim()),
          tags: formData.tags.filter(t => t.trim()),
          whatYouGet: formData.whatYouGet.filter(item => item.title.trim()),
          reviewsList: []
        })
      });

      if (response.ok) {
        await showSuccess('Product has been added successfully!', 'Success!');
        onClose();
      } else {
        const error = await response.json();
        showError(error.message || 'Failed to add product', 'Error');
      }
    } catch (error) {
      console.error('Error:', error);
      showError('Failed to add product. Please try again.', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Adobe Creative Cloud"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product ID *</label>
                <input
                  type="text"
                  required
                  value={formData.productId}
                  onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900"
                  placeholder="adobe-creative-cloud-personal"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from name, can be edited</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="creative">Creative Tools</option>
                  <option value="productivity">Productivity</option>
                  <option value="vpn">VPN & Security</option>
                  <option value="ai">AI Tools</option>
                  <option value="streaming">Streaming</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="1 Month"
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded"></div>
              Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Price (৳) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (৳)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="40000"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty if no discount</p>
              </div>
            </div>
            {formData.originalPrice > formData.price && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Discount: {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}%</strong>
                  {' '}savings
                </p>
              </div>
            )}
          </section>

          {/* Media */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-600 rounded"></div>
              Product Image
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="https://images.unsplash.com/..."
              />
              {formData.image && (
                <div className="mt-4 relative w-full h-48 text-gray-800 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '';
                      e.currentTarget.alt = 'Invalid URL';
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Configuration */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-orange-600 rounded"></div>
              Product Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Badge *</label>
                <select
                  required
                  value={formData.badge}
                  onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="Personal">Personal</option>
                  <option value="Shared">Shared</option>
                  <option value="Key Code">Key Code</option>
                  <option value="Email Invite">Email Invite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Type *</label>
                <select
                  required
                  value={formData.productType}
                  onChange={(e) => setFormData(prev => ({ ...prev, productType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="account">Account</option>
                  <option value="key">Key</option>
                  <option value="license">License</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Type *</label>
                <select
                  required
                  value={formData.deliveryType}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="manual">Manual (30 min)</option>
                  <option value="auto">Auto (Instant)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warranty *</label>
                <input
                  type="text"
                  required
                  value={formData.warranty}
                  onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Full Warranty"
                />
              </div>
            </div>
          </section>

          {/* Stock & Analytics */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded"></div>
              Stock & Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Reviews</label>
                <input
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sold in Last 23 Hours</label>
                <input
                  type="number"
                  min="0"
                  value={formData.soldLast23Hours}
                  onChange={(e) => setFormData(prev => ({ ...prev, soldLast23Hours: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">People Watching</label>
                <input
                  type="number"
                  min="0"
                  value={formData.peopleWatching}
                  onChange={(e) => setFormData(prev => ({ ...prev, peopleWatching: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="45"
                />
              </div>
            </div>
          </section>

          {/* Content */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-indigo-600 rounded"></div>
              Product Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Get the entire collection of 20+ creative desktop and mobile apps."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="The ultimate creative toolkit. From photo editing to video production..."
                />
              </div>
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-yellow-600 rounded"></div>
              Product Highlights
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentHighlight}
                  onChange={(e) => setCurrentHighlight(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Add a highlight (e.g., Photoshop, Illustrator, Premiere Pro)"
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.highlights.filter(h => h).map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm">
                    {highlight}
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="hover:bg-blue-200 rounded p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tags */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-pink-600 rounded"></div>
              Tags
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Add a tag (e.g., adobe, design, creative)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.filter(t => t).map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 text-pink-800 rounded-lg text-sm">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:bg-pink-200 rounded p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-teal-600 rounded"></div>
              What You Get
            </h3>
            <div className="space-y-4">
              {formData.whatYouGet.map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                    {formData.whatYouGet.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWhatYouGetItem(index)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateWhatYouGetItem(index, 'title', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Title (e.g., Private Account)"
                    />
                    <select
                      value={item.color}
                      onChange={(e) => updateWhatYouGetItem(index, 'color', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="bg-red-100">Red</option>
                      <option value="bg-blue-100">Blue</option>
                      <option value="bg-green-100">Green</option>
                      <option value="bg-yellow-100">Yellow</option>
                      <option value="bg-purple-100">Purple</option>
                      <option value="bg-pink-100">Pink</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateWhatYouGetItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Description (e.g., Your own personal account.)"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addWhatYouGetItem}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
