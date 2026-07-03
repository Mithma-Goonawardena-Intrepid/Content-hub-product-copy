import type { APIClientError } from "~~/lib/types/Contentstack";

export const isAPIClientError = (error: any): error is APIClientError => {
  if (!error || typeof error !== "object") {
    return false;
  }
  const hasErrorCode = !!error.error_code;
  return hasErrorCode;
};
