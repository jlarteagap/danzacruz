"use client";
import { useState } from "react";
import { categories, division, modalidad, subDivision } from "./Info.data";
import InfoSection from "./InfoSection";
import { Sparkles } from "lucide-react";
import { login } from "@/lib/actions/auth";

export default function InfoData() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const data = [
    {
      title: "Forma de Participación",
      lists: modalidad,
    },
    {
      title: "Categorías",
      lists: categories,
    },
    {
      title: "División",
      lists: division,
    },
    {
      title: "Sub División",
      lists: subDivision,
    },
  ];

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
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
      <section className='py-20 lg:py-32 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-50' />
        <div className='absolute inset-0 bg-gradient-to-tr from-fuchsia-100/50 via-transparent to-purple-100/30' />

        {/* Elementos decorativos de fondo */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-fuchsia-200/20 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl' />

        <div className='container relative z-10 px-6 lg:px-8 m-auto'>
          <div className='text-center mb-16 lg:mb-20'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-100/50 text-fuchsia-700 text-sm font-medium mb-6'>
              <Sparkles size={16} />
              Información del Festival
            </div>
            <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Formas de
              <span className='bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>
                {" "}
                Participación
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
              Descubre todas las categorías y modalidades disponibles para
              formar parte de nuestro festival
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
            {data.map((item, index) => (
              <InfoSection
                key={index}
                list={item.lists}
                title={item.title}
                index={index}
                isActive={activeCard === index}
                onHover={(cardIndex) => {
                  setActiveCard(cardIndex);
                  setIsHovering(true);
                }}
                onLeave={() => {
                  if (!isHovering) return;
                  setTimeout(() => {
                    setActiveCard(null);
                    setIsHovering(false);
                  }, 150);
                }}
              />
            ))}
          </div>

          <div className='text-center mt-16 lg:mt-20'>
            <button onClick={() => login()}>
              <div className='inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300'>
                <span>¿Listo para participar?</span>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
