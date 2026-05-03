import { type VariantProps, cva } from "class-variance-authority";
import {
  type DetailedHTMLProps,
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
    variants: {
      type: {
        ul: "list-disc",
        ol: "list-decimal",
      },
      variant: {
        "light-blue-box":
          "flex list-none items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20",
      },
    },
  }
);

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement & HTMLOListElement>,
  HTMLUListElement & HTMLOListElement
> &
  VariantProps<typeof variants> & {
    items?: ReactNode[];
    type?: "ul" | "ol";
    itemClassName?: string;
  };

export const List = forwardRef<HTMLUListElement & HTMLOListElement, Props>(
  (
    { className, type = "ul", items, itemClassName, variant, ...props },
    ref
  ) => {
    const Tag = type as keyof Pick<JSX.IntrinsicElements, "ul" | "ol">;

    return (
      <Tag
        ref={ref}
        className={mergeClasses(variants({ className, type, variant }))}
        {...props}
      >
        {items?.map((content, index) => (
          <li key={index} className={itemClassName}>
            {content}
          </li>
        ))}
      </Tag>
    );
  }
);

List.displayName = "List";
