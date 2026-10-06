import { NextResponse } from 'next/server';
import { addUser, findUserByContact } from '@/lib/store';
import { otpStore } from '@/app/api/auth/signup/route';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, password, otp } = body;

    if (!name || !contact || !password || !otp) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const sentOtp = otpStore.get(contact);
    if (!sentOtp || sentOtp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP.' }, { status: 400 });
    }

    if (findUserByContact(contact)) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }

    const user = addUser({
      id: `user-${Date.now()}`,
      name,
      contact,
      password,
      createdAt: new Date().toISOString(),
    });

    otpStore.delete(contact);

    return NextResponse.json({ message: 'Account created successfully.', user });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
