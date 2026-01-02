"use client";

import React from 'react';
import { Star, ShoppingCart, Eye, Clock } from 'lucide-react';
import { Product } from '../data/products';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
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
        return 'bg-indigo-100 text-indigo-700 border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="group bg-white rounded-xl border hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`${getBadgeColor(product.badge)} border text-xs`}>
            {product.badge}
          </Badge>
          {discountPercent > 0 && (
            <Badge className="bg-red-500 text-white border-red-600">
              -{discountPercent}%
            </Badge>
          )}
          {product.stock < 10 && (
            <Badge className="bg-orange-500 text-white border-orange-600">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Delivery Type */}
        <div className="absolute top-3 right-3">
          {product.deliveryType === 'auto' ? (
            <Badge className="bg-green-500 text-white border-green-600 text-xs">
              ⚡ Instant
            </Badge>
          ) : (
            <Badge className="bg-blue-500 text-white border-blue-600 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              30 min
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Duration */}
        <p className="text-sm text-gray-600 mb-2">Duration: {product.duration}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-bold text-2xl text-gray-900">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock < 10 && (
          <p className="text-xs text-orange-600 mb-3">
            Only {product.stock} left in stock!
          </p>
        )}

        {/* Warranty */}
        <p className="text-xs text-green-600 mb-4 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full"></span>
          {product.warranty}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
