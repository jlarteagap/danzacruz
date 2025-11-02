// app/(web)/gracias/GraciasPageClient.tsx
import { FinalizarRegistroMultiple } from "./_components/FinalizarRegistroMultiple";
import type { Choreography } from "@/types/registration.types";

interface GraciasPageClientProps {
  participantId: string;
  participantName: string;
  choreographies: Choreography[];
  totalCoreografias: number;
  registrados: number;
}

export function GraciasPageClient({
  participantId,
  participantName,
  choreographies,
  totalCoreografias,
  registrados,
}: GraciasPageClientProps) {
  return (
    <FinalizarRegistroMultiple
      participantId={participantId}
      participantName={participantName}
      choreographies={choreographies}
      totalCoreografias={totalCoreografias}
      registrados={registrados}
    />
  );
}
