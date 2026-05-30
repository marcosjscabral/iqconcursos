import { createClient } from "@/shared/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Rota de callback do OAuth.
 * O Supabase redireciona para cá após o login com Google.
 * Troca o código de autorização por uma sessão e redireciona
 * para a página principal do app.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/flashcards";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Erro ao trocar código por sessão:", error.message);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error(
      "Erro inesperado no callback de autenticação:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.redirect(`${origin}/login?error=unexpected`);
  }
}
