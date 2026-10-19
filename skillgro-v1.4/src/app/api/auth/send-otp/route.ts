import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';
import { sendOtpEmail } from '@/lib/brevoMailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Generate cryptographically sound 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Connect to MongoDB
    await clientPromise();
    const collection = mongoose.connection.collection('email_otps');

    // Ensure TTL index exists for auto-expiration in 10 minutes (600 seconds)
    try {
      await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 600 });
    } catch (idxErr) {
      // Index might already exist; safely ignore
    }

    // Save or update active OTP for this email
    await collection.updateOne(
      { email: cleanEmail },
      {
        $set: {
          otp,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // Send email via Brevo SMTP
    await sendOtpEmail(cleanEmail, otp);

    return NextResponse.json(
      { success: true, message: 'Verification code sent to your email.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Send OTP Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send verification code. Please try again.' },
      { status: 500 }
    );
  }
}
