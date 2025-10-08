"use client";
import React, { useState } from "react";
import { Music, Heart, Sparkles, Globe, Zap, Crown } from "lucide-react";
import ModalidadCard from "./ModalidadCard";

// Datos expandidos con información detallada para cada modalidad
const modalidadesData = {
  "BALLET CLÁSICO": {
    tipos: [
      "Variaciones clásicas",
      "Pas de deux",
      "Corps de ballet",
      "Técnica en barra",
      "Centro clásico",
    ],
    icon: Crown,
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
  },
  "BALLET NEO - CLÁSICO": {
    tipos: [
      "Ballet moderno",
      "Fusión contemporánea",
      "Técnica mixta",
      "Interpretación libre",
      "Coreografía innovadora",
    ],
    icon: Sparkles,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
  },
  "DANZA MODERNA Y CONTEMPORANEA": {
    tipos: [
      "Graham",
      "Limón",
      "Release",
      "Contact improvisation",
      "Floor work",
      "Expresión corporal",
    ],
    icon: Heart,
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-50 to-cyan-50",
  },
  JAZZ: {
    tipos: [
      "Jazz clásico",
      "Jazz funk",
      "Jazz lírico",
      "Broadway jazz",
      "Jazz comercial",
    ],
    icon: Music,
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50",
  },
  MUSICAL: {
    tipos: [
      "Teatro musical",
      "Comedia musical",
      "Drama musical",
      "Actuación cantada",
      "Performance integral",
    ],
    icon: Sparkles,
    color: "from-red-500 to-pink-600",
    bgColor: "from-red-50 to-pink-50",
  },
  "TAP DANCE": {
    tipos: [
      "Broadway tap",
      "Rhythm tap",
      "Irish tap",
      "Soft shoe",
      "Hard shoe",
    ],
    icon: Zap,
    color: "from-gray-600 to-slate-700",
    bgColor: "from-gray-50 to-slate-50",
  },
  "STREET DANCE": {
    tipos: [
      "Hip Hop",
      "Breaking",
      "Popping",
      "Locking",
      "House",
      "Krump",
      "Waacking",
    ],
    icon: Zap,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
  },
  "BAILES TROPICALES Y DE SALÓN": {
    tipos: [
      "Salsa",
      "Bachata",
      "Merengue",
      "Cha cha cha",
      "Rumba",
      "Tango",
      "Vals",
      "Foxtrot",
    ],
    icon: Heart,
    color: "from-yellow-500 to-orange-600",
    bgColor: "from-yellow-50 to-orange-50",
  },
  "FOLKLORE ETNICO Y DE RAIZ": {
    tipos: [
      "Danzas africanas",
      "Danzas asiáticas",
      "Danzas indígenas",
      "Rituales ancestrales",
      "Tradición oral",
    ],
    icon: Globe,
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
  },
  "FOLKLORE NACIONAL E INTERNACIONAL": {
    tipos: [
      "Folklore argentino",
      "Flamenco",
      "Danzas europeas",
      "Tradiciones americanas",
      "Bailes regionales",
    ],
    icon: Globe,
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-50 to-purple-50",
  },
  "FOLKLORE NACIONAL E INTERNACIONAL DEPROYECCIÓN": {
    tipos: [
      "Proyección folklórica",
      "Estilización moderna",
      "Fusión cultural",
      "Interpretación escénica",
      "Puesta en valor",
    ],
    icon: Sparkles,
    color: "from-violet-500 to-fuchsia-600",
    bgColor: "from-violet-50 to-fuchsia-50",
  },
  "DANZAS POPULARES": {
    tipos: [
      "Danzas urbanas",
      "Bailes sociales",
      "Tendencias actuales",
      "Cultura popular",
      "Movimientos masivos",
    ],
    icon: Heart,
    color: "from-lime-500 to-green-600",
    bgColor: "from-lime-50 to-green-50",
  },
  "K-POP": {
    tipos: [
      "Coreografías K-pop",
      "Estilo coreano",
      "Sincronización grupal",
      "Performance idol",
      "Cover dance",
    ],
    icon: Sparkles,
    color: "from-pink-500 to-purple-600",
    bgColor: "from-pink-50 to-purple-50",
  },
  "RETRO - DANCE": {
    tipos: [
      "Danzas de los 80s",
      "Disco",
      "Funk retro",
      "New wave",
      "Clásicos del baile",
      "Nostalgia musical",
    ],
    icon: Music,
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-50 to-blue-50",
  },
};

const modalidades = Object.keys(modalidadesData);

export default function Modalidad() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section className='py-16 md:py-24 relative overflow-hidden'>
        {/* Fondo decorativo */}
        <div className='absolute inset-0 bg-gradient-to-tr from-fuchsia-50 via-purple-50/50 to-pink-50' />
        <div className='absolute inset-0 bg-gradient-to-bl from-transparent via-fuchsia-100/20 to-purple-100/30' />

        {/* Elementos decorativos suaves */}
        <div className='absolute top-20 right-10 w-40 h-40 md:w-64 md:h-64 bg-fuchsia-200/20 rounded-full blur-3xl' />
        <div className='absolute bottom-20 left-10 w-56 h-56 md:w-80 md:h-80 bg-purple-200/20 rounded-full blur-3xl' />

        <div className='container relative z-10 px-4 sm:px-6 lg:px-8 m-auto'>
          {/* Header */}
          <div className='text-center mb-12 md:mb-16'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-100/50 text-fuchsia-700 text-xs sm:text-sm font-medium mb-4'>
              <Music size={16} />
              Modalidades de Danza
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3'>
              Explora Nuestras
              <span className='bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>
                {" "}
                Modalidades
              </span>
            </h2>
            <p className='text-base sm:text-lg text-gray-600 max-w-xl mx-auto'>
              Desliza o toca cada tarjeta para descubrir los diferentes estilos
              de baile incluidos
            </p>
          </div>

          {/* Scroll horizontal en móvil */}
          <div
            role='region'
            aria-label='Modalidades de danza'
            className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6'
          >
            {modalidades.map((modalidad, index) => (
              <div
                key={index}
                className='min-w-[85%] sm:min-w-0 snap-center flex-shrink-0'
              >
                <ModalidadCard
                  modalidad={modalidad}
                  index={index}
                  isActive={activeCard === index}
                  onHover={() => setActiveCard(index)}
                  onLeave={() => setActiveCard(null)}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className='text-center mt-16'>
            <div className='max-w-3xl mx-auto p-6 sm:p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/20'>
              <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4'>
                ¿No encuentras tu estilo?
              </h3>
              <p className='text-gray-600 mb-6 text-sm sm:text-base'>
                Nuestro festival celebra la diversidad del movimiento. Si tu
                modalidad no está listada, contáctanos para incluirla en las
                categorías especiales.
              </p>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://wa.me/59175553576'
                className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
              >
                <span>Contáctanos</span>
                <div className='w-2 h-2 bg-white/80 rounded-full animate-pulse' />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
