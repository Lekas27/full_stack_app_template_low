import {
  forwardRef,
  useCallback,
  type JSX,
  type ReactNode,
  type Ref,
} from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import type { DatePickerTypeMultiple } from "@/shared/components/ui/date-picker/common/types/date-picker";
import {
  DatePickerMultiple,
  type Props as DatePickerMultipleProps,
} from "@/shared/components/ui/date-picker/multiple";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    Omit<DatePickerMultipleProps, "value" | "onChange"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      labelClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      onChange?: (value: DatePickerTypeMultiple) => void;
    };

const DatePickerMultipleFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  {
    id,
    name,
    className,
    labelClassName,
    label,
    tooltip,
    control,
    rules,
    defaultValue,
    onChange: customOnChange,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLDivElement>
) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<TFieldValues, TName, TTransformed>({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = useCallback(
    (newValue: DatePickerTypeMultiple) => {
      onChange(newValue);
      customOnChange?.(newValue);
    },
    [onChange, customOnChange]
  );

  return (
    <div ref={ref} className={className}>
      <Label
        htmlFor={id}
        label={label}
        required={!!rules?.required}
        tooltip={tooltip}
        className={labelClassName || ""}
      />
      <div className={joinClasses(label ? "mt-2" : "", "relative")}>
        <DatePickerMultiple value={value} onChange={handleChange} {...props} />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const DatePickerMultipleFormField = forwardRef(
  DatePickerMultipleFormFieldInner
) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLDivElement>;
  }
) => JSX.Element;
