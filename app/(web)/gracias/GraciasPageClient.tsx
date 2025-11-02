// app/(web)/gracias/GraciasPageClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { FinalizarRegistroMultiple } from "./_components/FinalizarRegistroMultiple";
import type { Choreography } from "@/types/registration.types";

interface GraciasPageClientProps {
  participantId: string;
  participantName: string;
  choreographies: Choreography[];
  totalCoreografias: number;
  registrados: number;
  shareLink?: string;
}

export function GraciasPageClient({
  participantId,
  participantName,
  choreographies,
  totalCoreografias,
  registrados,
  shareLink,
}: GraciasPageClientProps) {
  const router = useRouter();

  const handleVerCoreografias = () => {
    // Navegar a la página de coreografías del participante
    router.push(`/coreografias/${participantId}`);
  };

  const handleAgregarIntegrantes = () => {
    // Navegar a la página para agregar integrantes
    router.push(`/coreografias/${participantId}/integrantes`);
  };

  return (
    <FinalizarRegistroMultiple
      participantId={participantId}
      participantName={participantName}
      choreographies={choreographies}
      totalCoreografias={totalCoreografias}
      registrados={registrados}
      shareLink={shareLink}
      onVerCoreografias={handleVerCoreografias}
      onAgregarIntegrantes={handleAgregarIntegrantes}
    />
  );
}
