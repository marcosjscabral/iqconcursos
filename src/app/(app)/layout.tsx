import { BottomNav } from "@/shared/layout/bottom-nav";
import { Header } from "@/shared/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PreparaAI - Estudos Inteligentes",
  description: "Plataforma de estudos com flashcards, simulados e IA.",
};

/**
 * Layout protegido por autenticação.
 * Inclui Header, conteúdo da página e BottomNav mobile.
 * O middleware garante que apenas usuários autenticados acessem.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 mb-24 md:mb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
