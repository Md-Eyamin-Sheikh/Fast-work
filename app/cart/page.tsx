"use client";


import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { MegaMenu } from '../components/MegaMenu';
import { CartPage } from '../components/CartPage';

export default function CartRoute() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, cartCount } = useCart();

  return (
    <>
      <MegaMenu />
      <CartPage
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => router.push('/checkout')}
        onContinueShopping={() => router.push('/products')}
      />
    </>
  );
}
