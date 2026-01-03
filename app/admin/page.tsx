'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  const checkAuth = () => {
    return true;
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen">
      <AdminDashboard onLogout={handleLogout} />
    </div>
  );
}
