// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  // Allow access to auth pages when not authenticated
  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    if (token) {
      // If token exists, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // If no token, allow access to auth pages
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      // If no token, redirect to sign-in
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    // If token exists, allow access to dashboard
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Match auth and protected routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up'
  ],
};
