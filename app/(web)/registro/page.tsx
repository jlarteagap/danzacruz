import AddParticipant from "@/components/AddParticipant/AddParticipant";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro Festival Internacional de Danza",
  description:
    "Registre su participación en el festival más importante del país",
};

export default function RegisterPage() {
  return (
    <main className='container py-10 m-auto' role='main'>
      <header className='text-center mb-6'>
        <h1 className='text-4xl uppercase font-bold'>Registro</h1>
      </header>

      <section className='max-w-3xl mx-auto text-center mb-10'>
        <p className='text-lg leading-relaxed text-gray-700'>
          Forma parte de una celebración única donde el arte y la cultura se
          funden en un espectáculo vibrante de energía, talento y pasión por la
          danza.
        </p>
      </section>

      <section className='max-w-2xl mx-auto'>
        <AddParticipant />
      </section>
    </main>
  );
}
