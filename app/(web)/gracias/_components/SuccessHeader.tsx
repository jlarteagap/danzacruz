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
      <div className='text-center space-y-4'>
        <div className='space-y-2'>
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

        {/* Pasos siguientes */}
        <div className='max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-lg p-4'>
          <p className='text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3'>
            Pasos siguientes
          </p>
          <div className='space-y-2 text-left'>
            <div className='flex items-start gap-3'>
              <div className='flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
                <span className='text-xs font-bold text-blue-700'>1</span>
              </div>
              <p className='text-sm text-slate-700 pt-0.5'>
                <span className='font-semibold'>Agrega bailarines:</span> Usa el
                botón "Ver coreografía" para agregar participantes directamente
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <div className='flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
                <span className='text-xs font-bold text-blue-700'>2</span>
              </div>
              <p className='text-sm text-slate-700 pt-0.5'>
                <span className='font-semibold'>O comparte el enlace:</span> Los
                bailarines pueden registrarse usando el enlace compartido
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
