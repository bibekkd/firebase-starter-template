'use client'
import { createContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<User>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async () => {
    throw new Error("Signup not implemented");
  },
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


