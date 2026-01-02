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
    <div className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-wrap gap-1.5 md:gap-2">
          <Badge className={`${getBadgeColor(product.badge)} border text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 font-semibold shadow-sm`}>
            {product.badge}
          </Badge>
          {discountPercent > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 font-bold shadow-md">
              -{discountPercent}%
            </Badge>
          )}
          {product.stock < 10 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 font-semibold shadow-sm">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Delivery Type */}
        <div className="absolute top-2 md:top-3 right-2 md:right-3">
          {product.deliveryType === 'auto' ? (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 font-semibold shadow-md flex items-center gap-1">
              ⚡ Instant
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 font-semibold shadow-md flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              30 min
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-4 lg:p-5">
        <h3 className="font-bold text-xl md:text-base lg:text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Duration */}
        <p className="text-xs md:text-sm text-gray-600 mb-2">Duration: {product.duration}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs md:text-sm font-bold text-gray-900">{product.rating}</span>
          </div>
          <span className="text-xs md:text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3 md:mb-4">
          <span className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-900">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-gray-500 line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock < 10 && (
          <p className="text-[10px] md:text-xs text-orange-600 font-medium mb-3 bg-orange-50 px-2 py-1 rounded-md inline-block">
            Only {product.stock} left in stock!
          </p>
        )}

        {/* Warranty */}
        <div className="text-[10px] md:text-xs text-green-600 font-medium mb-3 md:mb-4 flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-md w-fit">
          <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full"></span>
          {product.warranty}
        </div>

        {/* Actions */}
        <div className="flex sm:flex-row gap-4">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 border-2 border-blue-600 text-blue-600 rounded-lg md:rounded-xl hover:bg-blue-50 transition-all font-semibold text-xs md:text-sm active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg md:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold text-xs md:text-sm active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
