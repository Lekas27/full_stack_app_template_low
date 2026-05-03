import queryString from "query-string";

import type { QueryType, SetQueryParamProps } from "./types/query";

/**
 * Utility class to work with URL query parameters.
 */
export type UrlQueryManagerType = {
  /**
   * Replace an existing query-parameter’s value or append a new one.
   */
  setQueryParam(props: SetQueryParamProps): string;

  /**
   * Convert an object to a query-string.
   */
  getQueryString(props: QueryType): string;
};

export class UrlQueryManager implements UrlQueryManagerType {
  setQueryParam({ urlString, key, value }: SetQueryParamProps): string {
    if (value === undefined || value === null || value === "") return urlString;

    try {
      const { url, query } = queryString.parseUrl(urlString);

      query[key] = value;

      return queryString.stringifyUrl({ url, query });
    } catch {
      return urlString; // invalid URL → leave untouched
    }
  }

  getQueryString(params: QueryType): string {
    if (!params) return "";

    const qs = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    });

    return qs ? `?${qs}` : "";
  }
}

export const urlQueryManager: UrlQueryManagerType = new UrlQueryManager();
