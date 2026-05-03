import { Portal } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Portal>;

export const SheetPortal: FC<Props> = (props) => <Portal data-slot="sheet-portal" {...props} />;
