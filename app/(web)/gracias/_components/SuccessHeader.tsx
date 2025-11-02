// app/(web)/gracias/components/SuccessHeader.tsx
"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface SuccessHeaderProps {
  participantName: string;
  totalCoreografias: number;
}

export function SuccessHeader({
  participantName,
  totalCoreografias,
}: SuccessHeaderProps) {
  return (
    <>
      {/* Icono de éxito con animación */}
      <div className='flex justify-center'>
        <div className='relative'>
          <div className='absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse' />
          <CheckCircle2
            className='w-16 h-16 text-green-500 relative animate-in zoom-in duration-500'
            strokeWidth={1.5}
            aria-label='Registro exitoso'
          />
        </div>
      </div>

      {/* Título y mensaje principal */}
      <div className='text-center space-y-2'>
        <h1 className='text-3xl md:text-4xl font-bold text-slate-900 tracking-tight'>
          ¡Registro completado!
        </h1>
        <p className='text-slate-600 text-lg'>
          <span className='font-semibold text-slate-900'>
            {participantName}
          </span>
          ,
          {totalCoreografias === 1 ? (
            <> tu coreografía fue registrada exitosamente</>
          ) : (
            <>
              {" "}
              tus{" "}
              <span className='font-semibold text-blue-600'>
                {totalCoreografias} coreografías
              </span>{" "}
              fueron registradas exitosamente
            </>
          )}
        </p>
      </div>
    </>
  );
}
