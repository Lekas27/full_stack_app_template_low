import { format } from "date-fns";
import { array, date } from "zod";

/** Base schema (untransformed) */
export const zodBaseMultipleDates = () => array(date());

/** Required multiple dates with validation (undefined means no dates selected) */
export const zodMultipleDatesValue = (message = "Please select at least one date") =>
  zodBaseMultipleDates()
    .optional()
    .refine((value) => value !== undefined && value.length > 0, { message });

/** Optional multiple dates (can be undefined) */
export const zodOptionalMultipleDatesValue = () => zodBaseMultipleDates().optional();

/** Required multiple dates with formatting transformation */
export const zodMultipleDatesValueFormatted = (
  formatString = "MM-dd-yyyy",
  message = "Please select at least one date"
) =>
  zodBaseMultipleDates()
    .optional()
    .refine((value) => value !== undefined && value.length > 0, { message })
    .transform((dates) => dates?.map((date) => format(date, formatString)) ?? []);

/** Optional multiple dates with formatting transformation */
export const zodOptionalMultipleDatesValueFormatted = (formatString = "MM-dd-yyyy") =>
  zodBaseMultipleDates()
    .optional()
    .transform((dates) => dates?.map((date) => format(date, formatString)) ?? []);
