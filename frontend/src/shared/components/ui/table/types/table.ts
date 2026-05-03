import type {
  ExpandedState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";

/**
 * Additional table on state update change event handlers.
 */
export type TableOnChange = {
  pagination?: (pagination: PaginationState) => void;
  sorting?: (sorting: SortingState) => void;
  selection?: (selection: RowSelectionState) => void;
  expanded?: (selection: ExpandedState) => void;
};
