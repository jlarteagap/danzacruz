// app/(web)/gracias/page.tsx

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GraciasPageClient } from "./GraciasPageClient";
import type { PageSearchParams } from "@/types/registration.types";

export const metadata = {
  title: "Registro Completado | Danzacruz 2025",
  description: "Tus coreografías han sido registradas exitosamente",
  robots: "noindex",
};

interface PageProps {
  searchParams: Promise<PageSearchParams>;
}

export default async function GraciasPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Validación de parámetros
  const participantIdRaw = params.participantId ?? "";
  const participantNameRaw = params.participantName ?? "";
  const choreographyIds = params.choreographyIds;
  const choreographyNames = params.choreographyNames;

  // Validar parámetros obligatorios
  if (!participantIdRaw || !participantNameRaw || !choreographyNames) {
    notFound();
  }

  const participantId = participantIdRaw;
  const participantName = decodeURIComponent(participantNameRaw);

  // Construir el array de coreografías
  const idsArray = choreographyIds ? choreographyIds.split(",") : [];
  const namesArray = decodeURIComponent(choreographyNames).split(" | ");

  const choreographies = idsArray.map((id, index) => ({
    id: id.trim(),
    name: namesArray[index]?.trim() || "Sin nombre",
    // Generar enlace único por coreografía
    shareLink: process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/coreografias/${encodeURIComponent(
          id.trim()
        )}`
      : undefined,
  }));

  const totalCoreografias = parseInt(params.totalCoreografias || "1", 10);
  const registrados = parseInt(params.registrados || "1", 10);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <GraciasPageClient
        participantId={participantId}
        participantName={participantName}
        choreographies={choreographies}
        totalCoreografias={totalCoreografias}
        registrados={registrados}
      />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center'>
      <div
        className='w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin'
        aria-label='Cargando...'
      />
    </div>
  );
}
