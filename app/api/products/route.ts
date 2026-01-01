import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Product } from '@/app/data/products';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("my-app"); // Using default DB name from URI or "my-app"
    const products = await db.collection("products").find({}).toArray();
    
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("my-app");
    const body: Product = await request.json();
    
    // Basic validation could go here
    if (!body.name || !body.price) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.collection("products").insertOne(body);
    
    return NextResponse.json({ success: true, message: 'Product added successfully', id: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
