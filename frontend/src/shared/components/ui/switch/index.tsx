import {
  Root as SwitchRoot,
  Thumb as SwitchThumb,
} from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses, mergeClasses } = classNameManager;

/* ─────────────────────────────────── Variants ────────────────────────────────── */

const switchVariants = cva(
  "peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=unchecked]:bg-input inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      /** Overall dimensions */
      size: {
        sm: "h-4 w-8 [&_[data-slot=thumb]]:h-3 [&_[data-slot=thumb]]:w-3 [&_[data-slot=thumb][data-state=checked]]:translate-x-4",
        md: "h-6 w-11 [&_[data-slot=thumb]]:h-5 [&_[data-slot=thumb]]:w-5 [&_[data-slot=thumb][data-state=checked]]:translate-x-5",
        lg: "h-7 w-14 [&_[data-slot=thumb]]:h-6 [&_[data-slot=thumb]]:w-6 [&_[data-slot=thumb][data-state=checked]]:translate-x-6",
      },

      /** Track color when the switch is **on** */
      variant: {
        primary: "data-[state=checked]:bg-primary",
        success: "data-[state=checked]:bg-green-600",
        danger: "data-[state=checked]:bg-red-600",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

/* ────────────────────── Helper maps for spinner sizing/color ─────────────────── */

const spinnerSizeByVariant = {
  sm: "h-2.5 w-2.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

const spinnerColorByVariant = {
  primary: "text-primary",
  success: "text-green-600",
  danger: "text-red-600",
} as const;

export type Props = ComponentPropsWithoutRef<typeof SwitchRoot> &
  VariantProps<typeof switchVariants> & {
    className?: string;
    /** Shows a spinner inside the thumb and disables the switch while true. */
    loading?: boolean;
  };

/* ───────────────────────────────── Component ─────────────────────────────────── */

export const Switch = forwardRef<ComponentRef<typeof SwitchRoot>, Props>(
  (
    {
      size,
      variant,
      className,
      loading = false,
      disabled: disabledProp,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabledProp || loading;

    return (
      <SwitchRoot
        ref={ref}
        disabled={isDisabled}
        className={mergeClasses(switchVariants({ size, variant, className }))}
        {...rest}
      >
        <SwitchThumb
          data-slot="thumb"
          /* `flex` centre keeps the spinner perfectly aligned */
          className="pointer-events-none flex items-center justify-center rounded-full bg-gray-50 shadow-lg ring-0 transition-transform dark:bg-gray-900"
        >
          {loading && (
            <Loader
              className={joinClasses(
                "animate-spin",
                spinnerSizeByVariant[
                  (size ?? "md") as keyof typeof spinnerSizeByVariant
                ],
                spinnerColorByVariant[
                  (variant ?? "primary") as keyof typeof spinnerColorByVariant
                ]
              )}
            />
          )}
        </SwitchThumb>
      </SwitchRoot>
    );
  }
);

Switch.displayName = "Switch";
