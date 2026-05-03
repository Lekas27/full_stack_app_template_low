import { Sub } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Sub>;

export const DropdownMenuSub: FC<Props> = ({ ...props }) => {
  return <Sub data-slot="dropdown-menu-sub" {...props} />;
};
