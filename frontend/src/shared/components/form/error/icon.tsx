import { CircleAlertIcon } from "lucide-react";
import type { FC } from "react";
import type { FieldError } from "react-hook-form";

type Props = { error?: FieldError };

export const ErrorIcon: FC<Props> = ({ error }) => (
  <>
    {error && (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <CircleAlertIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    )}
  </>
);
