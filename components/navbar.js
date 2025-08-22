"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Cargando...</div>;

  return (
    <nav className='bg-gray-800 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          Mi App
        </Link>

        <div className='flex items-center space-x-4'>
          {session ? (
            <>
              <span>Hola, {session.user.name}</span>
              <span className='bg-blue-500 px-2 py-1 rounded text-xs'>
                {session.user.role}
              </span>

              <Link href='/dashboard' className='hover:underline'>
                Dashboard
              </Link>

              {session.user.role === "admin" && (
                <Link href='/admin' className='hover:underline'>
                  Admin
                </Link>
              )}

              <button
                onClick={() => signOut()}
                className='bg-red-500 px-3 py-1 rounded hover:bg-red-600'
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href='/auth/signin' className='hover:underline'>
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
