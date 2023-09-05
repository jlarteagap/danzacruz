'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import 'bulma/css/bulma.min.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
