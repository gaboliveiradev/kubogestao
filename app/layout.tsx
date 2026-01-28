import type { Metadata } from "next";
import { Red_Hat_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import { Providers } from "./providers";
import { AuthSession } from "@/types/user-logged";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clior App",
  description: "Gerencie seus clientes e gere orçamentos personalizados.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const userLogged = await auth();

  return (
    <html lang="pt-br" suppressHydrationWarning className={inter.variable}>
      <body className={`${redHatDisplay.className} antialiased`}>
        <Providers initialUser={userLogged as AuthSession}>
          <Toaster richColors position="bottom-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
