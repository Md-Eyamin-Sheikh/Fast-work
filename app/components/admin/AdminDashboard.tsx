'use client';

import { useState } from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { 
  Package, 
  TrendingUp, 
  FileText, 
  Users,
  DollarSign,
  ShoppingCart,
  Bell,
  Check,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  onLogout?: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // Sample statistics
  const stats = [
    {
      label: 'Total Revenue',
      value: '৳125,000',
      icon: DollarSign,
      change: '+12.5%',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      change: '+8.2%',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600'
    },
    {
      label: 'Total Users',
      value: '856',
      icon: Users,
      change: '+15.3%',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      label: 'Active Subscriptions',
      value: '412',
      icon: TrendingUp,
      change: '+5.7%',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
  ];

  // Revenue chart data
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 13500 },
    { month: 'Apr', revenue: 18000 },
    { month: 'May', revenue: 21000 },
    { month: 'Jun', revenue: 19500 }
  ];

  // Category distribution data
  const categoryData = [
    { name: 'Creative Tools', value: 45, color: '#3b82f6' },
    { name: 'VPN & Security', value: 25, color: '#6366f1' },
    { name: 'Productivity', value: 20, color: '#8b5cf6' },
    { name: 'AI Tools', value: 10, color: '#a855f7' },
  ];

  // Recent orders
  const recentOrders = [
    { id: 'ORD-1234', customer: 'John Doe', product: 'Adobe Creative Cloud', amount: 1000, status: 'completed' },
    { id: 'ORD-1235', customer: 'Jane Smith', product: 'NordVPN Premium', amount: 800, status: 'pending' },
    { id: 'ORD-1236', customer: 'Mike Johnson', product: 'Microsoft 365', amount: 1200, status: 'completed' },
  ];

  const quickActions = [
    { label: 'Add New Product', href: '/admin/products/add', emoji: '➕', color: 'from-blue-600 to-indigo-600' },
    { label: 'Write New Blog', href: '/admin/blogs/write', emoji: '✍️', color: 'from-indigo-600 to-purple-600' },
    { label: 'View All Products', href: '/admin/products', emoji: '📦', color: 'from-green-600 to-emerald-600' },
    { label: 'View All Blogs', href: '/admin/blogs', emoji: '📝', color: 'from-orange-600 to-red-600' },
  ];

  return (
    <div className='bg-indigo-100'>

   
      <div className='bg-indigo-100 pb-10 py-6 max-w-7xl mx-auto'>
        {/* Beautiful Gradient Navbar */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600  -mt-6 lg:-mt-8 mb-8  lg:px-8 py-6  px-4  shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-blue-100">Welcome back! Here's your overview.</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="relative p-2.5 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse">
                  <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
                </span>
              </button>
              
              {/* Admin Profile */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-blue-600 font-bold">AD</span>
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-white text-sm">Admin User</p>
                  <p className="text-xs text-blue-100">admin@victorians.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid with Beautiful Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-7 h-7 ${stat.textColor}`} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-7 bg-blue-600 rounded"></div>
              Revenue Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  style={{ fontSize: '12px' }} 
                />
                <YAxis 
                  stroke="#6b7280" 
                  style={{ fontSize: '12px' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-7 bg-indigo-600 rounded"></div>
              Sales by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
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

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-7 bg-green-600 rounded"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300`}
              >
                <div className="text-5xl mb-3">{action.emoji}</div>
                <p className="font-bold text-lg">{action.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-7 bg-orange-600 rounded"></div>
                Recent Orders
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">Order ID</th>
                  <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">Customer</th>
                  <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">Product</th>
                  <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">Amount</th>
                  <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">৳{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'completed' ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
