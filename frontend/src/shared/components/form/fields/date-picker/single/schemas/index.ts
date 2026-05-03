import { format } from "date-fns";
import { date } from "zod";

/** Base schema (untransformed) */
export const zodBaseDateValue = () => date();

/** Required date with validation (undefined means no date selected) */
export const zodDateValue = (message = "Date is required") =>
  zodBaseDateValue()
    .optional()
    .refine((value) => value !== undefined, { message });

/** Optional date (can be undefined) */
export const zodOptionalDateValue = () => zodBaseDateValue().optional();

/** Required date with formatting transformation */
export const zodDateValueFormatted = (formatString = "yyyy-MM-dd", message = "Date is required") =>
  zodBaseDateValue()
    .optional()
    .refine((value) => value !== undefined, { message })
    .transform((date) => (date ? format(date, formatString) : ""));

/** Required date with formatting transformation */
export const zodDateRequireValueFormatted = (
  formatString = "yyyy-MM-dd",
  message = "Date is required"
) =>
  zodBaseDateValue()
    .refine((value) => value !== undefined, { message })
    .transform((date) => (date ? format(date, formatString) : ""));

/** Optional date with formatting transformation */
export const zodOptionalDateValueFormatted = (formatString = "MM-dd-yyyy") =>
  zodBaseDateValue()
    .optional()
    .transform((date) => (date ? format(date, formatString) : undefined));

/** Required date with timezone formatting transformation */
export const zodDateValueWithTimezone = (message = "Date is required") =>
  zodBaseDateValue()
    .optional()
    .refine((value) => value !== undefined, { message })
    .transform((date) => (date ? format(date, "MM-dd-yyyy XXX") : ""));

/** Optional date with timezone formatting transformation */
export const zodOptionalDateValueWithTimezone = () =>
  zodBaseDateValue()
    .optional()
    .transform((date) => (date ? format(date, "MM-dd-yyyy XXX") : undefined));
