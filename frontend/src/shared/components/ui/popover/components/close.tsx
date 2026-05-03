import { Close } from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Close>;

export const PopoverClose: FC<Props> = ({ ...props }) => {
  return <Close data-slot="popover-close" {...props} />;
};
