import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { Item } = CommandPrimitive;
const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Item>;

export const CommandItem: FC<Props> = ({ className, ...props }) => {
  return (
    <Item
      data-slot="command-item"
      className={joinClasses(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className || ""
      )}
      {...props}
    />
  );
};
