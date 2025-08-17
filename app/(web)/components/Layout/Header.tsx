"use client";

import Link from "next/link";
import { LoginButton } from "@/components/ui/commons/LoginButton";

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-neutral-200/60'>
      <nav className='container mx-auto px-6 py-4 max-w-7xl'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <a
            href='/'
            className='group flex items-center gap-3 hover:opacity-80 transition-opacity duration-300'
          >
            <div className='flex flex-col'>
              <h1 className='text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight leading-none'>
                DANZACRUZ
              </h1>
              <span className='text-xs md:text-sm text-neutral-600 font-medium leading-tight'>
                Festival Internacional de Danza
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <LoginButton />
            {/* CTA Button */}
            {/* <Link
              href='/registro'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-slate-500/40 hover:-translate-y-0.5 transition-all duration-300 ease-out'
            >
              <span>Registro</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
            </Link> */}
          </div>
        </div>
      </nav>
    </header>
  );
};
