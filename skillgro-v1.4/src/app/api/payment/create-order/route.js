import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, course, name, email, phone } = body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid or missing amount' },
        { status: 400 }
      );
    }

    // Initialize Razorpay
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'rzp_test_YOUR_KEY_ID' || keySecret === 'YOUR_KEY_SECRET') {
      console.error('Razorpay credentials are not configured or are using placeholders.');
      return NextResponse.json(
        { error: 'Payment gateway configuration error. Please contact administration.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(Number(amount) * 100), // Amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `adshalaa_rec_${Date.now()}`,
      notes: {
        website: 'Adshalaa',
        course: course || '',
        student_name: name || '',
        student_email: email || '',
        student_phone: phone || '',
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    }, { status: 200 });

  } catch (error) {
    console.error('Create Razorpay Order Error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
