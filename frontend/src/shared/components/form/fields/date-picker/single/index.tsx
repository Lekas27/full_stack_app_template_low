import {
  forwardRef,
  useCallback,
  type JSX,
  type ReactNode,
  type Ref,
} from "react";
import type { Matcher } from "react-day-picker";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import type { DatePickerTypeSingle } from "@/shared/components/ui/date-picker/common/types/date-picker";
import {
  DatePicker,
  type Props as DatePickerProps,
} from "@/shared/components/ui/date-picker/single";
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
    Omit<DatePickerProps, "value" | "onChange"> & {
      id?: string;
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      className?: string;
      labelClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      onChange?: (value: DatePickerTypeSingle) => void;
      dayPickerDisabled?: Matcher | Matcher[];
      inputClassName?: string;
      disabled?: boolean;
    };

const DatePickerSingleFormFieldInner = <
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
    dayPickerDisabled,
    inputClassName,
    disabled,
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
    (newValue: DatePickerTypeSingle) => {
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
        <DatePicker
          value={value}
          onChange={handleChange}
          dayPickerDisabled={dayPickerDisabled}
          inputClassName={inputClassName}
          disabled={disabled}
          {...props}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const DatePickerSingleFormField = forwardRef(
  DatePickerSingleFormFieldInner
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
