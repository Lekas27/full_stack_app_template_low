import type { CSSProperties } from "react";

export type PaginationClassNames = {
  /** Outer container that wraps the entire pagination controls */
  container?: string;
  /** Class name for the "summary" text showing from X to Y of Z results */
  summary?: string;
  /** Class name for the page-size select dropdown itself */
  pageSizeSelect?: string;
  /** Container that wraps the "Previous" / "Next" buttons and individual page buttons */
  navContainer?: string;
  /** Class name shared by all page buttons (numbers, prev/next) */
  pageButton?: string;
  /** Class name that adds disabled states to prev/next buttons and so forth */
  pageButtonDisabled?: string;
  /** Class name for the active page button */
  pageButtonActive?: string;
  /** Class name for the inactive page button */
  pageButtonInactive?: string;
};

export type PaginationStyles = {
  container?: CSSProperties;
  summary?: CSSProperties;
  pageSizeSelect?: CSSProperties;
  navContainer?: CSSProperties;
  pageButton?: CSSProperties;
  pageButtonDisabled?: CSSProperties;
  pageButtonActive?: CSSProperties;
  pageButtonInactive?: CSSProperties;
};
