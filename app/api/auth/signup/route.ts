import { NextResponse } from 'next/server';
import { findUserByContact } from '@/lib/store';

const otpStore = new Map<string, string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, password } = body;

    if (!name || !contact || !password) {
      return NextResponse.json({ error: 'Name, contact and password are required.' }, { status: 400 });
    }

    if (findUserByContact(contact)) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    otpStore.set(contact, otp);

    return NextResponse.json({
      message: 'OTP sent to your number. Verify to complete registration.',
      otp,
      contact,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'User signup route ready.' });
}

export { otpStore };
