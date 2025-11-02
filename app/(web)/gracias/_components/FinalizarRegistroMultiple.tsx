// app/(web)/gracias/components/FinalizarRegistroMultiple.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useClipboard } from "@/hooks/useClipboard";
import { SuccessHeader } from "./SuccessHeader";
import { RegistrationSummary } from "./RegistrationSummary";
import { ChoreographyList } from "./ChoreographyList";
import { ActionButtons } from "./ActionButtons";
import { ShareSection } from "./ShareSection";
import { ParticipantInfo } from "./ParticipantInfo";
import type { FinalizarRegistroMultipleProps } from "@/types/registration.types";

/**
 * Componente principal de finalización de registro múltiple
 * Orquesta todos los sub-componentes siguiendo el principio de composición
 */
export function FinalizarRegistroMultiple({
  participantId,
  participantName,
  choreographies,
  totalCoreografias,
  registrados,
  shareLink,
  onVerCoreografias,
  onAgregarIntegrantes,
}: FinalizarRegistroMultipleProps) {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
        <SuccessHeader
          participantName={participantName}
          totalCoreografias={totalCoreografias}
        />

        <Card className='border-slate-200 shadow-lg shadow-slate-200/50'>
          <CardContent className='p-6 md:p-8 space-y-6'>
            <RegistrationSummary
              totalCoreografias={totalCoreografias}
              registrados={registrados}
            />

            <ChoreographyList
              choreographies={choreographies}
              totalCoreografias={totalCoreografias}
            />

            <ActionButtons
              totalCoreografias={totalCoreografias}
              onVerCoreografias={onVerCoreografias}
              onAgregarIntegrantes={onAgregarIntegrantes}
            />

            {shareLink && (
              <ShareSection
                shareLink={shareLink}
                participantName={participantName}
                totalCoreografias={totalCoreografias}
                onCopy={copyToClipboard}
                copied={copied}
              />
            )}
          </CardContent>
        </Card>

        <ParticipantInfo participantId={participantId} />
      </div>
    </div>
  );
}
