export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
  readonly role?: string;
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
