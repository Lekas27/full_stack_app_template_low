import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";

import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

const inputVariants = cva(
  "transition-colors duration-150 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        /** Standard single‑line text */
        text: "block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400 disabled:dark:bg-gray-700",

        /** Numeric input */
        number:
          "block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400 disabled:dark:bg-gray-700",

        /** Date picker */
        date: "block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400 disabled:dark:bg-gray-700",

        /** Time picker */
        time: "block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400 disabled:dark:bg-gray-700",

        /** Checkbox */
        checkbox:
          "h-5 w-5 cursor-pointer rounded border border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:text-blue-400 dark:focus:ring-blue-400",

        /** Radio button */
        radio:
          "h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:text-blue-400 dark:focus:ring-blue-400",

        /** File picker */
        file: "w-[200px] rounded-md bg-transparent text-sm file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 file:hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none dark:file:bg-gray-700 dark:file:text-gray-200 dark:focus:ring-blue-400",

        /** Search **/
        search:
          "border-input focus:ring-ring rounded-md border px-3 py-1.5 text-sm ring-offset-[#00366a] focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-gray-600 dark:text-gray-300 [&>span]:line-clamp-1 [&>span]:pl-0 [&>span]:text-left",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  }
);

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> &
  VariantProps<typeof inputVariants> & {
    className?: string;
  };

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ variant, className, type = "text", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={mergeClasses(inputVariants({ variant, className }))}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
