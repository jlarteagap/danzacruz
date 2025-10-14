// components/AuthRedirectHandler.js
"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthRedirectHandler({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo actuar cuando tengamos la sesión cargada
    if (status === "loading") return;

    // Si no está autenticado, no hacer nada
    if (status === "unauthenticated") return;

    // Si está autenticado
    if (session?.user) {
      const { profileComplete } = session.user;

      // Si el perfil no está completo y no está en la página de completar perfil
      if (profileComplete === false && pathname !== "/profile") {
        router.push("/profile");
        return;
      }

      // Si el perfil está completo y está en la página de perfil, NO redirigir
      // El usuario puede quedarse en /profile para ver/editar su información
    }
  }, [session, status, router, pathname]);

  // Mostrar loading mientras verificamos
  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return children;
}
