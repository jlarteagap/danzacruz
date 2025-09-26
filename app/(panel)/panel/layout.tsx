import React, { ReactNode } from "react";
import Link from "next/link";

import { monserrat } from "../../ui/fonts";
import "../../ui/global.css";
import { Home, Users, FileText, Settings } from "lucide-react";
import { PanelHeader } from "@/components/Panel/PanelHeader";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='es'>
        <body className={`${monserrat.className} antialiased`}>
          <div className='flex min-h-screen bg-gray-100'>
            {/* Sidebar */}
            <aside className='w-64 bg-white shadow-md flex flex-col'>
              <div className='h-16 flex items-center justify-center border-b'>
                <h1 className='text-xl font-bold text-primary'>Danzacruz</h1>
              </div>
              <nav className='flex-1 p-4 space-y-2'>
                <Link
                  href='/panel'
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition'
                >
                  <Home className='w-5 h-5' />
                  <span>Inicio</span>
                </Link>
                <Link
                  href='/panel/inscripciones'
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition'
                >
                  <Users className='w-5 h-5' />
                  <span>Inscripciones</span>
                </Link>
                <Link
                  href='/panel/certificados'
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition'
                >
                  <FileText className='w-5 h-5' />
                  <span>Certificados</span>
                </Link>
                <Link
                  href='/panel/configuracion'
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition'
                >
                  <Settings className='w-5 h-5' />
                  <span>Configuración</span>
                </Link>
              </nav>

              <div className='p-4 border-t'>
                <p className='text-sm text-gray-500'>© 2025 Danzacruz</p>
              </div>
            </aside>

            {/* Main content */}
            <main className='flex-1 p-6'>
              <PanelHeader />
              {children}
            </main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
