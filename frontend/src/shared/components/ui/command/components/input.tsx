import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { Input } = CommandPrimitive;
const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Input>;

export const CommandInput: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <Input
        data-slot="command-input"
        className={joinClasses(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className || ""
        )}
        {...props}
      />
    </div>
  );
};
