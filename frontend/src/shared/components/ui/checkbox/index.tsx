import { Indicator, Root } from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, MinusIcon, XIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const checkboxVariants = cva(
  "peer shrink-0 cursor-pointer border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        secondary:
          "border-secondary bg-secondary/10 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary focus-visible:border-secondary focus-visible:ring-secondary/50",
        destructive:
          "border-destructive/50 bg-destructive/10 data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
        success:
          "border-green-500/50 bg-green-50 focus-visible:border-green-500 focus-visible:ring-green-500/50 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white",
        warning:
          "border-yellow-500/50 bg-yellow-50 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/50 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white",
        outline:
          "border-input data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 border-2 bg-transparent",
      },
      size: {
        sm: "size-3 rounded-[2px]",
        default: "size-4 rounded-[4px]",
        lg: "size-5 rounded-[6px]",
        xl: "size-6 rounded-[8px]",
      },
      shape: {
        square: "",
        rounded: "rounded-md",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "square",
    },
  }
);

const indicatorVariants = cva(
  "flex items-center justify-center text-current transition-none",
  {
    variants: {
      size: {
        sm: "[&>svg]:size-2",
        default: "[&>svg]:size-3.5",
        lg: "[&>svg]:size-4",
        xl: "[&>svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type Props = ComponentProps<typeof Root> &
  VariantProps<typeof checkboxVariants> & {
    indeterminate?: boolean;
    icon?: "check" | "minus" | "x";
  };

export const Checkbox: FC<Props> = ({
  className,
  variant = "default",
  size = "default",
  shape = "square",
  indeterminate = false,
  icon = "check",
  ...props
}) => {
  const getIcon = () => {
    if (indeterminate) return <MinusIcon />;

    switch (icon) {
      case "minus":
        return <MinusIcon />;
      case "x":
        return <XIcon />;
      default:
        return <CheckIcon />;
    }
  };

  return (
    <Root
      data-slot="checkbox"
      className={joinClasses(
        checkboxVariants({ variant, size, shape }),
        className || ""
      )}
      {...props}
    >
      <Indicator
        data-slot="checkbox-indicator"
        className={indicatorVariants({ size })}
      >
        {getIcon()}
      </Indicator>
    </Root>
  );
};
