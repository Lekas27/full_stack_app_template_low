import { type VariantProps, cva } from "class-variance-authority";
import {
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
  forwardRef,
} from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

const variants = cva("theme-transition disabled:cursor-not-allowed", {
  variants: {
    variant: {
      text: "text-secondary-1 dark:text-gray-1 border-gray-3 dark:border-dark-1 primary-ring block w-full rounded-md border bg-white px-2.5 py-1.5 text-sm outline-none placeholder:text-gray-400 disabled:bg-gray-100 sm:leading-6 dark:bg-gray-900 disabled:dark:bg-gray-700",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  VariantProps<typeof variants> & {
    textareaClassName?: string;
    field?: ControllerRenderProps<FieldValues, string>;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, className, variant, field, textareaClassName, ...props }, ref) => (
    <textarea
      ref={ref}
      name={name}
      className={mergeClasses(
        variants({ className: textareaClassName, variant })
      )}
      {...field}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
