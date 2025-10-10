import React from "react";
import { monserrat } from "../ui/fonts";
import "../ui/global.css";
import { Footer } from "./components/Layout/Footer";
import { Header } from "./components/Layout/Header";

import { Analytics } from "@vercel/analytics/react";

import { Providers } from "../provides";
import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner";

export function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <main>{children}</main>
        <Toaster position='bottom-center' richColors />
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Danzacruz 2025",
    template: "%s | Festival Internacional de Danza",
  },
  description: 'Festival Internacional de danza "Danzacruz 2025" ',
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang='es'>
      <body className={`${monserrat.className} antialiased`}>
        <Providers session={session}>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
