import { Root } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Root>;

export const Dialog: FC<Props> = ({ ...props }) => {
  return <Root data-slot="dialog" {...props} />;
};
