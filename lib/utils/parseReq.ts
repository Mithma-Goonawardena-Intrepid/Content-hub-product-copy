import type { IncomingHttpHeaders } from "http";
import type { NodeIncomingMessage } from "h3";
import { headerSanitizer } from "./headerSanitizer";
import { parseUrlWithHost } from "./parseURL";

export type ParsedReq = {
  pathname?: string;
  search?: string;
  hash?: string;
  host?: string;
  headers?: IncomingHttpHeaders;
};

export const parseReq = (req: NodeIncomingMessage): ParsedReq => {
  return {
    ...parseUrlWithHost(req.url, req.headers.host),
    host: req.headers.host,
    headers: headerSanitizer(req.headers, [
      "authorization",
      "cookie",
      "x-api-key",
      "x-nebula-cache-authorization",
      "x-authorization",
      "x-recaptcha-token"
    ]),
  };
};
