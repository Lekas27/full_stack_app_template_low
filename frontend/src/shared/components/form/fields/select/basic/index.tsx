import {
  forwardRef,
  useCallback,
  useMemo,
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
import type { ActionMeta, MultiValue, SingleValue } from "react-select";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { SelectItemsList } from "@/shared/components/form/fields/select/common/components/select-items-list";
import { useBulkSelect } from "@/shared/components/form/fields/select/common/hooks/use-bulk-select";
import { useSelectInputHandler } from "@/shared/components/form/fields/select/common/hooks/use-select-input-handler";
import { Label } from "@/shared/components/form/label";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  type Props as SelectProps,
} from "@/shared/components/ui/select/basic";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";
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
    Omit<SelectProps, "value" | "field"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      label?: ReactNode;
      labelClassName?: string;
      tooltip?: ReactNode;
      hasBulkSelect?: boolean;
      allowSubmitOnEnter?: boolean;
      inputValue?: SelectProps["inputValue"];
      onInputChange?: SelectProps["onInputChange"];
      preventInputValueOnBlur?: boolean;
      /** Hide rendered values in control for multi-select */
      hideSelectedInControl?: boolean;
      /** Render selected options below the field (multi-select) */
      displaySelectedBelow?: boolean;
    };

const SelectFormFieldInner = <
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
    options,
    control,
    rules,
    defaultValue,
    hasBulkSelect = false,
    onChange: customOnChange,
    isLoading,
    inputValue,
    onInputChange,
    preventInputValueOnBlur = false,
    hideSelectedInControl = false,
    displaySelectedBelow = false,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLDivElement>
) => {
  const {
    field,
    field: { value, onChange },
    fieldState: { error },
  } = useController<TFieldValues, TName, TTransformed>({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleSelectAll = useBulkSelect(hasBulkSelect, options, onChange);
  const handleInputChange = useSelectInputHandler(
    preventInputValueOnBlur,
    onInputChange
  );

  const handleOnChange = useCallback(
    (
      value: SingleValue<SelectOption> | MultiValue<SelectOption>,
      actionMeta: ActionMeta<SelectOption>
    ) => {
      if (preventInputValueOnBlur && inputValue) {
        onInputChange?.("", {
          action: "input-change",
          prevInputValue: "",
        });
      }

      customOnChange?.(value, actionMeta);
      onChange(value);
    },
    [
      customOnChange,
      inputValue,
      onChange,
      onInputChange,
      preventInputValueOnBlur,
    ]
  );
  /**
   * If the field is multi-select and the selected options are hidden in the control,
   * we don't want to render the selected options in the control.
   */
  const shouldRenderValue = useMemo(
    () => !(props.isMulti && hideSelectedInControl),
    [props.isMulti, hideSelectedInControl]
  );

  return (
    <div ref={ref} className={className}>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          label={label}
          required={!!rules?.required}
          tooltip={tooltip}
          className={joinClasses(labelClassName || "")}
        />
        {hasBulkSelect && !isLoading && (
          <Button
            type="button"
            className="border-none !bg-transparent px-[0.2rem] py-[0.1rem] text-[0.7rem] font-normal shadow-none hover:underline"
            onClick={handleSelectAll}
          >
            Select All
          </Button>
        )}
      </div>

      <div className={joinClasses(label ? "mt-2" : "", "relative")}>
        <Select
          {...field}
          value={value}
          options={options}
          isLoading={isLoading}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={handleOnChange}
          controlShouldRenderValue={shouldRenderValue}
          {...props}
        />
      </div>

      <SelectItemsList
        name={name}
        control={control}
        isMulti={props.isMulti}
        displaySelectedBelow={displaySelectedBelow}
        onChange={handleOnChange}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export const SelectFormField = forwardRef(SelectFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLElement>;
  }
) => JSX.Element;
