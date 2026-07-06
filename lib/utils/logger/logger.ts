import "../../../app/utils/global-shim";
import type { Logger } from "winston";
// @ts-ignore
import type SearchProductModel from "search-client-js/src/Model/Product";
import type { SalesCountry } from "../../types/Contentstack";
import { isBrowser } from "../isBrowser";
import { isNotNull } from "../isNotNull";
import type { ParsedReq } from "../parseReq";
import type { ParsedRes } from "../parseRes";
import type { HayabusaAvailabilities } from "../../types/Hayabusa/DeparturesAndAvailabilities";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export const logTags = {
  App: {
    Nebula: "APP/NEBULA",
  },
  Env: {
    Server: "ENV/SERVER",
    Browser: "ENV/BROWSER",
  },
  Client: {
    Auth0: "CLIENT/AUTH0",
    AWS: "CLIENT/AWS",
    Salesforce: "CLIENT/SALESFORCE",
    Contentstack: "CLIENT/CONTENTSTACK",
    Redis: "CLIENT/REDIS",
    Wordpress: "CLIENT/WORDPRESS",
    Hayabusa: "CLIENT/HAYABUSA",
    NewRelic: "CLIENT/NEWRELIC",
    Algolia: "CLIENT/ALGOLIA",
    Formstack: "CLIENT/FORMSTACK",
  },
  Layer: {
    Component: "LAYER/COMPONENT",
    Api: "LAYER/API",
    Middleware: "LAYER/MIDDLEWARE",
    Service: "LAYER/SERVICE",
    Decorator: "LAYER/DECORATOR",
    Validator: "LAYER/VALIDATOR",
    Client: "LAYER/CLIENT",
    Cache: "LAYER/CACHE",
    Utils: "LAYER/UTILS",
    Routing: "LAYER/ROUTING",
    Store: "LAYER/STORE",
    Page: "LAYER/PAGE",
    AsyncProcessing: "LAYER/ASYNCPROCESSING",
    Plugin: "LAYER/PLUGIN",
    Nitro: "LAYER/NITRO",
    Composable: "LAYER/COMPOSABLE",
  },
  Function: {
    ErrorBoundary: "FUNCTION/ERRORBOUNDARY",
    PageType: "FUNCTION/PAGETYPE",
  },
  Feature: {
    Agents: "FEATURE/AGENTS",
    Authentication: "FEATURE/AUTHENTICATION",
    Departures: "FEATURE/DEPARTURES",
    Reviews: "FEATURE/REVIEWS",
    DealPromotion: "FEATURE/DEALPROMOTION",
    TopDeals: "FEATURE/TOPDEALS",
    Products: "FEATURE/PRODUCTS",
    Header: "FEATURE/HEADER",
    Footer: "FEATURE/FOOTER",
    Webhook: "FEATURE/WEBHOOK",
    Wishlist: "FEATURE/WISHLIST",
    CompareTool: "FEATURE/COMPARETOOL",
    Search: "FEATURE/SEARCH",
    Webform: "FEATURE/WEBFORM",
    ContactUsMethods: "FEATURE/CONTACTUSMETHODS",
    Salesforce: "FEATURE/SALESFORCE",
    SearchAutocomplete: "FEATURE/SEARCHAUTOCOMPLETE",
    DestinationDeals: "FEATURE/DESTINATIONDEALS",
    Promotions: "FEATURE/PROMOTIONS",
    SierraChat: "FEATURE/SIERRACHAT",
  },
  Page: {
    ModularPage: "PAGE/MODULARPAGE",
    Home: "PAGE/HOME",
    Product: "PAGE/PRODUCT",
    ProductMap: "PAGE/PRODUCTMAP",
    Search: "PAGE/SEARCH",
    Destination: "PAGE/DESTINATION",
    Eti: "PAGE/ETI",
    Wishlist: "PAGE/WISHLIST",
    CompareTool: "PAGE/COMPARELIST",
    Wildlandtrekking: "PAGE/WILDLANDTREKKING",
    VisaEntryRequirements: "PAGE/VISAENTRYREQUIREMENTS",
    ContactUsPage: "PAGE/CONTACTUS",
    FAQPage: "PAGE/FAQ",
    CategoryPage: "PAGE/CATEGORY",
    DestinationMonths: "PAGE/DESTINATIONMONTHS",
    ClusterPage: "PAGE/CLUSTERPAGE",
    StylePage: "PAGE/STYLEPAGE",
    ThemePage: "PAGE/THEME",
    TravelAlerts: "PAGE/TRAVELALERTS",
    BoatPage: "PAGE/BOAT",
    DealPage: "PAGE/DEAL",
    EngagementPage: "PAGE/ENGAGEMENT",
    DealsPage: "PAGE/DEALSPAGE",
    EditorialPage: "PAGE/EDITORIALPAGE",
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
  // errors
  variableMessage?: string;
  error?: unknown;
  // technical details
  functionName?: string;
  fileName?: string;
  // technical details
  counter?: number;
  operationName?: string;
  isSuccessful?: boolean;
  cacheKey?: string;
  cacheField?: string;
  cacheKeys?: string[];
  searchProduct?: SearchProductModel;
  // req/res info
  url?: string;
  statusCode?: number;
  res?: ParsedRes;
  req?: ParsedReq;
  // business related info
  slug?: string;
  localeCode?: string;
  formId?: string;
  availableDatesAndMonths?: HayabusaAvailabilities;
  productCode?: string;
  productCodes?: string[];
  destinationDisplayName?: string;
  currencyCode?: string;
  productId?: number;
  dealId?: number;
  salesCountry?: SalesCountry;
  iso?: string;

  // any other keys that their type is not important and can overwrite
  [key: string]: any;
};

interface Payload {
  tags: string[];
  formattedError?: {
    stack?: string;
    name?: string;
    message?: string;
  };
  payload?: unknown;
}

class ClientLogger {
  formatter(message: string, payload: Payload) {
    const tags =
      payload.tags
        .slice(1)
        .reduce(
          (acc, val) => acc + ',"' + val + '"',
          '["' + payload.tags[0] + '"',
        ) + "]";
    return `${tags} | ${message} | ${(payload?.payload as LogPayload)?.variableMessage}`;
  }

  log(level: LogLevel, message: string, payload: Payload) {
    if (
      (globalThis.window as any)?.newrelic?.log &&
      typeof (globalThis.window as any).newrelic.log === "function"
    ) {
      (globalThis.window as any).newrelic.log(message, {
        level,
        customAttributes: {
          ...payload,
          app: "Nebula",
        },
      });
    }
    if (!(payload.payload as LogPayload)?.disableConsoleLog) {
      switch (level) {
        case LogLevel.DEBUG:
          globalThis.console.debug(this.formatter(message, payload));
          break;
        case LogLevel.INFO:
          globalThis.console.info(this.formatter(message, payload));
          break;
        case LogLevel.WARN:
          globalThis.console.warn(this.formatter(message, payload));
          break;
        case LogLevel.ERROR:
          if (payload.payload instanceof Error) {
            globalThis.console.error(
              this.formatter(message, payload),
              payload.payload,
            );
          } else if ((payload?.payload as LogPayload)?.error) {
            globalThis.console.error(
              this.formatter(message, payload),
              (payload?.payload as LogPayload)?.error,
            );
          } else {
            globalThis.console.error(this.formatter(message, payload));
          }
          break;
      }
    }
  }
}

let loggerService: Logger | ClientLogger;

const getTags = (options: LoggerOptions) => {
  const env = isBrowser ? logTags.Env.Browser : logTags.Env.Server;
  const layer = options.tags?.find((tag) =>
    Object.values(logTags.Layer).includes(tag),
  );
  const client = options.tags?.find((tag) =>
    Object.values(logTags.Client).includes(tag),
  );
  const feature = options.tags?.find((tag) =>
    Object.values(logTags.Feature).includes(tag),
  );
  const natureOfFunction = options.tags?.find((tag) =>
    Object.values(logTags.Function).includes(tag),
  );
  const page = options.tags?.find((tag) =>
    Object.values(logTags.Page).includes(tag),
  );

  return {
    tags: [env, layer, client, feature, natureOfFunction, page].filter(
      isNotNull,
    ),
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
    if (isBrowser) {
      loggerService = new ClientLogger();
    } else {
      const inMemoryLogger = createInMemoryLogger();
      createServerLogger()
        .then((service) => {
          loggerService = service;
          inMemoryLogger.getLogs().forEach((logItem) => {
            (loggerService as Logger).log.apply(
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
