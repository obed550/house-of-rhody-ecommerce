import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, password } = body;

    if (!name || !contact || !password) {
      return NextResponse.json({ error: 'Full name, phone number and password are required.' }, { status: 400 });
    }

    // Replace with real database insert and SMS sender integration.
    const mockUser = {
      id: `user_${Date.now()}`,
      name,
      contact,
      password,
      otp: '123456',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: 'Signup successful. SMS verification required.',
      user: mockUser,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
