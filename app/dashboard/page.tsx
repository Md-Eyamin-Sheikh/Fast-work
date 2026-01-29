"use client";

import React from 'react';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function DashboardRoute() {
  const router = useRouter();

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">COMING SOON</h1>
        <p className="text-gray-600 mt-2">User Dashboard is currently under development.</p>
      </div>
    </>
  );
}
