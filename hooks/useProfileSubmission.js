"use client";
import { useState } from "react";

export function useProfileSubmission() {
  const [isLoading, setIsLoading] = useState(false);

  const submitProfile = async ({ userId, profileData }) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...profileData,
          profileComplete: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar perfil");
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitProfile,
    isLoading,
  };
}
