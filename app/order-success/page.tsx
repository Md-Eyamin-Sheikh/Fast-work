"use client";

import React from 'react';
import { OrderSuccessPage } from '../components/OrderSuccessPage';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function OrderSuccessRoute() {
  const router = useRouter();

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <OrderSuccessPage
        items={[]}
      />
    </>
  );
}
