import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';
import { Order } from '@/app/lib/models/Order';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const tran_id = formData.get('tran_id');
        const val_id = formData.get('val_id');

        // Log for debugging
        console.log('Payment Success:', { tran_id, val_id });

        if (!tran_id) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        await dbConnect();

        // Update Order
        const order = await Order.findOne({ orderId: tran_id });
        if (order) {
            order.status = 'completed';
            order.payment = {
                method: 'SSLCommerz',
                transactionId: val_id?.toString() || tran_id.toString(),
                senderNumber: '' // Not applicable for generic gateway response
            };
            await order.save();
        }

        // Redirect to success page
        // We add clear_cart=true so the client knows to clear the cart
        return NextResponse.redirect(new URL('/order-success?clear_cart=true', request.url), 303);

    } catch (error) {
        console.error('Payment success error:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}
