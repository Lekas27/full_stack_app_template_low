import { Close } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Close>;

export const DialogClose: FC<Props> = ({ ...props }) => {
  return <Close data-slot="dialog-close" {...props} />;
};
