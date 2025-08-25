// hooks/useProfileCheck.js
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useProfileCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Esperar a que cargue la sesión

    // Si no está autenticado, no hacer nada (dejar que la página maneje la redirección)
    if (status === "unauthenticated") return;

    // Si está autenticado pero el perfil no está completo, redirigir
    if (session?.user && session.user.profileComplete === false) {
      router.push("/complete-profile");
    }
  }, [session, status, router]);

  return {
    user: session?.user,
    status,
    isProfileComplete: session?.user?.profileComplete === true,
    needsProfileCompletion: session?.user?.profileComplete === false,
  };
}
