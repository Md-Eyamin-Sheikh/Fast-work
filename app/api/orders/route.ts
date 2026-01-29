import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongoose';
import { Order } from '../../lib/models/Order';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    // Generate a unique order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    const newOrder = await Order.create({
      orderId,
      ...body,
      status: 'pending',
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Order created successfully', orderId: newOrder.orderId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create order', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '0');

        let query = Order.find({}).sort({ createdAt: -1 });
        
        if (limit > 0) {
            query = query.limit(limit);
        }

        const orders = await query;
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch orders', error: (error as Error).message },
            { status: 500 }
        );
    }
}
