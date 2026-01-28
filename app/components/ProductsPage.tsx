"use client";

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { products, categories, Product } from '../data/products';
import { ChevronLeft, SlidersHorizontal, SearchX, FilterX, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/utils';


interface ProductsPageProps {
  onAddToCart?: (product: Product) => void; // Make it optional
  initialProducts?: Product[]; // Optional prop for server-fetched products
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ProductsPage({ onAddToCart, initialProducts }: ProductsPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get('category') || 'all';
  const typeParam = searchParams.get('type') || 'all';
  const subcategoryParam = searchParams.get('subcategory') || 'all';
  const sortParam = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Use initialProducts from props or fall back to imported static products
  const allProducts = initialProducts || products;

  // Provide default onAddToCart handler if not provided
  const handleAddToCart = onAddToCart || ((product: Product) => {
    console.log('Add to cart:', product.name);
    // In a real app, this would dispatch to a cart context or state management
  });

  // Update local state when URL params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSortBy(sortParam);
  }, [categoryParam, sortParam]);

  const updateFilters = (newCategory: string) => {
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newCategory);
    // Reset subcategory when changing main category to avoid confusion
    params.delete('subcategory'); 
    router.push(`/products?${params.toString()}`);
    setIsMobileFiltersOpen(false);
  };

  const updateSort = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`/products?${params.toString()}`);
  };

  const filteredProducts = allProducts.filter(p => {
    // Category Filter
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    
    // Type Filter (if present in URL - STRICT PRODUCT TYPE)
    if (typeParam !== 'all' && p.productType.toLowerCase().replace(' ', '-') !== typeParam) return false;

    // Subcategory Filter (Flexible Search: Tags, Name, Description)
    if (subcategoryParam !== 'all') {
        const query = subcategoryParam.toLowerCase();
        const hasTag = p.tags?.some(tag => tag.toLowerCase().includes(query)) || false;
        const hasName = p.name.toLowerCase().includes(query);
        const hasDesc = p.description.toLowerCase().includes(query);
        
        if (!hasTag && !hasName && !hasDesc) return false;
    }
    
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

  const FilterSection = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          Category
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => updateFilters('all')}
            className={cn(
              "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              selectedCategory === 'all'
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            All Products
          </button>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => updateFilters(key)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                selectedCategory === key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Sort By</h4>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => updateSort(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 appearance-none cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Delivery Type Filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Delivery Type</h4>
        <div className="space-y-3">
          {[
            { label: 'Instant Delivery', color: 'green' },
            { label: 'Manual Delivery', color: 'blue' }
          ].map((type) => (
            <label key={type.label} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:bg-blue-600 peer-checked:border-blue-600" />
                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Type Filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Product Type</h4>
        <div className="space-y-3">
          {['Shared Account', 'Personal Account', 'License Key', 'Email Invite'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:bg-blue-600 peer-checked:border-blue-600" />
                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
          >
            <span className="p-2 bg-white rounded-lg border border-gray-200 group-hover:border-gray-300 shadow-xs transition-all">
              <ChevronLeft className="w-4 h-4" />
            </span>
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-3 text-gray-900"
              >
                {categoryName}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600"
              >
                Explore our premium collection of digital assets
              </motion.p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs text-gray-700 font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <SlidersHorizontal className="w-5 h-5 text-gray-900" />
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Mobile Filter Sheet */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 p-6 overflow-y-auto lg:hidden"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-xl text-gray-900">Filters</h3>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                  <FilterSection />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {sortedProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchX className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your current filters. Try adjusting your search or clearing some filters.
                  </p>
                  <button
                    onClick={() => updateFilters('all')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    <FilterX className="w-5 h-5" />
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {sortedProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariants} layout>
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
