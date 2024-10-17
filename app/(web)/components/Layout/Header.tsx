// import React from 'react'
// import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
export const Header = () => {
  return (
    <header className="container mx-auto px-4">
      <nav className="flex justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" className="">
          <h1 className="text-3xl font-semibold">Danzacruz</h1>
          <span className="self-center whitespace-nowrap leading-3">
            Festival Internacional de Danza
          </span>
        </a>

        <Button asChild>
          <Link href={'/registro'} className="flex">
            <ArrowUpRight className="w-5 h-5 mr-2" />
            Registro
          </Link>
        </Button>
      </nav>
    </header>
  )
}
