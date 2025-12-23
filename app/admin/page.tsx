"use client";

import React from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { MegaMenu } from '../components/MegaMenu';

export default function AdminRoute() {
  return (
    <>
     <MegaMenu cartCount={0} isAuthenticated={true} />
     <AdminPanel />
    </>
  );
}
