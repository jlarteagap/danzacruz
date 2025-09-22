"use client";
import UserPanel from "@/components/UserPanel";
import { useSession } from "next-auth/react";
import { DataProvider } from "@/contexts/DataContext";

export default function InscripcionesPage() {
  const { data: session } = useSession();
  return (
    <main className='container mx-auto px-6 py-10 max-w-7xl'>
      <h1 className='text-3xl font-bold mb-6'>Inscripciones</h1>
      <p className='text-lg'>
        Bienvenido a la página de inscripciones para el Festival Internacional
        de danza "Danzacruz 2025". Aquí podrás registrarte para participar en
        las diversas actividades y eventos que ofrecemos.
      </p>
      {session?.user?.id && (
        <DataProvider userId={session.user.id}>
          <UserPanel user={session.user} />
        </DataProvider>
      )}
    </main>
  );
}
