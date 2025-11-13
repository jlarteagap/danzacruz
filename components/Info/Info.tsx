"use client";
import { useState } from "react";
import { categories, division, modalidad, subDivision } from "./Info.data";
import InfoSection from "./InfoSection";
import { Sparkles } from "lucide-react";
import Link from "next/link";

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
        {/* Fondo degradado - Reemplazado fuchsia/purple/pink por teal/cyan/yellow */}
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-50 via-teal-50 to-yellow-50' />
        <div className='absolute top-10 left-5 w-40 h-40 sm:w-72 sm:h-72 bg-cyan-200/20 rounded-full blur-3xl' />
        <div className='absolute bottom-10 right-5 w-52 h-52 sm:w-96 sm:h-96 bg-teal-200/20 rounded-full blur-3xl' />

        <div className='container relative z-10 px-5 sm:px-6 lg:px-8 mx-auto'>
          {/* Encabezado - Reemplazado fuchsia por teal (#63f7df) */}
          <div className='text-center mb-10 sm:mb-16 animate-fadeInUp'>
            <div className='inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-teal-100/50 text-teal-700 text-sm font-medium mb-4 sm:mb-6'>
              <Sparkles size={16} />
              Información del Festival
            </div>

            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-3'>
              Formas de{" "}
              <span
                className='bg-clip-text text-transparent'
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #63f7df 0%, #fdf770 100%)",
                }}
              >
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

          {/* CTA - Reemplazado slate por gradiente corporativo */}
          <div className='text-center mt-12 sm:mt-16'>
            <Link href='/registro'>
              <button
                className='inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full text-neutral-900 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-teal-400/50'
                style={{
                  background:
                    "linear-gradient(135deg, #63f7df 0%, #2dd4bf 100%)",
                }}
              >
                <span>¿Listo para participar?</span>
                <div className='w-2 h-2 bg-neutral-900 rounded-full animate-pulse' />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
