
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('my-app-db');
    const admins = db.collection('admins');

    const admin = await admins.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a real app, COMPARE HASHED PASSWORDS!
    // For this prototype as per user request, we might be comparing plain text or simple check.
    // The user provided "1234567" as password.
    // I will assume for now we are storing plain text or the user will rely on this simple check.
    // BUT BETTER: I'll stick to direct comparison as per the "simple" requirement, 
    // but add a comment that this should be hashed.
    if (admin.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_please_change');
    const token = await new SignJWT({ email: admin.email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    const response = NextResponse.json({ success: true });
    
    // Set Cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;

  } catch (e: any) {
    console.error('Login Route Error:', e);
    // Print stack trace
    if (e.stack) console.error(e.stack);
    return NextResponse.json({ error: 'Internal Server Error', details: e.message }, { status: 500 });
  }
}
