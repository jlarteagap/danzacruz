import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, AvatarSize } from "@/types/user.types";
import { getInitials } from "@/utils/user-display.utils";
import { generateAvatarAlt } from "@/utils/accessibility.utils";
import { getAvatarSizeClasses, combineClasses } from "@/utils/style.utils";

interface UserAvatarProps {
  readonly user: User;
  readonly size?: AvatarSize;
  readonly className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = React.memo(
  ({ user, size = "sm", className = "" }) => {
    const sizeClasses = useMemo(() => getAvatarSizeClasses(size), [size]);
    const initials = useMemo(() => getInitials(user.name), [user.name]);
    const altText = useMemo(() => generateAvatarAlt(user), [user.name]);
    const avatarClasses = useMemo(
      () => combineClasses(sizeClasses, className),
      [sizeClasses, className]
    );

    return (
      <Avatar className={avatarClasses} role='img' aria-label={altText}>
        <AvatarImage
          src={user.avatar}
          alt={altText}
          loading='lazy'
          decoding='async'
        />
        <AvatarFallback
          className='bg-blue-600 text-white font-semibold'
          aria-hidden='true'
        >
          {initials}
        </AvatarFallback>
      </Avatar>
    );
  }
);

UserAvatar.displayName = "UserAvatar";
