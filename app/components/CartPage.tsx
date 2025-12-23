import React from 'react';
import { Product } from '../data/products';
import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface CartPageProps {
  items: { product: Product; quantity: number }[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function CartPage({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onContinueShopping,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;

  const savings = items.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 w-fit"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <button
              onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Continue Shopping
        </button>

        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-xl p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-xs">
                            {item.product.badge}
                          </Badge>
                          {item.product.deliveryType === 'auto' && (
                            <Badge className="bg-green-500 text-white text-xs">
                              ⚡ Instant
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Duration: {item.product.duration}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-xl">৳{item.product.price}</span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ৳{item.product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>৳{subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-৳{savings}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-blue-600">৳{total}</span>
              </div>

              <button
                onClick={() => onCheckout ? onCheckout() : window.location.href = '/checkout'}
                className="block w-full text-center py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
                className="block w-full text-center py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Instant delivery for most items</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Warranty protection included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
