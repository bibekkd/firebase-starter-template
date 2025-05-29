import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const { idToken } = await request.json();
        
        // Verify the ID token
        await adminAuth.verifyIdToken(idToken);
        
        // Create a session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        
        // Set the cookie
        const response = NextResponse.json({ status: 'success' });
        response.cookies.set('__session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });
        
        return response;
    } catch (error) {
        console.error('Error creating session cookie:', error);
        return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ status: 'success' });
    response.cookies.delete('__session');
    return response;
} 