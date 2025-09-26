import AddParticipant from "@/components/AddParticipant/AddParticipant";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página de Registro",
  description:
    "Registre su participación en el festival más importante del país",
};

export default function Workshops() {
  return (
    <section className='container py-10 m-auto'>
      <div className='text-center'>
        <h2 className='text-4xl uppercase font-semibold'>Registro</h2>
      </div>
      <div className='my-5'>
        <p className='text-center'>
          Forma parte de una celebración única donde el arte y la cultura se
          funden en un espectáculo vibrante de energía, talento y pasión por la
          danza. El Festival Internacional de Danza es más que un evento; es una
          experiencia que transforma vidas y crea conexiones duraderas.
        </p>
        <div className='my-10 w-[650px] m-auto'>
          <AddParticipant />
        </div>
      </div>
    </section>
  );
}
