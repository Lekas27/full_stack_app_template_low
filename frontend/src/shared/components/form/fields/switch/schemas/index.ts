import { boolean } from "zod";

/** Base schema (untransformed) */
export const zodBaseSwitchValue = () => boolean();

/** Required switch (boolean is always present, so this is just the base) */
export const zodSwitchValue = () => zodBaseSwitchValue();

/** Optional switch (still boolean, but can be undefined in optional contexts) */
export const zodOptionalSwitchValue = () => zodBaseSwitchValue().optional();

/** Required switch that must be true (e.g., terms acceptance) */
export const zodSwitchValueTrue = (message = "You must accept to continue") =>
  zodBaseSwitchValue().refine((value) => value === true, { message });

/** Switch with default value transformation */
export const zodSwitchValueWithDefault = (defaultValue = false) =>
  zodBaseSwitchValue()
    .optional()
    .transform((value) => value ?? defaultValue);
