"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OnboardingSteps from "./components/OnboardingStep";

export default async function OnboardingPage() {
    const userLogged = await auth();

    if (!userLogged) redirect("/");

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <div className="w-full max-w-4xl bg-background rounded-2xl shadow-card p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold">
                        Bem-vindo ao <span className="text-primary font-extrabold">KuboGestao</span> 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Precisamos de alguns dados da sua empresa para começar
                    </p>
                </header>

                <OnboardingSteps />
            </div>
        </div>
    );
}
