// @ts-ignore
import type { FetchError } from "node-fetch";

export const isFetchError = (error: any): error is FetchError => {
  if (!error || typeof error !== "object") {
    return false;
  }
  return error.name === "FetchError";
};
