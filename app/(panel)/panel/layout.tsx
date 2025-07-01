import React from "react";
import { monserrat } from "../../ui/fonts";
import "../../ui/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={`${monserrat.className} antialiased`}>
        <main className='p-6 bg-[#fafbfc] w-full'>{children}</main>
      </body>
    </html>
  );
}
