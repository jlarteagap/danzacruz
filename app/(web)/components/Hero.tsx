import { Button } from "@/components/ui/button";
import { MessageSquareShare } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className='h-svh flex justify-center items-center flex-col relative bg-gradient-to-r from-slate-300 bg-blend-multiply'>
      <div className='flex justify-center items-center w-full flex-col'>
        <h2 className='text-4xl font-bold uppercase relative md:text-[72px] text-slate-700 filter drop-shadow-2xl'>
          Danzacruz
          <span className='font-normal rotate-90 absolute text-xs top-0 bottom-0 md:text-2xl'>
            2025
          </span>
        </h2>
        <p className='mt-3 md:text-2xl text-slate-400'>
          25 años Proyectando Bolivia al mundo
        </p>
      </div>
      <div className='absolute w-full h-screen -z-10'>
        {/* <Image
          src='/img/dc-2024.jpg'
          className='object-cover'
          fill={true}
          alt='Danzacruz 2024'
        /> */}
      </div>
      <div className='uppercase md:text-xl mt-10 text-slate-600'>
        9 de 12 de Octubre del 2025
      </div>
      <div className='mt-5 gap-3 flex'>
        <Button className='bg-slate-600 hover:bg-slate-300 transition-all hover:text-slate-700'>
          <Link
            href='http://wa.me/59175020012'
            target='_blank'
            className='flex'
          >
            <MessageSquareShare className='mr-2' />
            75020012
          </Link>
        </Button>
        <Button className='bg-slate-600 hover:bg-slate-300 transition-all hover:text-slate-700'>
          <Link
            href='http://wa.me/59175553576'
            target='_blank'
            className='flex'
          >
            <MessageSquareShare className='mr-2' />
            75553576
          </Link>
        </Button>
      </div>
    </section>
  );
}
