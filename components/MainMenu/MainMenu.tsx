"use client";

import { FC } from "react";
import Link from "next/link";
import { User } from "types/user.types";

interface MainMenuProps {
  user: User | null;
}

export const MainMenu: FC<MainMenuProps> = ({ user }) => {
  const isAdmin = user?.role === "admin";
  const isJurado = user?.role === "jurado";

  return (
    <div className='flex items-center gap-6'>
      {/* Inscripciones - solo admin */}

      <Link
        href='/inscripciones'
        className='text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors'
      >
        Inscripciones
      </Link>

      {/* Certificados - solo admin */}

      <Link
        href='/certificados'
        className='text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors'
      >
        Certificados
      </Link>

      {/* Evaluaciones - admin y jurado */}
      {(isAdmin || isJurado) && (
        <Link
          href='/evaluaciones'
          className='text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors'
        >
          Evaluaciones
        </Link>
      )}

      {/* Panel - solo admin */}
      {isAdmin && (
        <Link
          href='/panel'
          className='text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors'
        >
          Panel
        </Link>
      )}
    </div>
  );
};
