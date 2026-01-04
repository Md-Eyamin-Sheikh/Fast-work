'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  FileText, 
  TrendingUp,
  Activity,
  Calendar,
  User,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DashboardStats {
  products: {
    total: number;
    recent: number;
  };
  blogs: {
    total: number;
    recent: number;
  };
  totalItems: number;
}

interface AdminDashboardProps {
  onLogout?: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('admin@victorians.com');

  // Fetch real statistics from MongoDB
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Set fallback data
        setStats({
          products: { total: 0, recent: 0 },
          blogs: { total: 0, recent: 0 },
          totalItems: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Load admin info from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedName) setAdminName(storedName);
    if (storedEmail) setAdminEmail(storedEmail);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { label: 'Add Product', href: '/admin/products/add', emoji: '➕', color: 'from-blue-600 to-indigo-600' },
    { label: 'Write Blog', href: '/admin/blogs/write', emoji: '✍️', color: 'from-indigo-600 to-purple-600' },
    { label: 'All Products', href: '/admin/products', emoji: '📦', color: 'from-green-600 to-emerald-600' },
    { label: 'All Blogs', href: '/admin/blogs', emoji: '📝', color: 'from-orange-600 to-red-600' },
  ];

  return (
    <div className='bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen pb-24 lg:pb-10'>
      <div className='max-w-7xl mx-auto py-3 sm:py-6 px-3 sm:px-4 lg:px-8'>
        {/* Enhanced Header - Mobile Optimized */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 sm:mb-8 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="relative px-4 sm:px-6 py-4 sm:py-6">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 flex items-center gap-2">
                  Dashboard
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm">Welcome back, {adminName}!</p>
              </div>
              
              <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <span className="sm:hidden">
                  {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="mx-1 sm:mx-2">•</span>
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Admin Profile - Mobile Friendly */}
            <div className="mt-3 sm:mt-4 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 border border-white/20 w-fit">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">{adminName}</p>
                <p className="text-[10px] sm:text-xs text-blue-100">{adminEmail}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Mobile Optimized */}
        {loading ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8"
          >
            {/* Total Products */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-blue-200 overflow-hidden relative group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                    <Package className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  {stats && stats.products.recent > 0 && (
                    <div className="px-2 py-1 rounded-full bg-green-500/20">
                      <span className="text-white text-[10px] sm:text-xs font-bold">
                        +{stats.products.recent} new
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-medium mb-1">Total Products</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.products.total || 0}</p>
              </div>
            </motion.div>

            {/* Total Blogs */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-indigo-200 overflow-hidden relative group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                    <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  {stats && stats.blogs.recent > 0 && (
                    <div className="px-2 py-1 rounded-full bg-green-500/20">
                      <span className="text-white text-[10px] sm:text-xs font-bold">
                        +{stats.blogs.recent} new
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-medium mb-1">Total Blogs</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.blogs.total || 0}</p>
              </div>
            </motion.div>

            {/* Total Items */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-linear-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-green-200 overflow-hidden relative group cursor-pointer sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                    <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-medium mb-1">Total Content</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.totalItems || 0}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Quick Actions - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={action.href}
                  className={`block bg-gradient-to-r ${action.color} text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="text-3xl sm:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform">{action.emoji}</div>
                    <p className="font-bold text-sm sm:text-lg">{action.label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
