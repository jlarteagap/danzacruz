import React, { useMemo } from "react";
import { User } from "types/user.types";
import { getFirstName } from "@/utils/user-display.utils";
import { generateGreetingAriaLabel } from "@/utils/accessibility.utils";
import { combineClasses } from "@/utils/style.utils";

interface UserGreetingProps {
  readonly user: User;
  readonly className?: string;
}

export const UserGreeting: React.FC<UserGreetingProps> = React.memo(
  ({ user, className = "" }) => {
    const firstName = useMemo(() => getFirstName(user.name), [user.name]);
    const ariaLabel = useMemo(
      () => generateGreetingAriaLabel(user),
      [user.name]
    );
    const greetingClasses = useMemo(
      () =>
        combineClasses(
          "text-gray-700 font-medium text-sm hidden md:block",
          className
        ),
      [className]
    );

    return (
      <span className={greetingClasses} aria-label={ariaLabel}>
        Hola, <span className='font-semibold'>{firstName}</span>
      </span>
    );
  }
);

UserGreeting.displayName = "UserGreeting";
