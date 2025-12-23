import React from 'react';
import { ProductCard } from './ProductCard';
import { products, bundles, categories } from '../data/products';
import { Product } from '../data/products';
import { ArrowRight, Zap, Shield, Clock, Headphones } from 'lucide-react';
import Link from 'next/link';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const featuredProducts = products.slice(0, 6);
  const flashSaleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-teal-500 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Digital Assets & Subscriptions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Get instant access to ChatGPT, Adobe, Microsoft 365, and more at unbeatable prices
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/bundles"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                View Bundles 🔥
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Instant Delivery</h3>
              <p className="text-sm text-gray-600">Auto-delivery within seconds</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Warranty Protection</h3>
              <p className="text-sm text-gray-600">Full replacement guarantee</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Installation support included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">⚡ Flash Sale</h2>
                <p className="text-gray-600">Limited time offers - Grab them before they're gone!</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Ends in 23:45:12</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bundle Offers */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">🎁 Bundle Offers</h2>
              <p className="text-gray-600">Save more when you buy together</p>
            </div>
            <Link
              href="/bundles"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Bundles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <div key={bundle.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    Save {bundle.discount}%
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-2">{bundle.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{bundle.products.length} Products Included</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-bold text-2xl text-purple-600">৳{bundle.price}</span>
                  <span className="text-sm text-gray-500 line-through">৳{bundle.originalPrice}</span>
                </div>
                <Link
                  href="/bundles"
                  className="block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  View Bundle
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <Link
                key={key}
                href={`/products?category=${key}`}
                className="p-6 bg-white rounded-xl border hover:border-blue-600 hover:shadow-lg transition-all group block"
              >
                <h3 className="font-semibold mb-2 group-hover:text-blue-600">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.items.length} Products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Most popular digital assets</p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers and get instant access to premium digital assets
          </p>
          <Link
            href="/products"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Browse All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
