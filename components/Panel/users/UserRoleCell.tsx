"use client";

import { USER_ROLES, UserRole } from "@/types/user.types";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Award, User as UserIcon } from "lucide-react";

interface Props {
  role: UserRole;
}

const ROLE_CONFIG = {
  [USER_ROLES.ADMIN]: {
    label: "Admin",
    icon: Shield,
    variant: "destructive" as const,
    className: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
  },
  [USER_ROLES.JURADO]: {
    label: "Jurado",
    icon: Award,
    variant: "secondary" as const,
    className:
      "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
  },
  [USER_ROLES.COORDINADOR]: {
    label: "Coordinador",
    icon: Users,
    variant: "default" as const,
    className: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
  },
  [USER_ROLES.USER]: {
    label: "Usuario",
    icon: UserIcon,
    variant: "outline" as const,
    className: "bg-gray-50 text-gray-600 hover:bg-gray-100",
  },
};

export function UserRoleCell({ role }: Props) {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG[USER_ROLES.USER];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} gap-1.5 font-medium`}
    >
      <Icon className='h-3 w-3' />
      {config.label}
    </Badge>
  );
}
