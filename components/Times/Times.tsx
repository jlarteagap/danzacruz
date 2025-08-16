"use client";
import React, { useState } from "react";
import {
  Clock,
  Clock10,
  GraduationCap,
  Users,
  Globe,
  Timer,
  Sparkles,
} from "lucide-react";

// Datos organizados con información adicional
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
import { Separator } from "@/components/ui/separator";
import TimesCard from "./TimesCard";

export default function Times() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const categories = Object.keys(timesData);

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <section className='py-20 lg:py-32 relative overflow-hidden'>
        {/* Fondo elegante */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' />
        <div className='absolute inset-0 bg-gradient-to-tr from-fuchsia-900/20 via-transparent to-purple-900/20' />

        {/* Elementos decorativos */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl float-animation' />
        <div
          className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float-animation'
          style={{ animationDelay: "1s" }}
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-fuchsia-500/5 to-transparent rounded-full' />

        <div className='container relative z-10 px-6 lg:px-8 m-auto'>
          {/* Header */}
          <div className='text-center mb-16 lg:mb-20'>
            <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-8 border border-white/20'>
              <Clock size={20} className='text-fuchsia-300' />
              <span>Tiempos de Participación</span>
            </div>
            <h2 className='text-4xl lg:text-6xl font-bold text-white mb-6'>
              Cronometra Tu
              <span className='bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent'>
                {" "}
                Presentación
              </span>
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
              Conoce los tiempos máximos permitidos para cada categoría y
              modalidad. Planifica tu coreografía dentro de estos límites para
              una participación exitosa.
            </p>
          </div>

          {/* Grid de categorías */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-16'>
            {categories.map((category, index) => (
              <TimesCard
                key={index}
                title={category}
                data={timesData[category]}
                index={index}
                isActive={activeCard === index}
                onHover={(cardIndex) => setActiveCard(cardIndex)}
                onLeave={() => setActiveCard(null)}
              />
            ))}
          </div>

          {/* Información adicional */}
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl'>
              <div className='text-center mb-8'>
                <div className='inline-flex items-center gap-2 p-3 bg-fuchsia-500/20 rounded-2xl mb-4'>
                  <Sparkles size={24} className='text-fuchsia-300' />
                </div>
                <h3 className='text-2xl lg:text-3xl font-bold text-white mb-4'>
                  Información Importante
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300'>
                <div>
                  <h4 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                    <span className='w-2 h-2 bg-fuchsia-400 rounded-full'></span>
                    Consideraciones Generales
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li>
                      • Los tiempos incluyen entrada y salida del escenario
                    </li>
                    <li>
                      • Se permite una tolerancia de 5 segundos adicionales
                    </li>
                    <li>• El cronómetro inicia con la primera nota musical</li>
                  </ul>
                </div>
                <div>
                  <h4 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                    <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                    Recomendaciones
                  </h4>
                  <ul className='space-y-2 text-sm'>
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
    </>
  );
}
