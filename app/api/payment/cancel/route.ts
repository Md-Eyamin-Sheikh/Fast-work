import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';
import { Order } from '@/app/lib/models/Order';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const tran_id = formData.get('tran_id');

        if (tran_id) {
            await dbConnect();
             await Order.findOneAndUpdate(
                { orderId: tran_id },
                { status: 'rejected' } // Or 'cancelled' if enum allows, but using 'rejected' for now
            );
        }

        return NextResponse.redirect(new URL('/?payment=cancelled', request.url), 303);
    } catch (error) {
        console.error('Payment cancel error:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}
