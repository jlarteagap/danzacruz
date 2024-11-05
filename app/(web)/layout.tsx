import React from 'react'
import { monserrat } from '../ui/fonts'
import '../ui/global.css'
import { Footer } from './components/Layout/Footer'
import { Header } from './components/Layout/Header'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: {
    default: 'Danzacruz 2024',
    template: '%s | Festival Internacional de Danza'
  },
  description: 'Festival Internacional de danza "Danzacruz 2024" '
}
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
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
