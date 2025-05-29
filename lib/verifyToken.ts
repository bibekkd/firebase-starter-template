import { getAuth } from 'firebase-admin/auth';

export async function verifyToken(token: string) {
  try {
    const auth = getAuth();
    await auth.verifyIdToken(token);
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
} 