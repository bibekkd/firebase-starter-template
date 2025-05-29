import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthProps {
    email: string;
    password: string;
}

const setSessionCookie = async (idToken: string) => {
    try {
        const response = await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to set session cookie');
        }
    } catch (error) {
        console.error('Error setting session cookie:', error);
        throw error;
    }
};

export const signup = async ({email, password}: AuthProps) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await result.user.getIdToken();
    await setSessionCookie(idToken);
    return result.user;
};

export const login = async ({email, password}: AuthProps) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await result.user.getIdToken();
    await setSessionCookie(idToken);
    return result.user;
};

export const logout = async () => {
    await signOut(auth);
    // Clear the session cookie
    await fetch('/api/auth/session', {
        method: 'DELETE',
    });
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        await setSessionCookie(idToken);
        return result.user;
    } catch (error) {
        throw error;
    }
};


