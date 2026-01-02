
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'productId', 'category', 'price', 'image'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    // Check if productId already exists
    const existing = await collection.findOne({ productId: body.productId });
    if (existing) {
      return NextResponse.json(
        { error: 'Product ID already exists' },
        { status: 409 }
      );
    }

    // Prepare product document
    const product = {
      ...body,
      id: body.productId, // Add id field for consistency
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into MongoDB
    const result = await collection.insertOne(product);

    return NextResponse.json({
      message: 'Product created successfully',
      id: result.insertedId
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    const result = await collection.updateOne(
      { _id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
