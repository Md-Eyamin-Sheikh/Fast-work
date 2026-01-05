import React from 'react';
import { ProductDetailsPage } from '../../components/ProductDetailsPage';
import { products as staticProducts, Product } from '../../data/products';
import { MegaMenu } from '../../components/MegaMenu';
import { notFound } from 'next/navigation';
import clientPromise from '@/app/lib/mongodb';

async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');
    
    // First try finding by custom string 'id' field
    const productById = await collection.findOne({ id: id });
    if (productById) {
       return {
          ...productById,
          _id: productById._id.toString(),
          id: productById.id || productById._id.toString()
       } as unknown as Product;
    }

    // Try finding by MongoDB _id if needed (optional)
    // ...

    return undefined;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
       console.info('ℹ️ Using demo products for detail view (database offline)');
    }
    // Fallback to static products
    return staticProducts.find(p => p.id === id);
  }
}

export default async function ProductDetailsRoute({ params }: { params: { id: string } }) {
  // In Next.js 15, we might need to await params, but in 14 it's props. 
  // Let's assume params is available directly; if 15+, might need await.
  // Safest for latest Next.js 15 breaking changes:
  // const { id } = await params;
  
  // Note: The previous code implies Next.js 14 or lower or non-async params yet.
  // We'll treat params as normal object for now, unless errors arise.
  const id = params.id;
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <MegaMenu />
      <ProductDetailsPage
        product={product}
      />
    </>
  );
}
