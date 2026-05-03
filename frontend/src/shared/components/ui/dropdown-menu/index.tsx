import { Root } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Root>;

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 *
 * Reference: https://ui.shadcn.com/docs/components/dropdown-menu
 */
export const DropdownMenu: FC<Props> = ({ ...props }) => {
  return <Root data-slot="dropdown-menu" {...props} />;
};
