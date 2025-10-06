import { useCallback } from "react";
import { UserActions } from "@/types/user.types";

/**
 * Hook para manejar acciones del usuario
 */
export const useUserActions = (actions: UserActions) => {
  const handleLogout = useCallback(async () => {
    try {
      await actions.onLogout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [actions.onLogout]);

  const handleSettings = useCallback(async () => {
    try {
      await actions.onSettings();
    } catch (error) {
      console.error("Error navigating to settings:", error);
    }
  }, [actions.onSettings]);

  const handleProfile = useCallback(async () => {
    try {
      if (actions.onProfile) {
        await actions.onProfile();
      }
    } catch (error) {
      console.error("Error navigating to profile:", error);
    }
  }, [actions.onProfile]);

  return {
    handleLogout,
    handleSettings,
    handleProfile,
  };
};
