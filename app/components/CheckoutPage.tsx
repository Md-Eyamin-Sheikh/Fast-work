import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../data/products';
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
  items: { product: Product; quantity: number }[];
}

export function CheckoutPage({ items }: CheckoutPageProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'binance' | 'bybit' | 'crypto'>('online');
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    country: 'Bangladesh',
    phone: '',
    email: '',
    createAccount: false
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;

  const handleCheckout = () => {
    // Simulate payment processing
    setTimeout(() => {
      router.push('/order-success');
    }, 2000);
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
            <span><span className="text-gray-400">Continue shopping</span> "{items[0].product.name}" has been added to your cart.</span>
        </div>

        {/* Auth Links */}
        <div className="space-y-3 mb-8 text-sm">
            <div>
                Returning customer? <a href="#" className="text-green-600 hover:underline">Click here to login</a>
            </div>
            <div>
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
                        <div key={item.product.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex items-center gap-4">
                                <button className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded" />
                                <div className="text-sm text-gray-600 max-w-[200px]">
                                    {item.product.name}  <span className="font-bold">× {item.quantity}</span>
                                </div>
                            </div>
                            <span className="text-gray-500 font-medium">৳{item.product.price * item.quantity}.00</span>
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
            <div className="space-y-4 mb-8">
                {/* Pay Online */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                         <input 
                            type="radio" 
                            id="pay-online" 
                            name="payment" 
                            value="online"
                            checked={paymentMethod === 'online'}
                            onChange={() => setPaymentMethod('online')}
                            className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                            <label htmlFor="pay-online" className="block text-sm font-bold text-gray-900 cursor-pointer">
                                Pay Online(Credit/Debit Card/MobileBanking/NetBanking/bKash)
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <VisaIcon />
                                <MastercardIcon />
                                <AmexIcon />
                                <BkashIcon />
                                {/* Add more icons as needed */}
                            </div>
                        </div>
                    </div>
                    {paymentMethod === 'online' && (
                         <div className="mt-3 text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
                            Accept global payments securely via VISA, MasterCard, bKash, or Bank. Select BDT (৳) from the right side before placing your order.
                         </div>
                    )}
                </div>

                 {/* Binance */}
                 <div className="flex items-center gap-3">
                     <input 
                            type="radio" 
                            id="binance" 
                            name="payment" 
                            value="binance"
                            checked={paymentMethod === 'binance'}
                            onChange={() => setPaymentMethod('binance')}
                            className="text-yellow-500 focus:ring-yellow-500"
                        />
                    <label htmlFor="binance" className="text-sm font-bold text-gray-900 flex items-center gap-2 cursor-pointer">
                        Binnace Payment <div className="bg-black text-yellow-500 rounded-full p-0.5"><div className="w-4 h-4 bg-yellow-500 rounded-full"></div></div>
                    </label>
                 </div>

                  {/* Bybit */}
                 <div className="flex items-center gap-3">
                     <input 
                            type="radio" 
                            id="bybit" 
                            name="payment" 
                            value="bybit"
                            checked={paymentMethod === 'bybit'}
                            onChange={() => setPaymentMethod('bybit')}
                            className="text-gray-900 focus:ring-gray-900"
                        />
                    <label htmlFor="bybit" className="text-sm font-bold text-gray-900 flex items-center gap-2 cursor-pointer">
                        Bybit Payment <span className="font-bold">BYB<span className="text-yellow-500">i</span>T</span>
                    </label>
                 </div>

                  {/* Crypto */}
                 <div className="flex items-center gap-3">
                     <input 
                            type="radio" 
                            id="crypto" 
                            name="payment" 
                            value="crypto"
                            checked={paymentMethod === 'crypto'}
                            onChange={() => setPaymentMethod('crypto')}
                            className="text-blue-500 focus:ring-blue-500"
                        />
                    <label htmlFor="crypto" className="text-sm font-bold text-gray-900 flex items-center gap-2 cursor-pointer">
                        Crypto Payment <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full border">Pay with crypto</span>
                        {/* Icons row */}
                    </label>
                 </div>

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
