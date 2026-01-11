"use client";

import { AuthSession } from "@/types/user-logged";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
    user: AuthSession | null;
    setUser: (user: AuthSession | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser: AuthSession | null }) {
    const [user, setUser] = useState<AuthSession | null>(initialUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useUser deve ser usado dentro de <AuthProvider>");

    return context;
}
