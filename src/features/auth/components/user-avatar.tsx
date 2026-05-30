"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useAuth } from "../hooks/use-auth";

/**
 * Componente de avatar do usuário logado com dropdown menu.
 * Exibe as iniciais do nome como fallback quando não há foto.
 */
export function UserAvatar() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const fullName =
    user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "U";

  const initials = fullName
    .split(" ")
    .map((name: string) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      // Erro já tratado no hook
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="w-8 h-8 ring-2 ring-primary-container hover:ring-primary transition-all cursor-pointer">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-primary-container text-on-primary-container text-label-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-label-md font-medium">
            {user.user_metadata?.full_name ?? "Usuário"}
          </p>
          <p className="text-label-sm text-on-surface-variant truncate">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => (window.location.href = "/perfil")}
        >
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (window.location.href = "/dashboard")}
        >
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-error">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
