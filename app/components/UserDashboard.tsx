"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Wallet, 
  Clock, 
  Copy, 
  CheckCircle, 
  RefreshCw,
  AlertCircle,
  Download,
  Key,
  Mail,
  Eye,
  EyeOff,
  Plus,
  MessageSquare,
  ChevronLeft
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { mockUser, PurchasedProduct } from '../data/mockUser';

interface UserDashboardProps {
  // onLogout is optional now as we can handle it internally or clear cookies/tokens
  onLogout?: () => void;
}

export function UserDashboard({ onLogout }: UserDashboardProps) {
  const router = useRouter();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [walletAmount, setWalletAmount] = useState('');
  const [newTicket, setNewTicket] = useState({
    orderId: '',
    subject: '',
    message: ''
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const togglePasswordVisibility = (orderId: string) => {
    setShowPasswords(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const getTimeRemaining = (expiryDate: string) => {
    if (expiryDate === 'Lifetime') return 'Lifetime';
    
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'expired':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const activeProducts = mockUser.purchasedProducts.filter(p => p.status === 'active');
  const expiredProducts = mockUser.purchasedProducts.filter(p => p.status === 'expired');

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 w-fit transition-all hover:-translate-x-1"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, {mockUser.name}!</h1>
            <p className="text-blue-100 font-medium">{mockUser.email}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Wallet Balance</h3>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                 <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">৳{mockUser.walletBalance}</p>
            <button className="mt-4 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-100 transition-colors flex items-center gap-1 w-fit">
              <Plus className="w-4 h-4" />
              Add Money
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Active Products</h3>
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeProducts.length}</p>
            <p className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-wide">Total: {mockUser.purchasedProducts.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Support Tickets</h3>
               <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockUser.tickets.length}</p>
            <p className="mt-4 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-md w-fit">
              {mockUser.tickets.filter(t => t.status === 'open').length} Open
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <TabsList className="w-full justify-start border-b border-gray-100 bg-gray-50/50 p-0">
             <div className="flex px-6 gap-6">
                <TabsTrigger 
                    value="products" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-4 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                >
                    My Products
                </TabsTrigger>
                <TabsTrigger 
                    value="wallet" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-4 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                >
                    Wallet
                </TabsTrigger>
                <TabsTrigger 
                    value="tickets" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-4 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                >
                    Support Tickets
                </TabsTrigger>
             </div>
          </TabsList>

          {/* My Products Tab */}
          <TabsContent value="products" className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">My Digital Assets</h2>
              <p className="text-gray-500">View and manage your purchased subscriptions and licenses</p>
            </div>

            {activeProducts.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No active products</h3>
                <p className="text-gray-500 mb-6">Start exploring our catalog to find tools you need.</p>
                <Link href="/products" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {activeProducts.map((product) => (
                  <div key={product.orderId} className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 bg-white group">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{product.productName}</h3>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <p>Order ID: <span className="font-mono text-gray-700">{product.orderId}</span></p>
                            <span className="text-gray-300">•</span>
                            <p>Purchased: {new Date(product.purchaseDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="text-left md:text-right">
                        {product.expiryDate !== 'Lifetime' ? (
                          <>
                            <div className="flex items-center gap-2 justify-start md:justify-end mb-1">
                              <Clock className="w-4 h-4 text-orange-500" />
                              <span className="font-bold text-orange-600">
                                {getTimeRemaining(product.expiryDate)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-3">
                              Expires: {new Date(product.expiryDate).toLocaleDateString()}
                            </p>
                            {new Date(product.expiryDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 && (
                              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">
                                Renew Now
                              </button>
                            )}
                          </>
                        ) : (
                          <Badge className="bg-indigo-100 text-indigo-700 border-indigo-300 px-3 py-1">
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                            Lifetime License
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Credentials Display */}
                    {product.credentials && (
                      <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100 shadow-sm backdrop-blur-sm">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-4 text-sm uppercase tracking-wider">
                           <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <Key className="w-3.5 h-3.5" />
                           </div>
                           Account Credentials
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">Email / Username</label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-mono text-gray-800 shadow-sm">
                                {product.credentials.email}
                              </div>
                              <button
                                onClick={() => handleCopy(product.credentials!.email!, `${product.orderId}-email`)}
                                className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95"
                                title="Copy Email"
                              >
                                {copiedField === `${product.orderId}-email` ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">Password</label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-mono text-gray-800 shadow-sm relative overflow-hidden">
                                {showPasswords[product.orderId] 
                                  ? product.credentials.password 
                                  : '••••••••••••'}
                                {/* Blur overlay if hidden */}
                                {!showPasswords[product.orderId] && (
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
                                )}
                              </div>
                              <button
                                onClick={() => togglePasswordVisibility(product.orderId)}
                                className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                                title={showPasswords[product.orderId] ? "Hide" : "Show"}
                              >
                                {showPasswords[product.orderId] ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleCopy(product.credentials!.password!, `${product.orderId}-password`)}
                                className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95"
                                title="Copy Password"
                              >
                                {copiedField === `${product.orderId}-password` ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* License Key Display */}
                    {product.licenseKey && (
                      <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-4 text-sm uppercase tracking-wider">
                           <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <Key className="w-3.5 h-3.5" />
                           </div>
                           License Key
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-lg text-gray-900 shadow-sm tracking-wide">
                            {product.licenseKey}
                          </div>
                          <button
                            onClick={() => handleCopy(product.licenseKey!, `${product.orderId}-key`)}
                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                          >
                            {copiedField === `${product.orderId}-key` ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Copy className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Download Link */}
                    {product.downloadLink && (
                       <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100 shadow-sm mt-4 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                <Download className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Download Software</h4>
                                <p className="text-xs text-gray-500">Latest version available</p>
                            </div>
                         </div>
                        <button className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 font-semibold flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Now
                        </button>
                      </div>
                    )}

                    {/* Replacement History */}
                    {product.replacementHistory.length > 0 && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-sm">
                          <RefreshCw className="w-4 h-4" />
                          Replacement History
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {product.replacementHistory.map((replacement, idx) => (
                            <li key={idx} className="text-gray-700 bg-white/50 px-3 py-2 rounded-lg border border-yellow-100">
                              <span className="font-semibold">{new Date(replacement.date).toLocaleDateString()}</span> - {replacement.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                      <button className="px-4 py-2 border border-transparent text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-semibold flex items-center gap-2 ml-auto">
                        <AlertCircle className="w-4 h-4" />
                        Report Issue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expired Products */}
            {expiredProducts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Clock className="w-4 h-4" />
                    </div>
                    Expired Products
                </h3>
                <div className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                  {expiredProducts.map((product) => (
                    <div key={product.orderId} className="border border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                            <Package className="w-6 h-6" />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">{product.productName}</h4>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-gray-500">Expired: {new Date(product.expiryDate).toLocaleDateString()}</span>
                                <Badge className={getStatusColor(product.status)}>
                                {product.status}
                                </Badge>
                            </div>
                         </div>
                      </div>
                      <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-bold shadow-sm w-full sm:w-auto">
                        Renew Subscription
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">My Wallet</h2>
              <p className="text-gray-500">Manage your earnings and transactions securely</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <p className="text-gray-400 mb-2 font-medium tracking-wide">Total Balance</p>
                    <p className="text-5xl font-bold mb-8">৳{mockUser.walletBalance}</p>
                    <div className="flex gap-4">
                        <button className="flex-1 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            Withdraw Funds
                        </button>
                         <button className="flex-1 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors">
                            History
                        </button>
                    </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Add Money</h3>
                <input
                  type="number"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  placeholder="Enter amount (৳)"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-lg font-medium placeholder-gray-400"
                />
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[500, 1000, 2000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setWalletAmount(amount.toString())}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all font-semibold"
                    >
                      ৳{amount}
                    </button>
                  ))}
                </div>
                <button className="w-full px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Proceed to Payment
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Recent Transactions</h3>
              <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                        <Download className="w-5 h-5 rotate-180" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900">Purchase: ChatGPT Plus</p>
                        <p className="text-xs text-gray-500">Nov 20, 2024 • 10:30 AM</p>
                     </div>
                  </div>
                  <span className="text-red-600 font-bold">-৳1,200</span>
                </div>
                <div className="p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                        <Download className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900">Wallet Top-up</p>
                        <p className="text-xs text-gray-500">Nov 15, 2024 • 09:15 PM</p>
                     </div>
                  </div>
                  <span className="text-green-600 font-bold">+৳5,000</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Support Center</h2>
              <p className="text-gray-500">We are here to help you 24/7</p>
            </div>

            {/* Create New Ticket */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <h3 className="font-bold text-blue-900 mb-6 flex items-center gap-2 relative z-10">
                <Plus className="w-5 h-5" />
                Open New Ticket
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-bold text-blue-900 mb-2">Order ID</label>
                    <select
                        value={newTicket.orderId}
                        onChange={(e) => setNewTicket({ ...newTicket, orderId: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        <option value="">Select an order</option>
                        {mockUser.purchasedProducts.map(p => (
                        <option key={p.orderId} value={p.orderId}>
                            {p.orderId} - {p.productName}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-bold text-blue-900 mb-2">Subject</label>
                    <input
                        type="text"
                        value={newTicket.subject}
                        onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                        placeholder="Brief description of your issue"
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                    </div>
                </div>
                <div className="md:col-span-2">
                   <label className="block text-sm font-bold text-blue-900 mb-2">Message</label>
                   <textarea
                        value={newTicket.message}
                        onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                        placeholder="Describe your issue in detail..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
                   />
                </div>
              </div>
               <div className="mt-6 flex justify-end relative z-10">
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        Submit Ticket
                    </button>
               </div>
            </div>

            {/* Existing Tickets */}
            <div className="space-y-6">
              <h3 className="font-bold text-gray-900 text-lg">Your Tickets</h3>
              {mockUser.tickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{ticket.subject}</h4>
                      <p className="text-sm text-gray-500">Ticket #{ticket.id} • {ticket.productName}</p>
                      <p className="text-xs text-gray-400 mt-1">Created: {ticket.createdAt}</p>
                    </div>
                    <Badge className={
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-700 border-green-300' :
                      ticket.status === 'open' ? 'bg-red-100 text-red-700 border-red-300' :
                      'bg-blue-100 text-blue-700 border-blue-300'
                    }>
                      {ticket.status}
                    </Badge>
                  </div>

                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    {ticket.responses.map((response, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          response.from === 'user' ? 'items-end' : 'items-start'
                        }`}
                      >
                         <div className={`max-w-[80%] p-4 rounded-2xl ${
                            response.from === 'user' 
                             ? 'bg-blue-600 text-white rounded-br-none' 
                             : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                         }`}>
                             <p className="text-sm leading-relaxed">{response.message}</p>
                         </div>
                         <span className="text-xs text-gray-400 mt-1 px-2">
                            {response.from === 'user' ? 'You' : 'Support Team'} • {response.timestamp}
                         </span>
                      </div>
                    ))}
                  </div>

                  {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                    <div className="mt-6 flex gap-3">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                      <button className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors font-bold">
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
