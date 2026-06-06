import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Atualiza a sessão do Supabase via middleware.
 * - Protege rotas da área autenticada: redireciona para /login se não autenticado.
 * - Se já autenticado e acessa /login, redireciona para /flashcards.
 *
 * NOTA: Os grupos de rotas do Next.js App Router como (app) e (auth) são
 * transparentes na URL. A rota /app/(app)/flashcards/page.tsx aparece como
 * /flashcards no browser, nunca como /(app)/flashcards.
 */

// Lista de rotas protegidas que exigem login do usuário.
// Para liberar o acesso temporariamente (como fizemos agora), basta comentar as rotas ou deixar a lista vazia: []
// Para restringir e proteger as rotas novamente, basta descomentá-las abaixo.
const PROTECTED_ROUTES: string[] = [
  // "/flashcards",
  // "/simulados",
  // "/dashboard",
  // "/anotacoes",
  // "/vade-mecum",
  // "/perfil",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Retorna NextResponse normal sem erro se as credenciais estiverem ausentes para o deploy
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Rotas protegidas: redireciona para /login se não autenticado
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Se já está logado e tenta acessar /login, redireciona para /flashcards
  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/flashcards";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
