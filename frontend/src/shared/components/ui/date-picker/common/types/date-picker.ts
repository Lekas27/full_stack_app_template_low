import { type DateRange } from "react-day-picker";

export type RangeMode = "range";
export type DatePickerTypeRange = DateRange | undefined;

export type SingleMode = "single";
export type DatePickerTypeSingle = Date | undefined;

export type MultipleMode = "multiple";
export type DatePickerTypeMultiple = Date[] | undefined;
