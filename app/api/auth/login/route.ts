import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact, password } = body;

    if (!contact || !password) {
      return NextResponse.json({ error: 'Contact and password are required.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { contact },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signToken({
      id: user.id,
      name: user.name,
      contact: user.contact,
      role: user.role,
    });

    return NextResponse.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
