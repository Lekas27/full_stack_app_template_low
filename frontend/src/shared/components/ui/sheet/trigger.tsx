import { Trigger } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Trigger>;

export const SheetTrigger: FC<Props> = (props) => <Trigger data-slot="sheet-trigger" {...props} />;
