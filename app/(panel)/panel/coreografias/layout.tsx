import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coreografías | Panel de Administración",
  description: "Gestión completa de coreografías y participantes registrados",
};

export default function ChoreographiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Podrías agregar un navigation sidebar aquí */}
      {children}
    </div>
  );
}
