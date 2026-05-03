import { date, object } from "zod";

export const calendarSingleFormSchema = object({
  date: date().optional(),
});

export const calendarSingleRequiredSchema = object({
  date: date({
    message: "Please select a valid date",
  }),
});
