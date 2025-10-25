// components/layout/Header.tsx
"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, UserActions } from "types/user.types";

import { Bell, Menu, Moon, Sun, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { UserNavbar } from "../UserNavbar/UserNavbar";
import { useRouter } from "next/navigation";

export function PanelHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
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

  const currentUser: User | null = useMemo(() => {
    if (!session?.user) return null;

    return {
      id: session.user.id || "unknown",
      name: session.user.name || "Usuario",
      email: session.user.email || "",
      avatar:
        session.user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          session.user.name || "U"
        )}&background=6366f1&color=fff`,
      role: session.user.role || "Usuario", // Asume que tienes role en tu sesión
      createdAt: session.user.createdAt || new Date().toISOString(),
    };
  }, [session]);
  return (
    <header className='h-16 w-full border-b bg-white px-4 flex items-center justify-between shadow-sm'>
      {/* Left Section */}
      <div className='flex items-center gap-4'>
        {/* Burger for mobile */}
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
        </Button>
        <Link href='/dashboard' className='text-lg font-bold text-primary'>
          Danzacruz
        </Link>
      </div>

      {/* Center Section (Search) */}
      <div className='hidden md:flex flex-1 justify-center max-w-lg'>
        <Input
          type='search'
          placeholder='Buscar en Danzacruz...'
          className='w-full'
        />
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-2'>
        {/* Theme Toggle */}
        <Button variant='ghost' size='icon'>
          <Sun className='h-5 w-5' />
          {/* Aquí podemos alternar con <Moon /> */}
        </Button>

        {/* Notifications */}
        <Button variant='ghost' size='icon'>
          <Bell className='h-5 w-5' />
        </Button>

        {/* User Menu */}
        <UserNavbar user={currentUser} actions={actions} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer'>
              <AvatarImage src='/user.jpg' alt='user' />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-600'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
