"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {/* CTA Button */}
            {/* <Link
              href='/registro'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-slate-500/40 hover:-translate-y-0.5 transition-all duration-300 ease-out'
            >
              <span>Registro</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6 text-neutral-700' />
            ) : (
              <Menu className='w-6 h-6 text-neutral-700' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className='py-4 border-t border-neutral-200/60'>
            <nav className='flex flex-col gap-4'>
              <a
                href='#festival'
                className='flex items-center justify-between py-3 px-4 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-all duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                Festival
                <ArrowUpRight className='w-4 h-4' />
              </a>
              <a
                href='#participar'
                className='flex items-center justify-between py-3 px-4 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-all duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                Participar
                <ArrowUpRight className='w-4 h-4' />
              </a>
              <a
                href='#contacto'
                className='flex items-center justify-between py-3 px-4 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-all duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
                <ArrowUpRight className='w-4 h-4' />
              </a>

              {/* Mobile CTA Button */}
              <a
                href='/registro'
                className='group inline-flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300'
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Registro</span>
                <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
              </a>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
