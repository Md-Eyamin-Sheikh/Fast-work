"use client";

import React, { Suspense } from 'react';
import { CheckoutPage } from '../components/CheckoutPage';
import { MegaMenu } from '../components/MegaMenu';
import { useCart } from '../context/CartContext';

function CheckoutContent() {
  const { items } = useCart();

  return (
    <>
      <MegaMenu />
      <CheckoutPage items={items} />
    </>
  );
}

export default function CheckoutRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
