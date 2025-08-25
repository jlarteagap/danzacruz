import React, { useCallback, useMemo } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MenuVariant } from "@/types/user.types";
import { getMenuVariantClasses, combineClasses } from "../../utils/style.utils";

interface MenuItemProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly onClick: () => void | Promise<void>;
  readonly variant?: MenuVariant;
  readonly "data-testid"?: string;
}

export const MenuItem: React.FC<MenuItemProps> = React.memo(
  ({ icon, label, onClick, variant = "default", "data-testid": testId }) => {
    const handleClick = useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault();
        await onClick();
      },
      [onClick]
    );

    const variantClasses = useMemo(
      () => getMenuVariantClasses(variant),
      [variant]
    );
    const itemClasses = useMemo(
      () => combineClasses("cursor-pointer transition-colors", variantClasses),
      [variantClasses]
    );

    return (
      <DropdownMenuItem
        onClick={handleClick}
        className={itemClasses}
        data-testid={testId}
        role='menuitem'
        tabIndex={0}
      >
        <span className='mr-3 flex-shrink-0' aria-hidden='true'>
          {icon}
        </span>
        <span className='truncate'>{label}</span>
      </DropdownMenuItem>
    );
  }
);

MenuItem.displayName = "MenuItem";
