import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId || typeof paymentId !== 'string' || !paymentId.trim()) {
      return NextResponse.json(
        { found: false, error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    await clientPromise();

    const record = await mongoose.connection
      .collection('student_registrations')
      .findOne({ razorpayPaymentId: paymentId.trim() });

    if (!record) {
      return NextResponse.json(
        { found: false, error: 'Registration record not found' },
        { status: 404 }
      );
    }

    const batch = record.batch || '';
    let batchSchedule = record.batchSchedule || '';
    let batchMode = record.batchMode || '';

    if (!batchSchedule && batch.includes('(')) {
      const parts = batch.match(/^(.*?)\s*\((.*?)\)$/);
      if (parts) {
        batchSchedule = parts[1];
        batchMode = parts[2];
      } else {
        batchSchedule = batch;
      }
    } else if (!batchSchedule) {
      batchSchedule = batch;
    }

    const registration = {
      name: record.name || '',
      email: record.email || '',
      phone: record.phone || '',
      city: record.city || '',
      course: record.course || '',
      batch: record.batch || '',
      batchSchedule,
      batchMode,
      paymentAmount: record.paymentAmount || '',
      paymentId: record.razorpayPaymentId || '',
      orderId: record.razorpayOrderId || '',
      registeredAt: record.createdAt
        ? new Date(record.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
    };

    return NextResponse.json({ found: true, registration }, { status: 200 });

  } catch (error) {
    console.error('Verify Registration API Error:', error);
    return NextResponse.json(
      { found: false, error: 'Failed to verify registration' },
      { status: 500 }
    );
  }
}
