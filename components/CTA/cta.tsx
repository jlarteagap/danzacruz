import { ArrowUpRight, FileDown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative container mx-auto px-6 py-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Text Content */}
            <div className='text-center lg:text-left space-y-6'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/30 rounded-full'>
                <Sparkles className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium text-blue-700'>
                  Festival Danzacruz 2025
                </span>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg text-neutral-600 font-medium leading-relaxed'>
                  4 días de talleres, competencias y exhibiciones
                </h3>
                <h2 className='text-4xl md:text-5xl font-bold text-neutral-900 leading-tight tracking-tight'>
                  ¡Inscríbete{" "}
                  <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    TÚ
                  </span>{" "}
                  con tu grupo o como solista!
                </h2>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>

              <Link
                href='/registro'
                className='group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-800 text-white font-semibold rounded-2xl shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/40 hover:-translate-y-1 transition-all duration-300 ease-out'
              >
                <span className='relative flex items-center gap-2'>
                  Registrarse
                  <ArrowUpRight className='w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
                </span>
              </Link>


              </div> */}
            <Link
              href='/pdf/danzacruz-2025.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='group relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-neutral-700 font-semibold border border-neutral-200/60 rounded-2xl shadow-sm hover:bg-white hover:border-neutral-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out'>
                <span className='relative flex items-center gap-2'>
                  <FileDown className='w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300' />
                  Convocatoria
                </span>
              </button>
            </Link>
          </div>

          {/* Stats or Features */}
          <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60'>
              <div className='text-3xl font-bold text-neutral-900 mb-2'>25</div>
              <div className='text-sm text-neutral-600'>
                Años de experiencia
              </div>
            </div>
            <div className='text-center p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60'>
              <div className='text-3xl font-bold text-neutral-900 mb-2'>4</div>
              <div className='text-sm text-neutral-600'>Días de festival</div>
            </div>
            <div className='text-center p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60'>
              <div className='text-3xl font-bold text-neutral-900 mb-2'>∞</div>
              <div className='text-sm text-neutral-600'>Momentos únicos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
