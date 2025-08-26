"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import LoadingSpinner from "@/components/ui/commons/LoadingSpinner";
import ProfileCompletionForm from "@/components/profile/ProfileCompletionForm";
import ProfileViewMode from "@/components/profile/ProfileViewMode";

export default function CompleteProfileContainer() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isViewMode, toggleViewMode } = useProfileCompletion();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (session?.user?.profileComplete && !isViewMode) {
      router.push("/panel");
      return;
    }
  }, [session, status, router, isViewMode]);

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
      <div className='max-w-md w-full space-y-8'>
        {session.user.profileComplete && isViewMode ? (
          <ProfileViewMode
            user={session.user}
            onEdit={() => toggleViewMode(false)}
          />
        ) : (
          <ProfileCompletionForm
            user={session.user}
            isEditMode={session.user.profileComplete}
          />
        )}
      </div>
    </main>
  );
}
