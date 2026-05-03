import {
  forwardRef,
  type ComponentProps,
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
import { RadioGroup } from "@/shared/components/ui/radio";
import { type Option } from "@/shared/components/ui/radio/types";

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    ComponentProps<typeof RadioGroup> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      itemClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      options: Option[];
    };

const RadioGroupFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  {
    id,
    name,
    className,
    itemClassName,
    label,
    tooltip,
    control,
    rules,
    defaultValue,
    options,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLDivElement>
) => {
  const {
    field: { value, onChange, onBlur },
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
        htmlFor={id}
        label={label}
        required={!!rules?.required}
        tooltip={tooltip}
      />
      <RadioGroup
        ref={ref}
        id={id || name}
        value={value}
        onValueChange={onChange}
        onBlur={onBlur}
        options={options}
        itemClassName={itemClassName}
        {...props}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export const RadioGroupFormField = forwardRef(RadioGroupFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLDivElement>;
  }
) => JSX.Element;
