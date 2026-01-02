
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { products as staticProducts } from '@/app/data/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    // Try to connect to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db('test');
      const collection = db.collection('products');

      let query: any = {};

      if (id) {
        query.id = id;
      } else if (category) {
        query.category = category;
      }

      const products = await collection.find(query).toArray();
      
      // If no products found in DB, use static data
      if (products.length === 0) {
        let filteredStaticProducts = staticProducts;
        
        if (id) {
          filteredStaticProducts = staticProducts.filter(p => p.id === id);
        } else if (category && category !== 'all') {
          filteredStaticProducts = staticProducts.filter(p => p.category === category);
        }
        
        return NextResponse.json(filteredStaticProducts);
      }

      return NextResponse.json(products);
      
    } catch (dbError) {
      // MongoDB unavailable - use demo data
      if (process.env.NODE_ENV === 'development') {
        console.info('ℹ️ API using demo data (database offline)');
      }
      
      let filteredStaticProducts = staticProducts;
      
      if (id) {
        filteredStaticProducts = staticProducts.filter(p => p.id === id);
      } else if (category && category !== 'all') {
        filteredStaticProducts = staticProducts.filter(p => p.category === category);
      }
      
      return NextResponse.json(filteredStaticProducts);
    }
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
