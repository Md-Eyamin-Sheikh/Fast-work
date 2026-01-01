
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('my-app-db');
    const admins = db.collection('admins');

    const existingAdmin = await admins.findOne({ email: 'admin123@gmail.com' });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    await admins.insertOne({
      email: 'admin123@gmail.com',
      password: '1234567', // Storing plain text as requested for simplicity, SHOULD BE HASHED in prod
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Admin created successfully' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
