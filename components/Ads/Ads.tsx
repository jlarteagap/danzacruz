"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AdsList, SupportList } from "./Ads..data";
import { Heart, Handshake, Star, Sparkles, Award, Users } from "lucide-react";
import SponsorCard from "./SponsordCard";
export const Ads = () => {
  const [activeSponsor, setActiveSponsor] = useState(null);
  const [activeSupport, setActiveSupport] = useState(null);

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
            transform: translateY(-8px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6),
              0 0 60px rgba(236, 72, 153, 0.4);
          }
        }
        .float {
          animation: float 4s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      <section className='py-20 lg:py-32 relative overflow-hidden'>
        {/* Fondo elegante */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/50 to-fuchsia-50' />
        <div className='absolute inset-0 bg-gradient-to-tr from-white via-transparent to-purple-100/30' />

        {/* Elementos decorativos de fondo */}
        <div className='absolute top-20 left-10 w-64 h-64 bg-fuchsia-200/20 rounded-full blur-3xl float' />
        <div
          className='absolute bottom-20 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl float'
          style={{ animationDelay: "2s" }}
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-fuchsia-100/30 to-transparent rounded-full' />

        <div className='container relative z-10 px-6 lg:px-8 m-auto'>
          {/* Header principal */}
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-3 px-6 py-3 rounded-full bg-fuchsia-100/50 backdrop-blur-md text-fuchsia-700 text-sm font-medium mb-8 border border-fuchsia-200/50'>
              <Handshake size={20} className='text-fuchsia-600' />
              <span>Aliados Estratégicos</span>
            </div>
            <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
              Nuestros
              <span className='bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent'>
                {" "}
                Patrocinadores
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Agradecemos a todas las empresas e instituciones que hacen posible
              la realización de este festival de danza
            </p>
          </div>
          {/* Sección de Auspiciadores */}

          <div className='mb-24'>
            {/* Header de auspiciadores */}
            <div className='text-center mb-12'>
              <div className='inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold shadow-xl mb-6 pulse-glow'>
                <Award size={20} />
                <span>Auspiciadores Principales</span>
                <Star size={16} className='text-yellow-200' />
              </div>
              <p className='text-gray-600'>
                Empresas que confían en nuestro evento y apoyan el arte de la
                danza
              </p>
            </div>
            {/* Grid de auspiciadores */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-8'>
              {AdsList.map((sponsor, index) => (
                <SponsorCard
                  key={index}
                  sponsor={sponsor}
                  index={index}
                  isActive={activeSponsor === index}
                  onHover={(cardIndex) => setActiveSponsor(cardIndex)}
                  onLeave={() => setActiveSponsor(null)}
                  type='sponsor'
                />
              ))}
            </div>

            {/* Separador visual */}
            <div className='flex items-center justify-center my-20'>
              <div className='flex items-center gap-4'>
                <div className='h-px bg-gradient-to-r from-transparent to-gray-300 w-20'></div>
                <div className='flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-md border border-gray-200/50'>
                  <Heart size={16} className='text-fuchsia-500' />
                  <span className='text-gray-600 font-medium text-sm'>
                    Con el apoyo de
                  </span>
                </div>
                <div className='h-px bg-gradient-to-l from-transparent to-gray-300 w-20'></div>
              </div>
            </div>

            {/* Header de apoyo */}
            <div className='text-center mb-12'>
              <div className='inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold shadow-xl mb-6'>
                <Users size={20} />
                <span>Instituciones de Apoyo</span>
                <Heart size={16} className='text-pink-200' />
              </div>
              <p className='text-gray-600'>
                Organizaciones que respaldan y promueven el desarrollo artístico
              </p>
            </div>

            {/* Grid de apoyo */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto'>
              {SupportList.map((support, index) => (
                <SponsorCard
                  key={index}
                  sponsor={support}
                  index={index}
                  isActive={activeSupport === index}
                  onHover={(cardIndex) => setActiveSupport(cardIndex)}
                  onLeave={() => setActiveSupport(null)}
                  type='support'
                />
              ))}
            </div>

            <div className='mt-20 text-center'>
              <div className='max-w-2xl mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/20'>
                <div className='mb-6'>
                  <div className='inline-flex items-center gap-2 p-3 bg-fuchsia-100 rounded-2xl mb-4'>
                    <Sparkles size={24} className='text-fuchsia-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                    ¿Quieres ser parte?
                  </h3>
                  <p className='text-gray-600 mb-6'>
                    Únete a nuestros patrocinadores y apoya el desarrollo del
                    arte y la cultura
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <div className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
                    <span>Ser Patrocinador</span>
                    <Award size={16} />
                  </div>
                  <div className='inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 font-semibold hover:border-fuchsia-300 hover:text-fuchsia-700 transform hover:scale-105 transition-all duration-300'>
                    <span>Más Información</span>
                    <Heart size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
