// app/dashboard/coreografias/nuevo/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { ChoreographyRegistrationForm } from "@/components/forms/choreography-registration";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Registro de Participantes | Danzacruz 2025",
  description:
    "Registra participantes y coreografías para el festival de danza",
};

export default function NewChoreographyPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <section aria-labelledby='choreography-form'>
        <ChoreographyRegistrationForm />
      </section>
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-50 flex items-center justify-center'>
      <div
        className='flex flex-col items-center gap-4'
        aria-label='Cargando formulario'
      >
        <Loader2 className='h-12 w-12 animate-spin text-brand-teal' />
        <p className='text-lg font-medium text-apple-gray-900'>
          Cargando formulario...
        </p>
      </div>
    </div>
  );
}
