import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Ticket,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  X,
  Check,
  Clock,
  AlertCircle,
  Menu,
  LogOut,
  Bell,
  Mail,
  Phone,
  MoreVertical
} from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useRouter } from 'next/navigation';
import { AddProductForm } from './admin/AddProductForm';

type AdminView = 'dashboard' | 'products' | 'orders' | 'users' | 'tickets' | 'settings';

interface AdminPanelProps {
  onLogout?: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Mock data
  const stats = {
    totalRevenue: 125000,
    totalOrders: 1234,
    totalUsers: 856,
    activeSubscriptions: 412
  };

  const revenueData = [
    { month: 'Jan', revenue: 12000, orders: 120 },
    { month: 'Feb', revenue: 15000, orders: 145 },
    { month: 'Mar', revenue: 18000, orders: 178 },
    { month: 'Apr', revenue: 22000, orders: 210 },
    { month: 'May', revenue: 25000, orders: 245 },
    { month: 'Jun', revenue: 33000, orders: 336 }
  ];

  const categoryData = [
    { name: 'AI Tools', value: 35, color: '#3b82f6' },
    { name: 'Creative Cloud', value: 25, color: '#8b5cf6' },
    { name: 'Productivity', value: 20, color: '#10b981' },
    { name: 'Dev Tools', value: 15, color: '#f59e0b' },
    { name: 'Security', value: 5, color: '#ef4444' }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'Rafiqul Islam', product: 'ChatGPT Plus', amount: 2000, status: 'completed', date: '2024-12-21' },
    { id: '#12344', customer: 'Fatima Rahman', product: 'Adobe Creative Cloud', amount: 5500, status: 'pending', date: '2024-12-21' },
    { id: '#12343', customer: 'Karim Ahmed', product: 'Microsoft 365', amount: 3200, status: 'completed', date: '2024-12-20' },
    { id: '#12342', customer: 'Nabila Khan', product: 'GitHub Copilot', amount: 1200, status: 'processing', date: '2024-12-20' },
    { id: '#12341', customer: 'Hassan Ali', product: 'NordVPN', amount: 800, status: 'completed', date: '2024-12-19' }
  ];

  const products = [
    { id: '1', name: 'ChatGPT Plus', category: 'AI Tools', price: 2000, stock: 50, sales: 245, status: 'active' },
    { id: '2', name: 'Claude Pro', category: 'AI Tools', price: 2200, stock: 30, sales: 180, status: 'active' },
    { id: '3', name: 'Adobe Creative Cloud', category: 'Creative', price: 5500, stock: 25, sales: 320, status: 'active' },
    { id: '4', name: 'Microsoft 365', category: 'Productivity', price: 3200, stock: 0, sales: 410, status: 'out_of_stock' },
    { id: '5', name: 'GitHub Copilot', category: 'Dev Tools', price: 1200, stock: 100, sales: 156, status: 'active' }
  ];

  const users = [
    { id: '1', name: 'Rafiqul Islam', email: 'rafiq@example.com', phone: '+880 1700-000000', orders: 12, spent: 24000, joined: '2024-01-15' },
    { id: '2', name: 'Fatima Rahman', email: 'fatima@example.com', phone: '+880 1800-111111', orders: 8, spent: 18000, joined: '2024-02-20' },
    { id: '3', name: 'Karim Ahmed', email: 'karim@example.com', phone: '+880 1900-222222', orders: 15, spent: 35000, joined: '2024-03-10' },
    { id: '4', name: 'Nabila Khan', email: 'nabila@example.com', phone: '+880 1600-333333', orders: 5, spent: 12000, joined: '2024-04-05' },
    { id: '5', name: 'Hassan Ali', email: 'hassan@example.com', phone: '+880 1500-444444', orders: 20, spent: 48000, joined: '2024-05-12' }
  ];

  const tickets = [
    { id: '1', customer: 'Rafiqul Islam', subject: 'Account access issue', status: 'open', priority: 'high', date: '2024-12-21' },
    { id: '2', customer: 'Fatima Rahman', subject: 'Payment not received', status: 'in_progress', priority: 'high', date: '2024-12-20' },
    { id: '3', customer: 'Karim Ahmed', subject: 'License key not working', status: 'open', priority: 'medium', date: '2024-12-20' },
    { id: '4', customer: 'Nabila Khan', subject: 'Subscription renewal', status: 'resolved', priority: 'low', date: '2024-12-19' },
    { id: '5', customer: 'Hassan Ali', subject: 'Product inquiry', status: 'resolved', priority: 'low', date: '2024-12-18' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'pending':
      case 'open':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20 md:w-20'} md:relative`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">DA</span>
                  </div>
                  <span className="font-bold">Admin Panel</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg mx-auto"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'orders', icon: ShoppingBag, label: 'Orders' },
              { id: 'users', icon: Users, label: 'Users' },
              { id: 'tickets', icon: Ticket, label: 'Support Tickets' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as AdminView)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                if (onLogout) onLogout();
                else router.push('/');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} ml-0`}>
        {/* Top Bar - Enhanced Beautiful Navbar */}
        <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Three-Dot Menu for Mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
              title="Toggle Sidebar"
            >
              <MoreVertical className="w-6 h-6 text-white" />
            </button>
            
            {/* Page Title */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {currentView === 'dashboard' && '📊'}
                  {currentView === 'products' && '📦'}
                  {currentView === 'orders' && '🛒'}
                  {currentView === 'users' && '👥'}
                  {currentView === 'tickets' && '🎫'}
                  {currentView === 'settings' && '⚙️'}
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-white capitalize tracking-wide">
                {currentView}
              </h1>
            </div>
          </div>
          
          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm group">
              <Bell className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse">
                <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
              </span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md rounded-lg px-2 md:px-3 py-1.5 hover:bg-white/20 transition-colors cursor-pointer">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/50">
                <span className="text-blue-600 font-bold text-sm md:text-base">AD</span>
              </div>
              <div className="hidden md:block">
                <p className="font-semibold text-white text-sm">Admin User</p>
                <p className="text-xs text-blue-100">admin@digitalassets.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-6">
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">+12.5%</span>
                  </div>
                  <h3 className="text-gray-500 text-sm mb-1">Total Revenue</h3>
                  <p className="text-2xl font-bold">৳{stats.totalRevenue.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">+8.2%</span>
                  </div>
                  <h3 className="text-gray-500 text-sm mb-1">Total Orders</h3>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">+15.3%</span>
                  </div>
                  <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">+5.7%</span>
                  </div>
                  <h3 className="text-gray-500 text-sm mb-1">Active Subscriptions</h3>
                  <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="font-semibold mb-4">Revenue Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }} 
                      />
                      <Legend wrapperStyle={{ fontSize: '14px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="font-semibold mb-4">Sales by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: { name?: string | number; percent?: number }) => `${name ?? ''} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border">
                <div className="p-6 border-b">
                  <h3 className="font-semibold">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                          <td className="px-6 py-4 text-sm">{order.customer}</td>
                          <td className="px-6 py-4 text-sm">{order.product}</td>
                          <td className="px-6 py-4 text-sm font-semibold">৳{order.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products View */}
          {currentView === 'products' && (
            <div className="space-y-6">
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                          <td className="px-6 py-4 text-sm">{product.category}</td>
                          <td className="px-6 py-4 text-sm font-semibold">৳{product.price}</td>
                          <td className="px-6 py-4 text-sm">
                            {product.stock > 0 ? product.stock : <span className="text-red-600">Out of stock</span>}
                          </td>
                          <td className="px-6 py-4 text-sm">{product.sales}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              {product.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders View */}
          {currentView === 'orders' && (
            <div className="space-y-6">
              {/* Filter Tabs */}
              <div className="flex gap-2 border-b">
                {['All Orders', 'Pending', 'Processing', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    className="px-4 py-2 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                          <td className="px-6 py-4 text-sm">{order.customer}</td>
                          <td className="px-6 py-4 text-sm">{order.product}</td>
                          <td className="px-6 py-4 text-sm font-semibold">৳{order.amount}</td>
                          <td className="px-6 py-4">
                            <select className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(order.status)}`}>
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users View */}
          {currentView === 'users' && (
            <div className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Total Users</p>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">New This Month</p>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Total Spent</p>
                      <p className="text-2xl font-bold">৳137K</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-500">{user.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{user.orders}</td>
                          <td className="px-6 py-4 text-sm font-semibold">৳{user.spent.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Support Tickets View */}
          {currentView === 'tickets' && (
            <div className="space-y-6">
              {/* Ticket Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Open</p>
                      <p className="text-xl font-bold">2</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">In Progress</p>
                      <p className="text-xl font-bold">1</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Resolved</p>
                      <p className="text-xl font-bold">2</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total</p>
                      <p className="text-xl font-bold">5</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tickets Table */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">#{ticket.id}</td>
                          <td className="px-6 py-4 text-sm">{ticket.customer}</td>
                          <td className="px-6 py-4 text-sm">{ticket.subject}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{ticket.date}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Respond
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings View */}
          {currentView === 'settings' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <input
                      type="text"
                      defaultValue="DigitalAssets"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="support@digitalassets.com"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+880 1XXX-XXXXXX"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">Payment Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">bKash</p>
                      <p className="text-sm text-gray-500">Enable bKash payments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nagad</p>
                      <p className="text-sm text-gray-500">Enable Nagad payments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email alerts for new orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive SMS for critical updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <AddProductForm onClose={() => setShowAddProductModal(false)} />
      )}
    </div>
  );
}
