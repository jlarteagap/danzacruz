import AddParticipant from '@/components/AddParticipant/AddParticipant'

export default function Workshops() {
  return (
    <section className="container py-10">
      <div className="text-center">
        <h2 className="text-4xl uppercase font-semibold">Registro</h2>
      </div>
      <div className="my-5 text-center">
        <p>
          Forma parte de una celebración única donde el arte y la cultura se
          funden en un espectáculo vibrante de energía, talento y pasión por la
          danza. El Festival Internacional de Danza es más que un evento; es una
          experiencia que transforma vidas y crea conexiones duraderas.
        </p>
        <AddParticipant />
      </div>
    </section>
  )
}
