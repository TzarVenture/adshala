import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and verification code are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();

    await clientPromise();
    const collection = mongoose.connection.collection('email_otps');

    const record = await collection.findOne({ email: cleanEmail });

    if (!record) {
      return NextResponse.json(
        { success: false, error: 'Verification code expired or not requested. Please request a new code.' },
        { status: 400 }
      );
    }

    if (record.otp !== cleanOtp) {
      return NextResponse.json(
        { success: false, error: 'Incorrect verification code. Please check and try again.' },
        { status: 400 }
      );
    }

    // OTP matches! Delete it so it cannot be reused
    await collection.deleteOne({ _id: record._id });

    return NextResponse.json(
      { success: true, verified: true, message: 'Email verified successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Verify OTP Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify code. Please try again.' },
      { status: 500 }
    );
  }
}
