import { cva, type VariantProps } from "class-variance-authority";
import type { FC, HTMLAttributes } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

export const dotVariants = cva("inline-block rounded-full", {
  variants: {
    variant: {
      default: "bg-gray-500 dark:bg-gray-400",
      red: "bg-red-500 dark:bg-red-400",
      yellow: "bg-yellow-500 dark:bg-yellow-400",
      green: "bg-green-500 dark:bg-green-400",
      blue: "bg-blue-500 dark:bg-blue-400",
      indigo: "bg-indigo-500 dark:bg-indigo-400",
      purple: "bg-purple-500 dark:bg-purple-400",
      pink: "bg-pink-500 dark:bg-pink-400",
      orange: "bg-orange-500 dark:bg-orange-400",
      teal: "bg-teal-500 dark:bg-teal-400",
      cyan: "bg-cyan-500 dark:bg-cyan-400",
      outline: "border-2 border-current bg-transparent",
    },
    size: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
    },
    pulse: {
      true: "animate-pulse",
      false: "",
    },
    ring: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    pulse: false,
    ring: false,
  },
});

export const ringVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-gray-500/10 dark:bg-gray-400/10",
        red: "bg-red-500/10 dark:bg-red-400/10",
        yellow: "bg-yellow-500/10 dark:bg-yellow-400/10",
        green: "bg-green-500/10 dark:bg-green-400/10",
        blue: "bg-blue-500/10 dark:bg-blue-400/10",
        indigo: "bg-indigo-500/10 dark:bg-indigo-400/10",
        purple: "bg-purple-500/10 dark:bg-purple-400/10",
        pink: "bg-pink-500/10 dark:bg-pink-400/10",
        orange: "bg-orange-500/10 dark:bg-orange-400/10",
        teal: "bg-teal-500/10 dark:bg-teal-400/10",
        cyan: "bg-cyan-500/10 dark:bg-cyan-400/10",
        outline: "",
      },
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
      },
    },
  }
);

/* ───────────────────────────── Component API ─────────────────────────────── */
export type Props = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dotVariants> & {
    className?: string;
  };

/* --------------------------------------------------------------------------- */
export const Dot: FC<Props> = ({
  className,
  variant,
  size,
  pulse,
  ring,
  ...props
}) => {
  if (ring)
    return (
      <div
        className={mergeClasses(ringVariants({ variant, size }), className)}
        {...props}
      >
        <span className={dotVariants({ variant, size, pulse })} />
      </div>
    );

  return (
    <div
      className={mergeClasses(dotVariants({ variant, size, pulse, className }))}
      {...props}
    />
  );
};
