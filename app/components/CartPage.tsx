import { Product } from '../data/products';
import { CartItem } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface CartPageProps {
  items: CartItem[];
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
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const savings = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="max-w-6xl mx-auto px-4 w-full pt-8">
            <button
                onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors mb-8"
            >
                <ChevronLeft className="w-5 h-5" />
                Back
            </button>
        </div>

        <div className="flex-1 flex items-center justify-center -mt-20 px-4">
            <div className="bg-white rounded-3xl p-12 md:p-16 text-center shadow-sm max-w-2xl w-full mx-auto animate-in fade-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
                <p className="text-gray-500 text-lg mb-10">Add some products to get started!</p>
                <button
                    onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/25 active:scale-95 text-base"
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

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Shopping Cart ({items.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="pr-4">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-lg mb-1 line-clamp-2">{item.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className="text-[10px] sm:text-xs px-1.5 py-0.5" variant="secondary">
                            {item.badge}
                          </Badge>
                          {item.deliveryType === 'auto' && (
                            <Badge className="bg-green-500 text-white text-[10px] sm:text-xs px-1.5 py-0.5 hover:bg-green-600">
                              ⚡ Instant
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">Duration: {item.duration}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-lg sm:text-xl text-gray-900">৳{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ৳{item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <span className="font-semibold w-6 sm:w-8 text-center text-sm sm:text-base text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
              <h2 className="text-xl font-bold mb-6 text-gray-700">Order Summary</h2>

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
                <span className="font-bold text-lg text-gray-700">Total</span>
                <span className="font-bold text-2xl  text-blue-600">৳{total}</span>
              </div>

              <button
                onClick={() => onCheckout ? onCheckout() : window.location.href = '/checkout'}
                className="block w-full text-center py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => onContinueShopping ? onContinueShopping() : window.location.href = '/products'}
                className="block w-full text-center py-3 border text-gray-600 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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
