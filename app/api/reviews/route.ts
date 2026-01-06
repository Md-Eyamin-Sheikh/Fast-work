import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { productId, rating, content, name, email, userId } = await request.json();

    // Basic validation
    if (!productId || !rating || !content || !name || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email format validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test'); // Use default DB or specify logic if variable
    const reviewsCollection = db.collection('reviews');

    // Duplicate Check: Check if this email has already reviewed this product
    const existingReview = await reviewsCollection.findOne({
      productId: productId,
      email: email,
    });

    if (existingReview) {
      return NextResponse.json(
        { message: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    // Construct Review Object
    const review = {
      productId,
      rating: Number(rating),
      content,
      name,
      email,
      userId: userId || null, // Logic: null if guest, ID if logged in
      status: 'pending', // Default status
      createdAt: new Date(),
    };

    const result = await reviewsCollection.insertOne(review);

    return NextResponse.json(
      { message: 'Review submitted successfully', reviewId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test');
    const reviewsCollection = db.collection('reviews');

    // Fetch reviews for this product
    // Optional: Filter by status='approved' if you want moderation
    // For now, we fetch all to see the result as requested by user
    const reviews = await reviewsCollection
      .find({ productId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
