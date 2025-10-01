export const USER_ROLES = {
  ADMIN: "admin",
  JURADO: "jurado",
  COORDINADOR: "coordinador",
  USER: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
  role: UserRole;
  readonly createdAt: string;
  readonly phone?: string;
}

export interface UserActions {
  readonly onLogout: () => void | Promise<void>;
  readonly onSettings: () => void | Promise<void>;
  readonly onProfile?: () => void | Promise<void>;
}

export type AvatarSize = "sm" | "md" | "lg";
export type MenuVariant = "default" | "danger";

export interface UpdateUserRoleDto {
  userId: string;
  newRole: UserRole;
}

export interface UpdateUserRoleResponse {
  success: boolean;
  user: User;
}
