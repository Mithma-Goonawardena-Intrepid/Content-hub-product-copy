import type { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";

export function headerSanitizer<
  T extends IncomingHttpHeaders | OutgoingHttpHeaders,
>(headers: T | undefined, headersToSanitize: string[]) {
  if (!headers) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(headers).map((header) => {
      const key = header[0];
      const value = header[1] as T extends IncomingHttpHeaders
        ? IncomingHttpHeaders[keyof IncomingHttpHeaders]
        : OutgoingHttpHeaders[keyof OutgoingHttpHeaders];
      return [
        key,
        headersToSanitize.includes(key.toLowerCase()) && value
          ? "TRUNCATED"
          : value,
      ];
    }),
  );
}
