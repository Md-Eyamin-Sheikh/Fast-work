import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET products (all or single by id)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    const client = await clientPromise;
    // Using 'test' db as established throughout the session
    const db = client.db('test');
    const collection = db.collection('products');

    let query: any = {};
    
    if (id) {
       try {
         query._id = new ObjectId(id);
       } catch (e) {
         return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
       }
    } else if (category) {
      query.category = category;
    }

    const products = await collection.find(query).toArray();
    
    // Transform _id to id
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
    }));

    if (id && transformedProducts.length > 0) {
      return NextResponse.json(transformedProducts[0]);
    } else if (id && transformedProducts.length === 0) {
       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body.name || !body.price) {
      return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    const newProduct = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Ensure numeric fields are actually numbers if needed, though TS usually handles if defined
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : 0,
      stock: Number(body.stock || 0),
      rating: Number(body.rating || 0),
      reviews: Number(body.reviews || 0),
      soldLast23Hours: Number(body.soldLast23Hours || 0),
      peopleWatching: Number(body.peopleWatching || 0)
    };

    const result = await collection.insertOne(newProduct);

    return NextResponse.json({ message: 'Product created', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT update product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, _id, ...updateData } = body;

    // Use id (string) or _id (string) to identify
    const targetId = id || _id;

    if (!targetId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    // Remove immutable fields if present in updateData (optional, but good practice)
    delete updateData.createdAt;
    
    // Ensure numerics
    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.originalPrice !== undefined) updateData.originalPrice = Number(updateData.originalPrice);
    if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);

    const result = await collection.updateOne(
      { _id: new ObjectId(targetId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
       return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
