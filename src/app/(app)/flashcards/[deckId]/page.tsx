/**
 * Página de detalhes de um deck específico.
 * Placeholder da Fase 0 — será implementada na Fase 1.
 */
export default function DeckPage({ params }: { params: { deckId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <span className="material-symbols-outlined text-6xl text-primary">layers</span>
      <h1 className="font-headline-md text-headline-md text-on-surface">Deck</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
        Detalhes do deck <code className="text-primary">{params.deckId}</code> — em construção na Fase 1.
      </p>
    </div>
  );
}
