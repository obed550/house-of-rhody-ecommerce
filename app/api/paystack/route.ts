import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'NGN', email = 'customer@example.com' } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required.' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Paystack is configured. Replace this stub with your real Paystack integration.',
      reference: `HR-${Date.now()}`,
      amount,
      currency,
      email,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'not-configured',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
