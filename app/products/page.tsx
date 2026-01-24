import React, { Suspense } from 'react';
import { ProductsPage } from '../components/ProductsPage';
import { MegaMenu } from '../components/MegaMenu';
import { products as staticProducts, Product } from '../data/products';
import clientPromise from '@/app/lib/mongodb';

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');
    
    const products = await collection.find({}).toArray();
    
    if (products.length === 0) {
      console.info('ℹ️ Using demo products (database empty)');
      return staticProducts;
    }
    
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      id: product.id || product._id.toString()
    })) as unknown as Product[];
    
  } catch (error) {
    // Gracefully fallback to demo data when database is unavailable
    if (process.env.NODE_ENV === 'development') {
      console.info('ℹ️ Using demo products (database offline)');
    }
    return staticProducts; // Graceful fallback to static data
  }
}

export default async function ProductsPageRoute() {
  const products = await getProducts();
  
  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <ProductsPage 
        initialProducts={products}
      />
    </>
  );
}
