"use client";

import React from 'react';
import { Product } from '../data/products';
import { CheckCircle, Copy, Eye, EyeOff, Download, Home } from 'lucide-react';
import { Badge } from './ui/badge';

import Link from 'next/link';

interface OrderSuccessPageProps {
  items: { product: Product; quantity: number }[];
}

export function OrderSuccessPage({ items }: OrderSuccessPageProps) {
  const [showPasswords, setShowPasswords] = React.useState<Record<string, boolean>>({});
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  // Mock delivery data based on product type
  const getDeliveryInfo = (product: Product) => {
    if (product.productType === 'account' && product.deliveryType === 'auto') {
      return {
        type: 'credentials',
        email: `${product.id}_user@tempmail.com`,
        password: `Secure${product.id}@2024`
      };
    } else if (product.productType === 'license-key') {
      return {
        type: 'license',
        key: `${product.id.toUpperCase()}-XXXX-XXXX-XXXX-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      };
    } else if (product.productType === 'subscription') {
      return {
        type: 'processing',
        message: 'Invitation will be sent to your email within 30 minutes'
      };
    }
    return null;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const togglePasswordVisibility = (productId: string) => {
    setShowPasswords(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const orderId = `ORD-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-xl p-8 text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        </div>

        {/* Delivery Information */}
        <div className="space-y-6 mb-8">
          {items.map((item) => {
            const deliveryInfo = getDeliveryInfo(item.product);
            
            return (
              <div key={item.product.id} className="bg-white rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{item.product.name}</h2>
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                      {item.product.deliveryType === 'auto' ? '⚡ Delivered' : '⏳ Processing'}
                    </Badge>
                  </div>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Auto Delivery - Credentials */}
                {deliveryInfo?.type === 'credentials' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Your Account Credentials
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Email/Username</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-3 py-2 bg-white border rounded-lg font-mono">
                            {deliveryInfo.email}
                          </div>
                          <button
                            onClick={() => handleCopy(deliveryInfo.email!, `${item.product.id}-email`)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {copiedField === `${item.product.id}-email` ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Password</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-3 py-2 bg-white border rounded-lg font-mono">
                            {showPasswords[item.product.id] 
                              ? deliveryInfo.password 
                              : '••••••••••••'}
                          </div>
                          <button
                            onClick={() => togglePasswordVisibility(item.product.id)}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                          >
                            {showPasswords[item.product.id] ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(deliveryInfo.password!, `${item.product.id}-password`)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {copiedField === `${item.product.id}-password` ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      💡 Tip: Save these credentials in a secure location. You can also find them in your dashboard.
                    </p>
                  </div>
                )}

                {/* Auto Delivery - License Key */}
                {deliveryInfo?.type === 'license' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Your License Key
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-3 bg-white border rounded-lg font-mono text-lg">
                        {deliveryInfo.key}
                      </div>
                      <button
                        onClick={() => handleCopy(deliveryInfo.key!, `${item.product.id}-key`)}
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {copiedField === `${item.product.id}-key` ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      💡 Follow the activation guide in your dashboard to activate this license.
                    </p>
                  </div>
                )}

                {/* Manual Delivery - Processing */}
                {deliveryInfo?.type === 'processing' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-900">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      Order Processing
                    </h3>
                    <p className="text-sm text-blue-800 mb-3">{deliveryInfo.message}</p>
                    <p className="text-xs text-blue-700">
                      You will receive a notification when your order is ready. Check your email and dashboard for updates.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What's Next?</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check Your Dashboard</h3>
                <p className="text-sm text-gray-600">
                  All your products and credentials are saved in your dashboard for future reference.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Follow Installation Guide</h3>
                <p className="text-sm text-gray-600">
                  Refer to the product details page for step-by-step activation instructions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  Our support team is available 24/7. Open a ticket from your dashboard if you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="flex-1 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-center"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
