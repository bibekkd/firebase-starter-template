// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from './lib/firebaseAdmin';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('__session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await adminAuth.verifyIdToken(token);
    return NextResponse.next(); // Authenticated
  } catch (err) {
    console.error('Invalid token', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Match only protected routes
export const config = {
  matcher: ['/dashboard/:path*'], // Add other protected routes as needed
};
