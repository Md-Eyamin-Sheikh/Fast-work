'use client';

import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { OrdersTable } from '@/app/components/admin/OrdersTable';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function AllOrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <AdminLayout>
             <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pb-24 lg:pb-10">
                <div className="sm:py-6 sm:px-4 lg:px-8">
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                     >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
                            <p className="text-gray-600">Manage and view all customer orders</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 text-gray-900 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <OrdersTable searchQuery={searchQuery} />
                    </motion.div>
                </div>
             </div>
        </AdminLayout>
    );
}
