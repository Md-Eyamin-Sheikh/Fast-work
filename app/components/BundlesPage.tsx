import React from 'react';
import { bundles, products } from '../data/products';
import { ChevronLeft, Check, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface BundlesPageProps {
  onViewProduct?: (id: any) => void;
  onAddToCart?: (item: any) => void;
}

export function BundlesPage({ onViewProduct, onAddToCart }: BundlesPageProps) {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">🔥 Bundle Offers</h1>
          <p className="text-xl text-gray-600">
            Save more when you buy together! Special discounts on curated product bundles.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {bundles.map((bundle) => {
            const bundleProducts = bundle.products
              .map(pid => products.find(p => p.id === pid))
              .filter(Boolean) as typeof products;

            return (
              <div key={bundle.id} className="bg-white rounded-xl overflow-hidden border-2 border-blue-200 hover:border-indigo-300 hover:shadow-2xl transition-all">
                {/* Bundle Image */}
                <div className="relative h-48">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white border-red-600 text-lg px-4 py-2">
                      Save {bundle.discount}%
                    </Badge>
                  </div>
                </div>

                {/* Bundle Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">{bundle.name}</h2>

                  {/* Included Products */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                      <Check className="w-5 h-5 text-green-600" />
                      Included Products:
                    </h3>
                    <ul className="space-y-2">
                      {bundleProducts.map((product) => (
                        <li key={product.id} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          <Link
                            href={`/products/${product.id}`}
                            className="text-gray-700 text-left hover:text-blue-600 hover:underline"
                            onClick={(e) => {
                              if (onViewProduct) {
                                // optional: prevent default if we want to handle navigation manually
                                // e.preventDefault();
                                onViewProduct(product.id);
                              }
                            }}
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-blue-600">৳{bundle.price}</span>
                      <span className="text-lg text-gray-500 line-through">৳{bundle.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">
                      You save ৳{bundle.originalPrice - bundle.price}!
                    </p>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => onAddToCart?.(bundle)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add Bundle to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Buy Bundles */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Our Bundles?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Maximum Savings</h3>
              <p className="text-blue-100">Save up to 30% compared to buying individually</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Curated Selections</h3>
              <p className="text-blue-100">Professionally selected products that work great together</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">All-in-One Solution</h3>
              <p className="text-blue-100">Everything you need in one convenient package</p>
            </div>
          </div>
        </div>

        {/* Custom Bundle CTA */}
        <div className="mt-12 bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Bundle?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the perfect bundle? Contact us and we'll create a custom package just for you!
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
