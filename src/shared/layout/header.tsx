"use client";

import { UserAvatar } from "@/features/auth/components/user-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header global do app.
 * - Desktop: logo + menu de navegação + avatar
 * - Mobile: apenas logo + avatar (nav fica no BottomNav)
 */
export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/flashcards") return pathname.startsWith("/flashcards");
    if (path === "/simulados") return pathname.startsWith("/simulados");
    return pathname === path;
  };

  return (
    <header className="bg-surface shadow-sm w-full top-0 sticky z-40">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/flashcards" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <span className="text-on-primary text-lg font-bold">P</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-primary">
            PreparaAI
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/simulados"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/simulados")
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            Simulados
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/dashboard")
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            Desempenho
          </Link>
          <Link
            href="/anotacoes"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive("/anotacoes")
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            IA Mentor
          </Link>
        </nav>

        {/* User Avatar */}
        <UserAvatar />
      </div>
    </header>
  );
}
