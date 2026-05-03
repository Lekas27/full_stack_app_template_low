import { Root } from "@radix-ui/react-label";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Root>;

export const Label: FC<Props> = ({ className, ...props }) => {
  return (
    <Root
      data-slot="label"
      className={joinClasses(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className || ""
      )}
      {...props}
    />
  );
};
