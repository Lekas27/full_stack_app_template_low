import { Portal } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Portal>;

export const DialogPortal: FC<Props> = ({ ...props }) => {
  return <Portal data-slot="dialog-portal" {...props} />;
};
