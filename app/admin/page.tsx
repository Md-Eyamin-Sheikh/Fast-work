'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPanel } from '../components/AdminPanel';

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
      <AdminPanel onLogout={handleLogout} />
    </div>
  );
}
