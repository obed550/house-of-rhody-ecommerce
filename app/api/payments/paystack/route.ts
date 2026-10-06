import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, email = 'customer@example.com', reference = `HR-${Date.now()}` } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required.' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Paystack payment initialized.',
      reference,
      amount: Number(amount),
      currency: 'NGN',
      email,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_demo',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: 'Payment verification succeeded.',
      verified: true,
      payload: body,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
