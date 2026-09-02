import React from "react";
import { monserrat } from "../ui/fonts";
import "../ui/global.css";
import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";

import { Analytics } from "@vercel/analytics/react";
import { Providers } from "../providers";
import { auth } from "@/auth";

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
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
