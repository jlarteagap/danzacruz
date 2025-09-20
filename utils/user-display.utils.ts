import { User } from "types/user.types";

/**
 * Obtiene las iniciales del nombre del usuario
 */
export const getInitials = (name: string): string => {
  if (!name?.trim()) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

/**
 * Obtiene el primer nombre del usuario
 */
export const getFirstName = (name: string): string => {
  if (!name?.trim()) return "Usuario";
  return name.trim().split(/\s+/)[0];
};

/**
 * Formatea el email del usuario
 */
export const formatEmail = (email: string): string =>
  email?.toLowerCase().trim() || "";

/**
 * Valida si el usuario tiene datos completos
 */
export const isValidUser = (user: User): boolean =>
  Boolean(user?.id && user?.name && user?.email);
