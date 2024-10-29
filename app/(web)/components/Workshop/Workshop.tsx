import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function WorkshopSection() {
  return (
    <section className="py-10 bg-black text-fuchsia-100">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-2xl">Nicolas Blanzari</div>
        <h3 className="text-4xl font-semibold">Workshop</h3>
        <p className="">BiCampeon Mundial HHI con CBAction</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center my-5 md:w-[980px] mx-auto gap-5">
        <div>
          <Image
            src="/img/jurado/nicolas_blanzari.jpg"
            alt="Nicolas Blanzari"
            width="600"
            height="900"
          />
        </div>
        <div className="w-full md:w-[300px] text-xl">
          <div className="text-center">
            <div className="font-semibold uppercase">Sábado</div>
            <div>
              09 <span className="text-amber-400">|</span> Nov
              <span className="text-amber-400">|</span> 2024
            </div>
            <div>15:00 a 17:00 hrs.</div>
          </div>
          <div className="bg-fuchsia-900 text-white rounded-sm my-5 p-3">
            <p className="text-amber-400 font-semibold text-center">
              Hasta el <span className="text-white text-xl">31</span> de octubre
            </p>
            <p className="font-bold text-3xl bg-white text-pink-900 text-center p-3">
              300 Bs.
            </p>
            <p className="text-amber-400 font-semibold text-center">
              Del <span className="text-white text-xl">01</span> de Nov al{' '}
              <span className="text-white text-xl">08</span> de Nov
            </p>
            <p className="font-bold text-3xl bg-white text-pink-900 text-center p-3">
              350 Bs.
            </p>
            <p className="text-amber-400 font-semibold text-center">
              Día <span className="text-white text-xl">09</span> de Noviembre
            </p>
            <p className="font-bold text-3xl bg-white text-pink-900 text-center p-3">
              400 Bs.
            </p>
          </div>
          <Button className="bg-fuchsia-900">
            <Link href="/registro/workshops">Registrarse al taller</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h4 className="text-3xl font-semibold text-amber-400 [text-shadow:_0_2px_4px_rgb(190_144_44_/_0.8)] md:text-2xl leading-snug font-manrope">
          Ritmos Urbanos
        </h4>
        <p>Incluye Certificado y Conversario</p>
      </div>
    </section>
  )
}
