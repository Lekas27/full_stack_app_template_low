import { type PaginationState } from "@tanstack/react-table";
import {
  useEffect,
  useState,
  type DependencyList,
  type Dispatch,
  type SetStateAction,
} from "react";

type Props = {
  initialPageSize?: number;
  dependencies: DependencyList;
};

type Return = {
  paginationState: [PaginationState, Dispatch<SetStateAction<PaginationState>>];
};

/**
 * Hook that manages pagination state and automatically resets to first page when dependencies change
 */
export const usePaginationWithReset = ({ initialPageSize = 10, dependencies }: Props): Return => {
  const paginationState = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const [, setPagination] = paginationState;

  // Reset pagination to first page when dependencies change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { paginationState };
};
