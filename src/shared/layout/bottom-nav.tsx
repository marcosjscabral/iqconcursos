"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/flashcards", icon: "layers", label: "Flashcards" },
  { href: "/anotacoes", icon: "description", label: "Anotações" },
  { href: "/vade-mecum", icon: "menu_book", label: "Vade Mecum" },
  { href: "/simulados", icon: "psychology", label: "IA Mentor" },
];

/**
 * Barra de navegação inferior para mobile.
 * Exibe 4 abas principais com ícones do Material Symbols.
 */
export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/flashcards") return pathname.startsWith("/flashcards");
    if (href === "/simulados") return pathname.startsWith("/simulados");
    return pathname === href;
  };

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface shadow-[0_-2px_10px_rgba(71,85,105,0.08)]">
      <div className="flex justify-around items-center h-16 pb-safe">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center ${
                active
                  ? "bg-primary text-on-primary rounded-xl px-4 py-1"
                  : "text-on-surface-variant hover:bg-surface-variant/50 w-full h-full"
              } active:scale-90 transition-transform`}
            >
              <span className="material-symbols-outlined mb-1 text-[20px]">
                {item.icon}
              </span>
              <span className="font-label-sm text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
