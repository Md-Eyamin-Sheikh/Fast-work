"use client";

import React from 'react';
import { CheckoutPage } from '../components/CheckoutPage';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function CheckoutRoute() {
  const router = useRouter();

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <CheckoutPage
        items={[]}
      />
    </>
  );
}
