import { AvatarSize, MenuVariant } from "@/types/user.types";

/**
 * Obtiene las clases CSS para el tamaño del avatar
 */
export const getAvatarSizeClasses = (size: AvatarSize): string => {
  const sizeMap: Record<AvatarSize, string> = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  return sizeMap[size];
};

/**
 * Obtiene las clases CSS para la variante del menú
 */
export const getMenuVariantClasses = (variant: MenuVariant): string => {
  const variantMap: Record<MenuVariant, string> = {
    default: "hover:bg-gray-50 focus:bg-gray-50",
    danger:
      "text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700",
  };
  return variantMap[variant];
};

/**
 * Combina clases CSS
 */
export const combineClasses = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
