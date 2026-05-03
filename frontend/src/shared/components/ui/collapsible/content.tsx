import { CollapsibleContent as RadixCollapsibleContent } from "@radix-ui/react-collapsible";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof RadixCollapsibleContent>;

export const CollapsibleContent: FC<Props> = ({ className, ...props }) => {
  return (
    <RadixCollapsibleContent
      data-slot="collapsible-content"
      className={joinClasses(
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down data-[state=closed]:overflow-hidden data-[state=open]:overflow-visible",
        className || ""
      )}
      {...props}
    />
  );
};
