import { Button } from '@/components/ui/button'
import { FileDown, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Cta() {
  return (
    <section className="bg-slate-200">
      <div className="flex justify-center items-center gap-7 py-10 flex-col md:h-[200px] md:flex-row">
        <div className="text-center md:text-left">
          <h3 className="mb-4">
            3 días de talleres, competencias y exhibiciones
          </h3>
          <p className="text-3xl font-semibold uppercase">
            ¡inscríbete TÚ CON TU GRUPO O COMO SOLISTA!
          </p>
        </div>
        <div className="flex gap-3 ">
          <Button variant="outline" asChild>
            <Link href="/pdf/dc-2024.pdf" target="_blank">
              <FileDown className="mr-2" />
              Convocatoria
            </Link>
          </Button>
          <Button asChild>
            <Link href={'/registro'} className="flex">
              <ArrowUpRight className="w-5 h-5 mr-2" />
              Registrarse
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
