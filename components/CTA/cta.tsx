"use client";

import { ArrowUpRight, FileDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";

export default function Cta() {
  return (
    <section
      className='relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50'
      role='region'
      aria-label='Llamado a la acción para inscripciones al Festival Danzacruz 2025'
    >
      {/* Background Elements */}
      <div aria-hidden='true' className='absolute inset-0'>
        <div className='absolute top-0 left-1/4 w-56 sm:w-80 md:w-96 h-56 sm:h-80 md:h-96 bg-blue-200/20 rounded-full blur-2xl md:blur-3xl'></div>
        <div className='absolute bottom-0 right-1/4 w-56 sm:w-80 md:w-96 h-56 sm:h-80 md:h-96 bg-purple-200/20 rounded-full blur-2xl md:blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative container mx-auto px-4 sm:px-6 py-16 sm:py-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            {/* Text Content */}
            <div className='text-center lg:text-left space-y-4 sm:space-y-6'>
              <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/30 rounded-full'>
                <Sparkles
                  className='w-4 h-4 text-blue-600'
                  aria-hidden='true'
                />
                <span className='text-xs sm:text-sm font-medium text-blue-700'>
                  Festival Danzacruz 2025
                </span>
              </div>

              <div className='space-y-3 sm:space-y-4'>
                <h3 className='text-base sm:text-lg text-neutral-600 font-medium leading-relaxed'>
                  4 días de talleres, competencias y exhibiciones
                </h3>
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-tight tracking-tight'>
                  ¡Inscríbete{" "}
                  <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    tú
                  </span>{" "}
                  con tu grupo o como solista!
                </h2>
              </div>

              {/* Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start pt-4 sm:pt-6'>
                <button
                  onClick={login}
                  className='group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-semibold rounded-2xl shadow-md shadow-slate-500/25 hover:shadow-lg hover:shadow-slate-500/40 hover:-translate-y-1 transition-all duration-300 ease-out'
                  aria-label='Ir al formulario de registro del Festival Danzacruz 2025'
                >
                  <span className='flex items-center gap-2'>
                    Registrarse
                    <ArrowUpRight className='w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
                  </span>
                </button>

                <Link
                  href='/pdf/danzacruz-2025.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Descargar convocatoria oficial del Festival Danzacruz 2025 en formato PDF'
                >
                  <button className='group inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-neutral-700 font-semibold border border-neutral-200/60 rounded-2xl shadow-sm hover:bg-white hover:border-neutral-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out'>
                    <FileDown className='w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300' />
                    <span>Convocatoria</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Decorative or Secondary Visual */}
            <div className='hidden lg:block'>
              {/* Aquí se podría colocar una ilustración o imagen representativa */}
            </div>
          </div>

          {/* Stats or Features */}
          <div className='mt-12 sm:mt-16 grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-8 text-center'>
            {[
              { value: "25", label: "Años de experiencia" },
              { value: "4", label: "Días de festival" },
              { value: "∞", label: "Momentos únicos" },
            ].map((item) => (
              <div
                key={item.label}
                className='p-4 sm:p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60'
              >
                <div className='text-2xl sm:text-3xl font-bold text-neutral-900 mb-1 sm:mb-2'>
                  {item.value}
                </div>
                <div className='text-xs sm:text-sm text-neutral-600'>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
