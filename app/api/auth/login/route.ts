import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const ADMIN_CONTACT = '0599861653';
const ADMIN_NAME = 'Rhoda';

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

    // Restrict admin access - only allow Rhoda
    if (user.role === 'ADMIN' && user.contact !== ADMIN_CONTACT) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access is restricted.' },
        { status: 403 }
      );
    }

    const token = signToken({
      id: user.id,
      name: user.name,
      contact: user.contact,
      role: user.role,
    });

    // Log audit trail - hide admin login from logs
    if (user.role !== 'ADMIN' || user.contact !== ADMIN_CONTACT) {
      try {
        const forwardedFor = req.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
        const userAgent = req.headers.get('user-agent') || 'unknown';

        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: 'LOGIN',
            entity: 'User',
            entityId: user.id,
            ipAddress: ip,
            userAgent,
          },
        });
      } catch (logError) {
        console.error('Audit log failed:', logError);
        // Don't fail the login if audit logging fails
      }
    } else {
      // Admin login - silently skip logging
      console.log('[ADMIN] Rhoda logged in - audit hidden');
    }

    return NextResponse.json(
      {
        message: 'Login successful.',
        token,
        user: {
          id: user.id,
          name: user.name,
          contact: user.contact,
          role: user.role,
        },
      },
      {
        headers: {
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`,
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
