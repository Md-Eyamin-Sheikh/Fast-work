"use client";

import React from 'react';
import { UserDashboard } from '../components/UserDashboard';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function DashboardRoute() {
  const router = useRouter();

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <UserDashboard />
    </>
  );
}
