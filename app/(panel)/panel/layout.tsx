import React from "react";
import { monserrat } from "../../ui/fonts";
import "../../ui/global.css";
import { HeaderPanel } from "@/components/Layout/HeaderPanel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={`${monserrat.className} antialiased bg-[#fafbfc]`}>
        <HeaderPanel />
        <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          {children}
        </main>
      </body>
    </html>
  );
}
