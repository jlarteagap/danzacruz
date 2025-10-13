"use client";
import React, { useState } from "react";
import {
  Award,
  Trophy,
  Medal,
  Star,
  Gift,
  Sparkles,
  Crown,
  Ticket,
  DollarSign,
} from "lucide-react";

import PodiumCard from "./PodiumCard";
import CategoryCard from "./CategoryCard";

// Datos organizados con información visual mejorada
const awardsData = [
  {
    place: "1er Lugar",
    trophy: "Trofeo",
    certificade: "Certificado",
    icon: Crown,
    color: "from-yellow-400 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50",
    shadow: "shadow-yellow-200/50",
  },
  {
    place: "2do Lugar",
    trophy: "Medalla",
    certificade: "Certificado",
    icon: Medal,
    color: "from-gray-400 to-slate-500",
    bgColor: "from-gray-50 to-slate-50",
    shadow: "shadow-gray-200/50",
  },
  {
    place: "3er Lugar",
    trophy: "Medalla",
    certificade: "Certificado",
    icon: Award,
    color: "from-amber-600 to-orange-600",
    bgColor: "from-amber-50 to-orange-50",
    shadow: "shadow-amber-200/50",
  },
];

// ACTUALIZADO: Reemplazados colores pink/purple/indigo por teal/cyan/yellow
const awardsCategory = [
  {
    category: "GANADOR ABSOLUTO SOLISTA",
    award: "Pase directo y gratuito a Danzacruz 2026",
    plus: ["15 entradas de ingreso al evento", "400 Bs.- en efectivo"],
    obs: "(el premio en efectivo será válido en caso de 15 participantes como mínimo)",
    value: "valor del premio 775 Bs.",
    icon: Star,
    color: "from-teal-500 to-cyan-600", // Era: pink-500 to rose-600
  },
  {
    category: "GANADOR ABSOLUTO DUO",
    award: "Pase directo y gratuito a Danzacruz 2026",
    plus: ["20 entradas de ingreso al evento", "600 Bs.- en efectivo"],
    obs: "(el premio en efectivo será válido en caso de 10 duos como mínimo)",
    value: "valor del premio 1100 Bs.",
    icon: Trophy,
    color: "from-cyan-500 to-teal-600", // Era: purple-500 to violet-600
  },
  {
    category: "GANADOR ABSOLUTO TRIOS",
    award: "Pase directo y gratuito a Danzacruz 2026",
    plus: ["30 entradas de ingreso al evento", "800 Bs.- en efectivo"],
    obs: "(el premio en efectivo será válido en caso de 15 participantes como mínimo)",
    value: "valor del premio 1550 Bs.",
    icon: Award,
    color: "from-blue-500 to-cyan-600",
  },
  {
    category: "GANADOR ABSOLUTO GRUPO CHICO",
    award: "Pase directo y gratuito a Danzacruz 2026",
    plus: ["40 entradas de ingreso al evento", "1400 Bs.- en efectivo"],
    obs: "(el premio en efectivo será válido en caso de 15 participantes como mínimo)",
    value: "valor del premio 2400 Bs.",
    icon: Gift,
    color: "from-green-500 to-emerald-600",
  },
  {
    category: "GANADOR ABSOLUTO GRUPO GRANDE CATEGORIA GENERAL",
    award: "Pase directo y gratuito a Danzacruz 2026",
    plus: ["50 entradas de ingreso al evento", "3300 Bs.- en efectivo"],
    obs: "(el premio en efectivo será válido en caso de 15 participantes como mínimo)",
    value: "valor del premio 4505 Bs.",
    icon: Crown,
    color: "from-orange-500 to-red-600",
  },
  {
    category: "GANADOR ABSOLUTO COLEGIOS",
    award: "Premio especial para instituciones educativas",
    plus: ["5000 Bs.- en efectivo"],
    obs: "(el premio en efectivo será válido en caso de 15 participantes como mínimo)",
    value: "valor del premio 5000 Bs.",
    icon: Trophy,
    color: "from-blue-500 to-cyan-600", // Era: indigo-500 to purple-600
  },
];

const awardsEspecial = [
  { name: "Mejor Bailarín", icon: "👨‍🎭" },
  { name: "Mejor Bailarina", icon: "👩‍🎭" },
  { name: "Mejor Coreografía", icon: "🎨" },
  { name: "Mejor Vestuario", icon: "👗" },
  { name: "Mejor Producción", icon: "🎬" },
  { name: "Mejor Compaginación de Video", icon: "📹" },
  { name: "Premio Sorpresa a la Mejor Barra de la Noche", icon: "🎉" },
];

export default function Awards() {
  const [activePodium, setActivePodium] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

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
            transform: translateY(-5px);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .float {
          animation: float 3s ease-in-out infinite;
        }
        .twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>

      <section className='py-20 lg:py-32 relative overflow-hidden m-auto'>
        {/* Fondo elegante - Reemplazado purple/fuchsia por teal/cyan */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900' />
        <div className='absolute inset-0 bg-gradient-to-tr from-yellow-900/20 via-transparent to-teal-900/20' />

        {/* Elementos decorativos - Reemplazado purple por teal */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl float' />
        <div
          className='absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl float'
          style={{ animationDelay: "1s" }}
        />
        <div className='absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full twinkle' />
        <div
          className='absolute top-3/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full twinkle'
          style={{ animationDelay: "1s" }}
        />
        <div className='container relative z-10 px-6 lg:px-8 m-auto'>
          {/* Header */}
          <div className='text-center mb-16 lg:mb-20'>
            <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-500/10 backdrop-blur-md text-yellow-200 text-sm font-medium mb-8 border border-yellow-500/20'>
              <Award size={20} className='text-yellow-400' />
              <span>Sistema de Premiación</span>
            </div>
            <h2 className='text-4xl lg:text-6xl font-bold text-white mb-6'>
              Reconocimientos y
              <span className='bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent'>
                {" "}
                Premios
              </span>
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
              Celebramos el talento y la dedicación con un sistema de premiación
              completo que reconoce la excelencia en todas las categorías.
            </p>
          </div>
          {/* Podium - Lugares principales */}
          <div className='mb-20'>
            <h3 className='text-2xl lg:text-3xl font-bold text-white text-center mb-12'>
              🏆 Podium de Honor
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              {awardsData.map((award, index) => (
                <PodiumCard
                  key={index}
                  award={award}
                  index={index}
                  isActive={activePodium === index}
                  onHover={(cardIndex) => setActivePodium(cardIndex)}
                  onLeave={() => setActivePodium(null)}
                />
              ))}
            </div>
          </div>

          {/* Categorías especiales */}
          <div className='mb-20'>
            <h3 className='text-2xl lg:text-3xl font-bold text-white text-center mb-12'>
              👑 Ganadores Absolutos
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {awardsCategory.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  index={index}
                  isActive={activeCategory === index}
                  onHover={(cardIndex) => setActiveCategory(cardIndex)}
                  onLeave={() => setActiveCategory(null)}
                />
              ))}
            </div>
          </div>

          {/* Premios Especiales - Reemplazado fuchsia/purple por teal/cyan */}
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl'>
              <div className='text-center mb-8'>
                <div
                  className='inline-flex items-center gap-2 p-4 rounded-2xl mb-6'
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99, 247, 223, 0.2) 0%, rgba(45, 212, 191, 0.2) 100%)",
                  }}
                >
                  <Sparkles size={28} className='text-cyan-300' />
                </div>
                <h3 className='text-2xl lg:text-3xl font-bold text-white mb-4'>
                  🌟 Premios Especiales
                </h3>
                <p className='text-gray-300'>
                  Reconocimientos adicionales para destacar la excelencia en
                  diferentes aspectos
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {awardsEspecial.map((award, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group'
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className='text-3xl group-hover:scale-110 transition-transform duration-300'>
                      {award.icon}
                    </div>
                    <div>
                      <h4 className='text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-300'>
                        {award.name}
                      </h4>
                      <p className='text-gray-400 text-sm'>
                        Reconocimiento especial
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
