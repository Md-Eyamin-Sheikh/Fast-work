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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
          <p className="text-blue-100">{mockUser.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Wallet Balance</h3>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">৳{mockUser.walletBalance}</p>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Add Money
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Active Products</h3>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{activeProducts.length}</p>
            <p className="mt-4 text-sm text-gray-500">Total purchases: {mockUser.purchasedProducts.length}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Support Tickets</h3>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{mockUser.tickets.length}</p>
            <p className="mt-4 text-sm text-gray-500">
              {mockUser.tickets.filter(t => t.status === 'open').length} open tickets
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="bg-white rounded-xl">
          <TabsList className="w-full justify-start border-b rounded-t-xl px-6 pt-4">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          </TabsList>

          {/* My Products Tab */}
          <TabsContent value="products" className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">My Digital Assets</h2>
              <p className="text-gray-600">View and manage your purchased subscriptions and licenses</p>
            </div>

            {activeProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No active products yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {activeProducts.map((product) => (
                  <div key={product.orderId} className="border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="text-xl font-bold">{product.productName}</h3>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Order ID: {product.orderId}</p>
                        <p className="text-sm text-gray-600">Purchased: {new Date(product.purchaseDate).toLocaleDateString()}</p>
                      </div>

                      <div className="text-left md:text-right">
                        {product.expiryDate !== 'Lifetime' ? (
                          <>
                            <div className="flex items-center gap-2 justify-start md:justify-end mb-2">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <span className="font-semibold text-orange-600">
                                {getTimeRemaining(product.expiryDate)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Expires: {new Date(product.expiryDate).toLocaleDateString()}
                            </p>
                            {new Date(product.expiryDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 && (
                              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                Renew Now
                              </button>
                            )}
                          </>
                        ) : (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Lifetime License
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Credentials Display */}
                    {product.credentials && (
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          Account Credentials
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm text-gray-600 block mb-1">Email</label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm font-mono">
                                {product.credentials.email}
                              </div>
                              <button
                                onClick={() => handleCopy(product.credentials!.email!, `${product.orderId}-email`)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                {copiedField === `${product.orderId}-email` ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 block mb-1">Password</label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm font-mono">
                                {showPasswords[product.orderId] 
                                  ? product.credentials.password 
                                  : '••••••••••••'}
                              </div>
                              <button
                                onClick={() => togglePasswordVisibility(product.orderId)}
                                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                              >
                                {showPasswords[product.orderId] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleCopy(product.credentials!.password!, `${product.orderId}-password`)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                {copiedField === `${product.orderId}-password` ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* License Key Display */}
                    {product.licenseKey && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold flex items-center gap-2 mb-3">
                          <Key className="w-4 h-4" />
                          License Key
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-4 py-3 bg-white border rounded-lg font-mono text-lg">
                            {product.licenseKey}
                          </div>
                          <button
                            onClick={() => handleCopy(product.licenseKey!, `${product.orderId}-key`)}
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {copiedField === `${product.orderId}-key` ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Download Link */}
                    {product.downloadLink && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold flex items-center gap-2 mb-3">
                          <Download className="w-4 h-4" />
                          Download
                        </h4>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Software
                        </button>
                      </div>
                    )}

                    {/* Replacement History */}
                    {product.replacementHistory.length > 0 && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <RefreshCw className="w-4 h-4" />
                          Replacement History
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {product.replacementHistory.map((replacement, idx) => (
                            <li key={idx} className="text-gray-700">
                              {new Date(replacement.date).toLocaleDateString()} - {replacement.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2">
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
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Expired Products</h3>
                <div className="space-y-4">
                  {expiredProducts.map((product) => (
                    <div key={product.orderId} className="border rounded-xl p-6 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">{product.productName}</h4>
                          <p className="text-sm text-gray-600">Expired: {new Date(product.expiryDate).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Renew Subscription
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Wallet</h2>
              <p className="text-gray-600">Manage your wallet balance and transactions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <p className="text-green-100 mb-2">Available Balance</p>
                <p className="text-4xl font-bold mb-6">৳{mockUser.walletBalance}</p>
                <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Withdraw
                </button>
              </div>

              <div className="bg-white border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Add Money to Wallet</h3>
                <input
                  type="number"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[500, 1000, 2000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setWalletAmount(amount.toString())}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                    >
                      ৳{amount}
                    </button>
                  ))}
                </div>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Add Money
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Transaction History</h3>
              <div className="bg-white border rounded-xl divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Purchase: ChatGPT Plus</p>
                    <p className="text-sm text-gray-600">Nov 20, 2024</p>
                  </div>
                  <span className="text-red-600 font-semibold">-৳1,200</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Wallet Top-up</p>
                    <p className="text-sm text-gray-600">Nov 15, 2024</p>
                  </div>
                  <span className="text-green-600 font-semibold">+৳5,000</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Support Tickets</h2>
              <p className="text-gray-600">Get help with your orders and products</p>
            </div>

            {/* Create New Ticket */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Open New Ticket
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Order ID</label>
                  <select
                    value={newTicket.orderId}
                    onChange={(e) => setNewTicket({ ...newTicket, orderId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an order</option>
                    {mockUser.purchasedProducts.map(p => (
                      <option key={p.orderId} value={p.orderId}>
                        {p.orderId} - {p.productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    placeholder="Describe your issue in detail"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Submit Ticket
                </button>
              </div>
            </div>

            {/* Existing Tickets */}
            <div className="space-y-4">
              {mockUser.tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{ticket.subject}</h4>
                      <p className="text-sm text-gray-600">Ticket #{ticket.id} • {ticket.productName}</p>
                      <p className="text-sm text-gray-600">Created: {ticket.createdAt}</p>
                    </div>
                    <Badge className={
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-700 border-green-300' :
                      ticket.status === 'open' ? 'bg-red-100 text-red-700 border-red-300' :
                      'bg-blue-100 text-blue-700 border-blue-300'
                    }>
                      {ticket.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {ticket.responses.map((response, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg ${
                          response.from === 'user' 
                            ? 'bg-blue-50 ml-0 mr-8' 
                            : 'bg-gray-50 ml-8 mr-0'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-sm">
                            {response.from === 'user' ? 'You' : 'Support Team'}
                          </span>
                          <span className="text-xs text-gray-600">{response.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>

                  {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
