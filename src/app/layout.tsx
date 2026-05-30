import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PreparaAI - Estudos Inteligentes",
  description:
    "Plataforma de estudos para concurseiros com flashcards, simulados e IA.",
};

/**
 * Layout raiz do Next.js.
 * Define a fonte Inter como padrão, idioma pt-BR e envolve toda a aplicação.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
