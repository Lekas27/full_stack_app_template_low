import { CollapsibleTrigger as RadixCollapsibleTrigger } from "@radix-ui/react-collapsible";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof RadixCollapsibleTrigger>;

export const CollapsibleTrigger: FC<Props> = ({ className, ...props }) => {
  return (
    <RadixCollapsibleTrigger
      data-slot="collapsible-trigger"
      className={joinClasses("", className || "")}
      {...props}
    />
  );
};
