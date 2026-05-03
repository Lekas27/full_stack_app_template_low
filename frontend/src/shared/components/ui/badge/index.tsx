import { cva, type VariantProps } from "class-variance-authority";
import type { FC, HTMLAttributes } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
        red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
        yellow:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
        green:
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        indigo:
          "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
        purple:
          "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        pink: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
        outline:
          "border border-current bg-transparent text-current dark:border-current",
        danger: "bg-red-500 text-white dark:bg-red-600 dark:text-white",
      },
      size: {
        default: "px-2 py-1",
        sm: "h-4 min-w-[1.125rem] px-1.5 py-0.5 text-xs",
        count: "h-5 min-w-[1.25rem] px-1 py-0.5 text-xs font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* ───────────────────────────── Component API ─────────────────────────────── */
export type Props = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    className?: string;
  };

/* --------------------------------------------------------------------------- */
export const Badge: FC<Props> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => (
  <span
    className={mergeClasses(badgeVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </span>
);
