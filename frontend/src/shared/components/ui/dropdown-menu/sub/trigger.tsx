import { SubTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof SubTrigger> & {
  inset?: boolean;
};

export const DropdownMenuSubTrigger: FC<Props> = ({
  className,
  inset,
  children,
  ...props
}) => {
  return (
    <SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={joinClasses(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-gray-50 focus:text-gray-900 data-[inset]:pl-8 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[state=open]:bg-gray-900 dark:data-[state=open]:text-gray-50",
        className || ""
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </SubTrigger>
  );
};
