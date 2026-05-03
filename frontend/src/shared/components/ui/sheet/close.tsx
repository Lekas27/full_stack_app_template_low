import { Close } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Close>;

export const SheetClose: FC<Props> = (props) => <Close data-slot="sheet-close" {...props} />;
