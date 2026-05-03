import { forwardRef, type JSX, type ReactNode, type Ref } from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import {
  FileInput,
  type Props as FileInputProps,
} from "@/shared/components/ui/file-input";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    FileInputProps & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      inputClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      showDropzoneFiles?: boolean;
    };

const FileInputFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  {
    id,
    name,
    className,
    inputClassName,
    label,
    tooltip,
    control,
    rules,
    defaultValue,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLInputElement>
) => {
  const {
    field,
    field: { ref: fieldRef },
    fieldState: { error },
  } = useController<TFieldValues, TName, TTransformed>({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <div className={className}>
      <Label
        htmlFor={id || name}
        label={label}
        required={!!rules?.required}
        tooltip={tooltip}
      />
      <div>
        <div
          className={joinClasses(
            label ? "mt-2" : "",
            "relative flex items-center gap-4"
          )}
        >
          <FileInput
            {...field} // This includes onChange, onBlur, value, and name
            ref={fieldRef || ref}
            id={id || name}
            className={joinClasses(inputClassName || "")}
            {...props}
          />
        </div>
        <ErrorMessage error={error} />
      </div>
    </div>
  );
};

export const FileInputFormField = forwardRef(FileInputFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;
