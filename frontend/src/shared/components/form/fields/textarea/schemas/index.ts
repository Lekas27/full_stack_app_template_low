import { string } from "zod";

/** Base schema (untransformed) */
export const zodBaseTextareaValue = () => string();

/** Required textarea with validation (empty string is invalid) */
export const zodTextareaValue = (message = "This field is required") =>
  zodBaseTextareaValue().refine((value) => value !== "", { message });

/** Optional textarea */
export const zodOptionalTextareaValue = () => zodBaseTextareaValue().optional();

/** Required textarea with min length */
export const zodTextareaValueMin = (min: number, message?: string) =>
  zodBaseTextareaValue()
    .refine((value) => value.trim() !== "", {
      message: message || "This field is required",
    })
    .refine((value) => value.length >= min, {
      message: message || `Minimum length is ${min}`,
    });

/** Optional textarea with min length */
export const zodOptionalTextareaValueMin = (min: number, message?: string) =>
  zodBaseTextareaValue()
    .optional()
    .refine((value) => !value || value.length >= min, {
      message: message || `Minimum length is ${min}`,
    });

/** Required textarea with max length */
export const zodTextareaValueMax = (max: number, message?: string) =>
  zodBaseTextareaValue()
    .refine((value) => value.trim() !== "", {
      message: message || "This field is required",
    })
    .refine((value) => value.length <= max, {
      message: message || `Maximum length is ${max}`,
    });

/** Optional textarea with max length */
export const zodOptionalTextareaValueMax = (max: number, message?: string) =>
  zodBaseTextareaValue()
    .optional()
    .refine((value) => !value || value.length <= max, {
      message: message || `Maximum length is ${max}`,
    });

/** Required textarea with constraints */
export const zodTextareaValueWithConstraints = ({
  min,
  max,
  requiredMessage,
  minMessage,
  maxMessage,
}: {
  min?: number;
  max?: number;
  requiredMessage?: string;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseTextareaValue().refine((value) => value.trim() !== "", {
    message: requiredMessage || "This field is required",
  });

  if (min !== undefined) {
    schema = schema.refine((value) => value.length >= min, {
      message: minMessage || `Minimum length is ${min}`,
    });
  }

  if (max !== undefined) {
    schema = schema.refine((value) => value.length <= max, {
      message: maxMessage || `Maximum length is ${max}`,
    });
  }

  return schema;
};

/** Optional textarea with constraints */
export const zodOptionalTextareaValueWithConstraints = ({
  min,
  max,
  minMessage,
  maxMessage,
}: {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseTextareaValue().optional();

  if (min !== undefined) {
    schema = schema.refine((value) => !value || value.length >= min, {
      message: minMessage || `Minimum length is ${min}`,
    });
  }

  if (max !== undefined) {
    schema = schema.refine((value) => !value || value.length <= max, {
      message: maxMessage || `Maximum length is ${max}`,
    });
  }

  return schema;
};
