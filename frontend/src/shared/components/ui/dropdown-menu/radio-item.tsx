import { ItemIndicator, RadioItem } from "@radix-ui/react-dropdown-menu";
import { CircleIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof RadioItem>;

export const DropdownMenuRadioItem: FC<Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RadioItem
      data-slot="dropdown-menu-radio-item"
      className={joinClasses(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-gray-100 focus:text-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className || ""
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
};
