'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { Product } from '@/app/data/products';

// Inline SVG placeholder for broken images
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='system-ui, sans-serif' font-size='24' font-weight='600' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

export function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '', name: '' });

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({ open: true, id, name });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/products?id=${deleteModal.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== deleteModal.id));
        console.log('Deleted product:', deleteModal.id);
      } else {
        console.error('Failed to delete product');
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } finally {
      // Close modal in any case
      // We might want to keep it open on error, but for now simple UX is fine
      // Actually the original code didn't close it explicitly here because themodal state controls visible
      // Wait, the original code had: setProducts(...) which triggers re-render?
      // No, setDeleteModal({ open: false ... }) call is in the JSX onConfirm prop wrapper or onClose?
      // Ah, looking at the JSX: 
      // onConfirm={confirmDelete}
      // onClose={() => setDeleteModal({ open: false, id: '', name: '' })}
      // So confirmDelete needs to close it or the modal component handles it? 
      // Let's check the modal component usage in the file view...
      // The DeleteConfirmModal probably calls onConfirm then onClose? or relies on parent to close?
      // Checking local file ... line 172: onConfirm={confirmDelete}
      // Usually confirmDelete is expected to handle the action. The modal doesn't necessarily close itself.
      setDeleteModal({ open: false, id: '', name: '' });
    }
  };

  return (
    <div>
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">All Products</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your products in beautiful card view</p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Product
        </Link>
      </div>

      {/* Search Bar - Mobile Responsive */}
      <div className="mb-4 sm:mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 text-gray-800 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>

      {/* Product Cards Grid - Mobile Responsive */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-500">Loading products...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pb-24 lg:pb-0">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
              />
              
              {/* Action Icons - Always visible on mobile */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="p-1.5 sm:p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Badge - Mobile Responsive */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              </div>
            </div>

            {/* Product Info - Mobile Responsive */}
            <div className="p-3 sm:p-4">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2 line-clamp-1">
                {product.name}
              </h3>
              
              <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                <span className="capitalize truncate">{product.category.replace('-', ' ')}</span>
                <span className={`font-medium ml-2 shrink-0 ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                  Stock: {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: '', name: '' })}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        itemName={deleteModal.name}
      />
    </div>
  );
}
