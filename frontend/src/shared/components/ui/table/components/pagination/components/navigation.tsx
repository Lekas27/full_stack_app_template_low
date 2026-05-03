import type { FC } from "react";

import { PaginationDots } from "./dots";
import { PaginationPageNumber } from "./page-number";

import type {
  PaginationClassNames,
  PaginationStyles,
} from "@/shared/components/ui/table/components/pagination/types/styles";

type Props = {
  currentPageIndex: number;
  numberOfPages: number;
  onChange: (value: number) => void;
  classes?: PaginationClassNames;
  styles?: PaginationStyles;
};

/**
 * Navigation inspiration: https://www.zacfukuda.com/blog/pagination-algorithm
 */
export const PaginationNavigation: FC<Props> = ({
  currentPageIndex,
  numberOfPages,
  onChange,
  classes,
  styles,
}) => {
  if (!currentPageIndex || !numberOfPages) return null;

  const items = [
    <PaginationPageNumber
      key={1}
      index={1}
      currentPageIndex={currentPageIndex}
      onChange={onChange}
      classes={classes}
      styles={styles}
    />,
  ];

  if (currentPageIndex === 1 && numberOfPages === 1) return items;

  const range = 2;
  const leftRange = currentPageIndex - range;
  const rightRange = currentPageIndex + range;

  if (leftRange > 2) {
    items.push(
      <PaginationDots
        key={`dots-left-${leftRange}`}
        uniqueKey={`dots-left-${leftRange}`}
        classes={classes}
        styles={styles}
      />
    );
  }

  for (
    let i = leftRange > 2 ? leftRange : 2;
    i <= Math.min(numberOfPages, rightRange);
    i++
  ) {
    items.push(
      <PaginationPageNumber
        key={i}
        index={i}
        currentPageIndex={currentPageIndex}
        onChange={onChange}
        classes={classes}
        styles={styles}
      />
    );
  }

  if (rightRange + 1 < numberOfPages) {
    items.push(
      <PaginationDots
        key={`dots-right-${rightRange}`}
        uniqueKey={`dots-right-${rightRange}`}
        classes={classes}
        styles={styles}
      />
    );
  }

  if (rightRange < numberOfPages) {
    items.push(
      <PaginationPageNumber
        key={numberOfPages}
        index={numberOfPages}
        currentPageIndex={currentPageIndex}
        onChange={onChange}
        classes={classes}
        styles={styles}
      />
    );
  }

  return items;
};
