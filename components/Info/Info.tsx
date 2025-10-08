"use client";
import { useState } from "react";
import { categories, division, modalidad, subDivision } from "./Info.data";
import InfoSection from "./InfoSection";
import { Sparkles } from "lucide-react";
import { login } from "@/lib/actions/auth";

export default function InfoData() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const data = [
    { title: "Forma de Participación", lists: modalidad },
    { title: "Categorías", lists: categories },
    { title: "División", lists: division },
    { title: "Sub División", lists: subDivision },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Esconde la barra de scroll para una experiencia más limpia */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section className='relative overflow-hidden py-16 sm:py-20'>
        {/* Fondo degradado */}
        <div className='absolute inset-0 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-50' />
        <div className='absolute top-10 left-5 w-40 h-40 sm:w-72 sm:h-72 bg-fuchsia-200/20 rounded-full blur-3xl' />
        <div className='absolute bottom-10 right-5 w-52 h-52 sm:w-96 sm:h-96 bg-purple-200/20 rounded-full blur-3xl' />

        <div className='container relative z-10 px-5 sm:px-6 lg:px-8 mx-auto'>
          {/* Encabezado */}
          <div className='text-center mb-10 sm:mb-16 animate-fadeInUp'>
            <div className='inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-fuchsia-100/50 text-fuchsia-700 text-sm font-medium mb-4 sm:mb-6'>
              <Sparkles size={16} />
              Información del Festival
            </div>

            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-3'>
              Formas de{" "}
              <span className='bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>
                Participación
              </span>
            </h2>

            <p className='text-base sm:text-lg text-gray-600 max-w-md sm:max-w-2xl mx-auto leading-relaxed'>
              Descubre todas las categorías y modalidades disponibles para
              formar parte de nuestro festival
            </p>
          </div>

          {/* Carrusel móvil */}
          <div className='relative'>
            {/* Gradientes laterales */}
            <div className='absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none sm:hidden' />
            <div className='absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none sm:hidden' />

            {/* Contenedor scrollable */}
            <div
              role='region'
              aria-label='Información de categorías del festival'
              className={`
    flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 
    overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4
    scroll-smooth
  `}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  className='min-w-[85%] sm:min-w-0 snap-center flex-shrink-0'
                >
                  <InfoSection
                    list={item.lists}
                    title={item.title}
                    index={index}
                    isActive={activeCard === index}
                    onHover={() => setActiveCard(index)}
                    onLeave={() => setActiveCard(null)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className='text-center mt-12 sm:mt-16'>
            <button
              onClick={() => login()}
              className='inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
            >
              <span>¿Listo para participar?</span>
              <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
