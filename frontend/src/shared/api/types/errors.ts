export type ApiResponseSingleErrorMessageRecord = {
  detail: string;
};

type ApiDetailErrorMessagesRecord = {
  loc: [string, number];
  msg: string;
  type: string;
};

export type ApiMultipleErrorMessagesResponseRecord = {
  detail: ApiDetailErrorMessagesRecord[];
};

export type ApiErrorResponseRecord =
  | ApiResponseSingleErrorMessageRecord
  | ApiMultipleErrorMessagesResponseRecord;
