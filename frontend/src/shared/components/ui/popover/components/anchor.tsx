import { Anchor } from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Anchor>;

export const PopoverAnchor: FC<Props> = ({ ...props }) => {
  return <Anchor data-slot="popover-anchor" {...props} />;
};
