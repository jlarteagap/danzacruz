"use client";

import { MessageSquareShare, Calendar, MapPin, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      className='relative min-h-screen flex items-center justify-center overflow-hidden text-center'
      role='banner'
      aria-label='Sección principal de bienvenida a Danzacruz'
    >
      {/* Background - Reemplazado: indigo->cyan, purple->primary (#63f7df) */}
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/90 to-teal-50'
      >
        <div className='absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-200/30 rounded-full blur-2xl sm:blur-3xl animate-pulse'></div>
        {/* Reemplazado: purple-200 -> teal-200 (equivalente a #63f7df) */}
        <div className='absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-teal-200/30 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000'></div>
        {/* Reemplazado: purple-100, pink-100 -> cyan-100, yellow-100 */}
        <div className='hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-gradient-conic from-blue-100/20 via-cyan-100/20 to-yellow-100/20 rounded-full blur-3xl animate-spin [animation-duration:60s]'></div>
      </div>

      {/* Gradient overlay for readability */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-neutral-100/60 to-neutral-200/40 backdrop-blur-[2px]' />

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 sm:px-6 md:px-8'>
        {/* Badge */}
        <div className='inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 bg-white/70 backdrop-blur-sm border border-white/80 rounded-full shadow-sm'>
          <Star className='w-4 h-4 text-amber-500' aria-hidden='true' />
          <span className='text-xs sm:text-sm font-medium text-neutral-700'>
            25 años de tradición
          </span>
        </div>

        {/* Title */}
        <h1 className='text-4xl sm:text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-600 bg-clip-text tracking-tight leading-tight md:leading-none text-balance mb-4'>
          DANZACRUZ
        </h1>

        {/* Subtitle */}
        <p className='text-base sm:text-xl md:text-2xl text-neutral-600 mb-10 sm:mb-12 font-medium leading-relaxed max-w-xl sm:max-w-2xl mx-auto text-balance'>
          25 años proyectando Bolivia al mundo
        </p>

        {/* Date and Location - Reemplazado purple-600 -> teal-600 */}
        <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-5 py-3 mb-10 sm:mb-12 bg-white/50 backdrop-blur-sm border border-white/70 rounded-2xl shadow-lg text-neutral-800'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-5 h-5 text-teal-500' aria-hidden='true' />
            <span className='text-sm sm:text-lg font-semibold uppercase tracking-wide'>
              6 - 9 de Noviembre 2025
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {/* Reemplazado: purple-600 -> teal-600 (#63f7df range) */}
            <MapPin className='w-5 h-5 text-teal-600' aria-hidden='true' />
            <span className='text-sm sm:text-lg font-medium'>
              Santa Cruz, Bolivia
            </span>
          </div>
        </div>

        {/* WhatsApp Buttons - Rediseñados con paleta corporativa */}
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center pb-16 sm:pb-20'>
          {[
            { number: "62831956", link: "http://wa.me/59162831956" },
            { number: "75553576", link: "http://wa.me/59175553576" },
          ].map(({ number, link }) => (
            <a
              key={number}
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Contactar por WhatsApp al ${number}`}
              className='group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-neutral-900 font-bold rounded-full shadow-lg shadow-teal-400/30 hover:shadow-xl hover:shadow-teal-400/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out min-w-[180px] sm:min-w-[200px] justify-center border border-teal-300/50'
              style={{
                background: "linear-gradient(135deg, #63f7df 0%, #2dd4bf 100%)",
              }}
            >
              <div className='p-1 bg-neutral-900/10 rounded-lg group-hover:bg-neutral-900/20 transition-colors'>
                <MessageSquareShare className='w-4 h-4 sm:w-5 sm:h-5' />
              </div>
              <span className='tracking-wide'>{number}</span>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className='mt-10 sm:mt-20 relative'>
          <div
            className='absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce'
            aria-hidden='true'
          >
            <div className='w-5 sm:w-6 h-8 sm:h-10 border-2 border-neutral-400 rounded-full flex justify-center items-start'>
              <div className='w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
