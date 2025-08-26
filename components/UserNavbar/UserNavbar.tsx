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
            className='group relative flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-50/80 hover:bg-gray-100/80 focus:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 transition-all duration-200 ease-out backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50 hover:shadow-sm active:scale-98'
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
            className='w-80 p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl ring-1 ring-gray-900/5'
            align='end'
            sideOffset={4}
            role='menu'
            aria-label='Menú de opciones de usuario'
            data-testid={`${testId}-menu`}
          >
            <DropdownMenuLabel className='p-4'>
              <UserInfoDisplay user={user} />
            </DropdownMenuLabel>

            <DropdownMenuSeparator className='mx-6 bg-gray-200/60 h-px' />

            <div
              className='px-3 py-1'
              role='group'
              aria-label='Opciones de cuenta'
            >
              <MenuItem
                icon={<Settings className='h-5 w-5 text-gray-600' />}
                label='Configuración'
                onClick={handleSettings}
                data-testid={`${testId}-settings`}
              />

              {actions.onProfile && (
                <MenuItem
                  icon={<User className='h-5 w-5 text-gray-600' />}
                  label='Mi Perfil'
                  onClick={handleProfile}
                  data-testid={`${testId}-profile`}
                />
              )}
            </div>

            <DropdownMenuSeparator className='mx-6 bg-gray-200/60 h-px' />
            <div className='px-3 py-1 pb-3'>
              <MenuItem
                icon={<LogOut className='h-5 w-5 text-gray-600' />}
                label='Cerrar Sesión'
                onClick={handleLogout}
                variant='danger'
                data-testid={`${testId}-logout`}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

UserNavbar.displayName = "UserNavbar";
