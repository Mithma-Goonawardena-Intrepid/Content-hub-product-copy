export const parseURL = (str: string): false | URL => {
  try {
    return new URL(str);
  } catch {
    return false;
  }
};

export const parseUrlWithHost = (
  str?: string,
  host?: string,
  protocol?: string,
) => {
  try {
    if (!str) return undefined;
    const url = new URL(str, `${protocol ?? "http"}://${host ?? "0.0.0.0"}`);
    return {
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
    };
  } catch {
    return undefined;
  }
};
