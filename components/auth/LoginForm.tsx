"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { manageAuth } from "@/actions/auth";

export default function LoginForm() {
    return (
        <Card className="max-w-md w-full bg-transparent">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Bem Vindo(a) ao <span className="font-extrabold">Kubo<span className="text-primary">Gestao</span></span></CardTitle>
                <CardDescription className="text-md">Faça login com o Google e tenha o controle total dos seus clientes e orçamentos.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={manageAuth} className="grid gap-4">
                    <Button variant="outline" size="lg">
                        <Image src="/google_logo.png" alt="Google" width="16" height="16" />
                        Entrar com o Google
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <CardDescription className="text-md">Criando uma conta, você concorda com todos os nossos <Link href="/terms" className="underline">termos e serviços</Link>.</CardDescription>
            </CardFooter>
        </Card>
    )
}