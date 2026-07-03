// https://github.com/flexdinesh/browser-or-node/blob/9875469e69b0dbc6a35e50b104495facf869bb4a/src/index.js#L1-L2
export const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
