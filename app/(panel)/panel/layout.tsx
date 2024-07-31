import React from 'react'
import { monserrat } from '../../ui/fonts'
import '../../ui/global.css'
import Nabvar from '@/components/Navbar/Navbar'
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${monserrat.className} antialiased`}>
        <div className="hidden xl:block w-80 h-full xl:fixed"></div>
        <div className="w-full xl:ml-80">
          <Nabvar />
          <div className="p-6 bg-[#fafbfc]">{children}</div>
        </div>
      </body>
    </html>
  )
}
