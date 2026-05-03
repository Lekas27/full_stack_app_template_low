import { cva, type VariantProps } from "class-variance-authority";
import { Bell, Zap } from "lucide-react";
import type { FC, HTMLAttributes } from "react";

import LogoImage from "./images/logo.png";

import { Paragraph } from "@/shared/components/ui/typography/paragraph";
import { Title } from "@/shared/components/ui/typography/title";
import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

export const comingSoonCardVariants = cva(
  "w-full rounded-md border p-6 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "hover:shadow-lg focus:z-10 focus:ring-2 focus:ring-offset-1",
        minimal: "border-dashed",
        elevated: "shadow-md hover:shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ───────────────────────────── Component API ─────────────────────────────── */
export type Props = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof comingSoonCardVariants> & {
    feature: string;
    title?: string;
    description?: string;
    showLogo?: boolean;
    showAnimation?: boolean;
    className?: string;
  };

/* --------------------------------------------------------------------------- */

/**
 * Displays a coming soon card with customizable content and animations.
 * Used to indicate features that are under development.
 */
export const ComingSoonCard: FC<Props> = ({
  feature,
  title = "Coming Soon",
  description = "We're working on something amazing!",
  showLogo = true,
  showAnimation = true,
  variant,
  className,
  ...props
}) => {
  return (
    <div
      data-slot="coming-soon-card"
      className={mergeClasses(comingSoonCardVariants({ variant }), className)}
      {...props}
    >
      {showLogo && (
        <div className="mb-6 flex justify-center">
          <img src={LogoImage} alt="Logo" className="h-16 w-auto" />
        </div>
      )}

      <Title className="mb-3 text-center text-3xl font-bold">{title}</Title>

      <Paragraph className="mb-6 text-center text-gray-600 dark:text-gray-300">
        {description}
      </Paragraph>

      <div className="group mb-6 rounded-lg bg-blue-50 p-4 transition-all duration-200 dark:bg-blue-900/20">
        <div className="mb-1 flex items-center justify-center gap-2">
          <Zap className="h-4 w-4 text-blue-600 transition-transform duration-200 group-hover:scale-110 dark:text-blue-400" />
          <Paragraph className="text-center font-semibold text-blue-900 dark:text-blue-100">
            {feature}
          </Paragraph>
        </div>
        <Paragraph className="text-center text-sm text-blue-700 dark:text-blue-200">
          will be available shortly
        </Paragraph>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
          Stay tuned for updates!
        </Paragraph>
      </div>

      {showAnimation && (
        <div className="mt-4 flex justify-center gap-1.5">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      )}
    </div>
  );
};
