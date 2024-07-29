import React from 'react'
import { monserrat } from './ui/fonts'
import './ui/global.css'
import { Footer } from '../src/components/footer'
import { Header } from '../src/components/header/header'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${monserrat.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
