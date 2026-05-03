import { cva, type VariantProps } from "class-variance-authority";
import type { FC, HTMLAttributes } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

export const cardVariants = cva(
  "flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50",
        gradient:
          "bg-gradient-to-br from-white via-emerald-50/50 to-green-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-emerald-900/20",
        blueGradient:
          "bg-gradient-to-br from-white via-gray-50/80 to-blue-50/40 dark:from-gray-900 dark:via-gray-800/80 dark:to-blue-900/20",
        purpleGradient:
          "bg-gradient-to-br from-white via-purple-50/80 to-indigo-50/40 dark:from-gray-900 dark:via-gray-800/80 dark:to-purple-900/20",
        greenGradient:
          "bg-gradient-to-br from-white via-emerald-50/80 to-green-50/40 dark:from-gray-900 dark:via-gray-800/80 dark:to-emerald-900/20",
        orangeGradient:
          "bg-gradient-to-br from-white via-orange-50/80 to-amber-50/40 dark:from-gray-900 dark:via-gray-800/80 dark:to-orange-900/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type Props = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    className?: string;
  };

/**
 * Displays a card with header, content, and footer.
 *
 * Reference: https://ui.shadcn.com/docs/components/card
 */
export const Card: FC<Props> = ({ className, variant, ...props }) => {
  return (
    <div
      data-slot="card"
      className={mergeClasses(cardVariants({ variant }), className)}
      {...props}
    />
  );
};
