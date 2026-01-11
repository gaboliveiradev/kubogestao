"use server";

import { Sidebar } from "@/components/layout/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const userLogged = await auth();

    if (!userLogged) redirect('/');

    return (
        <main className="min-h-dvh font-sans antialiased">
            <Sidebar />
            <div className="sm:ml-14 p-4">
                {children}
            </div>
        </main>
    )
}