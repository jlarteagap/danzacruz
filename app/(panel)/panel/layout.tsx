import React from "react";
import { monserrat } from "../../ui/fonts";
import "../../ui/global.css";

import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Providers } from "../../provides";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang='es'>
      <body className={`${monserrat.className} antialiased`}>
        <Providers session={session}>
          <SidebarProvider>
            <AppSidebar />
            <main className='p-6 bg-[#fafbfc] w-full'>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
