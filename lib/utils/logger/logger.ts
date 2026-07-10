import "../../../app/utils/global-shim";
import type { Logger } from "winston";
import { isNotNull } from "../isNotNull";
import type { ParsedReq } from "../parseReq";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export const logTags = {
  Env: {
    Server: "ENV/SERVER",
  },
  Client: {
    Contentstack: "CLIENT/CONTENTSTACK",
  },
  Layer: {
    Client: "LAYER/CLIENT",
  },
};

const createServerLogger = (): Promise<Logger> => {
  return new Promise((resolve) => {
    import("winston")
      .then((winston) => {
        resolve(
          winston.createLogger({
            level: process.env.LOG_LEVEL || LogLevel.DEBUG,
            format: process.env.LOG_PRETTY_PRINT
              ? winston.format.combine(
                  winston.format.colorize(),
                  winston.format.timestamp(),
                  winston.format.ms(),
                  winston.format.printf((info) => {
                    const ts = new Date(
                      info.timestamp as string | number | Date,
                    ).toISOString();
                    const error = info.formattedError
                      ? { error: info.formattedError }
                      : {};
                    return `${ts} (${String(info.ms)}) [${info.level}] [${String(info.tags)}] ${
                      String(info.message)
                    } ${JSON.stringify(
                      {
                        ...(info.payload as object),
                        ...error,
                      },
                      undefined,
                      2,
                    )}`;
                  }),
                )
              : winston.format.json(),
            transports: [new winston.transports.Console()],
            defaultMeta: { app: "Nebula" },
          }),
        );
      })
      .catch((err) => globalThis.console.error("winston cannot be loaded", err));
  });
};

const createInMemoryLogger = (): {
  log: () => void;
  getLogs: () => unknown[][];
} => {
  const inMemoryLogStore: unknown[][] = [];
  const logger = {
    log: (...args: unknown[]) => {
      inMemoryLogStore.push(args);
    },
    getLogs: () => {
      return inMemoryLogStore;
    },
  };

  return logger;
};

export interface LoggerOptions {
  tags?: string[];
}

export type LogPayload = {
  disableConsoleLog?: boolean;
  variableMessage?: string;
  error?: unknown;
  url?: string;
  statusCode?: number;
  req?: ParsedReq;
  [key: string]: unknown;
};

type Payload = {
  tags: string[];
  formattedError?: {
    stack?: string;
    name?: string;
    message?: string;
  };
  payload?: unknown;
};

let loggerService: Logger;

const getTags = (options: LoggerOptions) => {
  const env = logTags.Env.Server;
  const layer = options.tags?.find((tag) =>
    Object.values(logTags.Layer).includes(tag),
  );
  const client = options.tags?.find((tag) =>
    Object.values(logTags.Client).includes(tag),
  );

  return {
    tags: [env, layer, client].filter(isNotNull),
  };
};

export const logPayloadFormatter = (
  payload: unknown,
): Omit<Payload, "tags"> & { request_id?: string | string[] } => {
  let errorToFormat: Error | undefined;

  if (payload instanceof Error) {
    errorToFormat = payload;
  } else if ((payload as LogPayload)?.error instanceof Error) {
    errorToFormat = (payload as LogPayload).error as Error;
  }
  return {
    payload,
    formattedError: errorToFormat
      ? {
          stack: errorToFormat.stack,
          name: errorToFormat.name,
          message: errorToFormat.message,
        }
      : {},
    request_id: (payload as LogPayload | undefined)?.req?.headers?.["x-req-id"],
  };
};

export const loggerFactory = (options: LoggerOptions) => {
  if (!loggerService) {
    const inMemoryLogger = createInMemoryLogger();
    createServerLogger()
      .then((service) => {
        loggerService = service;
        inMemoryLogger.getLogs().forEach((logItem) => {
          loggerService.log.apply(
            loggerService,
            logItem as Parameters<Logger["log"]>,
          );
        });
      })
      .catch((err) =>
        globalThis.console.error("cannot create a logger service", err),
      );
    loggerService = inMemoryLogger as unknown as Logger;
  }

  return {
    info(message: string, payload?: LogPayload) {
      loggerService.log(LogLevel.INFO, message, {
        ...getTags(options),
        ...logPayloadFormatter(payload),
      });
    },
    warn(message: string, payload?: LogPayload) {
      loggerService.log(LogLevel.WARN, message, {
        ...getTags(options),
        ...logPayloadFormatter(payload),
      });
    },
    debug(message: string, payload?: LogPayload) {
      loggerService.log(LogLevel.DEBUG, message, {
        ...getTags(options),
        ...logPayloadFormatter(payload),
      });
    },
    error(message: string, payload?: unknown) {
      loggerService.log(LogLevel.ERROR, message, {
        ...getTags(options),
        ...logPayloadFormatter(payload),
      });
    },
  };
};

export type LoggerInstance = ReturnType<typeof loggerFactory>;
