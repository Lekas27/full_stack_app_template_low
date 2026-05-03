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
  Switch,
  type Props as SwitchProps,
} from "@/shared/components/ui/switch";

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    Omit<SwitchProps, "name" | "onChange"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      switchClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      onChange?: (value: boolean) => void;
    };

const SwitchFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  {
    id,
    name,
    className,
    switchClassName,
    label,
    tooltip,
    control,
    rules,
    defaultValue,
    onChange: onChangeCallback,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLButtonElement> // assumes native button (can adjust based on Switch internals)
) => {
  const {
    field: { ref: fieldRef, onChange },
    fieldState: { error },
  } = useController<TFieldValues, TName, TTransformed>({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <div className={className}>
      <div className="relative flex items-center gap-4">
        <Switch
          {...props}
          ref={ref || fieldRef}
          className={switchClassName}
          name={name}
          onCheckedChange={(value) => {
            onChange(value);
            if (onChangeCallback) onChangeCallback(value);
          }}
        >
          <Label
            htmlFor={id}
            label={label}
            required={!!rules?.required}
            tooltip={tooltip}
          />
        </Switch>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const SwitchFormField = forwardRef(SwitchFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLButtonElement>;
  }
) => JSX.Element;
