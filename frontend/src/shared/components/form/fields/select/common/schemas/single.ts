import { null as nullType, number, object, string, union } from "zod";

/** Base schema (untransformed) */
export const zodBaseSelectOption = () =>
  object({
    value: union([string(), number()]),
    label: string(),
  });

/** Required select with validation (null means no selection) */
export const zodSelectValue = (message = "Please select an option") =>
  union([zodBaseSelectOption(), nullType()])
    .refine((value) => value !== null, { message })
    .transform((option) => (option ? String(option.value) : ""));

/** Non-nullable select with value transformation (for use in arrays) */
export const zodSelectValueNonNullable = () =>
  zodBaseSelectOption().transform((option) => String(option.value));

/** Optional select with value transformation */
export const zodOptionalSelectValue = () =>
  union([zodBaseSelectOption(), nullType()])
    .optional()
    .transform((option) => (option ? String(option.value) : undefined));

/** Required select without transformation (returns full option object) */
export const zodSelectRaw = (message = "Please select an option") =>
  union([zodBaseSelectOption(), nullType()]).refine((value) => value !== null, { message });

/** Optional select without transformation (returns full option object or null) */
export const zodOptionalSelectRaw = () => union([zodBaseSelectOption(), nullType()]).optional();

/** Required select with validation (null means no selection) */
export const zodNumberSelectValue = (message = "Please select an option") =>
  union([zodBaseSelectOption(), nullType()])
    .refine((value) => value !== null, { message })
    .transform((option) => (option ? Number(option.value) : 0));
