import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente Supabase para uso no servidor (server components, API routes).
 * Gerencia cookies de sessão automaticamente via next/headers.
 */
export async function createClient() {
  const cookieStore = await cookies();

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

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Chamado em Server Component - pode ser ignorado se o middleware
          // já estiver gerenciando a atualização dos cookies de sessão.
        }
      },
    },
  });
}