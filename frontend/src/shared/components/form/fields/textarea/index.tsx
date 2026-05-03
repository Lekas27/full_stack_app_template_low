import { forwardRef, type JSX, type ReactNode, type Ref } from "react";
import {
  useController,
  useWatch,
  type Control,
  type FieldPath,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import { CopyButton } from "@/shared/components/ui/copy-button";
import {
  Textarea,
  type Props as TextareaProps,
} from "@/shared/components/ui/textarea";
import { classNameManager } from "@/shared/lib/css";

const { joinClasses } = classNameManager;

const suffixTextareaClassnames =
  "absolute inset-y-0 flex items-center mr-4 text-sm text-secondary-1 dark:text-gray-1 theme-transition";

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    Omit<TextareaProps, "field"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      textareaClassName?: string;
      label?: ReactNode;
      tooltip?: ReactNode;
      showCount?: boolean;
      copyable?: boolean;
    };

const TextareaFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  {
    id,
    name,
    className,
    textareaClassName,
    label,
    tooltip,
    control,
    rules,
    defaultValue,
    placeholder,
    showCount,
    copyable,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLTextAreaElement>
) => {
  const {
    field,
    field: { value, onBlur, ref: fieldRef },
    fieldState: { error },
  } = useController<TFieldValues, TName, TTransformed>({
    name,
    control,
    rules,
    defaultValue,
  });

  const fieldWatch = useWatch({ name, control, defaultValue });

  return (
    <div className={className}>
      <Label
        htmlFor={id}
        label={label}
        required={!!rules?.required}
        tooltip={tooltip}
      />
      <div>
        <div
          className={joinClasses(label ? "mt-2" : "", "relative flex gap-2")}
        >
          <Textarea
            {...field}
            ref={ref || fieldRef}
            id={id || name}
            name={name as Path<TFieldValues>}
            value={value as string}
            textareaClassName={joinClasses(
              textareaClassName || "",
              showCount ? "pr-16" : "",
              "min-h-[40px] resize-y"
            )}
            onBlur={onBlur}
            placeholder={placeholder}
            {...props}
          />
          {showCount && (
            <div
              className={`${joinClasses(suffixTextareaClassnames)} ${
                copyable ? "right-10" : "right-0"
              }`}
            >
              {fieldWatch?.length || 0}
              {rules?.maxLength && `/${rules.maxLength}`}
            </div>
          )}
          {copyable && <CopyButton content={value} />}
        </div>
        <ErrorMessage error={error} />
      </div>
    </div>
  );
};

export const TextareaFormField = forwardRef(TextareaFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLTextAreaElement>;
  }
) => JSX.Element;
