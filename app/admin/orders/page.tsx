'use client';

import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { OrdersTable } from '@/app/components/admin/OrdersTable';
import { motion } from 'framer-motion';

export default function AllOrdersPage() {
    return (
        <AdminLayout>
             <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pb-24 lg:pb-10">
                <div className="sm:py-6 sm:px-4 lg:px-8">
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                     >
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
                        <p className="text-gray-600">Manage and view all customer orders</p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <OrdersTable />
                    </motion.div>
                </div>
             </div>
        </AdminLayout>
    );
}
