"use client";

import React, { Suspense } from 'react';
import { CheckoutPage } from '../components/CheckoutPage';
import { MegaMenu } from '../components/MegaMenu';
import { products } from '../data/products';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const quantity = parseInt(searchParams.get('quantity') || '1');

  const product = products.find(p => p.id === productId);

  const items = product ? [{ product, quantity }] : [];

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
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
