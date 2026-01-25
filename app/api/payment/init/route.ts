import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';
import { Order } from '@/app/lib/models/Order';

export async function POST(request: Request) {
    try {
        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        await dbConnect();
        const order = await Order.findOne({ orderId });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // SSLCommerz Configuration
        const store_id = process.env.SSLC_STORE_ID;
        const store_passwd = process.env.SSLC_STORE_PASS;
        
        // Mode selection: Explicit Env > 'test' in ID > sandbox (default safety)
        const isLive = process.env.SSLC_MODE === 'live' || process.env.SSLC_MODE === 'secure';
        const sslcz_mode = isLive ? 'securepay' : 'sandbox';
        
        const init_url = `https://${sslcz_mode}.sslcommerz.com/gwprocess/v4/api.php`;

        const data = {
            store_id,
            store_passwd,
            total_amount: order.totalAmount,
            currency: 'BDT',
            tran_id: orderId, // Use Order ID as Transaction ID
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success?id=${orderId}`,
            fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail?id=${orderId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel?id=${orderId}`,
            ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`,
            shipping_method: 'Courier',
            product_name: order.items.map((item: any) => item.name).join(', ') || 'Order',
            product_category: 'Digital',
            product_profile: 'general',
            cus_name: order.customer.fullName,
            cus_email: order.customer.email,
            cus_add1: 'Dhaka', // Default/Placeholder as we didn't collect address in checkout
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: order.customer.phone,
            cus_fax: order.customer.phone,
            ship_name: order.customer.fullName,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: '1000',
            ship_country: 'Bangladesh',
        };

        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, String(value));
        }

        const sslRes = await fetch(init_url, {
            method: 'POST',
            body: formData,
        });

        const sslData = await sslRes.json();

        if (sslData.status === 'SUCCESS') {
            return NextResponse.json({ gatewayUrl: sslData.GatewayPageURL });
        } else {
            console.error('SSLCommerz Init Failed:', sslData);
            return NextResponse.json({ error: 'SSLCommerz Init Failed', details: sslData }, { status: 400 });
        }

    } catch (error) {
        console.error('Payment init error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
