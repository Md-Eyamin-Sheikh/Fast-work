'use client';

import { useState, useEffect, useRef } from 'react';
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
  Clock,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  X,
  Circle,
  Activity,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardProps {
  onLogout?: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample statistics with animation
  const stats = [
    {
      label: 'Total Revenue',
      value: '৳125,000',
      icon: DollarSign,
      change: '+12.5%',
      trend: 'up',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      change: '+8.2%',
      trend: 'up',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-200'
    },
    {
      label: 'Total Users',
      value: '856',
      icon: Users,
      change: '+15.3%',
      trend: 'up',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      label: 'Active Subscriptions',
      value: '412',
      icon: TrendingUp,
      change: '+5.7%',
      trend: 'up',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200'
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

  // Sample notifications
  const notifications = [
    { id: 1, type: 'order', message: 'New order placed - ORD-1234', time: '5 min ago', unread: true },
    { id: 2, type: 'product', message: 'Product stock running low', time: '1 hour ago', unread: true },
    { id: 3, type: 'user', message: 'New user registered', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className='bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen'>
      <div className='max-w-7xl mx-auto pb-10 py-6 px-4 lg:px-8'>
        {/* Enhanced Navbar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 -mt-6 lg:-mt-8 mb-8 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>

          <div className="relative px-6 py-6">
            {/* Top Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 flex items-center gap-3">
                  Dashboard
                  <Activity className="w-8 h-8 animate-pulse" />
                </h1>
                <p className="text-blue-100 text-sm">Welcome back! Here's your overview.</p>
              </div>
              
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="w-4 h-4" />
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                <span className="mx-2">•</span>
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div ref={searchRef} className="relative flex-1 min-w-[200px] max-w-md">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="w-full flex items-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl px-4 py-2.5 transition-all border border-white/20"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-sm text-white/70">Search...</span>
                  <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/10 rounded border border-white/20">
                    <span>⌘</span>K
                  </kbd>
                </button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Type to search products, blogs, orders..."
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        <div className="p-2 text-xs text-gray-500 font-semibold px-4">Quick Links</div>
                        <Link href="/admin/products/add" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                          <Package className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Add New Product</span>
                        </Link>
                        <Link href="/admin/blogs/write" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                          <FileText className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm">Write New Blog</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notification Bell */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm border border-white/20"
                >
                  <Bell className="w-6 h-6 text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <span className="text-xs text-blue-600 font-semibold">{unreadCount} New</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${notif.unread ? 'bg-blue-50/50' : ''}`}>
                            <div className="flex items-start gap-3">
                              {notif.unread && <Circle className="w-2 h-2 fill-blue-600 text-blue-600 mt-1.5" />}
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{notif.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-200 text-center">
                        <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">View All Notifications</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Admin Profile */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 hover:bg-white/20 transition-all border border-white/20"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-blue-600 font-bold text-sm">AD</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-white text-sm">Admin User</p>
                    <p className="text-xs text-blue-100">admin@victorians.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold">AD</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-600">admin@victorians.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">My Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                          <HelpCircle className="w-4 h-4" />
                          <span className="text-sm">Help & Support</span>
                        </button>
                      </div>
                      <div className="p-2 border-t border-gray-200">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-semibold">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with Enhanced Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-xl p-6 border-2 ${stat.borderColor} overflow-hidden relative group cursor-pointer`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <TrendIcon className={`w-3 h-3 ${stat.trend === 'up' ? 'text-green-100' : 'text-red-100'}`} />
                      <span className="text-white text-xs font-bold">{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8"
        >
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-7 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Revenue Overview
              </h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                  fill="url(#revenueGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-7 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                Sales by Category
              </h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
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
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={action.href}
                  className={`block bg-gradient-to-r ${action.color} text-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">{action.emoji}</div>
                    <p className="font-bold text-lg">{action.label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-7 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
                Recent Orders
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                View All →
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                  <th className="text-left text-sm font-bold text-gray-700 px-6 py-4">Order ID</th>
                  <th className="text-left text-sm font-bold text-gray-700 px-6 py-4">Customer</th>
                  <th className="text-left text-sm font-bold text-gray-700 px-6 py-4">Product</th>
                  <th className="text-left text-sm font-bold text-gray-700 px-6 py-4">Amount</th>
                  <th className="text-left text-sm font-bold text-gray-700 px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">৳{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        order.status === 'completed' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
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
        </motion.div>
      </div>
    </div>
  );
}
