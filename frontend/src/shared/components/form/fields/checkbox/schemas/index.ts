import { boolean } from "zod";

/** Base schema (untransformed) */
export const zodBaseCheckboxValue = () => boolean();

/** Required checkbox (must be true) */
export const zodCheckboxValue = (message = "Please check this field") =>
  zodBaseCheckboxValue().refine((value) => value === true, { message });

/** Optional checkbox */
export const zodOptionalCheckboxValue = () => zodBaseCheckboxValue().optional();

/** Required checkbox with default false value */
export const zodCheckboxValueWithDefault = (defaultValue = false) =>
  zodBaseCheckboxValue().default(defaultValue);
