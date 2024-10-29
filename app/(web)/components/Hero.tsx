import { Button } from '@/components/ui/button'
import { MessageSquareShare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="h-svh flex justify-center items-center flex-col relative bg-gradient-to-r from-fuchsia-300 bg-blend-multiply">
      <div className="flex justify-center items-center w-full flex-col">
        <h2 className="text-4xl font-bold uppercase relative md:text-[72px] text-fuchsia-900 filter drop-shadow-2xl">
          Danzacruz
          <span className="font-normal rotate-90 absolute text-xs top-0 bottom-0 md:text-2xl">
            2024
          </span>
        </h2>
        <p className="mt-3 md:text-2xl text-white">
          24 años Proyectando Bolivia al mundo
        </p>
      </div>
      <div className="absolute w-full h-screen -z-10">
        <Image
          src="/img/dc-2024.jpg"
          objectFit="cover"
          layout="fill"
          alt="Danzacruz 2024"
        />
      </div>
      <div className="uppercase md:text-xl mt-10 text-fuchsia-900">
        Del 8 al 10 de noviembre
      </div>
      <div className="mt-5 gap-3 flex">
        <Button className="">
          <Link
            href="http://wa.me/59175020012"
            target="_blank"
            className="flex"
          >
            <MessageSquareShare className="mr-2" />
            75020012
          </Link>
        </Button>
        <Button>
          <Link
            href="http://wa.me/59175553576"
            target="_blank"
            className="flex"
          >
            <MessageSquareShare className="mr-2" />
            75553576
          </Link>
        </Button>
      </div>
    </section>
  )
}
