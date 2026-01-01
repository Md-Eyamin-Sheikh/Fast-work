
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    let query: any = {};

    if (id) {
        query.id = id;
    }
    else if (category) {
      query.category = category;
    }

    const products = await collection.find(query).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
