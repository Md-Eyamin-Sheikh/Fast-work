import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    
    // Get products count
    const productsCollection = db.collection('products');
    const totalProducts = await productsCollection.countDocuments();
    
    // Get recent products (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentProducts = await productsCollection.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    // Get blogs count
    const blogsCollection = db.collection('blogs');
    const totalBlogs = await blogsCollection.countDocuments();
    
    // Get recent blogs (last 30 days)
    const recentBlogs = await blogsCollection.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    // Calculate total items
    const totalItems = totalProducts + totalBlogs;
    
    return NextResponse.json({
      products: {
        total: totalProducts,
        recent: recentProducts
      },
      blogs: {
        total: totalBlogs,
        recent: recentBlogs
      },
      totalItems: totalItems
    });
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    
    // Return fallback data if database fails
    return NextResponse.json({
      products: {
        total: 0,
        recent: 0
      },
      blogs: {
        total: 0,
        recent: 0
      },
      totalItems: 0,
      error: 'Failed to fetch statistics'
    }, { status: 500 });
  }
}
