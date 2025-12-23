"use client";

import React, { Suspense } from 'react';
import { ProductsPage } from '../components/ProductsPage';
import { MegaMenu } from '../components/MegaMenu';

export default function ProductsPageRoute() {
  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsPage 
          onAddToCart={() => console.log('Add to cart')} 
        />
      </Suspense>
    </>
  );
}
