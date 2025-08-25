import React, { useMemo } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User as UserType, UserActions } from "@/types/user.types";
import { generateUserMenuAriaLabel } from "@/utils/accessibility.utils";
import { combineClasses } from "@/utils/style.utils";
import { useUserActions } from "@/hooks/useUserActions";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { UserGreeting } from "../UserGreeting/UserGreeting";
import { UserInfoDisplay } from "../UserInfoDisplay/UserInfoDisplay";
import { MenuItem } from "../MenuItem/MenuItem";

interface UserNavbarProps {
  readonly user: UserType;
  readonly actions: UserActions;
  readonly className?: string;
  readonly "data-testid"?: string;
}

export const UserNavbar: React.FC<UserNavbarProps> = React.memo(
  ({
    user,
    actions,
    className = "",
    "data-testid": testId = "user-navbar",
  }) => {
    const { handleLogout, handleSettings, handleProfile } =
      useUserActions(actions);

    const ariaLabel = useMemo(() => generateUserMenuAriaLabel(user), [user]);
    const navbarClasses = useMemo(
      () => combineClasses("flex items-center space-x-4", className),
      [className]
    );

    return (
      <div
        className={navbarClasses}
        data-testid={testId}
        role='banner'
        aria-label='Navegación de usuario'
      >
        <UserGreeting user={user} />

        <DropdownMenu>
          <DropdownMenuTrigger
            className='focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all hover:opacity-80'
            aria-label={ariaLabel}
            aria-haspopup='menu'
            aria-expanded='false'
            data-testid={`${testId}-trigger`}
          >
            <div className='flex items-center space-x-2 cursor-pointer'>
              <UserAvatar user={user} />
              <ChevronDown
                className='h-4 w-4 text-gray-400 hidden sm:block'
                aria-hidden='true'
              />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-64 shadow-lg border-0 bg-white'
            align='end'
            sideOffset={4}
            role='menu'
            aria-label='Menú de opciones de usuario'
            data-testid={`${testId}-menu`}
          >
            <DropdownMenuLabel className='p-4'>
              <UserInfoDisplay user={user} />
            </DropdownMenuLabel>

            <DropdownMenuSeparator className='bg-gray-200' />

            <div role='group' aria-label='Opciones de cuenta'>
              <MenuItem
                icon={<Settings className='h-4 w-4' />}
                label='Configuración'
                onClick={handleSettings}
                data-testid={`${testId}-settings`}
              />

              {actions.onProfile && (
                <MenuItem
                  icon={<User className='h-4 w-4' />}
                  label='Mi Perfil'
                  onClick={handleProfile}
                  data-testid={`${testId}-profile`}
                />
              )}
            </div>

            <DropdownMenuSeparator className='bg-gray-200' />

            <MenuItem
              icon={<LogOut className='h-4 w-4' />}
              label='Cerrar Sesión'
              onClick={handleLogout}
              variant='danger'
              data-testid={`${testId}-logout`}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

UserNavbar.displayName = "UserNavbar";
