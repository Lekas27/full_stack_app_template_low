import { Info } from "lucide-react";
import {
  forwardRef,
  useCallback,
  type FocusEvent,
  type JSX,
  type ReactNode,
  type Ref,
} from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import {
  NumberInput,
  type Props as NumberInputProps,
} from "@/shared/components/ui/number-input";
import { Paragraph } from "@/shared/components/ui/typography/paragraph";
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
    Omit<NumberInputProps, "value" | "onChange"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      inputClassName?: string;
      label?: ReactNode;
      labelClassName?: string;
      tooltip?: ReactNode;
      helpText?: string | ReactNode;
      infoMessage?: string;
      /** Strictly enforce min/max bounds during input */
      strictBounds?: boolean;
    };

const NumberInputFormFieldInner = <
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
    variant,
    label,
    labelClassName,
    tooltip,
    control,
    rules,
    defaultValue,
    helpText,
    infoMessage,
    strictBounds,
    ...rest
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLInputElement>
) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = useCallback(
    (value: number | null) => {
      onChange(value);
    },
    [onChange]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      // Check if input is empty and strictBounds is enabled
      const inputValue = event.target.value;
      if (
        strictBounds &&
        (!inputValue || inputValue.trim() === "") &&
        rest.min !== undefined
      ) {
        // Directly set the minimum value and prevent NumberInput's own blur logic
        onChange(rest.min);
        event.target.value = String(rest.min);
      }

      onBlur();
      rest.onBlur?.(event);
    },
    [onBlur, rest, strictBounds, onChange]
  );

  return (
    <div className={className}>
      <Label
        htmlFor={id}
        label={label}
        required={!!rules?.required}
        tooltip={tooltip}
        className={labelClassName || ""}
      />
      <div className={joinClasses(label ? "mt-2" : "", "relative")}>
        <NumberInput
          {...rest}
          ref={ref}
          id={id || name}
          className={inputClassName}
          variant={variant}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <ErrorMessage error={error} />
        {infoMessage && (
          <Paragraph className="mt-2 flex items-center gap-x-2 text-xs">
            <Info className="h-3 w-3" />
            <span>{infoMessage}</span>
          </Paragraph>
        )}
        {helpText && (
          <Paragraph className="mt-1 text-xs text-gray-500">
            {helpText}
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export const NumberInputFormField = forwardRef(NumberInputFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;
