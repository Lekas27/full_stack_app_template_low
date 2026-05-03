import { format } from "date-fns";
import { date, object } from "zod";

/** Base schema (untransformed) */
export const zodBaseDateRange = () =>
  object({
    from: date(),
    to: date(),
  });

/** Required date range with validation (undefined means no range selected) */
export const zodDateRangeValue = (message = "Date range is required") =>
  zodBaseDateRange()
    .optional()
    .refine((value) => value !== undefined, { message });

/** Optional date range (can be undefined) */
export const zodOptionalDateRangeValue = () => zodBaseDateRange().optional();

/** Required date range with formatting transformation */
export const zodDateRangeValueFormatted = (
  formatString = "MM-dd-yyyy",
  message = "Date range is required"
) =>
  zodBaseDateRange()
    .optional()
    .refine((value) => value !== undefined, { message })
    .transform((range) => {
      if (!range) return { from: "", to: "" };
      return {
        from: format(range.from, formatString),
        to: format(range.to, formatString),
      };
    });

/** Optional date range with formatting transformation */
export const zodOptionalDateRangeValueFormatted = (formatString = "MM-dd-yyyy") =>
  zodBaseDateRange()
    .optional()
    .transform((range) =>
      range
        ? {
            from: format(range.from, formatString),
            to: format(range.to, formatString),
          }
        : undefined
    );
