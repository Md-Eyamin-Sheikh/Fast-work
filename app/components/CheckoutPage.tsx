import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CartItem, useCart } from '../context/CartContext';
import { 
  Check,
  AlertCircle,
  CreditCard,
  X,
  ShieldCheck,
  Smartphone,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface CheckoutPageProps {
  items: CartItem[];
}

export function CheckoutPage({ items }: CheckoutPageProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    country: 'Bangladesh',
    phone: '',
    email: '',
    createAccount: false,
    notes: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; // Add tax/shipping logic if needed

  const handleCheckout = async () => {
    // Validation
    if (!billingInfo.fullName || !billingInfo.phone || !billingInfo.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required billing fields.',
        confirmButtonColor: '#42b72a'
      });
      return;
    }

    setLoading(true);

    try {
        // 1. Create Order in Database (Pending Status)
        const orderData = {
            items,
            totalAmount: total, // Ensure this matches schema expectation
            customer: {
                fullName: billingInfo.fullName,
                email: billingInfo.email,
                phone: billingInfo.phone,
                country: billingInfo.country
            },
            payment: {
                method: 'SSLCommerz', // Initial placeholder
                transactionId: 'PENDING', // Will be updated by init/success
                senderNumber: ''
            }
        };

        const orderRes = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        const orderResult = await orderRes.json();

        if (!orderRes.ok) {
            throw new Error(orderResult.message || 'Failed to create order');
        }

        const { orderId } = orderResult;
        
        // Save order info for success page fallback (optional)
        localStorage.setItem('lastOrder', JSON.stringify(items));
        localStorage.setItem('lastOrderId', orderId);

        // 2. Initialize SSLCommerz Payment
        const paymentRes = await fetch('/api/payment/init', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
        });

        const paymentResult = await paymentRes.json();

        if (!paymentRes.ok) {
            throw new Error(paymentResult.error || 'Payment initialization failed');
        }

        if (paymentResult.gatewayUrl) {
            // Redirect to SSLCommerz
            window.location.href = paymentResult.gatewayUrl;
        } else {
             throw new Error('No gateway URL received');
        }

    } catch (error: any) {
        console.error('Checkout error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: error.message || 'An error occurred. Please try again.',
            confirmButtonColor: '#d33'
        });
        setLoading(false);
    }
  };

  if (items.length === 0) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                     <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                  <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                  <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                      Return to shop
                  </Link>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
             
             {/* Billing Section */}
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Billing Details</h2>
                        <p className="text-xs text-gray-500">Enter your information securely</p>
                    </div>
                </div>
                
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            value={billingInfo.fullName}
                            onChange={(e) => setBillingInfo({...billingInfo, fullName: e.target.value})}
                            className="w-full bg-gray-50 border text-gray-700   border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                            <input 
                                type="tel" 
                                value={billingInfo.phone}
                                onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                                className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                                placeholder="017XXXXXXXX"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Country <span className="text-red-500">*</span></label>
                            <select 
                                value={billingInfo.country}
                                onChange={(e) => setBillingInfo({...billingInfo, country: e.target.value})}
                                className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all appearance-none"
                            >
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="United States">International</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                        <input 
                            type="email" 
                            value={billingInfo.email}
                            onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                            className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="pt-2">
                         <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                             <div className="shrink-0 bg-blue-100 p-2 rounded-full">
                                 <AlertCircle className="w-4 h-4 text-blue-600" />
                             </div>
                             <p className="text-xs text-blue-800 leading-relaxed">
                                 We'll use this email to send your order receipt and product access details immediately after payment.
                             </p>
                         </div>
                    </div>
                </form>
             </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Items */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">x{item.quantity}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Digital Product</p>
                                </div>
                                <div className="font-bold text-gray-900 text-sm">
                                    ৳{(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-gray-100 pt-4 space-y-3">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Subtotal</span>
                            <span className="font-medium">৳{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-900 text-lg font-bold pt-2 border-t border-dashed border-gray-200">
                            <span>Total Amount</span>
                            <span className="text-green-600">৳{total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                             <ShieldCheck className="w-4 h-4 text-green-600" />
                             Secure Payment with SSLCommerz
                        </h3>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                             {/* Payment Logos Placeholder or CSS */}
                             <div className="h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-pink-600">bKash</div>
                             <div className="h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-red-600">Nagad</div>
                             <div className="h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-purple-600">Rocket</div>
                             <div className="h-8 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-blue-600">VISA</div>
                        </div>
                        <p className="text-xs text-center text-gray-500">
                            You will be redirected to the secure gateway to complete your payment.
                        </p>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full bg-[#42b72a] hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {loading ? (
                             <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                             </>
                        ) : (
                             <>
                                Pay Now <span className="font-sans">৳{total.toLocaleString()}</span>
                             </>
                        )}
                    </button>
                    
                    <div className="flex justify-center gap-4 text-gray-400 grayscale opacity-60">
                         {/* Secure Badges if available */}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

