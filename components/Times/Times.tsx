"use client";
import React, { useState } from "react";
import { Clock, Users, Globe, Sparkles, GraduationCap } from "lucide-react";
import TimesCard from "./TimesCard";

const timesData = {
  Colegios: {
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-50 to-cyan-50",
    description: "Categorías para instituciones educativas",
    times: [
      { category: "INFANTIL SOLO", time: "1 MIN Y MEDIO MÁXIMO", type: "solo" },
      { category: "JUVENIL SOLO", time: "1 MIN Y MEDIO MÁXIMO", type: "solo" },
      { category: "INFANTIL DUO", time: "2 MIN MÁXIMO", type: "duo" },
      { category: "JUVENIL DUO", time: "2 MIN MÁXIMO", type: "duo" },
      { category: "INFANTIL GRUPOS", time: "4 MIN MÁXIMO", type: "grupo" },
      { category: "JUVENIL GRUPOS", time: "6 MIN MÁXIMO", type: "grupo" },
    ],
  },
  "General y Universidades": {
    icon: Users,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    description: "Categorías abiertas y universitarias",
    times: [
      { category: "INFANTIL SOLO", time: "1 MIN Y MEDIO MÁXIMO", type: "solo" },
      { category: "JUVENIL SOLO", time: "1 MIN Y MEDIO MÁXIMO", type: "solo" },
      { category: "ADULTO SOLO", time: "2 MIN MÁXIMO", type: "solo" },
      { category: "INFANTIL DUO", time: "2 MIN MÁXIMO", type: "duo" },
      { category: "JUVENIL DUO", time: "2 MIN Y MEDIO MÁXIMO", type: "duo" },
      { category: "ADULTO DUO", time: "3 MIN MÁXIMO", type: "duo" },
      { category: "INFANTIL GRUPOS", time: "4 MIN MÁXIMO", type: "grupo" },
      { category: "JUVENIL GRUPOS", time: "5 MIN MÁXIMO", type: "grupo" },
      { category: "ADULTO GRUPO", time: "6 MIN MÁXIMO", type: "grupo" },
    ],
  },
  "Folklore Étnico y de Raíz": {
    icon: Globe,
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50",
    description: "Categoría especial para tradiciones culturales",
    times: [{ category: "GRUPOS", time: "10 MIN MÁXIMO", type: "grupo" }],
  },
};

export default function Times() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const categories = Object.keys(timesData);

  return (
    <section className='py-20 lg:py-32 relative overflow-hidden'>
      {/* Fondo - Reemplazado purple/fuchsia por teal/cyan/yellow con fondo oscuro */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900' />
      <div className='absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-teal-900/20' />
      <div className='absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl' />
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl' />

      <div className='container relative z-10 px-6 lg:px-8 m-auto'>
        {/* Header - Reemplazado fuchsia por teal/cyan (#63f7df) */}
        <div className='text-center mb-16 lg:mb-20'>
          <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-8 border border-white/20'>
            <Clock size={20} className='text-cyan-300' />
            <span>Tiempos de Participación</span>
          </div>
          <h2 className='text-4xl lg:text-6xl font-bold text-white mb-6'>
            Cronometra Tu
            <span
              className='bg-clip-text text-transparent'
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #63f7df 0%, #fdf770 100%)",
              }}
            >
              {" "}
              Presentación
            </span>
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Conoce los tiempos máximos permitidos para cada categoría y
            modalidad.
          </p>
        </div>

        {/* 🔹 Scroll Snap Horizontal en móvil */}
        <div
          role='region'
          aria-label='Categorías de tiempo de participación'
          className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-6
                     sm:grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-6 lg:gap-10'
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className='flex-shrink-0 snap-start w-[85%] sm:w-auto'
            >
              <TimesCard
                title={category}
                data={timesData[category]}
                index={index}
                isActive={activeCard === index}
                onHover={(cardIndex) => setActiveCard(cardIndex)}
                onLeave={() => setActiveCard(null)}
              />
            </div>
          ))}
        </div>

        {/* Información adicional - Reemplazado fuchsia/purple por teal/cyan/yellow */}
        <div className='max-w-4xl mx-auto mt-16'>
          <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl'>
            <div className='text-center mb-8'>
              <div
                className='inline-flex items-center gap-2 p-3 rounded-2xl mb-4'
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99, 247, 223, 0.2) 0%, rgba(45, 212, 191, 0.2) 100%)",
                }}
              >
                <Sparkles size={24} className='text-cyan-300' />
              </div>
              <h3 className='text-2xl lg:text-3xl font-bold text-white mb-4'>
                Información Importante
              </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 text-sm sm:text-base'>
              <div>
                <h4 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-cyan-400 rounded-full'></span>
                  Consideraciones Generales
                </h4>
                <ul className='space-y-2'>
                  <li>
                    • Se permite una tolerancia de 10 segundos adicionales
                  </li>
                  <li>• El cronómetro inicia con la primera nota musical</li>
                </ul>
              </div>
              <div>
                <h4 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-yellow-400 rounded-full'></span>
                  Recomendaciones
                </h4>
                <ul className='space-y-2'>
                  <li>• Practica con cronómetro durante los ensayos</li>
                  <li>• Considera tiempo para cambios de vestuario</li>
                  <li>• Planifica transiciones fluidas entre secciones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
