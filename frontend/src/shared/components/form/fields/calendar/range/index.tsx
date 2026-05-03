import {
  forwardRef,
  useCallback,
  type JSX,
  type ReactNode,
  type Ref,
} from "react";
import type { DateRange, Matcher, PropsRange } from "react-day-picker";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import { Calendar } from "@/shared/components/ui/calendar";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control" | "disabled"> &
    Omit<PropsRange, "selected" | "onSelect" | "mode"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      labelClassName?: string;
      calendarClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      onChange?: (value: DateRange | undefined) => void;
      disabled?: boolean | Matcher | Matcher[];
      numberOfMonths?: number;
    };

const CalendarRangeFormFieldInner = <
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
    calendarClassName,
    label,
    tooltip,
    control,
    rules,
    defaultValue,
    disabled,
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

  const handleSelect = useCallback(
    (newValue: DateRange | undefined) => {
      onChange(newValue);
      customOnChange?.(newValue);
    },
    [onChange, customOnChange]
  );

  // Handle disabled prop - if boolean, disable the whole field; if array/object, pass to calendar
  const isFormFieldDisabled = typeof disabled === "boolean" ? disabled : false;
  const calendarDisabled = typeof disabled === "boolean" ? undefined : disabled;

  return (
    <div ref={ref} className={className}>
      {label && (
        <Label
          htmlFor={id}
          label={label}
          required={!!rules?.required}
          tooltip={tooltip}
          className={labelClassName || ""}
        />
      )}
      <div className={joinClasses(label ? "mt-2" : "", "relative")}>
        <Calendar
          mode="range"
          selected={value}
          onSelect={isFormFieldDisabled ? undefined : handleSelect}
          disabled={calendarDisabled}
          className={joinClasses(
            "rounded-md border",
            isFormFieldDisabled ? "cursor-not-allowed opacity-50" : "",
            calendarClassName || ""
          )}
          {...props}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const CalendarRangeFormField = forwardRef(
  CalendarRangeFormFieldInner
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
