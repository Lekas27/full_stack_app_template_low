import {
  forwardRef,
  useCallback,
  type Dispatch,
  type JSX,
  type KeyboardEventHandler,
  type ReactNode,
  type Ref,
  type SetStateAction,
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
import { CopyButton } from "@/shared/components/ui/copy-button";
import type { SelectOption } from "@/shared/components/ui/select/common/types/options";
import {
  CreatableSelect,
  type Props as SelectProps,
} from "@/shared/components/ui/select/creatable";
import { Paragraph } from "@/shared/components/ui/typography/paragraph";
import { Span } from "@/shared/components/ui/typography/span";
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
      selectClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      allowSubmitOnEnter?: boolean;
      copyable?: boolean;
      showBulkInsertInfo?: boolean;
      bulkInsertItem?: string;
      preventInputValueOnBlur?: boolean;
      inputValue: string;
      // Separate state updater is needed for input value, as its not the same type as onInputChange
      onInputValue: Dispatch<SetStateAction<string>>;
    };

/**
 * NOTE: Implementation of this component is picked up from S2S, it should be refined.
 * Create storybook after that.
 *
 * JIRA:  https://coinis.atlassian.net/browse/META-49
 */
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
    selectClassName,
    label,
    tooltip,
    options,
    control,
    rules,
    defaultValue,
    onCreateOption: customOnCreateOption,
    isLoading,
    copyable,
    showBulkInsertInfo,
    bulkInsertItem,
    preventInputValueOnBlur = false,
    inputValue,
    onInputValue,
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

  const createOption = useCallback(
    (label: string) => ({
      label,
      value: label,
    }),
    []
  );

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (!inputValue) return;

      switch (event.key) {
        case "Enter":
          event.preventDefault();

          onInputValue("");

          if (customOnCreateOption)
            return onChange(customOnCreateOption(inputValue));

          onChange([...value, createOption(inputValue)]);
      }
    },
    [
      createOption,
      customOnCreateOption,
      inputValue,
      onChange,
      onInputValue,
      value,
    ]
  );

  return (
    <div ref={ref} className={className}>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          label={label}
          required={!!rules?.required}
          tooltip={tooltip}
        />
      </div>
      {showBulkInsertInfo && (
        <Paragraph className="text-secondary-2 mt-1 mb-2 text-sm">
          You can bulk insert multiple {bulkInsertItem} by pasting it below.
          After you paste it, click Enter to apply. Delimiter is{" "}
          <Span className="!border-gray-3 dark:!border-dark-1 border bg-gray-100 px-1 dark:bg-gray-700">
            ,
          </Span>
        </Paragraph>
      )}
      <div>
        <div
          className={joinClasses(
            label ? "mt-2" : "",
            "relative flex items-start gap-4"
          )}
        >
          <CreatableSelect
            options={options}
            isLoading={isLoading}
            inputValue={inputValue}
            value={value}
            onKeyDown={handleKeyDown}
            onInputChange={(value, actionMeta) => {
              if (preventInputValueOnBlur) {
                if (actionMeta.action === "input-change") onInputValue(value);
              } else onInputValue(value);
            }}
            className={selectClassName}
            {...props}
          />
          {copyable && (
            <CopyButton
              content={((value || []) as SelectOption[])
                .map(({ value }) => value)
                .join(",")}
            />
          )}
        </div>
        <ErrorMessage error={error} />
      </div>
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
