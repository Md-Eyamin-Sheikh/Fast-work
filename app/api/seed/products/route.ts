
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { products } from '@/app/data/products';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Using 'test' database or your preferred DB name
    const collection = db.collection('products');

    // Check if products already exist to avoid duplicates (optional, or just delete all first)
    // For this seed, let's clear and re-insert to ensure sync with static file
    await collection.deleteMany({});

    if (products.length > 0) {
      await collection.insertMany(products);
    }

    return NextResponse.json({ 
      success: true, 
      message: `${products.length} products seeded successfully` 
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: 'Failed to seed products' }, { status: 500 });
  }
}
