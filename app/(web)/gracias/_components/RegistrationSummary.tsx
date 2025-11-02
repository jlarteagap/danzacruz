// app/(web)/gracias/components/RegistrationSummary.tsx
"use client";

import React from "react";
import { Music } from "lucide-react";

interface RegistrationSummaryProps {
  totalCoreografias: number;
  registrados: number;
}

export function RegistrationSummary({
  totalCoreografias,
  registrados,
}: RegistrationSummaryProps) {
  return (
    <div className='flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
          <Music className='w-5 h-5 text-blue-600' aria-hidden='true' />
        </div>
        <div>
          <p className='text-sm font-medium text-slate-700'>
            {totalCoreografias === 1
              ? "Coreografía registrada"
              : "Coreografías registradas"}
          </p>
          <p className='text-2xl font-bold text-blue-600'>
            {totalCoreografias}
          </p>
        </div>
      </div>
      <div className='text-right'>
        <p className='text-sm font-medium text-slate-700'>Participante</p>
        <p className='text-lg font-semibold text-slate-900'>{registrados}</p>
      </div>
    </div>
  );
}
