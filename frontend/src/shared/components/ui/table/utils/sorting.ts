import type { ColumnSort } from "@tanstack/react-table";

/**
 * Converts table's sorting state object to a string formatted for API
 */
export const convertSortingToApiFormat = ({ id, desc }: ColumnSort): string =>
  `${desc ? "-" : ""}${id}`;
