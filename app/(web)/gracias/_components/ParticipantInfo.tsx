// app/(web)/gracias/components/ParticipantInfo.tsx
"use client";

import React from "react";

interface ParticipantInfoProps {
  participantId: string;
}

export function ParticipantInfo({ participantId }: ParticipantInfoProps) {
  return (
    <div className='text-center space-y-1'>
      <p className='text-sm text-slate-500'>
        ID de participante:{" "}
        <span className='font-mono text-slate-600'>{participantId}</span>
      </p>
      <p className='text-xs text-slate-400'>
        Guarda este ID para futuras consultas
      </p>
    </div>
  );
}
