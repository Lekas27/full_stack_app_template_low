import { Portal } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Portal>;

export const DropdownMenuPortal: FC<Props> = ({ ...props }) => {
  return <Portal data-slot="dropdown-menu-portal" {...props} />;
};
