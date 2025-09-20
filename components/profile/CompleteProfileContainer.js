"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/commons/LoadingSpinner";
import ProfileCompletionForm from "@/components/profile/ProfileCompletionForm";
import UserPanel from "@/components/UserPanel";
import { DataProvider } from "@/contexts/DataContext";

export default function CompleteProfileContainer() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
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
          <DataProvider userId={session.user.id}>
            <UserPanel user={session.user} />
          </DataProvider>
        ) : (
          <ProfileCompletionForm user={session.user} isEditMode={false} />
        )}
      </div>
    </main>
  );
}
