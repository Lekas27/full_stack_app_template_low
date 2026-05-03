import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLProps, type ReactNode, forwardRef } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

const variants = cva(
  "text-secondary-1 theme-transition text-base leading-6 dark:text-white",
  {
    variants: {},
  }
);

type Props = HTMLProps<HTMLParagraphElement> &
  VariantProps<typeof variants> & {
    children?: ReactNode;
  };

export const Paragraph = forwardRef<HTMLParagraphElement, Props>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={mergeClasses(variants({ className }))} {...props}>
      {children}
    </p>
  )
);

Paragraph.displayName = "Paragraph";
