import { Root } from "@radix-ui/react-dialog";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Root>;

/**
 * Extends the Dialog component to display content that complements the main content of the screen.
 *
 * Reference: https://ui.shadcn.com/docs/components/sheet
 */
export const Sheet: FC<Props> = (props) => <Root data-slot="sheet" {...props} />;
