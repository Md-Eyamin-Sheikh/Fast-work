"use client";

import React from 'react';
import { BundlesPage } from '../components/BundlesPage';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';

export default function BundlesRoute() {
  // Mock cart items/functions for now
  const [cartItems, setCartItems] = React.useState<any[]>([]);

  return (
    <>
      <MegaMenu cartCount={cartItems.length} isAuthenticated={true} />
      <BundlesPage
        onViewProduct={(id) => console.log('View product', id)}
        onAddToCart={(item) => console.log('Add to cart', item)}
      />
    </>
  );
}
