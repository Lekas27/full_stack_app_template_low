import { array, object, string } from "zod";

/** Base file item schema (untransformed) */
export const zodBaseFileItem = () =>
  object({
    name: string(),
    preview: string(),
  });

/** Base file input schema (untransformed) - always an array, never null */
export const zodBaseFileInput = () => array(zodBaseFileItem());

/** Required file input with validation (empty array means no files selected) */
export const zodFileInputValue = (message = "Please select at least one file") =>
  zodBaseFileInput().refine((files) => files.length > 0, { message });

/** Optional file input (empty array is valid) */
export const zodOptionalFileInputValue = () => zodBaseFileInput().optional();

/** Required file input with file count constraints */
export const zodFileInputValueWithConstraints = ({
  minFiles,
  maxFiles,
  requiredMessage,
  minMessage,
  maxMessage,
}: {
  minFiles?: number;
  maxFiles?: number;
  requiredMessage?: string;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseFileInput().refine((files) => files.length > 0, {
    message: requiredMessage || "Please select at least one file",
  });

  if (minFiles !== undefined) {
    schema = schema.refine((files) => files.length >= minFiles, {
      message: minMessage || `Minimum ${minFiles} files required`,
    });
  }

  if (maxFiles !== undefined) {
    schema = schema.refine((files) => files.length <= maxFiles, {
      message: maxMessage || `Maximum ${maxFiles} files allowed`,
    });
  }

  return schema;
};

/** Optional file input with file count constraints */
export const zodOptionalFileInputValueWithConstraints = ({
  minFiles,
  maxFiles,
  minMessage,
  maxMessage,
}: {
  minFiles?: number;
  maxFiles?: number;
  minMessage?: string;
  maxMessage?: string;
}) => {
  let schema = zodBaseFileInput().optional();

  if (minFiles !== undefined) {
    schema = schema.refine((files) => !files || files.length >= minFiles, {
      message: minMessage || `Minimum ${minFiles} files required`,
    });
  }

  if (maxFiles !== undefined) {
    schema = schema.refine((files) => !files || files.length <= maxFiles, {
      message: maxMessage || `Maximum ${maxFiles} files allowed`,
    });
  }

  return schema;
};
