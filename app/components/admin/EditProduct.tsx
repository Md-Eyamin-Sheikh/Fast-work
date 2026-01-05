'use client';

import { useState, useEffect } from 'react';
import { ImagePreview } from './ImagePreview';
import { AutoSlugInput } from './AutoSlugInput';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showSuccess, showError } from '@/app/lib/sweetalert';
import Link from 'next/link';

interface EditProductProps {
  id: string;
}

export function EditProduct({ id }: EditProductProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'ai-tools',
    productType: 'Shared Account',
    badge: 'Shared',
    price: '',
    originalPrice: '',
    duration: '1 Month',
    deliveryType: 'auto' as 'auto' | 'manual',
    warranty: '30 Days Replacement',
    rating: '4.5',
    stock: '',
    image: '',
    description: '',
    reviews: '',
    soldLast23Hours: '',
    peopleWatching: '',
    status: 'draft' as 'draft' | 'published'
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                 showError('Product not found', 'Error');
                 router.push('/admin/products');
                 return;
            }
            throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        
        // Populate form data, converting numbers back to strings for inputs
        setFormData({
            name: data.name || '',
            slug: data.slug || '',
            category: data.category || 'ai-tools',
            productType: data.productType || 'Shared Account',
            badge: data.badge || 'Shared',
            price: data.price?.toString() || '',
            originalPrice: data.originalPrice?.toString() || '',
            duration: data.duration || '1 Month',
            deliveryType: data.deliveryType || 'auto',
            warranty: data.warranty || '30 Days Replacement',
            rating: data.rating?.toString() || '4.5',
            stock: data.stock?.toString() || '',
            image: data.image || '',
            description: data.description || '',
            reviews: data.reviews?.toString() || '',
            soldLast23Hours: data.soldLast23Hours?.toString() || '',
            peopleWatching: data.peopleWatching?.toString() || '',
            status: data.status || 'draft'
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        showError('Failed to load product details', 'Error');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        id, // Include ID for the PUT request
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : 0,
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews || 0),
        soldLast23Hours: Number(formData.soldLast23Hours || 0),
        peopleWatching: Number(formData.peopleWatching || 0)
      };

      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }
      
      await showSuccess(
        'Product updated successfully!',
        'Success!'
      );
      
      router.push('/admin/products');
    } catch (error: any) {
      console.error('Error updating product:', error);
      showError(error.message || 'Failed to update product', 'Error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
      return (
          <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
      );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
            href="/admin/products"
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
            <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">Edit Product</h1>
            <p className="text-gray-600 text-sm md:text-md">Update product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* Main Card */}
        <div className="bg-white rounded-2xl md:shadow-md md:p-8 p-4 border border-gray-100 mb-6">
          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              placeholder="e.g., ChatGPT Plus"
            />
          </div>

          {/* Auto Slug */}
          <div className="mb-6">
            <AutoSlugInput
              title={formData.name}
              value={formData.slug}
              onChange={(slug) => setFormData({ ...formData, slug })}
            />
          </div>

          {/* Category & Product Type Grid */}
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
                <option value="ai-tools">AI Tools</option>
                <option value="creative-assets">Creative Assets</option>
                <option value="software">Software</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Type *
              </label>
              <select
                required
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value, badge: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              >
                <option value="Shared Account">Shared Account</option>
                <option value="Personal Account">Personal Account</option>
                <option value="License Key">License Key</option>
                <option value="Email Invite">Email Invite</option>
              </select>
            </div>
          </div>

          {/* Price Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (৳) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                placeholder="1200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Price (৳)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                placeholder="1500"
              />
            </div>
          </div>

          {/* Image URL with Live Preview */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image URL * 
              <span className="text-blue-600 ml-2">✨ Live Preview Below</span>
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              placeholder="https://images.unsplash.com/photo-..."
            />
            
            {/* Live Image Preview */}
            <ImagePreview url={formData.image} alt={formData.name} />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 resize-none"
              placeholder="Enter product description..."
            />
          </div>

          {/* Stock & Duration */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration *
              </label>
              <select
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="Lifetime">Lifetime</option>
              </select>
            </div>
          </div>

          {/* Draft/Publish Toggle */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">Publication Status</p>
                <p className="text-sm text-gray-600">
                  {formData.status === 'draft' ? 'Save as draft (not visible to customers)' : 'Publish (visible to customers)'}
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
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 md:px-6 px-4 md:py-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="md:px-6 px-4 md:py-4 py-2  bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
