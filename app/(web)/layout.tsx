import React from 'react'
import { monserrat } from '../ui/fonts'
import '../ui/global.css'
import { Footer } from './components/Layout/Footer'
import { Header } from './components/Layout/Header'

export default function DashboardLayout({
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
