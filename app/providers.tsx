'use client';

import { AuthProvider } from "@/context/auth-context";
import { ModalProvider } from "@/context/modal-context";
import { AuthSession } from "@/types/user-logged";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export type Props = {
    children: ReactNode,
    initialUser: AuthSession | null
}

export function Providers({ children, initialUser }: Props) {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider initialUser={initialUser}>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}