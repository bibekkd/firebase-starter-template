import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    await adminAuth.verifyIdToken(token);
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ valid: false }, { status: 401 });
  }
} 