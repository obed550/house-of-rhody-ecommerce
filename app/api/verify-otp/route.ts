import { NextResponse } from 'next/server';

const otpStore = new Map<string, string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact, otp } = body;

    if (!contact || !otp) {
      return NextResponse.json({ error: 'Phone number and OTP are required.' }, { status: 400 });
    }

    const validOtp = otpStore.get(contact);
    if (!validOtp || validOtp !== otp) {
      return NextResponse.json({ error: 'Invalid or expired OTP.' }, { status: 400 });
    }

    otpStore.delete(contact);

    return NextResponse.json({
      message: 'Phone number verified successfully.',
      verified: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'OTP verification route ready.' });
}
