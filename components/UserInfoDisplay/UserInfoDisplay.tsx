import React, { useMemo } from "react";
import { User } from "@/types/user.types";
import { formatEmail } from "@/utils/user-display.utils";
import { UserAvatar } from "../UserAvatar/UserAvatar";

interface UserInfoDisplayProps {
  readonly user: User;
}

export const UserInfoDisplay: React.FC<UserInfoDisplayProps> = React.memo(
  ({ user }) => {
    const formattedEmail = useMemo(() => formatEmail(user.email), [user.email]);

    return (
      <div
        className='flex items-center space-x-3'
        role='group'
        aria-label='Información del usuario'
      >
        <UserAvatar user={user} size='md' />
        <div className='flex flex-col space-y-1 min-w-0 flex-1'>
          <p
            className='text-sm font-medium leading-none truncate'
            title={user.name}
            aria-label={`Nombre: ${user.name}`}
          >
            {user.name}
          </p>
          <p
            className='text-xs text-muted-foreground truncate'
            title={formattedEmail}
            aria-label={`Correo electrónico: ${formattedEmail}`}
          >
            {formattedEmail}
          </p>
          {user.role && (
            <p
              className='text-xs text-blue-600 font-medium truncate'
              title={user.role}
              aria-label={`Rol: ${user.role}`}
            >
              {user.role}
            </p>
          )}
        </div>
      </div>
    );
  }
);

UserInfoDisplay.displayName = "UserInfoDisplay";
