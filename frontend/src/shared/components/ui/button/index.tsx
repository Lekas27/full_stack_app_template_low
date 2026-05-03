import { Loader2, Loader2Icon } from "lucide-react";
import type {
  ComponentProps,
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  SVGProps,
} from "react";

import { type ButtonVariantProps, buttonVariants } from "./styles/variants";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

type Props = ComponentProps<"button"> &
  ButtonVariantProps & {
    loading?: boolean;
    icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
    iconClassName?: string;
    iconPosition?: "start" | "end";
    children?: ReactNode;
  };

export const Button: FC<Props> = ({
  className,
  variant,
  color,
  size,
  shape,
  icon: Icon,
  iconClassName,
  iconPosition = "start",
  loading = false,
  children,
  type = "button",
  disabled,
  ...props
}) => {
  return (
    <button
      data-slot="button"
      className={mergeClasses(
        buttonVariants({ variant, color, size, shape, className })
      )}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading state replaces icon */}
      {loading && iconPosition === "start" && (
        <Loader2Icon className={mergeClasses("animate-spin", iconClassName)} />
      )}

      {/* Start icon */}
      {!loading && Icon && iconPosition === "start" && (
        <Icon className={iconClassName} />
      )}

      {/* Content */}
      {children && <span className="truncate">{children}</span>}

      {/* End icon */}
      {!loading && Icon && iconPosition === "end" && (
        <Icon className={iconClassName} />
      )}

      {/* Loading at end position */}
      {loading && iconPosition === "end" && (
        <Loader2 className={mergeClasses("animate-spin", iconClassName)} />
      )}
    </button>
  );
};
