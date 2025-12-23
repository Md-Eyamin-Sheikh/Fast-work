"use client";

import React, { useState } from 'react';
import { Product } from '../data/products';
import { 
  Star, 
  ShoppingCart, 
  Shield, 
  Clock, 
  Check, 
  ChevronLeft,
  Package,
  Zap,
  Info
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface ProductDetailsPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onBack?: () => void;
}

export function ProductDetailsPage({ product, onAddToCart, onBuyNow, onBack }: ProductDetailsPageProps) {
  const [quantity] = useState(1);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Shared':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'Personal':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Key Code':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Email Invite':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => onBack ? onBack() : window.location.href = '/products'}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-8">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className={`${getBadgeColor(product.badge)} border`}>
                  {product.badge}
                </Badge>
                {discountPercent > 0 && (
                  <Badge className="bg-red-500 text-white border-red-600">
                    -{discountPercent}% OFF
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                {product.deliveryType === 'auto' ? (
                  <Badge className="bg-green-500 text-white border-green-600 flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Instant Delivery
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500 text-white border-blue-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    30 Min Delivery
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">৳{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ৳{product.originalPrice}
                  </span>
                  <span className="text-xl text-green-600 font-semibold">
                    Save ৳{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="font-semibold">{product.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-gray-600">Warranty</p>
                  <p className="font-semibold">{product.warranty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-gray-600">Stock</p>
                  <p className="font-semibold">
                    {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-semibold capitalize">{product.productType.replace('-', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-5 h-5" />
                <span>Guaranteed Replacement if product fails</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-5 h-5" />
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-5 h-5" />
                <span>Secure Payment & Data Protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-xl p-8">
          <Tabs defaultValue="features">
            <TabsList className="mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="activation">How to Activate</TabsTrigger>
              {product.systemRequirements && (
                <TabsTrigger value="requirements">System Requirements</TabsTrigger>
              )}
              <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <h3 className="font-semibold text-xl mb-4">Product Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="activation">
              <h3 className="font-semibold text-xl mb-4">Installation & Activation Guide</h3>
              {product.installationGuide ? (
                <div className="space-y-4">
                  {product.installationGuide.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                  
                  {product.productType === 'subscription' && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> For subscription products, you will need to provide your email address during checkout. We will send you an invitation within 30 minutes.
                      </p>
                    </div>
                  )}
                  
                  {product.deliveryType === 'auto' && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <strong>Instant Delivery:</strong> You will receive your credentials/key immediately after payment confirmation.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">Detailed activation instructions will be provided after purchase.</p>
              )}
            </TabsContent>

            {product.systemRequirements && (
              <TabsContent value="requirements">
                <h3 className="font-semibold text-xl mb-4">System Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-700">Operating System</h4>
                    <p className="text-gray-600">{product.systemRequirements.os}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-700">RAM</h4>
                    <p className="text-gray-600">{product.systemRequirements.ram}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-700">Storage</h4>
                    <p className="text-gray-600">{product.systemRequirements.storage}</p>
                  </div>
                  {product.systemRequirements.processor && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-700">Processor</h4>
                      <p className="text-gray-600">{product.systemRequirements.processor}</p>
                    </div>
                  )}
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> Please ensure your system meets these requirements before purchasing to avoid compatibility issues.
                  </p>
                </div>
              </TabsContent>
            )}

            <TabsContent value="warranty">
              <h3 className="font-semibold text-xl mb-4">Warranty & Replacement Policy</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Warranty Period:</strong> {product.warranty}
                </p>
                <div>
                  <strong className="block mb-2">What's Covered:</strong>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Account/license not working or invalid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Credentials changed by provider</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Subscription cancelled prematurely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Technical issues with the product</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <strong className="block mb-2">How to Claim:</strong>
                  <ol className="space-y-2 ml-6 list-decimal">
                    <li>Go to your dashboard and find the order</li>
                    <li>Click "Open Ticket" and describe the issue</li>
                    <li>Our team will review within 2-4 hours</li>
                    <li>Replacement will be provided if eligible</li>
                  </ol>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    We stand behind our products. If you experience any issues during the warranty period, we'll replace it at no additional cost.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
