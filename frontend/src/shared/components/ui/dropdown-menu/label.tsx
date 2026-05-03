import { Label } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Label> & {
  inset?: boolean;
};

export const DropdownMenuLabel: FC<Props> = ({
  className,
  inset,
  ...props
}) => {
  return (
    <Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={joinClasses(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className || ""
      )}
      {...props}
    />
  );
};
