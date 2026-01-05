"use client";

import React, { useEffect, useState } from 'react';
import { OrderSuccessPage } from '../components/OrderSuccessPage';
import { MegaMenu } from '../components/MegaMenu';
import { useRouter } from 'next/navigation';
import { CartItem } from '../context/CartContext';

export default function OrderSuccessRoute() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setItems(JSON.parse(lastOrder));
    }
  }, []);

  return (
    <>
      <MegaMenu />
      <OrderSuccessPage
        items={items}
      />
    </>
  );
}
