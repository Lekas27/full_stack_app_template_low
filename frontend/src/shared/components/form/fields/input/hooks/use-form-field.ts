import type { Ref } from "react";
import {
  type Control,
  type ControllerRenderProps,
  type FieldError,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  useController,
  type UseControllerProps,
  useWatch,
} from "react-hook-form";

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
> =
  // Avoid 'control' conflict and re-declare it with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> & {
    control: Control<TFieldValues, TContext, TTransformed>;
  };

type Return<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldRef: Ref<HTMLInputElement>;
  value: FieldPathValue<TFieldValues, TName>;
  onBlur: () => void;
  error: FieldError | undefined;
  fieldWatch: FieldPathValue<TFieldValues, TName>;
};

export const useInputFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
>({
  name,
  control,
  rules,
  defaultValue,
}: Props<TFieldValues, TName, TContext, TTransformed>): Return<TFieldValues, TName> => {
  // Narrow ONLY for useController: in your setup, it expects 3rd generic = TFieldValues
  const controlForController = control as unknown as Control<TFieldValues, TContext, TFieldValues>;

  const {
    field,
    field: { ref: fieldRef, value, onBlur },
    fieldState: { error },
  } = useController<TFieldValues, TName, TFieldValues>({
    name,
    control: controlForController,
    rules,
    defaultValue,
  });

  // useWatch typing varies across RHF versions; assert to the path's value type
  const fieldWatch = useWatch({ name, control, defaultValue }) as FieldPathValue<
    TFieldValues,
    TName
  >;

  return {
    field,
    fieldRef,
    value,
    onBlur,
    error,
    fieldWatch,
  };
};
