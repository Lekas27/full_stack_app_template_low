import { Group } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Group>;

export const DropdownMenuGroup: FC<Props> = ({ ...props }) => {
  return <Group data-slot="dropdown-menu-group" {...props} />;
};
