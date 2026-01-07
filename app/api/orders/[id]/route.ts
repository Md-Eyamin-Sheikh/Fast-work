import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import { Order } from '../../../lib/models/Order';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await dbConnect();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    // Mock Email Trigger
    if (body.status === 'approved') {
        console.log(`[EMAIL AUTOMATION] Sending product access email to ${updatedOrder.customer.email} for Order ${updatedOrder.orderId}`);
        // In a real app, you would call your email service here
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update order', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return NextResponse.json(
        { message: 'Failed to delete order', error: (error as Error).message },
        { status: 500 }
    );
  }
}
