import { Button } from '@/components/ui/button'
import { MessageSquareShare } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="container h-svh flex justify-center items-center flex-col">
      <div className="flex justify-center items-center w-full flex-col">
        <div className="text-4xl font-bold uppercase relative md:text-[72px]">
          Danzacruz
          <span className="font-normal rotate-90 absolute text-xs top-0 bottom-0 md:text-2xl">
            2024
          </span>
        </div>
        <p className="mt-3 md:text-2xl">24 años Proyectando Bolivia al mundo</p>
      </div>
      {/* <div>Imagen</div> */}
      <div className="uppercase md:text-xl mt-10">Del 8 al 10 de noviembre</div>
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
