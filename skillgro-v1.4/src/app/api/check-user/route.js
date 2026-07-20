import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    const { email, phone } = await request.json();

    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 });
    }

    await clientPromise();
    
    const query = [];
    if (email) query.push({ email });
    if (phone) query.push({ phone });

    const existingUser = await mongoose.connection.collection("student_registrations").findOne({
      $or: query
    });

    if (existingUser) {
      return NextResponse.json({ exists: true, message: 'User already exists' }, { status: 200 });
    }

    return NextResponse.json({ exists: false }, { status: 200 });

  } catch (error) {
    console.error('Check User API Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify user' },
      { status: 500 }
    );
  }
}
