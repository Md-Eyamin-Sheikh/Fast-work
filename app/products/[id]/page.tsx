"use client";

import React from 'react';
import { ProductDetailsPage } from '../../components/ProductDetailsPage';
import { products } from '../../data/products';
import { MegaMenu } from '../../components/MegaMenu';
import { notFound, useParams, useRouter } from 'next/navigation';

export default function ProductDetailsRoute() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const product = products.find(p => p.id === id);

  if (!product) {
    return notFound();
  }

  const handleBuyNow = (product: any) => {
    router.push(`/checkout?productId=${product.id}&quantity=1`);
  };

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <ProductDetailsPage
        product={product}
        onBack={() => router.back()}
        onAddToCart={() => console.log('Add to cart')}
        onBuyNow={handleBuyNow}
      />
    </>
  );
}
