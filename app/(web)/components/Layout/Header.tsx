"use client";
import React, { useMemo, useState } from "react";
import { UserNavbar } from "@/components/UserNavbar/UserNavbar";
import { LoginButton } from "@/components/ui/commons/LoginButton";
import { User, UserActions } from "types/user.types";
import { getFirstName } from "@/utils/user-display.utils";
import { FileDown, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MainMenu } from "@/components/MainMenu/MainMenu";

export const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const actions: UserActions = useMemo(
    () => ({
      onLogout: async () => {
        await signOut({ callbackUrl: "/" });
      },
      onSettings: () => router.push("/settings"),
      onProfile: () => router.push("/profile"),
    }),
    [router]
  );

  const currentUser = useMemo<User | null>(() => {
    if (!session?.user) return null;
    return {
      ...session.user,
      avatar:
        session.user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          session.user.name || "U"
        )}&background=63f7df&color=fff`,
    };
  }, [session]);
  const firstName = useMemo(
    () => (currentUser ? getFirstName(currentUser.name) : ""),
    [currentUser]
  );

  return (
    <header className='sticky top-0 z-50 backdrop-blur-xl bg-slate-900/95 border-b border-[#63f7df]/30 shadow-md'>
      <nav className='container mx-auto px-6 py-4 max-w-7xl'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <a
            href='/'
            className='group flex items-center gap-3 hover:opacity-90 transition-opacity duration-300'
          >
            <div className='flex flex-col'>
              <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-[#63f7df] to-[#fdf770] bg-clip-text text-transparent'>
                DANZACRUZ
              </h1>
              <span className='text-xs md:text-sm text-white/80 font-medium leading-tight'>
                Festival Internacional de Danza
              </span>
            </div>
          </a>

          {/* Botón hamburguesa móvil */}
          <button
            className='md:hidden p-2 rounded-md text-[#63f7df] hover:bg-[#63f7df]/10 transition-all'
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menú desktop */}
          <div className='hidden md:flex items-center gap-8'>
            <MainMenu user={currentUser} />
            <Link href='/convocatoria' rel='noopener noreferrer'>
              <button className='group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#63f7df] to-[#fdf770] text-slate-900 font-semibold rounded-2xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300 ease-out'>
                <span className='relative flex items-center gap-2'>
                  <FileDown className='w-5 h-5 text-slate-900 group-hover:translate-y-0.5 transition-transform duration-300' />
                  Convocatoria
                </span>
              </button>
            </Link>
            <Link
              href='/registrarse'
              className='border-teal-400/50 group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-neutral-900 font-semibold rounded-2xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300 ease-out'
              style={{
                background: "linear-gradient(135deg, #63f7df 0%, #2dd4bf 100%)",
              }}
              aria-label='Ir al formulario de registro del Festival Danzacruz 2025'
            >
              <span className='flex items-center gap-2'>
                Registrarse
                <ArrowUpRight className='w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
              </span>
            </Link>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className='flex flex-col mt-4 gap-4 md:hidden'>
            <MainMenu user={currentUser} />
            <Link
              href='/pdf/danzacruz-2025.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#63f7df] to-[#fdf770] text-slate-900 font-semibold rounded-2xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300 ease-out w-full'>
                <span className='relative flex items-center gap-2 justify-center w-full'>
                  <FileDown className='w-5 h-5 text-slate-900 group-hover:translate-y-0.5 transition-transform duration-300' />
                  Convocatoria
                </span>
              </button>
            </Link>
            <Link
              href='/registrarse'
              className='border-teal-400/50 group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-neutral-900 font-semibold rounded-2xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300 ease-out'
              style={{
                background: "linear-gradient(135deg, #63f7df 0%, #2dd4bf 100%)",
              }}
              aria-label='Ir al formulario de registro del Festival Danzacruz 2025'
            >
              <span className='flex items-center gap-2'>
                Registrarse
                <ArrowUpRight className='w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
              </span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
