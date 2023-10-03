import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const Header = () => {
  return (
    <div className="header pt-4 is-flex is-justify-content-center">
      <Link href="http://festivaldanzacruz.com" target="_blank">
        <Image
          src="/img/danzacruz.webp"
          width="450"
          height="78"
          alt="Danzacruz 2023"
        />
      </Link>
    </div>
  )
}
