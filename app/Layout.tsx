import React from 'react'
import { monserrat } from './ui/fonts'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${monserrat.className} antialiased`}>{children}</body>
    </html>
  )
}
