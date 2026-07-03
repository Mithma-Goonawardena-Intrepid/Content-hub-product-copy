import type {
  IncomingMessage,
  OutgoingHttpHeaders,
  ServerResponse,
} from "http";
import { headerSanitizer } from "./headerSanitizer";

export type ParsedRes = {
  responseTimeMs?: number;
  headers?: OutgoingHttpHeaders;
};

export const parseRes = (
  res: ServerResponse<IncomingMessage> | undefined,
  responseTimeMs: number,
): ParsedRes => {
  return {
    responseTimeMs,
    headers: headerSanitizer(res?.getHeaders(), ["set-cookie"]),
  };
};
