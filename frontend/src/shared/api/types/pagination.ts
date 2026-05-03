/**
 * API pagination request record
 *
 * To retrieve all items, set `page` to `1` and `size` to `0`.
 */
export type ApiPaginationRequestRecord = {
  /** Page index */
  page?: number;
  /** Page size */
  size?: number;
};

/**
 * API pagination response record
 */
export type ApiPaginationResponseRecord<Item> = {
  content: Item[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
  };
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
};
