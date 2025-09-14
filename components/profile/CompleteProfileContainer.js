"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import LoadingSpinner from "@/components/ui/commons/LoadingSpinner";
import ProfileCompletionForm from "@/components/profile/ProfileCompletionForm";
import UserPanel from "@/components/UserPanel";

export default function CompleteProfileContainer() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isViewMode, toggleViewMode } = useProfileCompletion();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
    // Permitir visualizar /profile si el perfil está completo
    // El usuario solo será redirigido si no está autenticado
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <LoadingSpinner size='large' />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full space-y-8'>
        {session.user.profileComplete ? (
          <UserPanel user={session.user} />
        ) : (
          <ProfileCompletionForm user={session.user} isEditMode={false} />
        )}
      </div>
    </main>
  );
}
