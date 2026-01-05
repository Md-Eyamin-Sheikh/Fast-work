import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    let query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await collection.find(query).toArray();
    
    // Transform _id to id to match frontend interface
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
