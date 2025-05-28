import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthProps {
    email: string;
    password: string;
}

export const signup = ({email, password} : AuthProps) =>
    createUserWithEmailAndPassword(auth, email, password);

export const login = ({email, password} : AuthProps) =>
    signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        throw error;
    }
};


