import React from 'react'
import Image from 'next/image'
export const Header = () => {
  return (
    <div className="header pt-4 is-flex is-justify-content-center">
      <Image
        src="/img/danzacruz.webp"
        width="450"
        height="78"
        alt="Danzacruz 2023"
      />
    </div>
  )
}
