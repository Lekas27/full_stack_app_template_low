import { Trigger } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Trigger>;

export const DropdownMenuTrigger: FC<Props> = ({ ...props }) => {
  return <Trigger data-slot="dropdown-menu-trigger" {...props} />;
};
