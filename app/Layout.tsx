import React from 'react'
import { monserrat } from './ui/fonts'
import './ui/global.css'
import { Footer } from '../src/components/footer'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${monserrat.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
