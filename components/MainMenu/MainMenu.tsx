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
      <Link
        href='/inscripciones'
        className='text-sm font-medium text-white hover:text-[#63f7df] transition-colors'
      >
        Inscripciones
      </Link>
      <Link
        href='/convocatoria'
        className='text-sm font-medium text-white hover:text-[#63f7df] transition-colors'
      >
        Convocatoria
      </Link>

      {(isAdmin || isJurado) && (
        <Link
          href='/evaluaciones'
          className='text-sm font-medium text-white hover:text-[#63f7df] transition-colors'
        >
          Evaluaciones
        </Link>
      )}

      {isAdmin && (
        <Link
          href='/panel'
          className='text-sm font-medium text-white hover:text-[#63f7df] transition-colors'
        >
          Panel
        </Link>
      )}
    </div>
  );
};
