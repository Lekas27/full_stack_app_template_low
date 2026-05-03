import { ChevronDown, ChevronUp } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { Input, type Props as InputProps } from "@/shared/components/ui/input";
import { classNameManager } from "@/shared/lib/css";

const { mergeClasses } = classNameManager;

export type Props = Omit<
  InputProps,
  "type" | "onChange" | "value" | "defaultValue"
> & {
  /** Current value */
  value?: number | string | null;
  /** Default value */
  defaultValue?: number | string | null;
  /** Callback when value changes */
  onChange?: (value: number | null, stringValue: string) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step for increment/decrement */
  step?: number;
  /** Allow decimal values */
  allowDecimals?: boolean;
  /** Show stepper controls */
  showControls?: boolean;
  /** Precision for decimal places */
  precision?: number;
  /** Custom formatter function */
  formatter?: (value: number | string) => string;
  /** Custom parser function */
  parser?: (displayValue: string) => string;
};

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      allowDecimals = false,
      showControls = true,
      precision,
      formatter,
      parser,
      onKeyDown,
      onBlur,
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>(() => {
      const initialValue = value ?? defaultValue ?? "";
      return formatter ? formatter(initialValue) : String(initialValue);
    });

    // Parse string value to number
    const parseValue = useCallback(
      (val: string): number | null => {
        if (!val || val === "") return null;

        const parsedValue = parser ? parser(val) : val;
        const numValue = allowDecimals
          ? parseFloat(parsedValue)
          : parseInt(parsedValue, 10);

        if (isNaN(numValue)) return null;

        // Apply constraints
        let constrainedValue = numValue;
        if (min !== undefined && constrainedValue < min) constrainedValue = min;
        if (max !== undefined && constrainedValue > max) constrainedValue = max;

        // Apply precision for decimals
        if (allowDecimals && precision !== undefined) {
          constrainedValue = parseFloat(constrainedValue.toFixed(precision));
        }

        return constrainedValue;
      },
      [allowDecimals, min, max, parser, precision]
    );

    // Format number for display
    const formatValue = useCallback(
      (val: number | string | null): string => {
        if (val === null || val === "") return "";

        if (formatter) {
          return formatter(val);
        }

        const numValue = typeof val === "string" ? parseFloat(val) : val;
        if (isNaN(numValue)) return "";

        if (allowDecimals && precision !== undefined) {
          return numValue.toFixed(precision);
        }

        return String(numValue);
      },
      [formatter, allowDecimals, precision]
    );

    // Update internal state when external value changes
    useEffect(() => {
      if (value !== null && value !== undefined) {
        setInputValue(formatValue(value));
      }
    }, [value, formatValue]);

    // Handle input change
    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = event.target;

        // Allow empty value
        if (newValue === "") {
          setInputValue("");
          onChange?.(null, "");
          return;
        }

        // Filter invalid characters
        let filteredValue = newValue;

        if (!allowDecimals) {
          // Only allow digits
          filteredValue = newValue.replace(/[^0-9]/g, "");
        } else {
          // Allow digits and single decimal point
          filteredValue = newValue.replace(/[^0-9.]/g, "");
          // Ensure only one decimal point
          const decimalCount = (filteredValue.match(/\./g) || []).length;
          if (decimalCount > 1) {
            const firstDecimalIndex = filteredValue.indexOf(".");
            filteredValue =
              filteredValue.slice(0, firstDecimalIndex + 1) +
              filteredValue.slice(firstDecimalIndex + 1).replace(/\./g, "");
          }
        }

        setInputValue(filteredValue);

        const parsedValue = parseValue(filteredValue);
        onChange?.(parsedValue, filteredValue);
      },
      [allowDecimals, onChange, parseValue]
    );

    // Handle key down events
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      // Block invalid characters
      const blockedChars = ["e", "E", "+", "-"];
      if (!allowDecimals) {
        blockedChars.push(".");
      }

      if (blockedChars.includes(key)) {
        event.preventDefault();
        return;
      }

      // Handle arrow keys for increment/decrement
      if (key === "ArrowUp") {
        event.preventDefault();
        handleStep(1);
      } else if (key === "ArrowDown") {
        event.preventDefault();
        handleStep(-1);
      }

      onKeyDown?.(event);
    };

    // Handle blur - format the value
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      const parsedValue = parseValue(inputValue);
      if (parsedValue !== null) {
        const formattedValue = formatValue(parsedValue);
        setInputValue(formattedValue);
      }

      onBlur?.(event);
    };

    // Handle step (increment/decrement)
    const handleStep = useCallback(
      (direction: 1 | -1) => {
        if (disabled) return;

        const currentValue = parseValue(inputValue) || 0;
        const newValue = currentValue + direction * step;

        // Apply constraints
        let constrainedValue = newValue;
        if (min !== undefined && constrainedValue < min) constrainedValue = min;
        if (max !== undefined && constrainedValue > max) constrainedValue = max;

        const formattedValue = formatValue(constrainedValue);
        setInputValue(formattedValue);
        onChange?.(constrainedValue, formattedValue);
      },
      [disabled, formatValue, inputValue, max, min, onChange, parseValue, step]
    );

    // Handle stepper button click
    const handleStepperClick = useCallback(
      (event: MouseEvent, direction: 1 | -1) => {
        event.preventDefault();
        handleStep(direction);
      },
      [handleStep]
    );

    return (
      <div className="relative">
        <Input
          {...rest}
          ref={ref}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
          className={mergeClasses(showControls ? "pr-8" : "", className)}
        />
        {showControls && (
          <div className="absolute top-1/2 right-1 flex -translate-y-1/2 flex-col">
            <button
              type="button"
              disabled={disabled}
              onMouseDown={(e) => handleStepperClick(e, 1)}
              className="flex h-4 w-6 items-center justify-center rounded-sm text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button
              type="button"
              disabled={disabled}
              onMouseDown={(e) => handleStepperClick(e, -1)}
              className="flex h-4 w-6 items-center justify-center rounded-sm text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
