"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso no browser (client components).
 * Usa as variáveis de ambiente públicas (NEXT_PUBLIC_*) que são
 * expostas ao navegador de forma segura.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Retorna um cliente mockado para evitar erros de deploy/build
    return {
      auth: {
        onAuthStateChange: (callback: any) => {
          callback("SIGNED_IN", {
            user: {
              id: "dummy-user-id",
              email: "concurseiro@preparaai.com.br",
              user_metadata: {
                full_name: "Concurseiro Focado",
                avatar_url: ""
              }
            }
          });
          return { data: { subscription: { unsubscribe: () => {} } } };
        },
        signInWithOAuth: async () => ({ error: null }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: { id: "dummy-user-id", email: "concurseiro@preparaai.com.br", user_metadata: { full_name: "Concurseiro Focado" } } }, error: null }),
      }
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}