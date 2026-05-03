import { Info } from "lucide-react";
import {
  forwardRef,
  useMemo,
  type HTMLInputTypeAttribute,
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

import { CharacterCounter } from "./components/character-counter";
import { InputContainer } from "./components/container";
import { CopyButtonSuffix } from "./components/coppy-button-suffix";
import { InfoTooltipSuffix } from "./components/info-tooltip-suffix";
import { PasswordToggle } from "./components/password-toggle";
import { useInputFormField } from "./hooks/use-form-field";
import { usePasswordToggle } from "./hooks/use-password-toggle";

import { ErrorMessage } from "@/shared/components/form/error/message";
import { Label } from "@/shared/components/form/label";
import { Input, type Props as InputProps } from "@/shared/components/ui/input";
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
    InputProps & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      inputClassName?: string;
      label?: ReactNode;
      labelClassName?: string;
      tooltip?: ReactNode;
      inputSufixTooltip?: ReactNode;
      prefixIcon?: ReactNode;
      allowSubmitOnEnter?: boolean;
      showCount?: boolean;
      showPasswordToggle?: boolean;
      copyable?: boolean;
      iconClassName?: string;
      helpText?: string | ReactNode;
      infoMessage?: string;
    };

const InputFormFieldInner = <
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
    type,
    variant,
    label,
    labelClassName,
    tooltip,
    inputSufixTooltip,
    prefixIcon,
    control,
    rules,
    defaultValue,
    showCount,
    showPasswordToggle,
    copyable,
    iconClassName,
    helpText,
    infoMessage,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLInputElement>
) => {
  const { field, fieldRef, onBlur, error, fieldWatch, value } =
    useInputFormField({
      name,
      control,
      rules,
      defaultValue,
    });
  const { passwordVisible, togglePasswordVisibility } = usePasswordToggle();

  const isPasswordField = useMemo<boolean>(() => type === "password", [type]);
  const shouldShowCount = useMemo(
    () => showCount && !isPasswordField,
    [isPasswordField, showCount]
  );
  const inputType = useMemo<HTMLInputTypeAttribute | undefined>(
    () => (isPasswordField ? (passwordVisible ? "text" : "password") : type),
    [isPasswordField, passwordVisible, type]
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
      <div>
        <InputContainer hasLabel={!!label}>
          {prefixIcon && (
            <div
              className={joinClasses(
                "pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400",
                iconClassName
              )}
            >
              {prefixIcon}
            </div>
          )}
          <Input
            {...field}
            ref={fieldRef || ref}
            id={id || name}
            className={joinClasses(
              inputClassName || "",
              shouldShowCount ? "pr-16" : "",
              showPasswordToggle && isPasswordField ? "pr-9" : "",
              prefixIcon ? "pl-10" : ""
            )}
            type={inputType}
            variant={variant}
            onBlur={onBlur}
            {...props}
          />
          {shouldShowCount && (
            <CharacterCounter
              currentLength={fieldWatch?.length || 0}
              maxLength={rules?.maxLength as number | undefined}
            />
          )}
          {showPasswordToggle && isPasswordField && (
            <PasswordToggle
              isVisible={passwordVisible}
              onToggle={togglePasswordVisibility}
            />
          )}
          {inputSufixTooltip && (
            <InfoTooltipSuffix content={inputSufixTooltip} />
          )}
          {copyable && <CopyButtonSuffix content={value} />}
        </InputContainer>

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

export const InputFormField = forwardRef(InputFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;
