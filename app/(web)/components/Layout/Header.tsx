"use client";
import React, { useMemo, useState } from "react";
import { UserNavbar } from "@/components/UserNavbar/UserNavbar";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { LoginButton } from "@/components/ui/commons/LoginButton";
import { User, UserActions } from "@/types/user.types";
import { getFirstName } from "@/utils/user-display.utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sampleUser: User = useMemo(
    () => ({
      id: "1",
      name: "María González Rodríguez",
      email: "maria.gonzalez@empresa.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: "Administradora",
    }),
    []
  );

  const actions: UserActions = useMemo(
    () => ({
      onLogout: async () => {
        console.log("Cerrando sesión...");
        // await authService.logout();
      },
      onSettings: () => {
        console.log("Navegando a configuración...");
        // router.push('/settings');
      },
      onProfile: () => {
        console.log("Navegando a perfil...");
        // router.push('/profile');
      },
    }),
    []
  );

  const firstName = useMemo(
    () => getFirstName(sampleUser.name),
    [sampleUser.name]
  );

  return (
    <header className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-neutral-200/60'>
      <nav className='container mx-auto px-6 py-4 max-w-7xl'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <a
            href='/'
            className='group flex items-center gap-3 hover:opacity-80 transition-opacity duration-300'
          >
            <div className='flex flex-col'>
              <h1 className='text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight leading-none'>
                DANZACRUZ
              </h1>
              <span className='text-xs md:text-sm text-neutral-600 font-medium leading-tight'>
                Festival Internacional de Danza
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <LoginButton />
            {/* CTA Button */}
            {/* <Link
              href='/registro'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-slate-500/40 hover:-translate-y-0.5 transition-all duration-300 ease-out'
            >
              <span>Registro</span>
              <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
            </Link> */}

            <UserNavbar user={sampleUser} actions={actions} />
          </div>
        </div>
      </nav>
    </header>
  );
};
