"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error a servicio de monitoreo (ej: Sentry)
    console.error("Error en página de coreografías:", error);
  }, [error]);

  return (
    <div className='container mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-16'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6'>
        <AlertCircle className='h-10 w-10 text-red-600' />
      </div>

      <h2 className='mb-2 text-2xl font-bold text-slate-900'>Algo salió mal</h2>

      <p className='mb-6 max-w-md text-center text-slate-600'>
        No pudimos cargar las coreografías. Por favor, intenta nuevamente o
        contacta al soporte si el problema persiste.
      </p>

      {process.env.NODE_ENV === "development" && (
        <details className='mb-6 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4'>
          <summary className='cursor-pointer font-medium text-red-900'>
            Detalles del error (solo en desarrollo)
          </summary>
          <pre className='mt-2 overflow-x-auto text-xs text-red-800'>
            {error.message}
          </pre>
        </details>
      )}

      <div className='flex gap-3'>
        <Button
          variant='outline'
          onClick={() => (window.location.href = "/panel")}
        >
          Ir al inicio
        </Button>
        <Button onClick={reset}>Intentar nuevamente</Button>
      </div>
    </div>
  );
}
