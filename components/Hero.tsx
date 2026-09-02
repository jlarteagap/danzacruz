"use client";

import {
  MessageSquare,
  MapPin,
  Calendar,
  Instagram,
  Facebook,
  Music,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const PARTICLE_CONFIGS = [
  { left: 12, top: 8, delay: 0.3, duration: 7 },
  { left: 45, top: 22, delay: 1.2, duration: 9 },
  { left: 78, top: 55, delay: 2.5, duration: 11 },
  { left: 23, top: 80, delay: 0.8, duration: 8 },
  { left: 67, top: 35, delay: 3.1, duration: 12 },
  { left: 91, top: 15, delay: 1.7, duration: 6 },
  { left: 5, top: 60, delay: 4.0, duration: 10 },
  { left: 33, top: 45, delay: 2.0, duration: 7 },
  { left: 56, top: 70, delay: 0.5, duration: 9 },
  { left: 82, top: 90, delay: 3.5, duration: 8 },
  { left: 18, top: 30, delay: 1.0, duration: 11 },
  { left: 40, top: 10, delay: 2.8, duration: 6 },
  { left: 70, top: 65, delay: 0.2, duration: 10 },
  { left: 88, top: 40, delay: 4.2, duration: 7 },
  { left: 10, top: 95, delay: 1.5, duration: 12 },
  { left: 50, top: 50, delay: 3.8, duration: 9 },
  { left: 25, top: 75, delay: 0.7, duration: 8 },
  { left: 62, top: 20, delay: 2.3, duration: 11 },
  { left: 37, top: 85, delay: 1.8, duration: 6 },
  { left: 95, top: 5, delay: 3.3, duration: 10 },
];

export default function HeroImmersive() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const particles = useMemo(() => PARTICLE_CONFIGS, []);

  return (
    <section
      className='relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20'
      role='banner'
      aria-label='Sección principal de bienvenida a Danzacruz 2025'
    >
      {/* Fullscreen Background Image with Overlay */}
      <div className='absolute inset-0' aria-hidden='true'>
        <div className='absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60' />
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-teal-900/40' />
      </div>

      {/* Animated Confetti/Particles for 25th Anniversary */}
      <div
        className='absolute inset-0 overflow-hidden pointer-events-none'
        aria-hidden='true'
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-60 animate-float-particle'
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Anniversary Badge with Glassmorphism */}
          <div className='inline-flex items-center gap-3 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl'>
            <Sparkles
              className='w-4 h-4 text-amber-400 animate-pulse'
              aria-hidden='true'
            />
            <span className='text-sm font-semibold text-white tracking-widest uppercase'>
              Edición 25° Aniversario
            </span>
            <Sparkles
              className='w-4 h-4 text-amber-400 animate-pulse'
              aria-hidden='true'
            />
          </div>

          {/* Main Title - Hero Typography */}
          <div className='space-y-6 mb-10'>
            <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight'>
              <span className='block text-white drop-shadow-2xl mb-2'>
                DANZACRUZ
              </span>
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-lg text-5xl sm:text-6xl md:text-7xl lg:text-8xl'>
                2025
              </span>
            </h1>

            <p className='text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide drop-shadow-lg'>
              25 años proyectando Bolivia al mundo
            </p>
          </div>

          {/* Glassmorphism Info Card */}
          <div className='bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl mb-10 max-w-3xl mx-auto'>
            {/* Event Details */}
            <div className='space-y-4 mb-8'>
              <div className='flex items-center justify-center gap-3 text-white'>
                <Calendar
                  className='w-6 h-6 text-emerald-300'
                  aria-hidden='true'
                />
                <span className='text-lg sm:text-xl font-semibold tracking-wide'>
                  7 - 9 de Noviembre 2025
                </span>
              </div>

              <div className='flex items-center justify-center gap-3 text-white'>
                <MapPin
                  className='w-6 h-6 text-emerald-300'
                  aria-hidden='true'
                />
                <span className='text-base sm:text-lg font-medium'>
                  Coliseo Alto San Pedro, Santa Cruz de la Sierra
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className='w-20 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8' />

            {/* Primary CTA - WhatsApp */}
            {/* <div className='space-y-4 mb-8'>
              <p className='text-white/80 font-medium tracking-wide'>
                Reserva tus entradas
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
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
                    className='group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden min-w-[220px]'
                  >
                    {/* Shine effect */}
                    {/*<div className='absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700' />

                    <div className='relative flex items-center gap-3'>
                      <MessageSquare className='w-5 h-5' aria-hidden='true' />
                      <span className='tracking-wider'>{number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div> */}

            {/* Secondary CTA - Social Media */}
            <div className='pt-6 border-t border-white/20'>
              <p className='text-white/70 text-sm font-medium mb-4 tracking-wide'>
                Síguenos en redes sociales
              </p>

              <div className='flex gap-3 justify-center'>
                {[
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://instagram.com/festivaldanzacruz",
                    gradient: "from-pink-500 to-purple-500",
                  },
                  {
                    icon: Facebook,
                    label: "Facebook",
                    href: "https://facebook.com/festivaldanzacruz",
                    gradient: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: Music,
                    label: "TikTok",
                    href: "https://www.tiktok.com/@festival.danzacruz",
                    gradient: "from-neutral-800 to-neutral-900",
                  },
                ].map(({ icon: Icon, label, href, gradient }) => (
                  <a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Visitar ${label} de Danzacruz`}
                    className={`group relative p-4 bg-white/10 hover:bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
                  >
                    <Icon className='w-6 h-6 text-white' aria-hidden='true' />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Caption */}
          <div className='bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 inline-block shadow-xl'>
            <p className='text-white/90 text-sm sm:text-base leading-relaxed'>
              En el año del Bicentenario, 25 años proyectando Bolivia al mundo
            </p>
            <p className='text-emerald-300 font-bold text-xs sm:text-sm mt-1 tracking-widest'>
              BODAS DE PLATA
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20'
        aria-hidden='true'
      >
        <div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center items-start p-2 backdrop-blur-sm'>
          <div className='w-1.5 h-3 bg-emerald-400 rounded-full animate-pulse' />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
      `}</style>
    </section>
  );
}
