/**
 * Página de detalhes de um simulado específico.
 * Placeholder da Fase 0 — será implementada na Fase 3.
 */
export default function ExamPage({ params }: { params: { examId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <span className="material-symbols-outlined text-6xl text-primary">quiz</span>
      <h1 className="font-headline-md text-headline-md text-on-surface">Simulado</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
        Simulado <code className="text-primary">{params.examId}</code> — em construção na Fase 3.
      </p>
    </div>
  );
}
