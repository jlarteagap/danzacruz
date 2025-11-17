import React, { useState } from "react";
import { Music, Heart, Sparkles, Globe, Zap, Crown } from "lucide-react";

// Datos expandidos con información detallada para cada modalidad
// ACTUALIZADO: Todos los colores fuchsia/purple/pink/violet reemplazados por teal/cyan/yellow
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
    color: "from-teal-500 to-cyan-600", // Era: pink-500 to rose-600
    bgColor: "from-teal-50 to-cyan-50", // Era: pink-50 to rose-50
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
    color: "from-cyan-500 to-teal-600", // Era: purple-500 to violet-600
    bgColor: "from-cyan-50 to-teal-50", // Era: purple-50 to violet-50
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
    color: "from-red-500 to-yellow-600", // Era: red-500 to pink-600
    bgColor: "from-red-50 to-yellow-50", // Era: red-50 to pink-50
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
    color: "from-blue-500 to-cyan-600", // Era: indigo-500 to purple-600
    bgColor: "from-blue-50 to-cyan-50", // Era: indigo-50 to purple-50
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
    color: "from-cyan-500 to-teal-600", // Era: violet-500 to fuchsia-600
    bgColor: "from-cyan-50 to-teal-50", // Era: violet-50 to fuchsia-50
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
    color: "from-teal-500 to-cyan-600", // Era: pink-500 to purple-600
    bgColor: "from-teal-50 to-cyan-50", // Era: pink-50 to purple-50
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
export default function ModalidadCard({
  modalidad,
  index,
  isActive,
  onHover,
  onLeave,
}) {
  const data = modalidadesData[modalidad];
  const IconComponent = data.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ease-out cursor-pointer group ${
        isActive
          ? `bg-gradient-to-br ${data.bgColor} shadow-2xl scale-105 border-2 border-white/50`
          : "bg-white/60 backdrop-blur-sm shadow-md hover:shadow-xl border border-white/20"
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${index * 50}ms`,
        minHeight: isActive ? "280px" : "120px",
      }}
    >
      {/* Gradiente de fondo animado */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? "opacity-20" : "group-hover:opacity-10"
        } bg-gradient-to-br ${data.color}`}
      />

      {/* Contenido principal */}
      <div className='relative p-6 lg:p-5'>
        {/* Header con icono y título - Reemplazado fuchsia por teal */}
        <div className='flex items-start gap-4 mb-4'>
          <div
            className={`p-3 rounded-xl transition-all duration-500 flex-shrink-0 ${
              isActive
                ? `bg-gradient-to-br ${data.color} shadow-lg`
                : "bg-teal-100 group-hover:bg-teal-200"
            }`}
          >
            <IconComponent
              size={24}
              className={`transition-colors duration-500 ${
                isActive ? "text-white" : "text-teal-600"
              }`}
            />
          </div>
          <div className='flex-1 min-w-0'>
            <h3
              className={`text-lg lg:text-xl font-bold transition-all duration-500 leading-tight ${
                isActive ? "text-gray-900" : "text-teal-800"
              }`}
            >
              {modalidad}
            </h3>
          </div>
        </div>

        {/* Lista expandida - solo visible cuando está activo */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className='pt-4 border-t border-gray-200/50'>
            <p className='text-sm text-gray-600 mb-4 font-medium'>
              Tipos de baile incluidos:
            </p>
            <div className='grid grid-cols-1 gap-2'>
              {data.tipos.map((tipo, tipoIndex) => (
                <div
                  key={tipoIndex}
                  className='flex items-center gap-3 p-2 rounded-lg bg-white/40 backdrop-blur-sm transform transition-all duration-300'
                  style={{
                    animationDelay: `${tipoIndex * 100 + 200}ms`,
                    transform: isActive ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${data.color} flex-shrink-0`}
                  />
                  <span className='text-sm font-medium text-gray-700'>
                    {tipo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de brillo */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${
          isActive ? "opacity-100" : ""
        } bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-full`}
        style={{
          animation: isActive ? "shimmer 2s infinite" : "none",
        }}
      />
    </div>
  );
}
