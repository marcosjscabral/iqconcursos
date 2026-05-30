import { LoginForm } from "@/features/auth/components/login-form";

/**
 * Página de login.
 * Rota pública que exibe o formulário de autenticação com Google.
 */
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-margin-mobile">
      <LoginForm />
    </main>
  );
}
