'use client';

import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { Package, TrendingUp, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export function AdminDashboard() {
  const stats = [
    {
      label: 'Total Products',
      value: '42',
      icon: Package,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Total Blogs',
      value: '12',
      icon: FileText,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      label: 'Total Orders',
      value: '156',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Total Users',
      value: '1.2K',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const quickActions = [
    { label: 'Add New Product', href: '/admin/products/add', emoji: '➕', color: 'from-blue-600 to-indigo-600' },
    { label: 'Write New Blog', href: '/admin/blogs/write', emoji: '✍️', color: 'from-indigo-600 to-purple-600' },
    { label: 'View All Products', href: '/admin/products', emoji: '📦', color: 'from-green-600 to-emerald-600' },
    { label: 'View All Blogs', href: '/admin/blogs', emoji: '📝', color: 'from-orange-600 to-red-600' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-6 hover:shadow-xl transition-all transform hover:scale-105`}
            >
              <div className="text-4xl mb-2">{action.emoji}</div>
              <p className="font-bold text-lg">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-center py-8">
          Recent activity will appear here...
        </p>
      </div>
    </div>
  );
}
