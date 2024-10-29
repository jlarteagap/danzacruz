import { Clock10 } from 'lucide-react'
import {
  TimeFolklorelData,
  TimeGeneralData,
  TimeSchoolData
} from './Times.data'
import { Separator } from '@/components/ui/separator'

export default function Times() {
  return (
    <section className="bg-fuchsia-950 text-fuchsia-200 py-10">
      <div className="container flex flex-col justify-center items-center md:flex-row">
        <Clock10 strokeWidth={3} className="mb-5 md:mr-5" />
        <h2 className="text-4xl uppercase font-semibold text-center md:text-left">
          Tiempos de Participacion
        </h2>
      </div>
      <div className="flex gap-5 md:w-[700px] m-auto container my-10 justify-center items-center flex-col md:flex-row">
        <h3 className="text-3xl font-semibold uppercase md:w-1/2">Colegios</h3>
        <div>
          {TimeSchoolData.map((time, i) => {
            return (
              <div key={i} className="mb-3">
                <h4 className="text-xl font-semibold ">{time.category}</h4>
                <p className="text-slate-300">{time.time}</p>
              </div>
            )
          })}
        </div>
      </div>
      <Separator className="md:w-[700px] m-auto" />
      <div className="flex gap-5 md:w-[700px] m-auto container my-10 justify-center items-center flex-col md:flex-row">
        <h3 className="text-3xl font-semibold uppercase md:w-1/2">
          General y universidades
        </h3>
        <div>
          {TimeGeneralData.map(time => {
            return (
              <div key={time.time} className="mb-3">
                <h4 className="text-xl font-semibold ">{time.category}</h4>
                <p className="text-slate-300">{time.time}</p>
              </div>
            )
          })}
        </div>
      </div>
      <Separator className="md:w-[700px] m-auto" />
      <div className="flex gap-5 md:w-[700px] m-auto container my-10 justify-center items-center flex-col md:flex-row">
        <h3 className="text-3xl font-semibold uppercase md:w-1/2">
          FOLKLORE ÉTNICO Y DE RAÍZ
        </h3>
        <div>
          {TimeFolklorelData.map(time => {
            return (
              <div key={time.time} className="mb-3">
                <h4 className="text-xl font-semibold ">{time.category}</h4>
                <p className="text-slate-300">{time.time}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
