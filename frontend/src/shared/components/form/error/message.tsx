import type { FC } from "react";
import type { FieldError } from "react-hook-form";

type Props = { error?: FieldError };

export const ErrorMessage: FC<Props> = ({ error }) => (
  <>
    {error && (
      <p className="mt-1 text-sm whitespace-normal text-red-600 transition duration-500 dark:text-red-500">
        {error.message}
      </p>
    )}
  </>
);
