import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

// GET blogs (fetch all or by slug)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status'); // published or draft
    
    const client = await clientPromise;
    const db = client.db('my-app-db');
    const collection = db.collection('blogs');

    let query: any = {};

    if (slug) {
      query.slug = slug;
    }
    
    // If status filter is provided
    if (status && status !== 'all') {
      query.status = status;
    }
    // If status is 'all', don't filter by status (show both published and draft)

    const blogs = await collection
      .find(query)
      .sort({ createdAt: -1 }) // Latest first
      .toArray();

    return NextResponse.json(blogs);
    
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    if (error.stack) console.error(error.stack);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'slug', 'content', 'excerpt', 'featuredImage', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db('my-app-db');
    const collection = db.collection('blogs');

    // Check if slug already exists
    const existing = await collection.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 409 }
      );
    }

    // Prepare blog document
    const blog = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      featuredImage: body.featuredImage,
      category: body.category,
      tags: body.tags || '',
      status: body.status || 'draft',
      author: body.author || 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0
    };

    // Insert into MongoDB
    const result = await collection.insertOne(blog);

    return NextResponse.json({
      message: 'Blog created successfully',
      id: result.insertedId,
      slug: blog.slug
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { slug, ...updateData } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Blog slug is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('my-app-db');
    const collection = db.collection('blogs');

    const result = await collection.updateOne(
      { slug },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog updated successfully'
    });

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Blog slug is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('my-app-db');
    const collection = db.collection('blogs');

    const result = await collection.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
