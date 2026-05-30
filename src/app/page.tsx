import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-margin-mobile md:px-margin-desktop">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-on-primary text-3xl font-bold">P</span>
          </div>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">Bem-vindo ao PreparaAI</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-md mx-auto">Sua plataforma inteligente de estudos com flashcards, simulados e acompanhamento de desempenho.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/flashcards" className="bg-surface-container-lowest rounded-2xl p-6 soft-shadow hover-lift text-left group">
            <span className="material-symbols-outlined text-3xl text-primary mb-3 block">layers</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Flashcards</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Crie e estude com cards inteligentes</p>
          </Link>
          <Link href="/simulados" className="bg-surface-container-lowest rounded-2xl p-6 soft-shadow hover-lift text-left group">
            <span className="material-symbols-outlined text-3xl text-primary mb-3 block">quiz</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Simulados</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Pratique com questões reais de concursos</p>
          </Link>
        </div>
        <Link href="/login" className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-xl hover:bg-primary-container transition-colors active:scale-95 duration-150 shadow-md">
          <span className="material-symbols-outlined">login</span>
          Entrar com Google
        </Link>
      </div>
    </main>
  );
}

