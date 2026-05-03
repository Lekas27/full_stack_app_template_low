import { array, date, object } from "zod";

export const calendarMultipleFormSchema = object({
  dates: array(date()).optional(),
});

export const calendarMultipleRequiredSchema = object({
  dates: array(date()).min(1, {
    message: "Please select at least one date",
  }),
});
