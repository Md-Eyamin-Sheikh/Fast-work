import React from 'react';
import { ProductDetailsPage } from '../../components/ProductDetailsPage';
import { products as staticProducts, Product } from '../../data/products';
import { MegaMenu } from '../../components/MegaMenu';
import { notFound } from 'next/navigation';
import clientPromise from '@/app/lib/mongodb';

async function getProductAndRelated(id: string): Promise<{ product: Product | undefined, relatedProducts: Product[] }> {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');
    
    // 1. Fetch main product
    const productById = await collection.findOne({ id: id });
    if (!productById) {
        return { product: undefined, relatedProducts: [] };
    }

    const product = {
        ...productById,
        _id: productById._id.toString(),
        id: productById.id || productById._id.toString()
    } as unknown as Product;

    // 2. Fetch related products (same category or random, excluding current)
    // Using simple logic: 4 random products excluding current
    const relatedDocs = await collection.aggregate([
        { $match: { id: { $ne: id } } },
        { $sample: { size: 4 } }
    ]).toArray();

    const relatedProducts = relatedDocs.map(p => ({
        ...p,
        _id: p._id.toString(),
        id: p.id || p._id.toString()
    })) as unknown as Product[];

    return { product, relatedProducts };
    
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
       console.info('ℹ️ Using demo products for detail view (database offline)');
    }
    // Fallback to static products
    const product = staticProducts.find(p => p.id === id);
    const relatedProducts = staticProducts.filter(p => p.id !== id).slice(0, 4);
    return { product, relatedProducts };
  }
}

export default async function ProductDetailsRoute({ params }: { params: { id: string } }) {
  // In Next.js 15, we might need to await params.
  const id = params.id;
  const { product, relatedProducts } = await getProductAndRelated(id);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <MegaMenu />
      <ProductDetailsPage
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
