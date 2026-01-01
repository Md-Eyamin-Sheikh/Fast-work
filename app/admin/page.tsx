"use client";

import React from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function AdminRoute() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Fallback redirect even if API fails
      router.push('/admin/login');
    }
  };

  return (
    <>
     <MegaMenu cartCount={0} isAuthenticated={true} onLogout={handleLogout} />
     <AdminPanel onLogout={handleLogout} />
    </>
  );
}
