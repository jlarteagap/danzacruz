import { User } from "types/user.types";

/**
 * Genera etiqueta ARIA para el menú de usuario
 */
export const generateUserMenuAriaLabel = (user: User): string =>
  `Menú de usuario para ${user.name}, ${user.email}`;

/**
 * Genera texto alternativo para el avatar
 */
export const generateAvatarAlt = (user: User): string =>
  `Foto de perfil de ${user.name}`;

/**
 * Genera etiqueta ARIA para el saludo
 */
export const generateGreetingAriaLabel = (user: User): string =>
  `Bienvenido ${user.name}`;
