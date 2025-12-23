"use client";

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { products, categories, Product } from '../data/products';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get('category') || 'all';
  const typeParam = searchParams.get('type') || 'all';
  const sortParam = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState(sortParam);

  // Update local state when URL params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSortBy(sortParam);
  }, [categoryParam, sortParam]);

  const updateFilters = (newCategory: string) => {
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newCategory);
    router.push(`/products?${params.toString()}`);
  };

  const updateSort = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`/products?${params.toString()}`);
  };

  const filteredProducts = products.filter(p => {
    // Category Filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    
    // Type Filter (if present in URL)
    if (typeParam !== 'all' && p.productType.toLowerCase().replace(' ', '-') !== typeParam) return false;
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id.localeCompare(a.id);
      case 'popular':
      default:
        return b.reviews - a.reviews;
    }
  });

  const categoryName = selectedCategory === 'all' 
    ? 'All Products' 
    : categories[selectedCategory as keyof typeof categories]?.name || 'Products';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-gray-600">{sortedProducts.length} products available</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilters('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    All Products
                  </button>
                  {Object.entries(categories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => updateFilters(key)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === key
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-medium mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => updateSort(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Delivery Type Filter */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Delivery Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Instant Delivery</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Manual Delivery</span>
                  </label>
                </div>
              </div>

              {/* Product Type Filter */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Product Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Shared Account</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Personal Account</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">License Key</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Email Invite</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-gray-600 text-lg">No products found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
