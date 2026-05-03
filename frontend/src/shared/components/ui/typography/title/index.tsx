import { type VariantProps, cva } from "class-variance-authority";
import {
  type HTMLAttributes,
  type JSX,
  type ReactNode,
  forwardRef,
} from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

const variants = cva(
  "text-secondary-1 theme-transition text-base leading-6 dark:text-white",
  {
    variants: {},
  }
);

type Props = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof variants> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children?: ReactNode;
  };

export const Title = forwardRef<HTMLHeadingElement, Props>(
  ({ className, level = 1, children, ...props }, ref) => {
    const Tag = `h${level}` as keyof Pick<
      JSX.IntrinsicElements,
      "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    >;

    return (
      <Tag
        ref={ref}
        className={mergeClasses(variants({ className }))}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Title.displayName = "Title";
