import { array } from "zod";

import { zodBaseSelectOption } from "./single";

/** Base schema for multiple select (untransformed) - always an array, never null */
export const zodBaseSelectMultiple = () => array(zodBaseSelectOption());

/** Required multiple select with validation (empty array means no selection) */
export const zodSelectMultipleValues = (message = "Please select at least one option") =>
  zodBaseSelectMultiple()
    .refine((options) => options.length > 0, { message })
    .transform((options) => options.map((option) => String(option.value)));

/** Optional multiple select with value transformation (empty array is valid) */
export const zodOptionalSelectMultipleValues = () =>
  zodBaseSelectMultiple()
    .optional()
    .transform((options) => options?.map((option) => String(option.value)) ?? []);

/** Required multiple select without transformation (returns full option objects) */
export const zodSelectMultipleRaw = (message = "Please select at least one option") =>
  zodBaseSelectMultiple().refine((options) => options.length > 0, { message });

/** Optional multiple select without transformation (returns full option objects array) */
export const zodOptionalSelectMultipleRaw = () => zodBaseSelectMultiple().optional();

/** Required multiple select with validation (empty array means no selection) */
export const zodSelectMultipleNumberValues = (message = "Please select at least one option") =>
  zodBaseSelectMultiple()
    .refine((options) => options.length > 0, { message })
    .transform((options) => options.map((option) => Number(option.value)));

/** Optional multiple select with value transformation (empty array is valid) */
export const zodOptionalSelectMultipleNumberValues = () =>
  zodBaseSelectMultiple()
    .optional()
    .transform((options) => options?.map((option) => Number(option.value)) ?? []);

export const zodSelectMultipleMinNumberValues = (
  minValues: number,
  message = "Please select at least one option"
) =>
  zodBaseSelectMultiple()
    .refine((options) => options.length >= minValues, { message })
    .transform((options) => options.map((option) => Number(option.value)));

export const zodSelectMultipleMinValues = (
  minValues: number,
  message = "Please select at least one option"
) =>
  zodBaseSelectMultiple()
    .refine((options) => options.length >= minValues, { message })
    .transform((options) => options.map((option) => String(option.value)));
