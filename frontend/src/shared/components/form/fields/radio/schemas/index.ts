import { string } from "zod";

/** Base schema (untransformed) */
export const zodBaseRadioValue = () => string();

/** Required radio selection (empty string is invalid) */
export const zodRadioValue = (message = "Please select an option") =>
  zodBaseRadioValue().refine((value) => value !== "", { message });

/** Optional radio selection */
export const zodOptionalRadioValue = () => zodBaseRadioValue().optional();

/** Required radio with specific allowed values */
export const zodRadioValueEnum = <T extends readonly string[]>(
  allowedValues: T,
  message = "Please select a valid option"
) =>
  zodBaseRadioValue()
    .refine((value) => value !== "", { message })
    .refine((value) => allowedValues.includes(value), {
      message: `Value must be one of: ${allowedValues.join(", ")}`,
    });

/** Optional radio with specific allowed values */
export const zodOptionalRadioValueEnum = <T extends readonly string[]>(
  allowedValues: T,
  message?: string
) =>
  zodBaseRadioValue()
    .optional()
    .refine((value) => !value || allowedValues.includes(value), {
      message: message || `Value must be one of: ${allowedValues.join(", ")}`,
    });
