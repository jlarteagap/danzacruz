import React from 'react'
import { monserrat } from '../../ui/fonts'
import '../../ui/global.css'

import { AppSidebar } from '@/components/Sidebar/Sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${monserrat.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="p-6 bg-[#fafbfc] w-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
