import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../data/products';
import { 
  CreditCard, 
  Wallet, 
  ChevronLeft, 
  Mail, 
  ShoppingBag,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Badge } from './ui/badge';

interface CheckoutPageProps {
  items: { product: Product; quantity: number }[];
}

export function CheckoutPage({ items }: CheckoutPageProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'wallet'>('bkash');
  const [additionalEmails, setAdditionalEmails] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState({
    email: 'rafiq@example.com',
    phone: '+880 1700-000000'
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;

  const hasSubscriptionProducts = items.some(
    item => item.product.productType === 'subscription'
  );

  const handleCheckout = () => {
    // Simulate payment processing
    setTimeout(() => {
      router.push('/order-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Products - Additional Email Required */}
            {hasSubscriptionProducts && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Additional Information Required
                    </h3>
                    <p className="text-sm text-blue-700">
                      For subscription products, we need your account email to send invitations.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {items
                    .filter(item => item.product.productType === 'subscription')
                    .map(item => (
                      <div key={item.product.id} className="bg-white rounded-lg p-4">
                        <label className="block font-medium mb-2">
                          Your {item.product.name.includes('Adobe') ? 'Adobe' : 
                                item.product.name.includes('Microsoft') ? 'Microsoft' :
                                item.product.name.includes('Google') ? 'Google' :
                                item.product.name.includes('JetBrains') ? 'JetBrains' : ''} Email
                        </label>
                        <input
                          type="email"
                          value={additionalEmails[item.product.id] || ''}
                          onChange={(e) => setAdditionalEmails({
                            ...additionalEmails,
                            [item.product.id]: e.target.value
                          })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="your.email@example.com"
                        />
                        <p className="text-xs text-gray-600 mt-2">
                          We will send a team invitation to this email within 30 minutes
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Delivery Information */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      {item.product.deliveryType === 'auto' ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-green-500 text-white text-xs">
                            ⚡ Instant Delivery
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {item.product.productType === 'account' && 'Email & Password will be shown after payment'}
                            {item.product.productType === 'license-key' && 'License key will be shown after payment'}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-500 text-white text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Manual Delivery
                          </Badge>
                          <span className="text-sm text-gray-600">
                            Delivery within 30 minutes
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('bkash')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                      bK
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">bKash</p>
                      <p className="text-sm text-gray-600">Pay with bKash</p>
                    </div>
                  </div>
                  {paymentMethod === 'bkash' && (
                    <Check className="w-6 h-6 text-pink-500" />
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('nagad')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                      N
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Nagad</p>
                      <p className="text-sm text-gray-600">Pay with Nagad</p>
                    </div>
                  </div>
                  {paymentMethod === 'nagad' && (
                    <Check className="w-6 h-6 text-orange-500" />
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Wallet Balance</p>
                      <p className="text-sm text-gray-600">Available: ৳2,500</p>
                    </div>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <Check className="w-6 h-6 text-green-500" />
                  )}
                </button>
              </div>

              {paymentMethod === 'wallet' && total > 2500 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">
                    Insufficient wallet balance. Please add ৳{total - 2500} more or choose another payment method.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-semibold">৳{item.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">৳{total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={paymentMethod === 'wallet' && total > 2500}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Complete Payment
              </button>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Instant delivery for eligible items</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
