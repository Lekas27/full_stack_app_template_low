import { date, object } from "zod";

// Base date range schema
export const dateRangeSchema = object({
  from: date(),
  to: date().optional(),
}).refine(
  (data) => {
    if (data.to && data.from) return data.to >= data.from;
    return true;
  },
  {
    message: "End date must be after or equal to start date",
    path: ["to"],
  }
);

// Required date range schema
export const dateRangeRequiredSchema = object({
  from: date(),
  to: date(),
}).refine((data) => data.to >= data.from, {
  message: "End date must be after or equal to start date",
  path: ["to"],
});
