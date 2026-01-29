'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

interface Order {
    _id: string;
    orderId: string;
    customer: {
        fullName: string;
        phone: string;
        email?: string;
        address?: string;
    };
    payment: {
        method: string;
        transactionId: string;
        senderNumber: string;
    };
    totalAmount: number;
    total: number; // Handling both fields for compatibility
    status: string;
    createdAt: string;
}

interface OrdersTableProps {
    limit?: number;
}

export function OrdersTable({ limit }: OrdersTableProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const url = limit ? `/api/orders?limit=${limit}` : '/api/orders';
            const res = await fetch(url);
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [limit]); // Re-fetch if limit changes

    const handleApprove = async (id: string) => {
        if (!confirm('Are you sure you want to approve this order? The customer will receive the product via email.')) return;
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'approved' })
            });
            if (res.ok) {
                alert('Order approved!');
                fetchOrders();
            }
        } catch (error) {
            alert('Failed to approve order');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                alert('Order deleted!');
                fetchOrders();
            }
        } catch (error) {
            alert('Failed to delete order');
        }
    };

    if (loading) return <div>Loading orders...</div>;

    if (orders.length === 0) return <div className="text-center text-gray-500 py-8 bg-white rounded-xl">No orders found.</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Order ID</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Customer</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Method</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">TrxID / Sender</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Total</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 font-medium text-gray-900 text-xs sm:text-sm">{order.orderId}</td>
                                <td className="p-4 text-xs sm:text-sm">
                                    <div className="font-medium text-gray-900">{order.customer.fullName}</div>
                                    <div className="text-gray-500">{order.customer.phone}</div>
                                </td>
                                <td className="p-4 text-xs sm:text-sm">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        order.payment.method === 'bKash' ? 'bg-pink-100 text-pink-600' : 
                                        order.payment.method === 'Nagad' ? 'bg-red-100 text-red-600' : 
                                        'bg-purple-100 text-purple-600'
                                    }`}>
                                        {order.payment.method}
                                    </span>
                                </td>
                                <td className="p-4 text-xs sm:text-sm font-mono">
                                    <div className="text-blue-600 font-bold">{order.payment.transactionId}</div>
                                    <div className="text-gray-400 text-xs">{order.payment.senderNumber}</div>
                                </td>
                                <td className="p-4 font-bold text-gray-900 text-sm">৳{order.totalAmount || order.total}</td>
                                <td className="p-4">
                                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                        order.status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                                        order.status === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                                        'bg-gray-50 border-gray-200 text-gray-600'
                                     }`}>
                                        {order.status ? order.status.toUpperCase() : 'PENDING'}
                                     </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        {order.status === 'pending' && (
                                            <button 
                                                onClick={() => handleApprove(order._id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                                            title="Delete Order"
                                        >
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
    );
}
