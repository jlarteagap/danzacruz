"use client";

import { ArrowUpRight, FileDown, Menu, X } from "lucide-react";
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
            <Link
              href='/pdf/danzacruz-2025.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='group relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-neutral-700 font-semibold border border-neutral-200/60 rounded-2xl shadow-sm hover:bg-white hover:border-neutral-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out'>
                <span className='relative flex items-center gap-2'>
                  <FileDown className='w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300' />
                  Convocatoria
                </span>
              </button>
            </Link>
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
              <Link
                href='/pdf/danzacruz-2025.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='group relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-neutral-700 font-semibold border border-neutral-200/60 rounded-2xl shadow-sm hover:bg-white hover:border-neutral-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out'>
                  <span className='relative flex items-center gap-2'>
                    <FileDown className='w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300' />
                    Convocatoria
                  </span>
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
