import { Root as CollapsibleRoot } from "@radix-ui/react-collapsible";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof CollapsibleRoot>;

/**
 * An interactive component which expands/collapses a panel.
 *
 * Reference: https://ui.shadcn.com/docs/components/collapsible
 */
export const Collapsible: FC<Props> = ({ className, ...props }) => {
  return (
    <CollapsibleRoot
      data-slot="collapsible"
      className={joinClasses("", className || "")}
      {...props}
    />
  );
};
