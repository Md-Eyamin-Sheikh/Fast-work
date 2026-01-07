import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CartItem } from '../context/CartContext';
import { useCart } from '../context/CartContext'; // Import useCart for clearing cart
import { 
  Check,
  AlertCircle,
  CreditCard,
  X
} from 'lucide-react';
import { Badge } from './ui/badge';
import Image from 'next/image';

// Payment Icon Components (Mock placeholders for specific brand icons)
const VisaIcon = () => <div className="h-6 w-10 bg-blue-800 rounded text-white text-[8px] flex items-center justify-center font-bold italic">VISA</div>;
const MastercardIcon = () => <div className="h-6 w-10 bg-black rounded text-white text-[8px] flex items-center justify-center font-bold">Master</div>;
const AmexIcon = () => <div className="h-6 w-10 bg-blue-400 rounded text-white text-[8px] flex items-center justify-center font-bold">AMEX</div>;
const BkashIcon = () => <div className="h-6 w-10 bg-pink-600 rounded text-white text-[8px] flex items-center justify-center font-bold">bKash</div>;

interface CheckoutPageProps {
  items: CartItem[];
}

export function CheckoutPage({ items }: CheckoutPageProps) {
  const router = useRouter();
  const { clearCart } = useCart(); // Use hook
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'binance' | 'bybit' | 'crypto'>('online');
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    country: 'Bangladesh',
    phone: '',
    email: '',
    createAccount: false,
    senderNumber: '',
    transactionId: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const handleCheckout = async () => {
    // Basic Validation
    if (!billingInfo.fullName || !billingInfo.phone || !billingInfo.email) {
      alert('Please fill in all required billing fields.');
      return;
    }

    if (paymentMethod !== 'online') {
        if (!billingInfo.senderNumber || !billingInfo.transactionId) {
            alert('Please provide Sender Number and Transaction ID.');
            return;
        }
        if (billingInfo.senderNumber.length < 11) {
             alert('Please provide a valid 11-digit Sender Number.');
             return;
        }
    }

    try {
        const orderData = {
            items,
            total,
            customer: {
                fullName: billingInfo.fullName,
                email: billingInfo.email,
                phone: billingInfo.phone,
                country: billingInfo.country
            },
            payment: {
                method: paymentMethod,
                senderNumber: billingInfo.senderNumber,
                transactionId: billingInfo.transactionId
            }
        };

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            const result = await response.json();
            // Save basic info for success page
            localStorage.setItem('lastOrder', JSON.stringify(items));
            localStorage.setItem('lastOrderId', result.orderId);
            
            clearCart();
            router.push('/order-success');
        } else {
            console.error('Order failed');
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please check your connection.');
    }
  };

  if (items.length === 0) {
      return (
          <div className="min-h-screen bg-white py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Link href="/" className="text-blue-600 hover:underline">Return to shop</Link>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span className="text-gray-500">Shopping cart</span>
            <span className="text-gray-300">→</span>
            <span className="text-green-600 font-bold border-b-2 border-green-600 pb-0.5">Checkout</span>
            <span className="text-gray-300">→</span>
            <span className="text-gray-400">Order complete</span>
        </div>

        {/* Notification */}
        <div className="bg-white border-t-2 border-green-500 p-4 mb-8 flex items-center gap-2 text-sm text-gray-700 shadow-sm">
            <Check className="w-5 h-5 text-green-500" />
            <span><span className="text-gray-600">Continue shopping</span> "{items[0].name}" has been added to your cart.</span>
        </div>

        {/* Auth Links */}
        <div className="space-y-3 mb-8 text-sm">
            <div className="text-gray-700">
                Returning customer? <a href="#" className="text-green-600 hover:underline">Click here to login</a>
            </div>
            <div className="text-gray-700">
                 Have a coupon? <a href="#" className="text-green-600 hover:underline">Click here to enter your code</a>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Billing Details */}
          <div>
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Details</h2>
             
             <form className="space-y-6 bg-white p-0 rounded-none bg-transparent">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        value={billingInfo.fullName}
                        onChange={(e) => setBillingInfo({...billingInfo, fullName: e.target.value})}
                        className="w-full bg-gray-100 border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                    <select 
                        value={billingInfo.country}
                        onChange={(e) => setBillingInfo({...billingInfo, country: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow text-gray-700"
                    >
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                        className="w-full bg-gray-100 border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email address <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                        className="w-full bg-gray-100 border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                    />
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input 
                        type="checkbox" 
                        id="create-account"
                        checked={billingInfo.createAccount}
                        onChange={(e) => setBillingInfo({...billingInfo, createAccount: e.target.checked})}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-4 h-4"
                    />
                    <label htmlFor="create-account" className="text-sm font-medium text-gray-700 cursor-pointer">Create an account?</label>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Additional Information</h3>
                    <div className="h-px w-full bg-gray-200 mb-6"></div>
                    {/* Placeholder for additional info textarea or notes if needed pattern matches screenshot which just shows header */}
                </div>
             </form>
          </div>

          {/* Right Column: Your Order */}
          <div className="bg-white p-8 rounded-xl border-2 border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Order</h2>
            
            <div className="mb-6">
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-4">
                    <span>Product</span>
                    <span>Subtotal</span>
                </div>
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex items-center gap-4">
                                <button className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                <div className="text-sm text-gray-600 max-w-[200px]">
                                    {item.name}  <span className="font-bold">× {item.quantity}</span>
                                </div>
                            </div>
                            <span className="text-gray-500 font-medium">৳{item.price * item.quantity}.00</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100 mb-8">
                <div className="flex justify-between text-sm font-bold text-gray-700">
                    <span>Subtotal</span>
                    <span className="text-green-600">৳{subtotal}.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">৳{total}.00</span>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6 mb-8">
                <h3 className="font-bold text-gray-900 text-lg">Select Payment Method</h3>
                
                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-3">
                    {['bKash', 'Nagad', 'Rocket'].map((method) => (
                        <button
                            key={method}
                            onClick={() => setPaymentMethod(method as any)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                                paymentMethod === method 
                                ? 'border-[#e2136e] bg-pink-50 text-[#e2136e]' 
                                : method === 'Nagad' && paymentMethod === 'Nagad' ? 'border-[#ec1d24] bg-red-50'
                                : method === 'Rocket' && paymentMethod === 'Rocket' ? 'border-[#8c3494] bg-purple-50'
                                : 'border-gray-100 hover:border-gray-200 bg-white text-gray-600'
                            }`}
                        >
                            <span className={`font-bold text-sm ${
                                method === 'bKash' ? 'text-[#e2136e]' : 
                                method === 'Nagad' ? 'text-[#ec1d24]' : 
                                'text-[#8c3494]'
                            }`}>{method}</span>
                        </button>
                    ))}
                    <button
                         onClick={() => setPaymentMethod('online')}
                         className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                             paymentMethod === 'online'
                             ? 'border-blue-600 bg-blue-50 text-blue-600'
                             : 'border-gray-100 hover:border-gray-200 bg-white text-gray-600'
                         }`}
                    >
                         <span className="font-bold text-sm">Card/Other</span>
                    </button>
                </div>

                {/* Manual Payment Details */}
                {['bKash', 'Nagad', 'Rocket'].includes(paymentMethod) && (
                    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Send Money (Personal)</p>
                                <p className="font-mono font-bold text-gray-900 text-lg">01734612345</p>
                            </div>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText('01734612345');
                                    // Could add toast here
                                }}
                                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                Copy
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Sender Number (Your Number)</label>
                                <input 
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    maxLength={11}
                                    onChange={(e) => setBillingInfo({...billingInfo, senderNumber: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                                />
                                <p className="text-[10px] text-gray-500 mt-1">The number you sent money from</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Transaction ID (TrxID)</label>
                                <input 
                                    type="text"
                                    placeholder="8N7..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono uppercase"
                                    onChange={(e) => setBillingInfo({...billingInfo, transactionId: e.target.value})}
                                />
                                <p className="text-[10px] text-gray-500 mt-1">Found in the payment confirmation message</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 flex gap-2">
                             <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                             <div>
                                After verifying your payment (usually 10-15 mins), you will receive the product access via email.
                             </div>
                        </div>
                    </div>
                )}
                
                {paymentMethod === 'online' && (
                    <div className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500">
                        Secure online payment gateway coming soon. Please use Mobile Banking for now.
                    </div>
                )}
            </div>
            
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="font-bold text-gray-900">privacy policy</a>.
            </p>

            <button 
                onClick={handleCheckout}
                className="w-full bg-[#42b72a] hover:bg-green-600 text-white font-bold py-4 rounded-md uppercase tracking-wide transition-colors"
            >
                PLACE ORDER
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
