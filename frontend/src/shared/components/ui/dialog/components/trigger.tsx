import { Trigger } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Trigger>;

export const DialogTrigger: FC<Props> = ({ ...props }) => {
  return <Trigger data-slot="dialog-trigger" {...props} />;
};
