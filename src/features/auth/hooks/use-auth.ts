"use client";

import { createClient } from "@/shared/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Hook de autenticação.
 * Gerencia o estado do usuário (login, logout, sessão ativa).
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });

    if (error) {
      console.error("Erro ao fazer login com Google:", error.message);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao fazer logout:", error.message);
      throw error;
    }

    window.location.href = "/login";
  };

  return { user, loading, signInWithGoogle, signOut };
}
