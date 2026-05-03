export type QueryType = {
  [key: string]: undefined | string | boolean | number | (string | number | boolean)[];
};

export type SetQueryParamProps = {
  urlString: string;
  key: string;
  value: string | undefined | null;
};
