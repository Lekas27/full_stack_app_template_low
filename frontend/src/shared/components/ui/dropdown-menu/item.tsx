import { Item } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};

export const DropdownMenuItem: FC<Props> = ({
  className,
  inset,
  variant = "default",
  ...props
}) => {
  return (
    <Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={joinClasses(
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:cursor-pointer focus:bg-gray-100 focus:text-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:text-gray-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-gray-600",
        className || ""
      )}
      {...props}
    />
  );
};
