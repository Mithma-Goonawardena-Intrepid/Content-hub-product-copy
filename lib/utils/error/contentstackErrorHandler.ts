import { createError } from "h3";
// @ts-ignore
import type { FetchError } from "node-fetch";
import type { LogLevel } from "~~/lib/utils/logger/logger";
import { loggerFactory, logTags } from "~~/lib/utils/logger/logger";
import type { APIClientError } from "~~/lib/types/Contentstack";
import { isFetchError } from "~~/lib/utils/error/isFetchError";
import { isAPIClientError } from "~~/lib/utils/error/isAPIClientError";

export type ContentstackErrorHandlerConfig = {
  errorMessage: string;
  notFoundMessage?: string;
  logErrorLevelOn404: LogLevel;
};

export const contentstackErrorHandler = (
  config: ContentstackErrorHandlerConfig,
  details: object,
) => {
  const { errorMessage, notFoundMessage, logErrorLevelOn404 } = config;
  const tags = [logTags.Client.Contentstack, logTags.Layer.Client];
  const logger = loggerFactory({
    tags,
  });
  return (e: APIClientError | FetchError) => {
    if (isFetchError(e)) {
      logger.error("Exception in fetching from ContentStack", {
        variableMessage: errorMessage,
        details,
        error: e,
      });
      throw createError({ statusCode: 503, statusMessage: e.message });
    }

    let statusCode = 503;
    let loggerMessage = errorMessage;
    let loggerFunc = logger.error;

    if (isAPIClientError(e) && e.error_code === 141) {
      switch (e.error_message) {
        case "The requested entry doesn't exist.":
          statusCode = 404;
          loggerFunc = logger[logErrorLevelOn404];
          loggerMessage = notFoundMessage ?? errorMessage;
          break;
        case "Failed to fetch entries. Please try again with valid parameters.":
          statusCode = 400;
          break;
      }
    }

    loggerFunc("Exception in ContentStack client", {
      variableMessage: loggerMessage,
      details,
      error: e,
    });

    throw createError({ statusCode, statusMessage: e?.error_message });
  };
};
