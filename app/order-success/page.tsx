"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { OrderSuccessPage } from '../components/OrderSuccessPage';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter, useSearchParams } from 'next/navigation';
import { CartItem, useCart } from '../context/CartContext';

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Check if we need to clear cart (from payment success redirect)
    if (searchParams.get('clear_cart') === 'true') {
        clearCart();
        // Optionally remove the param from URL for cleaner look
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }

    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setItems(JSON.parse(lastOrder));
    }
  }, [searchParams, clearCart]);

  return (
    <>
      <MegaMenu />
      <OrderSuccessPage
        items={items}
      />
    </>
  );
}

export default function OrderSuccessRoute() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
