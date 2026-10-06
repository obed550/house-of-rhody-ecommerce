import middleware from 'next/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your_secret_key');
const ADMIN_CONTACT = '0599861653';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
    }

    try {
      const decoded = await jwtVerify(token, SECRET);
      const contact = (decoded.payload as any).contact;

      // Only allow Rhoda to access admin
      if (contact !== ADMIN_CONTACT) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login?error=invalid', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
