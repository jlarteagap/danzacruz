"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/commons/LoadingSpinner";
import ProfileCompletionForm from "@/components/profile/ProfileCompletionForm";
import ProfileViewMode from "@/components/profile/ProfileViewMode";

export default function CompleteProfileContainer() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

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
      <div className='w-full md:w-1/3 m-auto space-y-8'>
        {isEditing ? (
          <ProfileCompletionForm
            user={session.user}
            isEditMode={true}
            onCancel={handleCancelEdit}
          />
        ) : session.user.profileComplete ? (
          <ProfileViewMode user={session.user} onEdit={handleEditProfile} />
        ) : (
          <ProfileCompletionForm user={session.user} isEditMode={false} />
        )}
      </div>
    </main>
  );
}
