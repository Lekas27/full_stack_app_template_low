import { AxiosError } from "axios";
import { useCallback } from "react";

import type {
  ApiErrorResponseRecord,
  ApiMultipleErrorMessagesResponseRecord,
  ApiResponseSingleErrorMessageRecord,
} from "@/shared/api/types/errors";
import { useNotifications } from "@/shared/components/ui/notifications/context";
import type { NotificationConfig } from "@/shared/components/ui/notifications/context/types/notification";

type ResponseRecord = {
  handleError: (
    error: AxiosError<ApiErrorResponseRecord> | ApiErrorResponseRecord
  ) => void;
};

/**
 * Hook that returns an error handler function for React Query `onError` callbacks
 */
export const useApiError = (): ResponseRecord => {
  const { error: showError } = useNotifications();

  const getApiSingleErrorMessage = useCallback(
    ({ detail }: ApiResponseSingleErrorMessageRecord): string => detail,
    []
  );

  const getMultipleErrorMessages = useCallback(
    ({ detail }: ApiMultipleErrorMessagesResponseRecord) =>
      detail.map(({ type: message, msg: description, loc: location }) => ({
        message,
        description: `${location[location.length - 1]}: ${description}`,
      })),
    []
  );

  /**
   * Process error data regardless of its source (API or Axios)
   */
  const processErrorData = useCallback(
    (
      errorData: unknown,
      options?: Omit<NotificationConfig, "message" | "description">
    ): boolean => {
      // Plain string error
      if (typeof errorData === "string") {
        showError({
          message: "Server error",
          description: errorData,
          ...options,
        });
        return true;
      }

      // Structured error with `detail` field
      if (errorData && typeof errorData === "object" && "detail" in errorData) {
        const { detail } = errorData;

        // Single error message (detail is a string)
        if (typeof detail === "string") {
          const message = getApiSingleErrorMessage(
            errorData as ApiResponseSingleErrorMessageRecord
          );
          showError({ message, ...options });
          return true;
        }

        // Multiple error messages (detail is an array)
        if (Array.isArray(detail)) {
          const messages = getMultipleErrorMessages(
            errorData as ApiMultipleErrorMessagesResponseRecord
          );
          messages.forEach(({ message, description }) =>
            showError({ message, description, ...options })
          );
          return true;
        }
      }

      return false;
    },
    [getApiSingleErrorMessage, getMultipleErrorMessages, showError]
  );

  const handleError = useCallback(
    (
      error: AxiosError<ApiErrorResponseRecord> | ApiErrorResponseRecord,
      options?: Omit<NotificationConfig, "message" | "description">
    ) => {
      try {
        let errorData: unknown;
        let fallbackMessage: string | undefined;

        // Determine the error data source
        if ("response" in error) {
          // It's an AxiosError
          const axiosError = error as AxiosError<ApiErrorResponseRecord>;
          errorData = axiosError.response?.data;
          fallbackMessage = axiosError.message;
        } else {
          // It's a raw API error response
          errorData = error;
        }

        // Process the error data
        const processed = processErrorData(errorData, options);

        if (!processed) {
          // If we couldn't process the error data but have a fallback message
          if (fallbackMessage) {
            showError({
              message: "Server error",
              description: fallbackMessage,
              ...options,
            });
          } else {
            // No processable error data and no fallback
            throw errorData;
          }
        }
      } catch (error) {
        // Generic fallback for unparsable errors or errors during processing
        showError({
          message: "Server error",
          description: import.meta.env.DEV
            ? `Unexpected error: ${JSON.stringify(error)}`
            : "An unexpected error occurred",
          ...options,
        });
      }
    },
    [processErrorData, showError]
  );

  return { handleError };
};
