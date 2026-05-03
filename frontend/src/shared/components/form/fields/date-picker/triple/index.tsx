import { forwardRef, type JSX, type ReactNode, type Ref } from "react";
import {
  type Control,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import { TripleSelectDatePicker } from "@/shared/components/ui/date-picker/triple";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

type Props<TFieldValues extends FieldValues = FieldValues> =
  UseControllerProps<TFieldValues> & {
    id?: string;
    className?: string;
    labelClassName?: string;
    label?: ReactNode;
    tooltip?: ReactNode;
    control: Control<TFieldValues>;
    minDate?: Date;
    maxDate?: Date;
    startYear?: number;
    endYear?: number;
    showCalendar?: boolean;
  };

const TripleDatePickerFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues
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
    minDate,
    maxDate,
    startYear,
    endYear,
    showCalendar,
  }: Props<TFieldValues>,
  ref: Ref<HTMLDivElement>
) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

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
        <TripleSelectDatePicker
          value={value as Date | undefined}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          startYear={startYear}
          endYear={endYear}
          showCalendar={showCalendar}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const TripleDatePickerFormField = forwardRef(
  TripleDatePickerFormFieldInner
) as <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues> & { ref?: Ref<HTMLDivElement> }
) => JSX.Element;
