// import React from 'react'
// import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export const Header = () => {
  return (
    <header className='mx-auto py-4 bg-gradient-to-t from-slate-900 to-slate-800'>
      <nav className='container flex gap-1 md:gap-3 justify-between items-center mx-auto max-w-screen-xl'>
        <Link href='/' className=''>
          <h1 className='text-xl md:text-3xl font-semibold text-slate-100 hover:text-slate-300 transition-all uppercase'>
            Danzacruz
          </h1>
          <span className='text-sm self-center whitespace-nowrap leading-3 text-slate-50'>
            Festival Internacional de Danza
          </span>
        </Link>

        {/* <Button
          asChild
          className='hover:bg-slate-800 hover:text-white hover:border-white border-slate-900 text-slate-900'
          variant='outline'
        >
          <Link href={"/registro"} className='flex'>
            <ArrowUpRight className='w-5 h-5 md:mr-2' />
            <span className='hidden sm:block'>Registro</span>
          </Link>
        </Button> */}
      </nav>
    </header>
  );
};
