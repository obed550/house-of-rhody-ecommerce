import { NextResponse } from 'next/server';
import { findUserByContact } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { contact, password } = await request.json();

    if (!contact || !password) {
      return NextResponse.json({ error: 'Contact and password are required.' }, { status: 400 });
    }

    const user = findUserByContact(contact);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid login details.' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        contact: user.contact,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
