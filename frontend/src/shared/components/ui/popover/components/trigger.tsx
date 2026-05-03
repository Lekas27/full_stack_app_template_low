import { Trigger } from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Trigger>;

export const PopoverTrigger: FC<Props> = ({ ...props }) => {
  return <Trigger data-slot="popover-trigger" {...props} />;
};
