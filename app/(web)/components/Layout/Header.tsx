"use client";
import React, { useMemo } from "react";
import { UserNavbar } from "@/components/UserNavbar/UserNavbar";

import { LoginButton } from "@/components/ui/commons/LoginButton";
import { User, UserActions } from "types/user.types";
import { getFirstName } from "@/utils/user-display.utils";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MainMenu } from "@/components/MainMenu/MainMenu";

export const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const actions: UserActions = useMemo(
    () => ({
      onLogout: async () => {
        await signOut({ callbackUrl: "/" });
      },
      onSettings: () => {
        router.push("/settings");
      },
      onProfile: () => {
        router.push("/profile");
      },
    }),
    [router]
  );

  // Crear usuario desde los datos de la sesión
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
    };
  }, [session]);

  const firstName = useMemo(
    () => (currentUser ? getFirstName(currentUser.name) : ""),
    [currentUser]
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
          <MainMenu user={currentUser} />
          <div className='hidden md:flex items-center gap-8'>
            {status !== "authenticated" && <LoginButton />}

            {status === "authenticated" && currentUser && (
              <>
                <UserNavbar user={currentUser} actions={actions} />
              </>
            )}

            {status === "loading" && (
              <div className='animate-pulse'>
                <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
