import { Root } from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Root>;

export const Popover: FC<Props> = ({ ...props }) => {
  return <Root data-slot="popover" {...props} />;
};
