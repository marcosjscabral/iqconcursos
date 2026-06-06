import { updateSession } from "@/shared/lib/supabase/middleware";
import type { NextRequest } from "next/server";

/**
 * Proxy global do Next.js 16.
 * Executa a atualização de sessão do Supabase em todas as rotas,
 * exceto arquivos estáticos e recursos internos.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (ícone)
     * - Arquivos com extensão (imagens, fontes, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
