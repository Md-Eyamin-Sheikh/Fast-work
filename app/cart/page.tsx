"use client";

import React from 'react';
import { CartPage } from '../components/CartPage';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function CartRoute() {
  const router = useRouter();
  // Mock cart items for now
  const cartItems = [];

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <CartPage
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onCheckout={() => router.push('/checkout')}
        onContinueShopping={() => router.push('/products')}
      />
    </>
  );
}
