'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Mail, Phone, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';

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
    searchQuery?: string;
}

export function OrdersTable({ limit, searchQuery = '' }: OrdersTableProps) {
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
    }, [limit]);

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

    // Filter orders based on search query
    const filteredOrders = orders.filter(order => {
        const query = searchQuery.toLowerCase();
        return (
            order.orderId.toLowerCase().includes(query) ||
            order.customer.fullName.toLowerCase().includes(query) ||
            order.customer.phone.includes(query) ||
            (order.customer.email && order.customer.email.toLowerCase().includes(query)) ||
            order.payment.transactionId.toLowerCase().includes(query)
        );
    });

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    if (orders.length === 0) return (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
            <p className="text-gray-500">When you receive orders, they will appear here.</p>
        </div>
    );

    if (filteredOrders.length === 0) return (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No matching orders</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100">
                            <th className="p-5 font-bold text-gray-600 text-xs uppercase tracking-wider">Order Details</th>
                            <th className="p-5 font-bold text-gray-600 text-xs uppercase tracking-wider">Customer Info</th>
                            <th className="p-5 font-bold text-gray-600 text-xs uppercase tracking-wider">Payment</th>
                            <th className="p-5 font-bold text-gray-600 text-xs uppercase tracking-wider">Total</th>
                            <th className="p-5 font-bold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                            <th className="p-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-blue-50/30 transition-all duration-200 group">
                                <td className="p-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-sm font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md w-fit">
                                            {order.orderId}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">
                                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex flex-col gap-2">
                                        <div className="font-bold text-gray-900 text-sm">{order.customer.fullName}</div>
                                        <div className="flex flex-col gap-1">
                                            {order.customer.email && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600 group-hover:text-blue-600 transition-colors">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {order.customer.email}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Phone className="w-3.5 h-3.5" />
                                                <span className="font-mono">{order.customer.phone}</span>
                                                <a 
                                                    href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold hover:bg-green-200"
                                                >
                                                    WhatsApp
                                                    <ExternalLink className="w-2.5 h-2.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="space-y-1.5">
                                        <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold ${
                                            order.payment.method === 'bKash' ? 'bg-pink-100 text-pink-700 border border-pink-200' : 
                                            order.payment.method === 'Nagad' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 
                                            'bg-purple-100 text-purple-700 border border-purple-200'
                                        }`}>
                                            {order.payment.method}
                                        </span>
                                        <div className="font-mono text-xs text-gray-600 flex flex-col">
                                            <span className="font-bold text-gray-800 tracking-wide">{order.payment.transactionId}</span>
                                            <span className="text-gray-400">{order.payment.senderNumber}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="text-sm font-extrabold text-gray-900">
                                        ৳{order.totalAmount || order.total}
                                    </div>
                                </td>
                                <td className="p-5">
                                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                        order.status === 'approved' ? 'bg-green-50 border-green-200 text-green-700' :
                                        order.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                        'bg-gray-50 border-gray-200 text-gray-600'
                                     }`}>
                                        {order.status === 'approved' ? <CheckCircle className="w-3.5 h-3.5" /> : 
                                         order.status === 'pending' ? <Clock className="w-3.5 h-3.5" /> : null}
                                        {order.status ? order.status.toUpperCase() : 'PENDING'}
                                     </span>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {order.status === 'pending' && (
                                            <button 
                                                onClick={() => handleApprove(order._id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-600 p-1.5 rounded-lg transition-all"
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

// Helper icons component needed if Search is used in no match state
function Search({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
